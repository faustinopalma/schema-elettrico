/* global cytoscape, cytoscapeDagre, cytoscapeElk, cytoscapeCola, cytoscapeFcose */
(() => {
  "use strict";

  // Register Cytoscape dynamic layout extensions safely
  if (typeof cytoscape !== "undefined") {
    if (typeof cytoscapeDagre !== "undefined") cytoscape.use(cytoscapeDagre);
    if (typeof cytoscapeElk !== "undefined") cytoscape.use(cytoscapeElk);
    if (typeof cytoscapeCola !== "undefined") cytoscape.use(cytoscapeCola);
    if (typeof cytoscapeFcose !== "undefined") cytoscape.use(cytoscapeFcose);
  }

  const DATA = window.IMPIANTO_DATA;
  const PLANT_MAP = new Map(DATA.plants.map((p) => [p.id, p]));
  const FLOOR_MAP = new Map(DATA.floors.map((f) => [f.id, f]));
  const NODE_MAP = new Map(DATA.nodes.map((n) => [n.id, n]));
  const DS_MAP = new Map(DATA.datasheets.map((d) => [d.id, d]));

  const INC_BY_NODE = new Map();
  DATA.inconsistencies.forEach((inc) => {
    (inc.affectedNodes || []).forEach((nid) => {
      if (!INC_BY_NODE.has(nid)) INC_BY_NODE.set(nid, []);
      INC_BY_NODE.get(nid).push(inc);
    });
  });

  const state = {
    activePlant: "IMP-SSC",    // Start directly on Plant 1 (no chaotic 50-node holistic view)
    layoutEngine: "elk",       // 'elk' | 'cola' | 'fcose' | 'dagre' | 'floors'
    flowDir: "TB",             // 'TB' | 'LR'
    animateFlows: true,
    showBridges: false,        // Keep each plant ultra-clean by default; 1-click to reveal cross-plant bridges (auto-enabled on cross-cutting safety/BMS plants!)
    explodedIds: new Set(),
    selectedNodeId: "RIP-250",
    hoveredNodeId: null,
    isFullscreen: false,
    activeLayoutHandle: null
  };

  let cyInstance = null;
  let rafId = null;

  // ==================== DYNAMIC CSS PALETTE PROBE (ZERO HARDCODED HEX) ====================
  const _probeCanvas = document.createElement("canvas");
  _probeCanvas.width = 1;
  _probeCanvas.height = 1;
  const _probeCtx = _probeCanvas.getContext("2d", { willReadFrequently: true });
  function toRgb(cssColor) {
    _probeCtx.clearRect(0, 0, 1, 1);
    _probeCtx.fillStyle = cssColor;
    _probeCtx.fillRect(0, 0, 1, 1);
    const d = _probeCtx.getImageData(0, 0, 1, 1).data;
    return `rgb(${d[0]}, ${d[1]}, ${d[2]})`;
  }
  function toRgba(cssColor, alpha) {
    _probeCtx.clearRect(0, 0, 1, 1);
    _probeCtx.fillStyle = cssColor;
    _probeCtx.fillRect(0, 0, 1, 1);
    const d = _probeCtx.getImageData(0, 0, 1, 1).data;
    return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${alpha})`;
  }

  function getPalette() {
    const read = (id) => {
      const el = document.getElementById(id);
      const cs = getComputedStyle(el);
      return { fg: toRgb(cs.color), bg: toRgb(cs.backgroundColor) };
    };
    const bg = read("probe-bg");
    const surf = read("probe-surface");
    const txt = read("probe-text");
    const brd = read("probe-border");
    const st = read("probe-status");
    const ok = read("probe-ok");
    const acc = read("probe-accent");
    const swatches = {};
    ["ssc", "sca", "scb", "pdc", "fire", "bms", "tlc", "gnd"].forEach((k) => {
      swatches[k] = read("probe-" + k);
    });
    return {
      bg: bg.fg,
      bgElevated: bg.bg,
      surface: surf.fg,
      surfaceSoft: surf.bg,
      text: txt.fg,
      textMuted: txt.bg,
      border: brd.fg,
      borderStrong: brd.bg,
      danger: st.fg,
      warning: st.bg,
      success: ok.fg,
      link: ok.bg,
      accentFg: acc.bg,
      swatches
    };
  }

  function plantColors(plantId, pal) {
    const p = PLANT_MAP.get(plantId) || DATA.plants[0];
    return pal.swatches[p.swatch] || pal.swatches.ssc;
  }

  function getPlantIconSvg(iconKey, stroke) {
    const s = stroke || "currentColor";
    switch (iconKey) {
      case "grid":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 10h18M7 10v9m5-9v9m5-9v9"/><circle cx="7" cy="19" r="1.5"/><circle cx="12" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg>`;
      case "towerA":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 15l3-8 3 8M10 13h4"/></svg>`;
      case "towerB":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9.5 7h3.5a2 2 0 0 1 0 4H9.5V7zm0 4h4a2 2 0 0 1 0 4h-4v-4z"/></svg>`;
      case "solar":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M4.9 4.9l2.1 2.1m10 10l2.1 2.1M2 12h3m14 0h3M4.9 19.1l2.1-2.1m10-10l2.1-2.1"/></svg>`;
      case "fire":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/><path d="M12 8c1.5 2 2.5 3.2 2.5 5a2.5 2.5 0 0 1-5 0c0-1.8 1-3 2.5-5z"/></svg>`;
      case "cpu":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg>`;
      case "signal":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/><circle cx="12" cy="12" r="2"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v9M5 12h14M7.5 16h9M10 20h4"/></svg>`;
    }
  }

  // ==================== BUILD GRAPH FOR THE ACTIVE PLANT ====================
  function computePlantGraph() {
    const pid = state.activePlant;
    const nodes = [];
    const edges = [];
    const includedIds = new Set();

    // Include Tier 1 + Tier 2 nodes belonging to activePlant (exclude abstract doc nodes on canvas to keep function crystal clear!)
    const plantOwnNodes = DATA.nodes.filter((n) => n.plant === pid && n.tier <= 2 && n.nodeClass !== "doc_reference");
    const ownSet = new Set(plantOwnNodes.map((n) => n.id));

    plantOwnNodes.forEach((n) => {
      nodes.push({ ...n, isBridge: false });
      includedIds.add(n.id);
    });

    // Relevant edges (excluding doc_trace)
    DATA.edges.forEach((e) => {
      if (e.edgeType === "doc_trace") return;
      const srcNode = NODE_MAP.get(e.source);
      const tgtNode = NODE_MAP.get(e.target);
      if (!srcNode || !tgtNode) return;

      const sOwn = ownSet.has(e.source);
      const tOwn = ownSet.has(e.target);
      // Cross-cutting plants (Fire/UPS, BMS, TLC, Terra) naturally exist to connect to main boards, so always include their direct targets!
      const isCrossCuttingPlant = pid === "IMP-FIRE" || pid === "IMP-BMS" || pid === "IMP-TLC" || pid === "IMP-GND";

      if (sOwn && tOwn) {
        edges.push({ ...e });
      } else if ((state.showBridges || isCrossCuttingPlant) && (sOwn || tOwn || e.plant === pid)) {
        [srcNode, tgtNode].forEach((endN) => {
          if (!includedIds.has(endN.id)) {
            nodes.push({ ...endN, isBridge: true });
            includedIds.add(endN.id);
          }
        });
        edges.push({ ...e });
      }
    });

    // Inject exploded internal circuits if user expanded a switchboard
    state.explodedIds.forEach((boardId) => {
      if (!includedIds.has(boardId)) return;
      const board = NODE_MAP.get(boardId);
      if (!board) return;
      (board.circuits || []).forEach((c, idx) => {
        const cid = `${boardId}__CIRC_${idx}`;
        nodes.push({
          id: cid,
          code: c.code,
          label: c.desc,
          plant: board.plant,
          nodeClass: "circuit_leaf",
          roleType: "load",
          roleLabel: "🔌 LINEA INTERNA",
          shortFunc: `${c.breaker || ""} · Cavo: ${c.cable || "standard"}`,
          emergencyNote: "",
          tier: 2,
          floor: board.floor,
          colHint: board.colHint,
          parentBoardId: boardId,
          specs: {
            "Quadro origine": board.code,
            "Sigla partenza": c.code,
            "Protezione": c.breaker || "-",
            "Conduttura": c.cable || "-"
          },
          desc: `Circuito interno derivato dal quadro ${board.label}: ${c.desc}.`,
          circuits: [],
          bom: [],
          datasheetIds: board.datasheetIds || [],
          docRefs: board.docRefs || [],
          isDynamicLeaf: true,
          isBridge: false
        });
        includedIds.add(cid);
        edges.push({
          id: `edge_${cid}`,
          source: boardId,
          target: cid,
          edgeType: "power_bt",
          flowCategory: "⚡ Linea",
          plant: board.plant,
          tier: 1,
          label: c.code
        });
      });
    });

    // Compute in-degree and out-degree within visible graph so every card knows if it has IN and/or OUT ports!
    const inDeg = new Map();
    const outDeg = new Map();
    edges.forEach((e) => {
      outDeg.set(e.source, (outDeg.get(e.source) || 0) + 1);
      inDeg.set(e.target, (inDeg.get(e.target) || 0) + 1);
    });
    nodes.forEach((n) => {
      n.visIn = inDeg.get(n.id) || 0;
      n.visOut = outDeg.get(n.id) || 0;
    });

    return { nodes, edges };
  }

  function findNodeAny(id) {
    if (NODE_MAP.has(id)) return NODE_MAP.get(id);
    const { nodes } = computePlantGraph();
    return nodes.find((n) => n.id === id) || DATA.nodes[0];
  }

  // ==================== RICH SVG FUNCTIONAL BLOCK CARD GENERATOR ====================
  function wrapTextLines(text, maxChars, maxLines) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = "";
    for (const w of words) {
      const cand = cur ? `${cur} ${w}` : w;
      if (cand.length <= maxChars) {
        cur = cand;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    if (lines.length > maxLines) {
      lines.length = maxLines;
      lines[maxLines - 1] = lines[maxLines - 1].slice(0, Math.max(4, maxChars - 1)) + "…";
    }
    return lines;
  }

  function escXml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildNodeCardDataUri(node, pal, isSelected) {
    const W = node.isDynamicLeaf ? 248 : 302;
    const H = node.isDynamicLeaf ? 88 : 122;
    const col = plantColors(node.plant, pal);
    const pInfo = PLANT_MAP.get(node.plant);
    const isHorizontal = state.flowDir === "LR" && state.layoutEngine !== "floors";

    const cardBg = node.isBridge ? pal.bgElevated : pal.surface;
    const headerBg = node.isBridge ? pal.surfaceSoft : col.bg;
    const strokeCol = isSelected ? col.fg : (node.isBridge ? pal.borderStrong : col.fg);
    const strokeW = isSelected ? 3.5 : (node.roleType === "source" ? 2.6 : 1.8);
    const dashAttr = node.isBridge ? 'stroke-dasharray="7,4"' : "";

    const roleBanner = node.isBridge
      ? `↪ PONTE · ${pInfo ? pInfo.shortName.toUpperCase() : ""}`
      : (node.roleLabel || "COMPONENTE");

    const cleanTitle = node.label
      .replace(/\s*\([^)]*\)\s*$/, "")
      .trim();
    const titleLines = wrapTextLines(cleanTitle, node.isDynamicLeaf ? 28 : 32, 1);
    const funcLines = wrapTextLines(node.shortFunc || node.desc || "", node.isDynamicLeaf ? 33 : 41, node.isDynamicLeaf ? 2 : 2);

    const incs = INC_BY_NODE.get(node.id) || [];
    const circCount = (node.circuits || []).length;
    const rightTag = circCount > 0
      ? (state.explodedIds.has(node.id) ? `−${circCount} linee` : `+${circCount} linee`)
      : node.code;

    // Input / Output visual port badges so it's unmistakable where power/signals ENTER and EXIT!
    let portsSvg = "";
    if (!isHorizontal) {
      if (node.visIn > 0) {
        portsSvg += `
          <rect x="${W / 2 - 34}" y="0" width="68" height="14" rx="5" fill="${pal.link}" />
          <text x="${W / 2}" y="10" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="${pal.surface}">⬇ ENTRA (${node.visIn})</text>
        `;
      } else if (node.roleType === "source") {
        portsSvg += `
          <rect x="${W / 2 - 48}" y="0" width="96" height="14" rx="5" fill="${pal.success}" />
          <text x="${W / 2}" y="10" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="${pal.surface}">★ ORIGINE FLUSSO</text>
        `;
      }
      if (node.visOut > 0) {
        portsSvg += `
          <rect x="${W / 2 - 32}" y="${H - 14}" width="64" height="14" rx="5" fill="${col.fg}" />
          <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="${pal.surface}">ESCE (${node.visOut}) ⬇</text>
        `;
      }
    } else {
      if (node.visIn > 0) {
        portsSvg += `<circle cx="5" cy="${H / 2}" r="5" fill="${pal.link}" />`;
      }
      if (node.visOut > 0) {
        portsSvg += `<circle cx="${W - 5}" cy="${H / 2}" r="5" fill="${col.fg}" />`;
      }
    }

    const warnDot = incs.length > 0
      ? `<rect x="${W - 44}" y="18" width="34" height="16" rx="5" fill="${pal.warning}" /><text x="${W - 27}" y="29" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" font-weight="700" fill="${pal.text}">⚠ ${incs.length}</text>`
      : "";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <!-- Main Card Body -->
      <rect x="4" y="7" width="${W - 8}" height="${H - 14}" rx="11" fill="${cardBg}" stroke="${strokeCol}" stroke-width="${strokeW}" ${dashAttr} />
      <!-- Header Band -->
      <path d="M5,18 Q5,8 15,8 L${W - 15},8 Q${W - 5},8 ${W - 5},18 L${W - 5},37 L5,37 Z" fill="${headerBg}" />
      <line x1="5" y1="37" x2="${W - 5}" y2="37" stroke="${pal.border}" stroke-width="1" />

      <!-- Role Label & Right Code/Circuits Tag -->
      <text x="13" y="27" font-family="Segoe UI, sans-serif" font-size="9.8" font-weight="700" fill="${col.fg}">${escXml(roleBanner.slice(0, 27))}</text>
      ${incs.length === 0 ? `<text x="${W - 13}" y="27" text-anchor="end" font-family="Consolas, monospace" font-size="9.5" font-weight="700" fill="${pal.textMuted}">${escXml(rightTag.slice(0, 12))}</text>` : warnDot}

      <!-- Block Title -->
      <text x="13" y="56" font-family="Segoe UI, sans-serif" font-size="${node.isDynamicLeaf ? "11.5" : "12.8"}" font-weight="700" fill="${pal.text}">${escXml(titleLines[0] || node.code)}</text>

      <!-- Plain-Language Function Lines -->
      ${funcLines.map((ln, idx) => `
        <text x="13" y="${(node.isDynamicLeaf ? 72 : 75) + idx * 14}" font-family="Segoe UI, sans-serif" font-size="10.4" fill="${pal.textMuted}">${escXml(ln)}</text>
      `).join("")}

      ${portsSvg}
    </svg>`;

    return {
      uri: "data:image/svg+xml;utf8," + encodeURIComponent(svg),
      w: W,
      h: H
    };
  }

  // ==================== DYNAMIC LAYOUT CONFIGURATIONS ====================
  function buildLayoutOptions(nodes, edges, animateTransition) {
    const anim = Boolean(animateTransition);
    const dir = state.flowDir;

    if (state.layoutEngine === "elk") {
      return {
        name: "elk",
        animate: anim,
        animationDuration: anim ? 520 : 0,
        animationEasing: "ease-out-cubic",
        fit: true,
        padding: 46,
        nodeDimensionsIncludeLabels: false,
        elk: {
          "algorithm": "layered",
          "elk.direction": dir === "LR" ? "RIGHT" : "DOWN",
          "elk.spacing.nodeNode": "55",
          "elk.layered.spacing.nodeNodeBetweenLayers": "95",
          "elk.layered.spacing.edgeNodeBetweenLayers": "42",
          "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
          "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
          "elk.edgeRouting": "SPLINES"
        }
      };
    }

    if (state.layoutEngine === "cola") {
      return {
        name: "cola",
        animate: true,
        refresh: 1,
        maxSimulationTime: 2600,
        ungrabifyWhileSimulating: false,
        fit: true,
        padding: 50,
        nodeSpacing: 46,
        edgeLength: 330,
        avoidOverlap: true,
        handleDisconnected: true,
        flow: {
          axis: dir === "LR" ? "x" : "y",
          minSeparation: dir === "LR" ? 370 : 195
        }
      };
    }

    if (state.layoutEngine === "fcose") {
      // Build directional relativePlacementConstraint from power/fire edges (avoiding cycles!)
      const constraints = [];
      const seenPair = new Set();
      edges.forEach((e) => {
        if (e.edgeType === "emergency_trip") return; // skip feedback edges so constraints stay DAG
        const key = `${e.source}->${e.target}`;
        const rev = `${e.target}->${e.source}`;
        if (seenPair.has(key) || seenPair.has(rev)) return;
        seenPair.add(key);
        if (dir === "LR") constraints.push({ left: e.source, right: e.target, gap: 220 });
        else constraints.push({ top: e.source, bottom: e.target, gap: 135 });
      });

      return {
        name: "fcose",
        quality: "proof",
        randomize: true,
        animate: anim,
        animationDuration: anim ? 560 : 0,
        fit: true,
        padding: 50,
        nodeSeparation: 120,
        idealEdgeLength: 195,
        nodeRepulsion: 18000,
        gravity: 0.22,
        relativePlacementConstraint: constraints.slice(0, 26)
      };
    }

    if (state.layoutEngine === "floors") {
      // Compute clean non-overlapping positions per architectural floor (-2 -> Copertura)
      const bandH = 185;
      const byFloor = new Map();
      DATA.floors.forEach((f) => byFloor.set(f.id, []));
      nodes.forEach((n) => {
        const fid = byFloor.has(n.floor) ? n.floor : "F_TERRA";
        byFloor.get(fid).push(n);
      });
      const posObj = {};
      let rankRow = 0;
      DATA.floors.forEach((fl) => {
        const row = byFloor.get(fl.id) || [];
        if (!row.length) return;
        row.sort((a, b) => (a.colHint ?? 2.5) - (b.colHint ?? 2.5));
        const stepX = 338;
        const totW = (row.length - 1) * stepX;
        row.forEach((n, idx) => {
          posObj[n.id] = {
            x: -totW / 2 + idx * stepX,
            y: rankRow * bandH
          };
        });
        rankRow += 1;
      });

      return {
        name: "preset",
        positions: posObj,
        animate: anim,
        animationDuration: anim ? 520 : 0,
        animationEasing: "ease-out-cubic",
        fit: true,
        padding: 54
      };
    }

    // Default fallback: Dagre
    return {
      name: "dagre",
      rankDir: dir,
      nodeSep: 54,
      rankSep: dir === "LR" ? 130 : 100,
      animate: anim,
      animationDuration: anim ? 480 : 0,
      fit: true,
      padding: 48
    };
  }

  // ==================== RENDER CYTOSCAPE GRAPH ====================
  function renderCytoscape(animateRelayout = false) {
    const container = document.getElementById("cyCanvas");
    const pal = getPalette();
    const { nodes, edges } = computePlantGraph();

    document.getElementById("btnResetExploded").style.display = state.explodedIds.size > 0 ? "inline-flex" : "none";

    // Ensure selectedNodeId is visible in current plant; otherwise pick its main entry source!
    if (!nodes.some((n) => n.id === state.selectedNodeId)) {
      const srcNode = nodes.find((n) => !n.isBridge && n.roleType === "source") || nodes.find((n) => !n.isBridge) || nodes[0];
      if (srcNode) state.selectedNodeId = srcNode.id;
    }

    const elements = [];

    // If Floor mode is active, add subtle Floor Band parent containers!
    if (state.layoutEngine === "floors") {
      const usedFloors = new Set(nodes.map((n) => n.floor));
      DATA.floors.forEach((fl) => {
        if (!usedFloors.has(fl.id)) return;
        elements.push({
          data: {
            id: "FLGRP_" + fl.id,
            label: `${fl.name.toUpperCase()}  (${fl.elev})`,
            isFloorBand: true,
            bandBg: fl.order % 2 === 0 ? pal.surface : pal.bgElevated,
            bandBorder: pal.borderStrong
          }
        });
      });
    }

    nodes.forEach((n) => {
      const card = buildNodeCardDataUri(n, pal, n.id === state.selectedNodeId);
      elements.push({
        data: {
          id: n.id,
          parent: state.layoutEngine === "floors" ? "FLGRP_" + n.floor : undefined,
          cardUri: card.uri,
          nodeW: card.w,
          nodeH: card.h,
          isBridge: Boolean(n.isBridge),
          plantId: n.plant
        }
      });
    });

    edges.forEach((e) => {
      let color = plantColors(e.plant, pal).fg;
      let lineStyle = "solid";
      let width = 3.0;
      let arrowShape = "triangle";

      if (e.edgeType === "fire_resistant") {
        color = pal.danger;
        width = 3.4;
      } else if (e.edgeType === "emergency_trip") {
        color = pal.danger;
        lineStyle = "dashed";
        width = 2.6;
        arrowShape = "tee";
      } else if (e.edgeType === "bms_bus" || e.edgeType === "tlc_signal") {
        color = pal.link;
        lineStyle = "dashed";
        width = 2.4;
      } else if (e.edgeType === "earth_pe") {
        color = pal.borderStrong;
        lineStyle = "dashed";
        width = 2.2;
      } else if (e.edgeType === "power_fv") {
        color = pal.warning;
        width = 3.6;
      }

      elements.push({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: `${e.flowCategory}: ${e.label}`,
          color,
          lineStyle,
          width,
          arrowShape,
          edgeType: e.edgeType
        }
      });
    });

    if (state.activeLayoutHandle && typeof state.activeLayoutHandle.stop === "function") {
      try { state.activeLayoutHandle.stop(); } catch (_) { /* ignore */ }
    }
    if (cyInstance) {
      cyInstance.destroy();
      cyInstance = null;
    }

    cyInstance = cytoscape({
      container,
      elements,
      wheelSensitivity: 0.24,
      minZoom: 0.2,
      maxZoom: 2.4,
      style: [
        {
          selector: "node[!isFloorBand]",
          style: {
            "shape": "round-rectangle",
            "width": "data(nodeW)",
            "height": "data(nodeH)",
            "background-opacity": 0,
            "border-width": 0,
            "background-image": "data(cardUri)",
            "background-fit": "contain",
            "background-clip": "none",
            "bounds-expansion": 6
          }
        },
        {
          selector: "node[?isFloorBand]",
          style: {
            "shape": "round-rectangle",
            "background-color": "data(bandBg)",
            "background-opacity": 0.65,
            "border-color": "data(bandBorder)",
            "border-width": 1.6,
            "border-style": "dashed",
            "label": "data(label)",
            "color": pal.text,
            "font-family": '"Segoe UI", Aptos, sans-serif',
            "font-size": 12.5,
            "font-weight": 700,
            "text-valign": "top",
            "text-halign": "left",
            "text-margin-x": 14,
            "text-margin-y": -6,
            "padding": "26px"
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "control-point-step-size": 52,
            "width": "data(width)",
            "line-color": "data(color)",
            "line-style": "data(lineStyle)",
            "line-dash-pattern": [8, 5],
            "target-arrow-color": "data(color)",
            "target-arrow-shape": "data(arrowShape)",
            "arrow-scale": 1.25,
            "label": "data(label)",
            "font-family": '"Segoe UI", Aptos, sans-serif',
            "font-size": 10.5,
            "font-weight": 600,
            "color": pal.text,
            "text-background-color": pal.surface,
            "text-background-opacity": 0.92,
            "text-background-shape": "roundrectangle",
            "text-background-padding": "3px",
            "text-border-color": pal.border,
            "text-border-width": 1,
            "text-border-opacity": 0.9,
            "text-rotation": "autorotate"
          }
        },
        {
          selector: ".dimmed",
          style: {
            "opacity": 0.22
          }
        },
        {
          selector: "edge.flow-highlight",
          style: {
            "width": 4.5,
            "z-index": 20
          }
        }
      ],
      layout: { name: "grid" }
    });

    const layoutOpts = buildLayoutOptions(nodes, edges, animateRelayout);
    state.activeLayoutHandle = cyInstance.layout(layoutOpts);
    state.activeLayoutHandle.run();

    // Interactions: Click, Hover X-Ray Flow, Double-Click Bridge/Explode
    let lastTapTime = 0;
    let lastTapId = null;

    cyInstance.on("tap", "node[!isFloorBand]", (evt) => {
      const n = evt.target;
      const nid = n.id();
      const now = Date.now();
      const isDouble = lastTapId === nid && (now - lastTapTime) < 350;
      lastTapTime = now;
      lastTapId = nid;

      if (isDouble) {
        if (n.data("isBridge")) {
          // Jump seamlessly to the connected plant!
          state.activePlant = n.data("plantId");
          state.selectedNodeId = nid;
          refreshAll();
          return;
        }
        const baseN = NODE_MAP.get(nid);
        if (baseN && baseN.circuits && baseN.circuits.length > 0) {
          toggleExplodeBoard(nid);
          return;
        }
      }

      selectNode(nid, false);
      if (state.isFullscreen) {
        document.getElementById("inspector").classList.remove("closed-in-fs");
      }
    });

    cyInstance.on("mouseover", "node[!isFloorBand]", (evt) => {
      state.hoveredNodeId = evt.target.id();
      container.style.cursor = "pointer";
      applyFlowXRay(state.hoveredNodeId);
    });

    cyInstance.on("mouseout", "node[!isFloorBand]", () => {
      state.hoveredNodeId = null;
      container.style.cursor = "default";
      clearFlowXRay();
    });

    cyInstance.on("tap", (evt) => {
      if (evt.target === cyInstance) {
        clearFlowXRay();
        if (state.isFullscreen) {
          document.getElementById("inspector").classList.add("closed-in-fs");
        }
      }
    });

    resizeFlowCanvas();
  }

  function refreshSelectedCardGraphics() {
    if (!cyInstance) return;
    const pal = getPalette();
    const { nodes } = computePlantGraph();
    nodes.forEach((n) => {
      const cyNode = cyInstance.getElementById(n.id);
      if (cyNode && cyNode.length) {
        const card = buildNodeCardDataUri(n, pal, n.id === state.selectedNodeId);
        cyNode.data("cardUri", card.uri);
      }
    });
  }

  function applyFlowXRay(focusId) {
    if (!cyInstance || !focusId) return;
    const node = cyInstance.getElementById(focusId);
    if (!node || !node.length) return;
    const neighborhood = node.neighborhood().union(node);
    const parents = neighborhood.parents();
    cyInstance.elements().removeClass("dimmed flow-highlight");
    cyInstance.elements().not(neighborhood.union(parents)).addClass("dimmed");
    node.connectedEdges().addClass("flow-highlight");
  }

  function clearFlowXRay() {
    if (!cyInstance) return;
    cyInstance.elements().removeClass("dimmed flow-highlight");
  }

  function triggerAnimatedReLayout() {
    if (!cyInstance) return;
    if (state.layoutEngine === "floors") {
      // Re-render to include floor compound bands cleanly
      renderCytoscape(true);
      return;
    }
    // If switching away from floors where compound parents existed, rebuild cleanly
    if (cyInstance.nodes("[?isFloorBand]").length > 0) {
      renderCytoscape(true);
      return;
    }
    const { nodes, edges } = computePlantGraph();
    if (state.activeLayoutHandle && typeof state.activeLayoutHandle.stop === "function") {
      try { state.activeLayoutHandle.stop(); } catch (_) { /* ignore */ }
    }
    state.activeLayoutHandle = cyInstance.layout(buildLayoutOptions(nodes, edges, true));
    state.activeLayoutHandle.run();
  }

  // ==================== 60 FPS ANIMATED WIRE FLOW PARTICLES ====================
  function resizeFlowCanvas() {
    const canvas = document.getElementById("flowCanvas");
    const wrap = canvas.parentElement;
    if (!wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
  }

  // Sample exact point & tangent at parameter t in [0,1] along a Cytoscape edge
  function sampleEdgePoint(edge, t, zoom, pan) {
    const s = edge.renderedSourceEndpoint();
    const d = edge.renderedTargetEndpoint();
    if (!s || !d || Number.isNaN(s.x) || Number.isNaN(d.x)) return null;

    const cps = edge.controlPoints();
    if (cps && cps.length === 1) {
      // Quadratic Bezier
      const cx = cps[0].x * zoom + pan.x;
      const cy = cps[0].y * zoom + pan.y;
      const mt = 1 - t;
      const x = mt * mt * s.x + 2 * mt * t * cx + t * t * d.x;
      const y = mt * mt * s.y + 2 * mt * t * cy + t * t * d.y;
      return { x, y };
    }
    if (cps && cps.length >= 2) {
      // Approximate polyline / multi-bezier smoothly via midpoint control
      const cx = cps[0].x * zoom + pan.x;
      const cy = cps[0].y * zoom + pan.y;
      const mt = 1 - t;
      return {
        x: mt * mt * s.x + 2 * mt * t * cx + t * t * d.x,
        y: mt * mt * s.y + 2 * mt * t * cy + t * t * d.y
      };
    }

    const sps = edge.segmentPoints();
    if (sps && sps.length > 0) {
      const pts = [s, ...sps.map((p) => ({ x: p.x * zoom + pan.x, y: p.y * zoom + pan.y })), d];
      let totalLen = 0;
      const segs = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
        segs.push(len);
        totalLen += len;
      }
      if (totalLen < 1) return s;
      let targetDist = t * totalLen;
      for (let i = 0; i < segs.length; i++) {
        if (targetDist <= segs[i] || i === segs.length - 1) {
          const frac = segs[i] > 0 ? targetDist / segs[i] : 0;
          return {
            x: pts[i].x + (pts[i + 1].x - pts[i].x) * frac,
            y: pts[i].y + (pts[i + 1].y - pts[i].y) * frac
          };
        }
        targetDist -= segs[i];
      }
    }

    // Straight line
    return {
      x: s.x + (d.x - s.x) * t,
      y: s.y + (d.y - s.y) * t
    };
  }

  function startFlowAnimationLoop() {
    if (rafId) cancelAnimationFrame(rafId);

    const drawFrame = (timestamp) => {
      const canvas = document.getElementById("flowCanvas");
      if (!canvas) return;
      resizeFlowCanvas();
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      if (state.animateFlows && cyInstance) {
        const zoom = cyInstance.zoom();
        const pan = cyInstance.pan();
        const focusId = state.hoveredNodeId;

        cyInstance.edges(":visible").forEach((edge, idx) => {
          if (edge.hasClass("dimmed")) return;

          const s = edge.renderedSourceEndpoint();
          const d = edge.renderedTargetEndpoint();
          if (!s || !d) return;
          const dist = Math.hypot(d.x - s.x, d.y - s.y);
          if (dist < 18) return;

          const eType = edge.data("edgeType");
          const col = edge.data("color");
          const isHighlighted = focusId && (edge.source().id() === focusId || edge.target().id() === focusId);

          // Speed & particle count tuned by flow nature (fast data packets vs steady energy droplets)
          const isSignalOrTrip = eType === "bms_bus" || eType === "tlc_signal" || eType === "emergency_trip";
          const speed = (isSignalOrTrip ? 0.00044 : 0.00028) * (isHighlighted ? 1.35 : 1.0);
          const count = Math.max(2, Math.min(5, Math.round(dist / 130)));
          const baseRadius = (isSignalOrTrip ? 3.4 : 4.4) * Math.min(1.25, Math.max(0.72, zoom));
          const phaseShift = (idx * 0.19) % 1;

          for (let k = 0; k < count; k++) {
            const t = ((timestamp * speed) + phaseShift + k / count) % 1;
            const pt = sampleEdgePoint(edge, t, zoom, pan);
            if (!pt) continue;

            // Subtle trailing tail behind droplet to accentuate direction of travel!
            const tTail = Math.max(0, t - 0.035);
            const ptTail = sampleEdgePoint(edge, tTail, zoom, pan);
            if (ptTail) {
              ctx.beginPath();
              ctx.moveTo(ptTail.x, ptTail.y);
              ctx.lineTo(pt.x, pt.y);
              ctx.strokeStyle = toRgba(col, 0.55);
              ctx.lineWidth = baseRadius * 1.45;
              ctx.lineCap = "round";
              ctx.stroke();
            }

            // Outer soft halo
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, baseRadius * 1.75, 0, Math.PI * 2);
            ctx.fillStyle = toRgba(col, 0.24);
            ctx.fill();

            // Crisp moving core droplet
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, baseRadius, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.fill();
          }
        });
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);
  }

  // ==================== PLANT STRIP & 3-STEP HOW-IT-WORKS BANNER ====================
  function renderPlantStripAndBanner() {
    const strip = document.getElementById("plantStrip");
    const fsSelect = document.getElementById("fsPlantSelect");

    strip.innerHTML = DATA.plants.map((p) => {
      const isAct = p.id === state.activePlant;
      const cVar = `var(--plant-${p.swatch})`;
      const bgVar = `var(--plant-${p.swatch}-bg)`;
      return `
        <button class="plant-pill ${isAct ? "active" : ""}" data-plant="${p.id}"
          style="${isAct ? `border-color:${cVar}; background:${bgVar};` : ""}">
          <span style="color:${cVar}; display:inline-flex;">${getPlantIconSvg(p.icon, "currentColor")}</span>
          <span>${p.name}</span>
        </button>
      `;
    }).join("");

    strip.querySelectorAll(".plant-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activePlant = btn.dataset.plant;
        state.explodedIds.clear();
        refreshAll();
      });
    });

    fsSelect.innerHTML = DATA.plants.map((p) =>
      `<option value="${p.id}" ${p.id === state.activePlant ? "selected" : ""}>${p.name} (${p.shortName})</option>`
    ).join("");

    const activeP = PLANT_MAP.get(state.activePlant) || DATA.plants[0];
    const fg = activeP.flowGuide || {};
    const cVar = `var(--plant-${activeP.swatch})`;

    document.getElementById("howBanner").innerHTML = `
      <div class="how-step">
        <div class="how-step-k" style="color:var(--cp-success);">1 · 📥 Da dove entra (Origine)</div>
        <div>${fg.in || "-"}</div>
      </div>
      <div class="how-step">
        <div class="how-step-k" style="color:${cVar};">2 · 🛡️ Come viene gestito e protetto</div>
        <div>${fg.process || "-"}</div>
      </div>
      <div class="how-step">
        <div class="how-step-k" style="color:var(--cp-link);">3 · 📤 Dove esce e cosa fa funzionare</div>
        <div>${fg.out || "-"}</div>
      </div>
      <div style="text-align:right;">
        <span class="pill" style="color:${cVar}; background:var(--plant-${activeP.swatch}-bg);">${activeP.power}</span>
      </div>
    `;
  }

  // ==================== RIGHT PANEL: CLEAR BLOCK EXPLANATION + DRILL-DOWN ====================
  function renderInspector() {
    const node = findNodeAny(state.selectedNodeId);
    if (!node) return;

    const p = PLANT_MAP.get(node.plant) || DATA.plants[0];
    const fl = FLOOR_MAP.get(node.floor) || { name: node.floor, elev: "" };
    const cVar = `var(--plant-${p.swatch})`;
    const isBridgeFromOther = node.plant !== state.activePlant;

    const canExplode = NODE_MAP.has(node.id) && node.circuits && node.circuits.length > 0;
    const isExploded = state.explodedIds.has(node.id);

    document.getElementById("inspHeader").innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <span class="pill" style="color:${cVar}; background:var(--plant-${p.swatch}-bg);">
          ${getPlantIconSvg(p.icon, "currentColor")}
          <span>${node.roleLabel || p.shortName}</span>
        </span>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="mono" style="font-size:11px; color:var(--cp-text-muted);">${fl.short || fl.name}</span>
          <button id="btnCloseInspMobile" class="btn fs-only" style="padding:2px 7px; font-size:11px;">✕</button>
        </div>
      </div>
      <h3 class="insp-title">${node.label}</h3>
      <div class="mono" style="font-size:11.5px; color:var(--cp-text-muted);">Sigla: <strong>${node.code}</strong> · Ubicazione: ${fl.name}</div>

      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:9px;">
        ${isBridgeFromOther ? `
          <button id="btnJumpBridgePlant" class="btn btn-primary" style="font-size:12px;">
            ↪ Passa all'impianto "${p.shortName}" →
          </button>
        ` : ""}
        ${canExplode ? `
          <button id="btnInspExplode" class="btn ${isExploded ? "" : "btn-primary"}" style="font-size:12px;">
            ${isExploded ? "− Richiudi Linee sul Grafo" : `＋ Mostra le ${node.circuits.length} Linee sul Grafo`}
          </button>
        ` : ""}
        ${node.parentBoardId ? `
          <button id="btnInspParent" class="btn" style="font-size:12px;">↑ Torna al Quadro</button>
        ` : ""}
      </div>
    `;

    const btnCloseFs = document.getElementById("btnCloseInspMobile");
    if (btnCloseFs) btnCloseFs.addEventListener("click", () => document.getElementById("inspector").classList.add("closed-in-fs"));
    const btnJump = document.getElementById("btnJumpBridgePlant");
    if (btnJump) btnJump.addEventListener("click", () => {
      state.activePlant = node.plant;
      refreshAll();
    });
    const btnExp = document.getElementById("btnInspExplode");
    if (btnExp) btnExp.addEventListener("click", () => toggleExplodeBoard(node.id));
    const btnPar = document.getElementById("btnInspParent");
    if (btnPar) btnPar.addEventListener("click", () => selectNode(node.parentBoardId, true));

    // Compute ALL incoming and outgoing edges across the entire verified plant model!
    const incoming = DATA.edges.filter((e) => e.target === node.id && e.edgeType !== "doc_trace");
    const outgoing = DATA.edges.filter((e) => e.source === node.id && e.edgeType !== "doc_trace");
    const dsList = (node.datasheetIds || []).map((id) => DS_MAP.get(id)).filter(Boolean);
    const incs = INC_BY_NODE.get(node.id) || [];

    const renderIoCard = (edge, otherId, dirPrefix) => {
      const other = NODE_MAP.get(otherId);
      if (!other) return "";
      const op = PLANT_MAP.get(other.plant);
      const crossTag = other.plant !== node.plant ? `<span class="pill" style="font-size:10px; color:var(--plant-${op.swatch});">🔗 ${op.shortName}</span>` : "";
      return `
        <div class="io-card" data-goto="${other.id}">
          <div>
            <div><strong>${dirPrefix} ${other.label}</strong> <span class="mono" style="font-size:11px; color:var(--cp-text-muted);">(${other.code})</span></div>
            <div style="font-size:11.5px; color:var(--cp-text-muted); margin-top:1px;">${edge.flowCategory}: <strong class="mono">${edge.label}</strong></div>
          </div>
          ${crossTag}
        </div>
      `;
    };

    const body = document.getElementById("inspBody");
    body.innerHTML = `
      <!-- 1. Clear Function Callout -->
      <div class="func-callout">
        <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:var(--cp-accent); margin-bottom:3px;">Funzione del Blocco</div>
        <div style="font-weight:700; font-size:13.5px; margin-bottom:5px;">${node.shortFunc || ""}</div>
        <div style="font-size:12.5px; color:var(--cp-text-muted);">${node.desc || ""}</div>
      </div>

      ${node.emergencyNote ? `
        <div class="emg-callout">
          <strong>🚒 Comportamento in Emergenza / Blackout:</strong><br/>
          ${node.emergencyNote}
        </div>
      ` : ""}

      <!-- 2. Explicit Inputs (ENTRA DA) & Outputs (ESCE VERSO) -->
      <div class="io-section">
        <h4 class="io-hdr" style="color:var(--cp-link);">📥 Da dove entra energia / segnale (${incoming.length})</h4>
        ${incoming.length
          ? incoming.map((e) => renderIoCard(e, e.source, "⬅ Riceve da:")).join("")
          : `<div style="font-size:12px; color:var(--cp-text-muted); padding:4px 2px;">★ Punto sorgente primario: alimentato direttamente dalla rete esterna o dai pannelli/antenne.</div>`
        }
      </div>

      <div class="io-section">
        <h4 class="io-hdr" style="color:var(--cp-accent);">📤 Dove esce / cosa alimenta o comanda (${outgoing.length})</h4>
        ${outgoing.length
          ? outgoing.map((e) => renderIoCard(e, e.target, "➡ Invia a:")).join("")
          : `<div style="font-size:12px; color:var(--cp-text-muted); padding:4px 2px;">🎯 Utilizzatore finale: trasforma l'energia ricevuta in servizio utile (luce, movimento, calore, sicurezza).</div>`
        }
      </div>

      <!-- 3. Progressive Technical Accordions (Zero content lost!) -->
      ${(node.circuits && node.circuits.length) ? `
        <details class="acc-block" open>
          <summary>
            <span>🔌 Partenze &amp; Circuiti Interni (${node.circuits.length})</span>
            <span class="mono" style="font-size:11px; color:var(--cp-accent);">Espandi/Chiudi ▾</span>
          </summary>
          <div class="acc-content" style="padding:0;">
            <table class="data-table">
              <thead><tr><th>Linea</th><th>Cosa Alimenta &amp; Cavo</th><th>Protezione</th></tr></thead>
              <tbody>
                ${node.circuits.map((c) => `
                  <tr>
                    <td><strong class="mono">${c.code}</strong></td>
                    <td>${c.desc}${c.cable ? `<div class="mono" style="font-size:10.5px; color:var(--cp-accent);">Cavo: ${c.cable}</div>` : ""}</td>
                    <td style="font-size:11px; color:var(--cp-text-muted);">${c.breaker || "-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </details>
      ` : ""}

      ${(dsList.length || (node.bom && node.bom.length)) ? `
        <details class="acc-block" ${(node.circuits && node.circuits.length) ? "" : "open"}>
          <summary>
            <span>📚 Componenti &amp; Schede Tecniche PDF (${dsList.length} PDF · ${(node.bom || []).length} BOM)</span>
            <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
          </summary>
          <div class="acc-content">
            ${dsList.map((d) => `
              <div style="border:1px solid var(--cp-border); border-radius:8px; padding:8px 10px; background:var(--cp-bg-elevated); margin-bottom:7px;">
                <div style="font-weight:700; font-size:12px;">${d.brand} — ${d.family}</div>
                <div style="font-size:11px; color:var(--cp-text-muted); margin:2px 0 6px;">${d.keySpecs}</div>
                <div style="display:flex; gap:6px;">
                  <button class="btn btn-primary" style="padding:3px 8px; font-size:11px;" data-open-pdf="${d.id}">📄 Apri Scheda PDF</button>
                  <a class="btn" style="padding:3px 8px; font-size:11px;" href="${d.vendorUrl}" target="_blank" rel="noopener">🌐 Sito</a>
                </div>
              </div>
            `).join("")}

            ${(node.bom && node.bom.length) ? `
              <table class="data-table" style="margin-top:6px;">
                <thead><tr><th>Sigla</th><th>Modello</th><th>Ruolo</th></tr></thead>
                <tbody>
                  ${node.bom.map((b) => `
                    <tr>
                      <td class="mono"><strong>${b.tag}</strong></td>
                      <td><strong>${b.brand}</strong> <span class="mono" style="font-size:10.5px;">${b.model}</span></td>
                      <td style="font-size:11px;">${b.desc}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            ` : ""}
          </div>
        </details>
      ` : ""}

      <details class="acc-block">
        <summary>
          <span>📐 Caratteristiche di Targa &amp; Riferimenti Documentali</span>
          <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
        </summary>
        <div class="acc-content">
          <div class="spec-grid" style="margin-bottom:10px;">
            ${Object.entries(node.specs || {}).map(([k, v]) => `
              <div class="spec-box"><div class="spec-k">${k}</div><div class="spec-v">${v}</div></div>
            `).join("")}
          </div>
          ${(node.docRefs || []).map((r) => `
            <div style="font-size:11.5px; padding:5px 0; border-top:1px dashed var(--cp-border);">
              <strong style="color:var(--cp-accent);">${r.suite} (${r.ref}):</strong> ${r.scope}
            </div>
          `).join("")}
        </div>
      </details>

      ${incs.length ? `
        <details class="acc-block" open>
          <summary style="color:var(--cp-danger);">
            <span>⚠️ Rilievi di Coerenza su questo Blocco (${incs.length})</span>
            <span class="mono" style="font-size:11px;">▾</span>
          </summary>
          <div class="acc-content">
            ${incs.map((inc) => `
              <div style="margin-bottom:8px; font-size:12px;">
                <div><strong>${inc.id} [${inc.severity.toUpperCase()}] — ${inc.title}</strong></div>
                <div style="color:var(--cp-text-muted); margin-top:2px;">${inc.finding}</div>
              </div>
            `).join("")}
          </div>
        </details>
      ` : ""}
    `;

    body.querySelectorAll("[data-goto]").forEach((card) => {
      card.addEventListener("click", () => {
        const tid = card.dataset.goto;
        const target = NODE_MAP.get(tid);
        if (!target) return;
        // If target isn't currently visible on canvas, switch to its plant
        const { nodes } = computePlantGraph();
        if (!nodes.some((x) => x.id === tid)) {
          state.activePlant = target.plant;
          state.selectedNodeId = tid;
          refreshAll();
        } else {
          selectNode(tid, true);
        }
      });
    });

    body.querySelectorAll("[data-open-pdf]").forEach((btn) => {
      btn.addEventListener("click", () => openSinglePdfModal(btn.dataset.openPdf));
    });
  }

  // ==================== ACTIONS, FULLSCREEN & MODALS ====================
  function selectNode(nodeId, centerInGraph) {
    state.selectedNodeId = nodeId;
    refreshSelectedCardGraphics();
    renderInspector();
    if (cyInstance) {
      applyFlowXRay(nodeId);
      if (centerInGraph) {
        const el = cyInstance.getElementById(nodeId);
        if (el && el.length) cyInstance.animate({ center: { eles: el }, duration: 300 });
      }
    }
  }

  function toggleExplodeBoard(boardId) {
    if (state.explodedIds.has(boardId)) state.explodedIds.delete(boardId);
    else state.explodedIds.add(boardId);
    renderCytoscape(true);
    renderInspector();
  }

  function setFullscreenState(enable) {
    state.isFullscreen = enable;
    const shell = document.getElementById("appShell");
    shell.classList.toggle("is-fullscreen", enable);
    if (enable) {
      document.getElementById("inspector").classList.add("closed-in-fs");
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setTimeout(() => {
      resizeFlowCanvas();
      if (cyInstance) {
        cyInstance.resize();
        cyInstance.fit(undefined, 54);
      }
    }, 80);
  }

  function openSinglePdfModal(dsId) {
    const d = DS_MAP.get(dsId);
    if (!d) return;
    document.getElementById("modalTitle").textContent = `${d.brand} — ${d.family}`;
    document.getElementById("modalSub").textContent = d.keySpecs;
    const vBtn = document.getElementById("modalVendorBtn");
    const nBtn = document.getElementById("modalNewTabBtn");
    vBtn.style.display = "inline-flex";
    vBtn.href = d.vendorUrl;
    nBtn.style.display = "inline-flex";
    nBtn.href = d.file;
    document.getElementById("modalBody").innerHTML = `<iframe src="${d.file}#view=FitH" title="${d.family}"></iframe>`;
    document.getElementById("appModal").classList.add("open");
  }

  function openDatasheetsCatalogModal() {
    document.getElementById("modalTitle").textContent = `Libreria Schede Tecniche Pubbliche dei Componenti (${DATA.datasheets.length} PDF)`;
    document.getElementById("modalSub").textContent = "Documentazione ufficiale dei costruttori scaricata localmente in assets/datasheets/";
    document.getElementById("modalVendorBtn").style.display = "none";
    document.getElementById("modalNewTabBtn").style.display = "none";

    document.getElementById("modalBody").innerHTML = `
      <div class="cards-grid">
        ${DATA.datasheets.map((d) => `
          <div class="ds-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="pill" style="color:var(--cp-accent); background:var(--cp-accent-soft);">${d.brand}</span>
              <span style="font-size:11px; color:var(--cp-text-muted);">${d.category}</span>
            </div>
            <h4 style="margin:0 0 6px; font-size:14px;">${d.family}</h4>
            <p style="margin:0 0 10px; font-size:12px; color:var(--cp-text-muted);">${d.keySpecs}</p>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-primary" style="flex:1; justify-content:center;" data-modal-pdf="${d.id}">📄 Leggi PDF</button>
              <a class="btn" href="${d.vendorUrl}" target="_blank" rel="noopener">🌐 Sito</a>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    document.getElementById("modalBody").querySelectorAll("[data-modal-pdf]").forEach((b) => {
      b.addEventListener("click", () => openSinglePdfModal(b.dataset.modalPdf));
    });
    document.getElementById("appModal").classList.add("open");
  }

  function openAuditModal() {
    document.getElementById("modalTitle").textContent = `Verifica di Coerenza Concettuale & Documentale (${DATA.inconsistencies.length} Rilievi)`;
    document.getElementById("modalSub").textContent = "Esito del controllo incrociato fra Relazione Tecnica, Schemi Unifilari, Planimetrie e Fascicoli Quadrista";
    document.getElementById("modalVendorBtn").style.display = "none";
    document.getElementById("modalNewTabBtn").style.display = "none";

    document.getElementById("modalBody").innerHTML = `
      <div style="padding: 18px 0;">
        ${DATA.inconsistencies.map((inc) => `
          <div class="audit-card sev-${inc.severity}">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
              <div>
                <strong class="mono" style="color:var(--cp-accent);">${inc.id}</strong> ·
                <span style="font-size:11.5px; font-weight:700; text-transform:uppercase;">Severità ${inc.severity}</span> ·
                <span style="font-size:12px; color:var(--cp-text-muted);">${inc.category}</span>
              </div>
              <button class="btn btn-primary" style="padding:4px 10px; font-size:11.5px;" data-audit-jump="${inc.id}">🎯 Vai al Blocco nel Grafo</button>
            </div>
            <h4 style="margin:4px 0 6px; font-size:14.5px;">${inc.title}</h4>
            <div style="font-size:12.5px; margin-bottom:5px;"><strong>Riscontro:</strong> ${inc.finding}</div>
            <div style="font-size:12px; color:var(--cp-text-muted);"><strong>Impatto pratico:</strong> ${inc.impact}</div>
          </div>
        `).join("")}
      </div>
    `;

    document.getElementById("modalBody").querySelectorAll("[data-audit-jump]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const inc = DATA.inconsistencies.find((x) => x.id === btn.dataset.auditJump);
        document.getElementById("appModal").classList.remove("open");
        if (inc && inc.affectedNodes && inc.affectedNodes.length) {
          const first = NODE_MAP.get(inc.affectedNodes[0]);
          if (first) {
            state.activePlant = first.plant;
            state.selectedNodeId = first.id;
            refreshAll();
            setTimeout(() => selectNode(first.id, true), 350);
          }
        }
      });
    });

    document.getElementById("appModal").classList.add("open");
  }

  // ==================== GLOBAL SEARCH ====================
  function setupSearch() {
    const input = document.getElementById("globalSearch");
    const dd = document.getElementById("searchDropdown");

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        dd.classList.remove("open");
        return;
      }

      const hits = [];
      DATA.nodes.forEach((n) => {
        if (n.nodeClass === "doc_reference") return;
        const hay = `${n.code} ${n.label} ${n.shortFunc || ""} ${n.desc}`.toLowerCase();
        if (hay.includes(q)) {
          hits.push({ kind: PLANT_MAP.get(n.plant).shortName, title: `${n.label} (${n.code})`, sub: n.shortFunc, nodeId: n.id });
        }
        (n.circuits || []).forEach((c) => {
          if (`${c.code} ${c.desc} ${c.breaker || ""}`.toLowerCase().includes(q)) {
            hits.push({ kind: `Circuito in ${n.code}`, title: `${c.code} — ${c.desc}`, sub: c.breaker || "", nodeId: n.id });
          }
        });
      });

      DATA.datasheets.forEach((d) => {
        if (`${d.brand} ${d.family} ${(d.models || []).join(" ")}`.toLowerCase().includes(q)) {
          hits.push({ kind: "Scheda PDF", title: `${d.brand} — ${d.family}`, sub: d.category, dsId: d.id });
        }
      });

      const top = hits.slice(0, 16);
      dd.innerHTML = top.length ? top.map((h, i) => `
        <div class="search-item" data-idx="${i}">
          <div style="display:flex; justify-content:space-between; gap:8px; font-weight:700; font-size:12.5px;">
            <span>${h.title}</span>
            <span class="mono" style="font-size:10.5px; color:var(--cp-accent);">${h.kind}</span>
          </div>
          <div style="font-size:11.5px; color:var(--cp-text-muted);">${h.sub || ""}</div>
        </div>
      `).join("") : `<div class="search-item" style="color:var(--cp-text-muted);">Nessun risultato per "${input.value}"</div>`;

      dd.querySelectorAll("[data-idx]").forEach((el) => {
        el.addEventListener("click", () => {
          const h = top[parseInt(el.dataset.idx, 10)];
          dd.classList.remove("open");
          if (h.dsId) {
            openSinglePdfModal(h.dsId);
          } else if (h.nodeId) {
            const target = NODE_MAP.get(h.nodeId);
            state.activePlant = target.plant;
            state.selectedNodeId = target.id;
            refreshAll();
            setTimeout(() => selectNode(target.id, true), 350);
          }
        });
      });
      dd.classList.add("open");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap")) dd.classList.remove("open");
    });
  }

  function refreshAll() {
    renderPlantStripAndBanner();
    renderCytoscape(false);
    renderInspector();
  }

  function init() {
    // Dynamic Layout Switcher
    document.querySelectorAll("[data-layout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.layoutEngine = btn.dataset.layout;
        document.querySelectorAll("[data-layout]").forEach((b) => b.classList.toggle("active", b === btn));
        document.getElementById("dirSwitcher").style.display = state.layoutEngine === "floors" ? "none" : "inline-flex";
        refreshSelectedCardGraphics();
        triggerAnimatedReLayout();
      });
    });

    // Flow Direction Switcher (Vertical vs Horizontal)
    document.querySelectorAll("[data-dir]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.flowDir = btn.dataset.dir;
        document.querySelectorAll("[data-dir]").forEach((b) => b.classList.toggle("active", b === btn));
        refreshSelectedCardGraphics();
        triggerAnimatedReLayout();
      });
    });

    document.getElementById("btnReLayout").addEventListener("click", () => triggerAnimatedReLayout());

    document.getElementById("btnToggleFlow").addEventListener("click", (e) => {
      state.animateFlows = !state.animateFlows;
      const b = e.currentTarget;
      b.textContent = state.animateFlows ? "⏸ Flussi Attivi" : "▶ Avvia Flussi";
      b.classList.toggle("btn-primary", state.animateFlows);
    });

    document.getElementById("chkBridges").addEventListener("change", (e) => {
      state.showBridges = e.target.checked;
      renderCytoscape(true);
    });

    document.getElementById("btnResetExploded").addEventListener("click", () => {
      state.explodedIds.clear();
      renderCytoscape(true);
      renderInspector();
    });

    document.getElementById("btnFit").addEventListener("click", () => {
      if (cyInstance) cyInstance.fit(undefined, 48);
    });

    document.getElementById("btnTogglePanel").addEventListener("click", () => {
      if (state.isFullscreen) {
        document.getElementById("inspector").classList.toggle("closed-in-fs");
      } else {
        document.getElementById("mainSplit").classList.toggle("panel-hidden");
        setTimeout(() => {
          resizeFlowCanvas();
          if (cyInstance) cyInstance.resize();
        }, 60);
      }
    });

    // Fullscreen buttons & keyboard shortcuts ('F' and 'Escape')
    document.getElementById("btnFullscreen").addEventListener("click", () => setFullscreenState(true));
    document.getElementById("btnExitFullscreen").addEventListener("click", () => setFullscreenState(false));
    document.getElementById("fsPlantSelect").addEventListener("change", (e) => {
      state.activePlant = e.target.value;
      state.explodedIds.clear();
      refreshAll();
    });

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && state.isFullscreen) {
        state.isFullscreen = false;
        document.getElementById("appShell").classList.remove("is-fullscreen");
        setTimeout(() => { resizeFlowCanvas(); if (cyInstance) cyInstance.resize(); }, 60);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        setFullscreenState(!state.isFullscreen);
      } else if (e.key === "Escape") {
        if (document.getElementById("appModal").classList.contains("open")) {
          document.getElementById("appModal").classList.remove("open");
        } else if (state.isFullscreen) {
          setFullscreenState(false);
        }
      }
    });

    // Header Modals & Theme
    document.getElementById("btnOpenDatasheets").addEventListener("click", openDatasheetsCatalogModal);
    document.getElementById("btnOpenAudit").addEventListener("click", openAuditModal);
    document.getElementById("btnCloseModal").addEventListener("click", () => {
      document.getElementById("appModal").classList.remove("open");
    });
    document.getElementById("appModal").addEventListener("click", (e) => {
      if (e.target.id === "appModal") document.getElementById("appModal").classList.remove("open");
    });

    document.getElementById("btnThemeToggle").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      renderCytoscape(false);
    });

    window.addEventListener("resize", () => {
      resizeFlowCanvas();
      if (cyInstance) cyInstance.resize();
    });

    setupSearch();
    refreshAll();
    startFlowAnimationLoop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
