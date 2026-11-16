/* global cytoscape, cytoscapeDagre, cytoscapeElk, cytoscapeCola, cytoscapeFcose */
(() => {
  "use strict";

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

  // Curated set of nodes for "0. Ingressi Energia, Locali Contatori & Quadri Generali" (pure top-level symmetry)
  const METERS_OVERVIEW_IDS = new Set([
    "RETE-DISTRIBUTORE",
    "POD-SSC", "POD-SCA", "POD-SCB", "POD-PDC",
    "CONTATORI-ALLOGGI-A", "CONTATORI-ALLOGGI-B",
    "RIP-250", "QEPA",
    "AVSSC", "QESSC",
    "AVSCA", "QESCA",
    "AVSCB", "QESCB",
    "AVPC", "QEPC", "GEN-FV-ROOF"
  ]);

  // Branches interrupted when Emergency / Shunt Trip Simulation is active
  const TRIPPED_SOURCES_IN_EMERGENCY = new Set([
    "Q6-BOX-SEC", "QELP", "AVSCA", "QESCA", "AVSCB", "QESCB", "AVPC", "QEPC", "GEN-FV-ROOF", "FV-TETTO-A", "FV-TETTO-B", "UPS-1-EI"
  ]);
  const TRIPPED_EDGE_IDS_IN_EMERGENCY = new Set([
    "e07", "e_q6_in", "e_box_p1", "e_box_p2", "e52", "e53", "e_f1", "e20", "e_fv_a", "e_fv_b"
  ]);

  const state = {
    activePlant: "IMP-INGRESSI", // Start on "0. Mappa Contatori, Ingressi & Alimentazione Box"
    drillBoardId: null,          // null = Plant Map | boardId = Level-2 Internal Switchboard Component Map!
    layoutEngine: "synoptic",    // 'synoptic' (ideal static map) | 'elk' | 'cola' | 'fcose' | 'dagre'
    flowDir: "TB",               // 'TB' | 'LR'
    groupBy: "room",             // Default to physical rooms so the 3 Meter Rooms & Garage Box jump out immediately!
    opState: "normal",           // 'normal' | 'emergency'
    animateFlows: true,
    showBridges: false,          // Strictly OFF by default! User can enable anytime.
    selectedNodeId: "RETE-DISTRIBUTORE",
    focusedNodeId: null,         // Click-only neighborhood highlight (NO hover dimming!)
    isFullscreen: false,
    livePhysics: true,           // Continuous elastic rebalancing while dragging blocks in graph modes!
    activeLayoutHandle: null,
    livePhysicsHandle: null
  };

  let cyInstance = null;
  let rafId = null;

  // Dedicated Non-Graph Synoptic Stage State (Pan, Zoom & Active SVG Flow Paths)
  const synView = {
    scale: 1,
    panX: 0,
    panY: 0,
    boardW: 1200,
    boardH: 800,
    animatedPaths: []
  };

  // ==================== DYNAMIC CSS PALETTE PROBE ====================
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
      accent: acc.fg,
      accentFg: acc.bg,
      swatches
    };
  }

  function plantColors(plantId, pal) {
    const p = PLANT_MAP.get(plantId) || DATA.plants[0];
    return pal.swatches[p.swatch] || pal.swatches.ssc;
  }

  // Canonical color & line styling strictly by type of energy / signal transferred (never by plant!)
  function resolveCarrierStyle(edgeType, interrupted, pal) {
    if (interrupted) {
      return {
        color: pal.borderStrong,
        cyLineStyle: "dotted",
        svgDash: "3 5",
        width: 2.0,
        arrowShape: "triangle"
      };
    }
    if (edgeType === "fire_resistant") {
      return {
        color: pal.warning,
        cyLineStyle: "solid",
        svgDash: "",
        width: 3.4,
        arrowShape: "triangle"
      };
    }
    if (edgeType === "emergency_trip") {
      return {
        color: pal.danger,
        cyLineStyle: "dashed",
        svgDash: "7 5",
        width: state.opState === "emergency" ? 3.3 : 2.1,
        arrowShape: "tee"
      };
    }
    if (edgeType === "bms_bus" || edgeType === "tlc_signal") {
      return {
        color: pal.link,
        cyLineStyle: "dashed",
        svgDash: "6 4",
        width: 2.4,
        arrowShape: "triangle"
      };
    }
    if (edgeType === "earth_pe") {
      return {
        color: state.opState === "emergency" ? pal.success : pal.borderStrong,
        cyLineStyle: "dashed",
        svgDash: "7 5",
        width: state.opState === "emergency" ? 3.3 : 2.0,
        arrowShape: "triangle"
      };
    }
    // All ordinary & solar AC electrical power (power_bt, power_fv) shares ONE unified electrical energy color!
    return {
      color: pal.accent,
      cyLineStyle: "solid",
      svgDash: "",
      width: 3.0,
      arrowShape: "triangle"
    };
  }

  // Semantic node accent color based on energy / signal role rather than building wing
  function resolveNodeCarrierColors(node, pal) {
    const nid = node.id || "";
    if (nid === "TERRA-RETE" || nid.endsWith("__PE") || nid.endsWith("__SPD") || node.plant === "IMP-GND") {
      return pal.swatches.gnd;
    }
    if (nid === "SGANCI-VVF" || nid === "IRA-CENTRALI" || nid.endsWith("__DER")) {
      return { fg: pal.danger, bg: pal.swatches.fire.bg };
    }
    if (node.roleType === "ups" || nid === "QEPA" || nid === "LD-POMPA-VVF" || nid === "FIRE-PORTONI-EI") {
      return pal.swatches.fire;
    }
    if (node.plant === "IMP-BMS" || node.plant === "IMP-TLC" || nid.endsWith("__M1")) {
      return pal.swatches.bms;
    }
    return pal.swatches.ssc; // Unified --cp-accent for electrical power!
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

  // ==================== BUILD GRAPH (LEVEL 1 PLANT MAP OR LEVEL 2 INTERNAL BOARD MAP) ====================
  function computeCurrentGraph() {
    // LEVEL 2: Internal Component Sub-Graph of a Specific Switchboard!
    if (state.drillBoardId) {
      const board = NODE_MAP.get(state.drillBoardId);
      if (board && board.internalGraph) {
        const subNodes = board.internalGraph.nodes.map((sn) => ({
          ...sn,
          plant: board.plant,
          floor: board.floor,
          roomGroup: board.roomGroup,
          safetyZone: board.safetyZone,
          roleGroup: sn.group || "Componenti Interni",
          parentBoardId: board.id,
          isInternalComp: true,
          isBridge: false
        }));
        const subEdges = board.internalGraph.edges.map((se) => ({
          ...se,
          plant: board.plant
        }));
        const inDeg = new Map();
        const outDeg = new Map();
        subEdges.forEach((e) => {
          outDeg.set(e.source, (outDeg.get(e.source) || 0) + 1);
          inDeg.set(e.target, (inDeg.get(e.target) || 0) + 1);
        });
        subNodes.forEach((n) => {
          n.visIn = inDeg.get(n.id) || 0;
          n.visOut = outDeg.get(n.id) || 0;
        });
        return { nodes: subNodes, edges: subEdges, isInternal: true, parentBoard: board };
      }
    }

    // LEVEL 1A: "0. Mappa Ingressi & Tutti i Contatori"
    const pid = state.activePlant;
    const nodes = [];
    const edges = [];
    const includedIds = new Set();

    if (pid === "IMP-INGRESSI") {
      DATA.nodes.forEach((n) => {
        if (METERS_OVERVIEW_IDS.has(n.id)) {
          nodes.push({ ...n, isBridge: false });
          includedIds.add(n.id);
        }
      });
      DATA.edges.forEach((e) => {
        if (e.edgeType === "doc_trace") return;
        if (includedIds.has(e.source) && includedIds.has(e.target)) {
          edges.push({ ...e });
        }
      });
    } else {
      // LEVEL 1B: Specific Plant (1..8) — Bridges strictly OFF by default unless state.showBridges === true!
      const plantOwnNodes = DATA.nodes.filter((n) => n.plant === pid && n.tier <= 2 && n.nodeClass !== "doc_reference");
      const ownSet = new Set(plantOwnNodes.map((n) => n.id));

      plantOwnNodes.forEach((n) => {
        nodes.push({ ...n, isBridge: false });
        includedIds.add(n.id);
      });

      DATA.edges.forEach((e) => {
        if (e.edgeType === "doc_trace") return;
        const srcNode = NODE_MAP.get(e.source);
        const tgtNode = NODE_MAP.get(e.target);
        if (!srcNode || !tgtNode) return;

        const sOwn = ownSet.has(e.source);
        const tOwn = ownSet.has(e.target);

        if (sOwn && tOwn) {
          edges.push({ ...e });
        } else if (state.showBridges && (sOwn || tOwn || e.plant === pid)) {
          [srcNode, tgtNode].forEach((endN) => {
            if (!includedIds.has(endN.id)) {
              nodes.push({ ...endN, isBridge: true });
              includedIds.add(endN.id);
            }
          });
          edges.push({ ...e });
        }
      });
    }

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

    return { nodes, edges, isInternal: false, parentBoard: null };
  }

  function findNodeAny(id) {
    if (NODE_MAP.has(id)) return NODE_MAP.get(id);
    const { nodes } = computeCurrentGraph();
    return nodes.find((n) => n.id === id) || DATA.nodes[0];
  }

  // ==================== FLEXIBLE GROUPING RESOLVER (NOT LOCKED VERTICALLY!) ====================
  function resolveNodeGroup(node, isInternal) {
    if (state.layoutEngine === "synoptic") {
      if (isInternal) {
        return { id: "IGRP_" + node.roleGroup, label: node.roleGroup };
      }
      const rm = node.roomGroup || "Locali Tecnici";
      return { id: "GRP_RM_" + rm, label: `📍 ${rm}` };
    }
    if (isInternal) {
      if (state.groupBy === "none") return null;
      return { id: "IGRP_" + node.roleGroup, label: node.roleGroup };
    }
    if (state.groupBy === "none") return null;
    if (state.groupBy === "floor") {
      const fl = FLOOR_MAP.get(node.floor) || { id: node.floor, name: node.floor, elev: "" };
      return { id: "GRP_FL_" + fl.id, label: `🏢 ${fl.name} (${fl.elev})` };
    }
    if (state.groupBy === "room") {
      const rm = node.roomGroup || "Locali Tecnici";
      return { id: "GRP_RM_" + rm, label: `📍 ${rm}` };
    }
    if (state.groupBy === "role") {
      const rl = node.roleGroup || "2 · Quadri";
      return { id: "GRP_RL_" + rl, label: `⚙️ ${rl}` };
    }
    if (state.groupBy === "safety") {
      const sf = node.safetyZone || "Servizi Ordinari";
      return { id: "GRP_SF_" + sf, label: `🔥 ${sf}` };
    }
    return null;
  }

  // ==================== SVG FUNCTIONAL BLOCK CARD GENERATOR ====================
  function wrapTextLines(text, maxChars, maxLines) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = "";
    for (const w of words) {
      const cand = cur ? `${cur} ${w}` : w;
      if (cand.length <= maxChars) cur = cand;
      else {
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
    const W = node.isInternalComp ? 266 : 304;
    const H = node.isInternalComp ? 102 : 124;
    const col = resolveNodeCarrierColors(node, pal);
    const pInfo = PLANT_MAP.get(node.plant);
    const isHorizontal = state.flowDir === "LR";

    const cardBg = node.isBridge ? pal.bgElevated : pal.surface;
    const headerBg = node.isBridge ? pal.surfaceSoft : col.bg;
    const strokeCol = isSelected ? col.fg : (node.isBridge ? pal.borderStrong : col.fg);
    const strokeW = isSelected ? 3.6 : (node.roleType === "source" ? 2.6 : 1.9);
    const dashAttr = node.isBridge ? 'stroke-dasharray="7,4"' : "";

    const roleBanner = node.isBridge
      ? `↪ PONTE · ${pInfo ? pInfo.shortName.toUpperCase() : ""}`
      : (node.roleLabel || "COMPONENTE");

    const cleanTitle = node.label.replace(/\s*\([^)]*\)\s*$/, "").trim();
    const titleLines = wrapTextLines(cleanTitle, node.isInternalComp ? 30 : 32, 1);
    const funcLines = wrapTextLines(node.shortFunc || node.desc || "", node.isInternalComp ? 36 : 41, 2);

    const incs = INC_BY_NODE.get(node.id) || [];
    const hasInternal = Boolean(node.internalGraph);
    const rightTag = hasInternal ? `🔬 Quadro` : node.code;

    const isEarthSink = node.id === "TERRA-RETE" || (node.code && node.code.includes("TERRA PE"));

    let portsSvg = "";
    if (!isHorizontal) {
      if (node.visIn > 0) {
        const inLabel = isEarthSink ? `⬇ RICEVE SCARICA (${node.visIn})` : `⬇ ENTRA (${node.visIn})`;
        const pillW = isEarthSink ? 116 : 68;
        portsSvg += `
          <rect x="${W / 2 - pillW / 2}" y="0" width="${pillW}" height="14" rx="5" fill="${isEarthSink ? pal.borderStrong : pal.link}" />
          <text x="${W / 2}" y="10" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="${pal.surface}">${inLabel}</text>
        `;
      } else if (node.roleType === "source") {
        portsSvg += `
          <rect x="${W / 2 - 48}" y="0" width="96" height="14" rx="5" fill="${pal.success}" />
          <text x="${W / 2}" y="10" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="${pal.surface}">★ ORIGINE FLUSSO</text>
        `;
      }
      if (node.visOut > 0 && !isEarthSink) {
        portsSvg += `
          <rect x="${W / 2 - 32}" y="${H - 14}" width="64" height="14" rx="5" fill="${col.fg}" />
          <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="${pal.surface}">ESCE (${node.visOut}) ⬇</text>
        `;
      }
    } else {
      if (node.visIn > 0) portsSvg += `<circle cx="5" cy="${H / 2}" r="5" fill="${pal.link}" />`;
      if (node.visOut > 0 && !isEarthSink) portsSvg += `<circle cx="${W - 5}" cy="${H / 2}" r="5" fill="${col.fg}" />`;
    }

    const warnDot = incs.length > 0
      ? `<rect x="${W - 44}" y="18" width="34" height="16" rx="5" fill="${pal.warning}" /><text x="${W - 27}" y="29" text-anchor="middle" font-family="Consolas, monospace" font-size="9.5" font-weight="700" fill="${pal.text}">⚠ ${incs.length}</text>`
      : "";

    const drillHint = hasInternal && !node.isInternalComp
      ? `<text x="${W - 13}" y="${H - 19}" text-anchor="end" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="${col.fg}">🔬 Interno</text>`
      : "";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect x="4" y="7" width="${W - 8}" height="${H - 14}" rx="11" fill="${cardBg}" stroke="${strokeCol}" stroke-width="${strokeW}" ${dashAttr} />
      <path d="M5,18 Q5,8 15,8 L${W - 15},8 Q${W - 5},8 ${W - 5},18 L${W - 5},37 L5,37 Z" fill="${headerBg}" />
      <line x1="5" y1="37" x2="${W - 5}" y2="37" stroke="${pal.border}" stroke-width="1" />

      <text x="13" y="27" font-family="Segoe UI, sans-serif" font-size="9.6" font-weight="700" fill="${col.fg}">${escXml(roleBanner.slice(0, 27))}</text>
      ${incs.length === 0 ? `<text x="${W - 13}" y="27" text-anchor="end" font-family="Consolas, monospace" font-size="9.5" font-weight="700" fill="${pal.textMuted}">${escXml(rightTag.slice(0, 13))}</text>` : warnDot}

      <text x="13" y="55" font-family="Segoe UI, sans-serif" font-size="${node.isInternalComp ? "11.8" : "12.6"}" font-weight="700" fill="${pal.text}">${escXml(titleLines[0] || node.code)}</text>

      ${funcLines.map((ln, idx) => `
        <text x="13" y="${73 + idx * 13.5}" font-family="Segoe UI, sans-serif" font-size="10.2" fill="${pal.textMuted}">${escXml(ln)}</text>
      `).join("")}

      ${drillHint}
      ${portsSvg}
    </svg>`;

    return {
      uri: "data:image/svg+xml;utf8," + encodeURIComponent(svg),
      w: W,
      h: H
    };
  }

  // ==================== DEDICATED NON-GRAPH SYNOPTIC SCHEMATIC ENGINE (HTML SWIMLANES + SVG BUSBARS) ====================
  const SYNOPTIC_SCHEMAS = {
    "IMP-INGRESSI": {
      bands: [
        "1 · Rete Stradale Esterna & Copertura Solare",
        "2 · Locale Contatori Principale (P. Terra) — I 4 Contatori Parti Comuni",
        "3 · Locale Contatori Principale (P. Terra) — Ripartizione VVF & Avanquadri",
        "4 · Quadri Generali d'Impianto & Sale Contatori Appartamenti (P. Terra / -1 / -2)"
      ],
      slots: {
        "RETE-DISTRIBUTORE":   { col: 3,   row: 0 },
        "GEN-FV-ROOF":         { col: 7,   row: 0 },
        "POD-SSC":             { col: 0,   row: 1 },
        "POD-SCA":             { col: 2,   row: 1 },
        "POD-SCB":             { col: 4,   row: 1 },
        "POD-PDC":             { col: 6,   row: 1 },
        "RIP-250":             { col: 0,   row: 2 },
        "AVSSC":               { col: 1,   row: 2 },
        "AVSCA":               { col: 2,   row: 2 },
        "AVSCB":               { col: 4,   row: 2 },
        "AVPC":                { col: 6,   row: 2 },
        "QEPA":                { col: 0,   row: 3 },
        "QESSC":               { col: 1,   row: 3 },
        "QESCA":               { col: 2,   row: 3 },
        "CONTATORI-ALLOGGI-A": { col: 3,   row: 3 },
        "QESCB":               { col: 4,   row: 3 },
        "CONTATORI-ALLOGGI-B": { col: 5,   row: 3 },
        "QEPC":                { col: 6.5, row: 3 }
      }
    },
    "IMP-SSC": {
      bands: [
        "1 · Punto di Consegna Energia (Locale Contatori P. Terra)",
        "2 · Ripartizione Primaria, Avanquadro & Portineria (P. Terra)",
        "3 · Quadro Generale QE.SSC, Sezione Autorimessa (Q6) & Luci Esterne",
        "4 · Piani Interrati (-1 / -2) — Sottoquadri Centrali & Autorimessa",
        "5 · Piani Interrati (-1 / -2) — Gruppi di Pompaggio Idrici, Clima & Falda"
      ],
      slots: {
        "POD-SSC":        { col: 2,   row: 0 },
        "RETE-DISTRIBUTORE": { col: 1, row: 0 },
        "RIP-250":        { col: 2,   row: 1 },
        "QEPA":           { col: 1,   row: 1 },
        "AVSSC":          { col: 3,   row: 1 },
        "QEPOR":          { col: 4.6, row: 1 },
        "FTTH-CSOE":      { col: 5.7, row: 1 },
        "IRA-CENTRALI":   { col: 6.7, row: 1 },
        "Q6-BOX-SEC":     { col: 1.8, row: 2 },
        "QESSC":          { col: 3,   row: 2 },
        "LD-ESTERNI":     { col: 4.6, row: 2 },
        "VIDEOCITOFONO":  { col: 5.7, row: 2 },
        "TERRA-RETE":     { col: 6.7, row: 2 },
        "SGANCI-VVF":     { col: 0,   row: 2 },
        "BOX-INTERNI-P1": { col: 0,   row: 3 },
        "BOX-INTERNI-P2": { col: 1,   row: 3 },
        "LD-BOX":         { col: 2,   row: 3 },
        "QECI":           { col: 3,   row: 3 },
        "QECT":           { col: 4,   row: 3 },
        "QELP":           { col: 5,   row: 3 },
        "UPS-1-EI":       { col: 6,   row: 3 },
        "UPS-2-SGANCIO":  { col: 7,   row: 3 },
        "LD-IDRICO":      { col: 3,   row: 4 },
        "LD-POMPE-CT":    { col: 4,   row: 4 },
        "LD-FALDA":       { col: 5,   row: 4 },
        "QEREG":          { col: 6,   row: 4 },
        "LD-POMPA-VVF":   { col: 1,   row: 4 }
      }
    },
    "IMP-SCA": {
      bands: [
        "1 · Punto di Consegna (Locale Contatori P. Terra)",
        "2 · Avanquadro & Sgancio VVF (P. Terra)",
        "3 · Quadro Generale Edificio (Locale Contatori Scala A — Piano -1)",
        "4 · Dorsali di Distribuzione Torre A (Locali Comuni, Scale, 14 Piani & Copertura)"
      ],
      slots: {
        "POD-SCA":         { col: 2, row: 0 },
        "RETE-DISTRIBUTORE": { col: 1, row: 0 },
        "SGANCI-VVF":      { col: 1, row: 1 },
        "AVSCA":           { col: 2, row: 1 },
        "QESCA":           { col: 2, row: 2 },
        "IRA-CENTRALI":    { col: 0, row: 2 },
        "FTTH-CSOE":       { col: 1, row: 2 },
        "TERRA-RETE":      { col: 4, row: 2 },
        "QEPL":            { col: 0, row: 3 },
        "QEDB":            { col: 1, row: 3 },
        "LD-SCALA-CANT-A": { col: 2, row: 3 },
        "QEP-TORRE-A":     { col: 3, row: 3 },
        "LD-ROOF-A":       { col: 4, row: 3 },
        "VIDEOCITOFONO":   { col: 0, row: 1 },
        "MBUS-CONTAB":     { col: 3, row: 2 }
      }
    },
    "IMP-SCB": {
      bands: [
        "1 · Punto di Consegna (Locale Contatori P. Terra)",
        "2 · Avanquadro & Sgancio VVF (P. Terra)",
        "3 · Quadro Generale Edificio (Locale Contatori Scala B — Piano -1)",
        "4 · Dorsali di Distribuzione Torre B (Locali Comuni, Scale, 14 Piani & Copertura)"
      ],
      slots: {
        "POD-SCB":         { col: 2, row: 0 },
        "RETE-DISTRIBUTORE": { col: 1, row: 0 },
        "SGANCI-VVF":      { col: 1, row: 1 },
        "AVSCB":           { col: 2, row: 1 },
        "QESCB":           { col: 2, row: 2 },
        "IRA-CENTRALI":    { col: 0, row: 2 },
        "FTTH-CSOE":       { col: 1, row: 2 },
        "TERRA-RETE":      { col: 4, row: 2 },
        "QESR":            { col: 0, row: 3 },
        "QESP":            { col: 1, row: 3 },
        "LD-SCALA-CANT-B": { col: 2, row: 3 },
        "QEP-TORRE-B":     { col: 3, row: 3 },
        "LD-ROOF-B":       { col: 4, row: 3 },
        "VIDEOCITOFONO":   { col: 0, row: 1 },
        "MBUS-CONTAB":     { col: 3, row: 2 }
      }
    },
    "IMP-PDC": {
      bands: [
        "1 · Fornitura Rete 160 kW (P. Terra) & 2 Campi Solari Coperture Torri A e B (+48 m)",
        "2 · Avanquadro Rete (AVPC 630A) & Inverter / Parallelo Fotovoltaico (CEI 0-21)",
        "3 · Quadro Parallelo Rete + Fotovoltaico (QE.PC — Unico Punto Allaccio FV Q5 C50A)",
        "4 · Gruppi Frigo / Pompe di Calore Geotermiche (Centrale Piano -2)"
      ],
      slots: {
        "RETE-DISTRIBUTORE": { col: 0,   row: 0 },
        "POD-PDC":           { col: 1,   row: 0 },
        "FV-TETTO-A":        { col: 2.6, row: 0 },
        "FV-TETTO-B":        { col: 3.8, row: 0 },
        "SGANCI-VVF":        { col: 0,   row: 1 },
        "AVPC":              { col: 1,   row: 1 },
        "GEN-FV-ROOF":       { col: 3.2, row: 1 },
        "QEREG":             { col: 0.8, row: 2 },
        "QEPC":              { col: 2.1, row: 2 },
        "TERRA-RETE":        { col: 3.4, row: 2 },
        "LD-PDC-UNITS":      { col: 2.1, row: 3 }
      }
    },
    "IMP-FIRE": {
      bands: [
        "1 · Alimentazioni di Sicurezza, Quadro VVF & Gruppi UPS Tampone",
        "2 · Presidi di Comando Sgancio Emergenza & Rivelazione Fumi",
        "3 · Utenze Antincendio Vitali & Compartimentazione Autorimessa"
      ],
      slots: {
        "RIP-250":         { col: 0, row: 0 },
        "QEPA":            { col: 1, row: 0 },
        "UPS-2-SGANCIO":   { col: 2, row: 0 },
        "UPS-1-EI":        { col: 3, row: 0 },
        "IRA-CENTRALI":    { col: 1.5, row: 1 },
        "SGANCI-VVF":      { col: 2.5, row: 1 },
        "LD-POMPA-VVF":    { col: 1, row: 2 },
        "FIRE-PORTONI-EI": { col: 3, row: 2 },
        "LD-BOX":          { col: 4, row: 2 },
        "AVSSC":           { col: 0, row: 1 },
        "QESSC":           { col: 0, row: 2 },
        "Q6-BOX-SEC":      { col: 2, row: 2 },
        "QEPOR":           { col: 4, row: 0 },
        "AVSCA":           { col: 4, row: 1 },
        "AVSCB":           { col: 5, row: 1 },
        "AVPC":            { col: 6, row: 1 },
        "QESCA":           { col: 5, row: 2 },
        "QESCB":           { col: 6, row: 2 }
      }
    },
    "IMP-BMS": {
      bands: [
        "1 · Sensoristica di Campo (19 Sonde Temperatura & Livelli Pozzi)",
        "2 · Supervisione Centrale PLC ABB Cylon & Telegestione 4G (Piano -2)",
        "3 · Regolazione Valvole/Inverter & Rete Contabilizzazione M-Bus Piani"
      ],
      slots: {
        "BMS-SONDE-CAMPO":    { col: 2, row: 0 },
        "QECI":               { col: 0, row: 1 },
        "QECT":               { col: 1, row: 1 },
        "QEREG":              { col: 2, row: 1 },
        "QEPC":               { col: 3, row: 1 },
        "QELP":               { col: 4, row: 1 },
        "BMS-ATTUATORI-VALV": { col: 1.3, row: 2 },
        "MBUS-CONTAB":        { col: 2.7, row: 2 },
        "QEP-TORRE-A":        { col: 3.8, row: 2 },
        "QEP-TORRE-B":        { col: 4.8, row: 2 }
      }
    },
    "IMP-TLC": {
      bands: [
        "1 · Captazione Radiotelevisiva in Copertura (+48 m)",
        "2 · Infrastruttura Ottica FTTH (CSOE) & Centrale Videocitofonica (P. Terra)",
        "3 · Distribuzione Multiservizio negli Appartamenti (STOA / QDSA)"
      ],
      slots: {
        "TLC-ANTENNE-STOM": { col: 1, row: 0 },
        "QEPOR":            { col: 0, row: 0 },
        "QESSC":            { col: 2, row: 0 },
        "QESCA":            { col: 0, row: 1 },
        "FTTH-CSOE":        { col: 1, row: 1 },
        "VIDEOCITOFONO":    { col: 2, row: 1 },
        "QEPL":             { col: 3, row: 1 },
        "QESR":             { col: 4, row: 1 },
        "QESCB":            { col: 0, row: 2 },
        "TLC-ALLOGGI-STOA": { col: 1.5, row: 2 }
      }
    },
    "IMP-GND": {
      bands: [
        "1 · Protezione Sovratensioni & Fulmini nei 4 Quadri Generali (SPD Tipo 1+2)",
        "2 · Raccolta Equipotenziale & Collettori Principali di Terra",
        "3 · Dispersione nel Suolo (Anello Rame Nudo 50 mm² + 14 Picchetti)"
      ],
      slots: {
        "GND-SPD-4X":         { col: 2, row: 0 },
        "QESSC":              { col: 0, row: 1 },
        "QESCA":              { col: 1, row: 1 },
        "GND-COLLETTORI-EQP": { col: 2, row: 1 },
        "QESCB":              { col: 3, row: 1 },
        "QEPC":               { col: 4, row: 1 },
        "TERRA-RETE":         { col: 2, row: 2 }
      }
    }
  };

  function buildInternalSynopticSchema(nodes) {
    const bands = [
      "1 · Linea di Ingresso",
      "2 · Organo di Manovra & Protezione Generale",
      "3 · Sbarra Principale in Rame, Misura Vemer & Scaricatore SPD"
    ];
    const slots = {};

    const sec1 = nodes.filter((n) => (n.roleGroup || "").startsWith("1 ·"));
    const sec2 = nodes.filter((n) => (n.roleGroup || "").startsWith("2 ·"));
    const sec3 = nodes.filter((n) => (n.roleGroup || "").startsWith("3 ·"));
    const sec4 = nodes.filter((n) => (n.roleGroup || "").startsWith("4 ·"));

    const pvNodes = sec3.filter((n) => n.roleType === "source");
    const outMain = sec3.filter((n) => n.roleType !== "source");

    const centerCol = 2;
    const inNode = sec1.find((n) => n.id.endsWith("__IN"));
    const mainNode = sec1.find((n) => n.id.endsWith("__MAIN"));
    const derNode = sec1.find((n) => n.id.endsWith("__DER"));
    if (inNode) slots[inNode.id] = { col: centerCol, row: 0 };
    pvNodes.forEach((pvn, idx) => { slots[pvn.id] = { col: centerCol + 1.4 + idx, row: 1 }; });
    if (derNode) slots[derNode.id] = { col: centerCol - 1.2, row: 1 };
    if (mainNode) slots[mainNode.id] = { col: centerCol, row: 1 };

    const m1Node = sec2.find((n) => n.id.endsWith("__M1"));
    const busNode = sec2.find((n) => n.id.endsWith("__BUS"));
    const spdNode = sec2.find((n) => n.id.endsWith("__SPD"));
    const peNode = sec2.find((n) => n.id.endsWith("__PE"));
    if (m1Node) slots[m1Node.id] = { col: centerCol - 1.2, row: 2 };
    if (busNode) slots[busNode.id] = { col: centerCol, row: 2 };
    if (spdNode) slots[spdNode.id] = { col: centerCol + 1.2, row: 2 };
    if (peNode) slots[peNode.id] = { col: centerCol + 2.4, row: 2 };

    let nextRow = 3;
    const colsPerRack = 5;
    if (outMain.length > 0) {
      const rackRows = Math.ceil(outMain.length / colsPerRack);
      for (let r = 0; r < rackRows; r++) {
        bands.push(rackRows === 1
          ? "4 · Interruttori di Partenza & Linee Uscita"
          : `4.${r + 1} · Interruttori di Partenza (Fila ${r + 1})`
        );
        const slice = outMain.slice(r * colsPerRack, (r + 1) * colsPerRack);
        const offset = centerCol - (slice.length - 1) / 2;
        slice.forEach((nd, i) => {
          slots[nd.id] = { col: offset + i, row: nextRow };
        });
        nextRow += 1;
      }
    }

    if (sec4.length > 0) {
      const q6Hub = sec4.find((n) => n.id.endsWith("__Q6_RP1"));
      const q6Kids = sec4.filter((n) => n !== q6Hub);
      if (q6Hub) {
        bands.push("5 · Sotto-Sezione Autorimessa Q6 (4P 63A + Sgancio VVF) & Ripartitore RP1");
        slots[q6Hub.id] = { col: centerCol, row: nextRow };
        nextRow += 1;
      }
      const q6Rows = Math.ceil(q6Kids.length / colsPerRack);
      for (let r = 0; r < q6Rows; r++) {
        bands.push(`6.${r + 1} · Circuiti Derivati Autorimessa & 152 Box (Q6.1 – Q6.10 · Fila ${r + 1})`);
        const slice = q6Kids.slice(r * colsPerRack, (r + 1) * colsPerRack);
        const offset = centerCol - (slice.length - 1) / 2;
        slice.forEach((nd, i) => {
          slots[nd.id] = { col: offset + i, row: nextRow };
        });
        nextRow += 1;
      }
    }

    return { bands, slots };
  }

  // Convert an orthogonal polyline into an SVG path with smooth quadratic rounded corners
  function buildRoundedOrthoPath(rawPts, radius = 12) {
    const pts = [];
    for (let i = 0; i < rawPts.length; i++) {
      const p = rawPts[i];
      if (!pts.length || Math.hypot(p.x - pts[pts.length - 1].x, p.y - pts[pts.length - 1].y) > 1.5) {
        pts.push(p);
      }
    }
    // Remove collinear middle points
    const clean = [];
    for (let i = 0; i < pts.length; i++) {
      if (i > 0 && i < pts.length - 1) {
        const a = clean[clean.length - 1];
        const b = pts[i];
        const c = pts[i + 1];
        const cross = Math.abs((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x));
        if (cross < 1.0) continue;
      }
      clean.push(pts[i]);
    }
    if (clean.length < 2) return "";
    if (clean.length === 2) {
      return `M ${clean[0].x.toFixed(1)} ${clean[0].y.toFixed(1)} L ${clean[1].x.toFixed(1)} ${clean[1].y.toFixed(1)}`;
    }

    let d = `M ${clean[0].x.toFixed(1)} ${clean[0].y.toFixed(1)}`;
    for (let i = 1; i < clean.length - 1; i++) {
      const prev = clean[i - 1];
      const curr = clean[i];
      const next = clean[i + 1];
      const v1x = curr.x - prev.x;
      const v1y = curr.y - prev.y;
      const v2x = next.x - curr.x;
      const v2y = next.y - curr.y;
      const len1 = Math.hypot(v1x, v1y);
      const len2 = Math.hypot(v2x, v2y);
      const r = Math.min(radius, len1 * 0.45, len2 * 0.45);
      if (r < 2) {
        d += ` L ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
      } else {
        const pInX = curr.x - (v1x / len1) * r;
        const pInY = curr.y - (v1y / len1) * r;
        const pOutX = curr.x + (v2x / len2) * r;
        const pOutY = curr.y + (v2y / len2) * r;
        d += ` L ${pInX.toFixed(1)} ${pInY.toFixed(1)} Q ${curr.x.toFixed(1)} ${curr.y.toFixed(1)} ${pOutX.toFixed(1)} ${pOutY.toFixed(1)}`;
      }
    }
    const last = clean[clean.length - 1];
    d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
    return d;
  }

  function applySynopticTransform() {
    const board = document.getElementById("synopticBoard");
    if (!board) return;
    board.style.transform = `translate(${synView.panX.toFixed(1)}px, ${synView.panY.toFixed(1)}px) scale(${synView.scale.toFixed(4)})`;
  }

  function fitSynopticBoard() {
    const stage = document.getElementById("synopticStage");
    if (!stage) return;
    const vw = stage.clientWidth || 1000;
    const vh = stage.clientHeight || 680;
    const pad = 26;
    const sx = (vw - pad * 2) / Math.max(1, synView.boardW);
    const sy = (vh - pad * 2) / Math.max(1, synView.boardH);
    const scale = Math.min(1.04, Math.max(0.28, Math.min(sx, sy)));
    synView.scale = scale;
    synView.panX = (vw - synView.boardW * scale) / 2;
    synView.panY = Math.max(14, (vh - synView.boardH * scale) / 2);
    applySynopticTransform();
  }

  function applySynopticFocus() {
    const clearBtn = document.getElementById("btnClearFocus");
    const board = document.getElementById("synopticBoard");
    if (!board) return;
    const cards = board.querySelectorAll(".syn-card");
    const wires = board.querySelectorAll(".syn-wire-group");

    cards.forEach((c) => c.classList.remove("dimmed"));
    wires.forEach((w) => w.classList.remove("dimmed"));

    if (!state.focusedNodeId) {
      clearBtn.style.display = "none";
      return;
    }

    clearBtn.style.display = "inline-flex";
    const keepNodes = new Set([state.focusedNodeId]);
    wires.forEach((w) => {
      const s = w.dataset.source;
      const t = w.dataset.target;
      if (s === state.focusedNodeId || t === state.focusedNodeId) {
        keepNodes.add(s);
        keepNodes.add(t);
      } else {
        w.classList.add("dimmed");
      }
    });
    cards.forEach((c) => {
      if (!keepNodes.has(c.dataset.nodeId)) {
        c.classList.add("dimmed");
      }
    });
  }

  function renderSynopticBoard() {
    const stage = document.getElementById("synopticStage");
    const board = document.getElementById("synopticBoard");
    const cyEl = document.getElementById("cyCanvas");
    if (!stage || !board) return;

    stage.style.display = "block";
    cyEl.style.display = "none";

    const pal = getPalette();
    const { nodes, edges, isInternal, parentBoard } = computeCurrentGraph();

    const bc = document.getElementById("drillBreadcrumb");
    if (isInternal && parentBoard) {
      bc.classList.add("active");
      document.getElementById("drillTitle").textContent = `🔬 Dentro il Quadro: ${parentBoard.code} — ${parentBoard.label}`;
      document.getElementById("drillSubtitle").textContent = `Schema sinottico a sbarra dei componenti interni (${nodes.length} componenti · ${edges.length} collegamenti)`;
      document.getElementById("lblBridges").style.display = "none";
    } else {
      bc.classList.remove("active");
      document.getElementById("lblBridges").style.display = state.activePlant === "IMP-INGRESSI" ? "none" : "inline-flex";
    }

    if (!nodes.some((n) => n.id === state.selectedNodeId)) {
      const defN = nodes.find((n) => !n.isBridge && n.roleType === "source") || nodes[0];
      if (defN) state.selectedNodeId = defN.id;
    }

    const schema = isInternal
      ? buildInternalSynopticSchema(nodes)
      : (SYNOPTIC_SCHEMAS[state.activePlant] || { bands: ["Schema Impianto"], slots: {} });

    // Normalize columns so minCol starts cleanly at 0
    const rawSlots = new Map();
    let minCol = Infinity;
    let maxCol = -Infinity;
    let maxRow = 0;

    nodes.forEach((n, idx) => {
      const sl = schema.slots[n.id] || { col: idx % 5, row: Math.min(schema.bands.length - 1, Math.floor(idx / 5)) };
      rawSlots.set(n.id, sl);
      if (sl.col < minCol) minCol = sl.col;
      if (sl.col > maxCol) maxCol = sl.col;
      if (sl.row > maxRow) maxRow = sl.row;
    });
    if (!Number.isFinite(minCol)) minCol = 0;
    if (!Number.isFinite(maxCol)) maxCol = 0;

    // Compact used rows so empty bands (e.g. when optional bridges are OFF) collapse cleanly!
    const usedRowsSorted = Array.from(new Set(Array.from(rawSlots.values()).map((s) => s.row))).sort((a, b) => a - b);
    const rowRemap = new Map(usedRowsSorted.map((origRow, idx) => [origRow, idx]));
    const activeBands = usedRowsSorted.map((origRow) => schema.bands[origRow] || `Livello ${origRow + 1}`);

    const CARD_W = 224;
    const CARD_H = 104;
    const COL_GAP = 40;
    const COL_PITCH = CARD_W + COL_GAP;
    const PAD_LEFT = 204;
    const PAD_RIGHT = 32;
    const PAD_Y = 20;
    const BAND_TOP = 30;
    const BAND_BOT = 14;
    const BAND_H = BAND_TOP + CARD_H + BAND_BOT;
    const CHANNEL_H = 70;
    const ROW_PITCH = BAND_H + CHANNEL_H;

    const spanCols = Math.max(2.2, (maxCol - minCol) + 1);
    const boardW = Math.max(760, Math.round(PAD_LEFT + PAD_RIGHT + spanCols * COL_PITCH - COL_GAP));
    const numRows = Math.max(1, activeBands.length);
    const boardH = PAD_Y * 2 + numRows * BAND_H + (numRows - 1) * CHANNEL_H;

    synView.boardW = boardW;
    synView.boardH = boardH;
    board.style.width = `${boardW}px`;
    board.style.height = `${boardH}px`;

    // Compute exact card rectangles
    const boxes = new Map();
    nodes.forEach((n) => {
      const sl = rawSlots.get(n.id);
      const cNorm = sl.col - minCol;
      const rNorm = rowRemap.get(sl.row) || 0;
      const left = PAD_LEFT + cNorm * COL_PITCH;
      const top = PAD_Y + rNorm * ROW_PITCH + BAND_TOP;
      boxes.set(n.id, {
        col: cNorm,
        row: rNorm,
        left,
        right: left + CARD_W,
        top,
        bottom: top + CARD_H,
        cx: left + CARD_W / 2,
        cy: top + CARD_H / 2
      });
    });

    // Helper: check if a vertical line at x intersects any card strictly between yA and yB
    function isShaftClear(x, yA, yB, ignoreIdA, ignoreIdB) {
      const yMin = Math.min(yA, yB) + 2;
      const yMax = Math.max(yA, yB) - 2;
      for (const [nid, bx] of boxes.entries()) {
        if (nid === ignoreIdA || nid === ignoreIdB) continue;
        if (yMax > bx.top - 6 && yMin < bx.bottom + 6) {
          if (x > bx.left - 10 && x < bx.right + 10) return false;
        }
      }
      return true;
    }

    // Find nearest clear vertical alley near targetX for multi-row bypasses
    const usedAlleys = [];
    function findClearAlley(prefX, yA, yB, idA, idB) {
      const candidates = [];
      const maxColIdx = Math.ceil(spanCols) + 1;
      for (let k = 0; k <= maxColIdx; k++) {
        const ax = PAD_LEFT + k * COL_PITCH - COL_GAP / 2;
        candidates.push(ax, ax - 9, ax + 9);
      }
      candidates.sort((a, b) => Math.abs(a - prefX) - Math.abs(b - prefX));
      for (const cx of candidates) {
        if (!isShaftClear(cx, yA, yB, idA, idB)) continue;
        const clash = usedAlleys.some((u) => Math.abs(u.x - cx) < 7 && Math.min(yB, u.y2) > Math.max(yA, u.y1));
        if (!clash) {
          usedAlleys.push({ x: cx, y1: Math.min(yA, yB), y2: Math.max(yA, yB) });
          return cx;
        }
      }
      return prefX;
    }

    // Group incoming top edges per target node to spread entry pins slightly when >=2 distinct parents converge
    const inTopByTarget = new Map();
    edges.forEach((e) => {
      const b1 = boxes.get(e.source);
      const b2 = boxes.get(e.target);
      if (!b1 || !b2) return;
      if (b2.row > b1.row || (b2.row === b1.row && Math.abs(b2.cx - b1.cx) > COL_PITCH * 1.35)) {
        if (!inTopByTarget.has(e.target)) inTopByTarget.set(e.target, []);
        inTopByTarget.get(e.target).push(e);
      }
    });
    inTopByTarget.forEach((arr) => {
      arr.sort((ea, eb) => (boxes.get(ea.source)?.cx || 0) - (boxes.get(eb.source)?.cx || 0));
    });

    // Allocate horizontal busbar tracks per inter-band channel (shared by same source+edgeType!)
    const channelBusMap = new Map(); // key `${channelIdx}::${sourceId}::${edgeType}` -> yTrack
    const channelCounters = new Map(); // channelIdx -> count

    function getBusTrackY(channelIdx, groupKey) {
      const fullKey = `${channelIdx}::${groupKey}`;
      if (channelBusMap.has(fullKey)) return channelBusMap.get(fullKey);
      const idx = channelCounters.get(channelIdx) || 0;
      channelCounters.set(channelIdx, idx + 1);
      const bandBot = PAD_Y + channelIdx * ROW_PITCH + BAND_H;
      const offsets = [22, 38, 54, 12, 64];
      const yT = bandBot + offsets[idx % offsets.length];
      channelBusMap.set(fullKey, yT);
      return yT;
    }

    // Build Bands HTML
    let bandsHtml = "";
    for (let r = 0; r < numRows; r++) {
      const bTop = PAD_Y + r * ROW_PITCH;
      bandsHtml += `
        <div class="syn-band ${r % 2 === 0 ? "even" : "odd"}" style="top:${bTop}px; width:${boardW}px; height:${BAND_H}px;">
          <div class="syn-band-hdr">${escXml(activeBands[r])}</div>
        </div>
      `;
    }

    // Build Orthogonal-Curved SVG Wires, T-Junction Dots & Micro-Labels
    let svgWiresHtml = "";
    const junctionDots = new Map(); // `${x.toFixed(0)},${y.toFixed(0)}` -> color
    const busTapTracker = new Map(); // `${channelIdx}::${source}::${edgeType}` -> xs[]
    const placedBadgeRects = [];
    const wireSpecs = [];

    edges.forEach((e) => {
      const b1 = boxes.get(e.source);
      const b2 = boxes.get(e.target);
      if (!b1 || !b2) return;

      const interrupted = isEdgeInterruptedInEmergency(e);
      const cStyle = resolveCarrierStyle(e.edgeType, interrupted, pal);
      const color = cStyle.color;
      const dash = cStyle.svgDash;
      const strokeW = cStyle.width;

      // Compute pin offset on target top if multiple parents converge
      const topArr = inTopByTarget.get(e.target) || [];
      const topIdx = topArr.indexOf(e);
      const topPinShift = topArr.length > 1 && topIdx >= 0
        ? (topIdx - (topArr.length - 1) / 2) * 22
        : 0;

      let pts = [];
      let arrowAngleDeg = 90; // downward by default
      let endPt = { x: b2.cx + topPinShift, y: b2.top };
      let badgeAnchor = null;

      if (b2.row === b1.row) {
        const dx = b2.cx - b1.cx;
        if (Math.abs(dx) <= COL_PITCH * 1.32) {
          // Direct clean horizontal connection between adjacent cards
          const goRight = dx >= 0;
          const pStart = { x: goRight ? b1.right : b1.left, y: b1.cy };
          const pEnd = { x: goRight ? b2.left : b2.right, y: b2.cy };
          pts = [pStart, pEnd];
          endPt = pEnd;
          arrowAngleDeg = goRight ? 0 : 180;
          badgeAnchor = { x: (pStart.x + pEnd.x) / 2, y: b1.top - 13 };
        } else {
          // Non-adjacent same-row: step cleanly into upper band channel
          const yArc = b1.top - 15 - ((channelCounters.get(`top_${b1.row}`) || 0) * 12);
          channelCounters.set(`top_${b1.row}`, (channelCounters.get(`top_${b1.row}`) || 0) + 1);
          const xEnd = b2.cx + topPinShift;
          pts = [
            { x: b1.cx, y: b1.top },
            { x: b1.cx, y: yArc },
            { x: xEnd, y: yArc },
            { x: xEnd, y: b2.top }
          ];
          endPt = { x: xEnd, y: b2.top };
          arrowAngleDeg = 90;
        }
      } else if (b2.row > b1.row) {
        const xStart = b1.cx;
        const yStart = b1.bottom;
        const xEnd = b2.cx + topPinShift;
        const yEnd = b2.top;
        const busKey = `${e.source}::${e.edgeType}`;
        const yBus = getBusTrackY(b1.row, busKey);

        // Track taps for busbar junction dots
        const tapFullKey = `${b1.row}::${busKey}`;
        if (!busTapTracker.has(tapFullKey)) busTapTracker.set(tapFullKey, { y: yBus, color, xs: [xStart] });

        if (b2.row === b1.row + 1) {
          if (Math.abs(xEnd - xStart) < 5) {
            pts = [{ x: xStart, y: yStart }, { x: xEnd, y: yEnd }];
          } else {
            pts = [
              { x: xStart, y: yStart },
              { x: xStart, y: yBus },
              { x: xEnd, y: yBus },
              { x: xEnd, y: yEnd }
            ];
            busTapTracker.get(tapFullKey).xs.push(xEnd);
          }
          badgeAnchor = { x: xEnd, y: yEnd - 15 };
        } else {
          // Multi-row downward connection: drop directly down xEnd if shaft is clear, else use nearest clear alley!
          if (isShaftClear(xEnd, yBus, yEnd, e.source, e.target)) {
            if (Math.abs(xEnd - xStart) < 5) {
              pts = [{ x: xStart, y: yStart }, { x: xEnd, y: yEnd }];
            } else {
              pts = [
                { x: xStart, y: yStart },
                { x: xStart, y: yBus },
                { x: xEnd, y: yBus },
                { x: xEnd, y: yEnd }
              ];
              busTapTracker.get(tapFullKey).xs.push(xEnd);
            }
          } else {
            const xAlley = findClearAlley(xEnd, yBus, yEnd, e.source, e.target);
            const yBusBottom = getBusTrackY(b2.row - 1, `in::${e.id}`);
            pts = [
              { x: xStart, y: yStart },
              { x: xStart, y: yBus },
              { x: xAlley, y: yBus },
              { x: xAlley, y: yBusBottom },
              { x: xEnd, y: yBusBottom },
              { x: xEnd, y: yEnd }
            ];
            busTapTracker.get(tapFullKey).xs.push(xAlley);
          }
          badgeAnchor = { x: xEnd, y: yEnd - 15 };
        }
        endPt = { x: xEnd, y: yEnd };
        arrowAngleDeg = 90;
      } else {
        // Upward feedback / trip line (b2.row < b1.row)
        const xStart = b1.cx;
        const yStart = b1.top;
        const xEnd = b2.cx;
        const yEnd = b2.bottom;
        const yChannelStart = getBusTrackY(b1.row - 1, `up::${e.id}`);
        if (isShaftClear(xEnd, yEnd, yChannelStart, e.source, e.target)) {
          pts = [
            { x: xStart, y: yStart },
            { x: xStart, y: yChannelStart },
            { x: xEnd, y: yChannelStart },
            { x: xEnd, y: yEnd }
          ];
        } else {
          const xAlley = findClearAlley(xStart, yEnd, yChannelStart, e.source, e.target);
          const yChannelTop = getBusTrackY(b2.row, `uptop::${e.id}`);
          pts = [
            { x: xStart, y: yStart },
            { x: xStart, y: yChannelStart },
            { x: xAlley, y: yChannelStart },
            { x: xAlley, y: yChannelTop },
            { x: xEnd, y: yChannelTop },
            { x: xEnd, y: yEnd }
          ];
        }
        endPt = { x: xEnd, y: yEnd };
        arrowAngleDeg = -90;
      }

      const dPath = buildRoundedOrthoPath(pts, 13);
      if (!dPath) return;

      // Arrowhead / Tee at target port
      let headSvg = "";
      if (e.edgeType === "emergency_trip") {
        headSvg = `<g transform="translate(${endPt.x.toFixed(1)},${endPt.y.toFixed(1)}) rotate(${arrowAngleDeg})"><line x1="-2" y1="-6" x2="-2" y2="6" stroke="${color}" stroke-width="2.8" stroke-linecap="round"/></g>`;
      } else {
        headSvg = `<g transform="translate(${endPt.x.toFixed(1)},${endPt.y.toFixed(1)}) rotate(${arrowAngleDeg})"><polygon points="0,0 -8,-4.6 -8,4.6" fill="${color}"/></g>`;
      }

      // Compact non-overlapping horizontal micro-badge for wire rating
      let badgeSvg = "";
      const shortLbl = interrupted
        ? (e.edgeType === "power_fv" ? "⛔ STOP CEI 0-21" : "⛔ SEZIONATO")
        : (e.label || "").replace(/\s*·\s*.*/, "").slice(0, 22);

      if (badgeAnchor && shortLbl) {
        const bw = Math.max(48, shortLbl.length * 5.7 + 12);
        const bh = 16;
        const bx1 = badgeAnchor.x - bw / 2;
        const by1 = badgeAnchor.y - bh / 2;
        const collides = placedBadgeRects.some((r) =>
          bx1 < r.x2 + 4 && bx1 + bw > r.x1 - 4 && by1 < r.y2 + 2 && by1 + bh > r.y1 - 2
        );
        if (!collides) {
          placedBadgeRects.push({ x1: bx1, y1: by1, x2: bx1 + bw, y2: by1 + bh });
          badgeSvg = `
            <g>
              <rect x="${bx1.toFixed(1)}" y="${by1.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh}" rx="4"
                fill="${pal.surface}" stroke="${interrupted ? pal.danger : pal.border}" stroke-width="1" opacity="0.94" />
              <text x="${badgeAnchor.x.toFixed(1)}" y="${(badgeAnchor.y + 3.4).toFixed(1)}" text-anchor="middle"
                font-family="Segoe UI, Aptos, sans-serif" font-size="9.5" font-weight="600" fill="${interrupted ? pal.danger : pal.textMuted}">${escXml(shortLbl)}</text>
            </g>
          `;
        }
      }

      const pathDomId = `synpath_${e.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
      svgWiresHtml += `
        <g class="syn-wire-group" data-edge-id="${e.id}" data-source="${e.source}" data-target="${e.target}">
          <path id="${pathDomId}" d="${dPath}" fill="none" stroke="${color}" stroke-width="${strokeW}"
            ${dash ? `stroke-dasharray="${dash}"` : ""} stroke-linecap="round" stroke-linejoin="round" />
          ${headSvg}
          ${badgeSvg}
        </g>
      `;

      wireSpecs.push({
        domId: pathDomId,
        edgeId: e.id,
        edgeType: e.edgeType,
        color,
        interrupted,
        source: e.source,
        target: e.target
      });
    });

    // Add electrical T-junction dots where a horizontal busbar feeds multiple branches
    busTapTracker.forEach((info) => {
      const uniqXs = Array.from(new Set(info.xs.map((v) => Math.round(v))));
      if (uniqXs.length >= 3) {
        // Draw junction dot at parent stem & interior taps
        uniqXs.sort((a, b) => a - b);
        for (let i = 0; i < uniqXs.length; i++) {
          if (i > 0 && i < uniqXs.length - 1) {
            junctionDots.set(`${uniqXs[i]},${Math.round(info.y)}`, info.color);
          } else if (Math.abs(uniqXs[i] - info.xs[0]) <= 2) {
            junctionDots.set(`${uniqXs[i]},${Math.round(info.y)}`, info.color);
          }
        }
      }
    });

    let dotsSvg = "";
    junctionDots.forEach((col, key) => {
      const [jx, jy] = key.split(",");
      dotsSvg += `<circle cx="${jx}" cy="${jy}" r="4.2" fill="${col}" stroke="${pal.surface}" stroke-width="1.4" />`;
    });

    // Build Crisp HTML Technical Cards
    let cardsHtml = "";
    nodes.forEach((n) => {
      const bx = boxes.get(n.id);
      if (!bx) return;
      const accent = resolveNodeCarrierColors(n, pal).fg;

      const isSel = n.id === state.selectedNodeId;
      const isTripped = state.opState === "emergency" && (
        TRIPPED_SOURCES_IN_EMERGENCY.has(n.id) ||
        (n.visIn > 0 && edges.filter((e) => e.target === n.id && e.edgeType !== "emergency_trip" && e.edgeType !== "earth_pe").every((e) => isEdgeInterruptedInEmergency(e)) &&
          edges.some((e) => e.target === n.id && e.edgeType !== "emergency_trip" && e.edgeType !== "earth_pe"))
      );
      const incs = INC_BY_NODE.get(n.id) || [];
      const shortRoom = (n.roomGroup || "").replace(/\s*\(.*?\)/g, "").replace(/Principale\s*—\s*/, "");
      const hasDrill = Boolean(n.internalGraph) && !n.isInternalComp;

      cardsHtml += `
        <div class="syn-card ${n.isBridge ? "is-bridge" : ""} ${isSel ? "is-selected" : ""} ${isTripped ? "is-tripped" : ""}"
          data-node-id="${n.id}"
          style="left:${bx.left.toFixed(1)}px; top:${bx.top.toFixed(1)}px; width:${CARD_W}px; height:${CARD_H}px; --card-accent:${accent};">
          <div class="syn-card-top">
            <span class="syn-code" title="${escXml(n.code)}">${escXml(n.code)}</span>
            ${incs.length > 0
              ? `<span style="background:var(--cp-warning); color:var(--cp-text); font-weight:700; padding:0 5px; border-radius:4px; font-size:9.5px;">⚠ ${incs.length}</span>`
              : `<span class="syn-room-chip" title="${escXml(n.roomGroup || "")}">${escXml(shortRoom)}</span>`
            }
          </div>
          <div class="syn-title" title="${escXml(n.label)}">${escXml(n.label)}</div>
          <div class="syn-func" title="${escXml(n.shortFunc || n.desc || "")}">${escXml(n.shortFunc || n.desc || "")}</div>
          ${hasDrill ? `
            <div class="syn-card-foot">
              <span style="font-size:9.2px; color:var(--cp-text-muted);">${(n.internalGraph.nodes || []).length} componenti</span>
              <button class="syn-drill-btn" data-drill-btn="${n.id}" title="Apri lo schema interno di questo quadro">🔬 Interno ▸</button>
            </div>
          ` : ""}
        </div>
      `;
    });

    board.innerHTML = `
      ${bandsHtml}
      <svg class="syn-svg-layer" width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}">
        ${svgWiresHtml}
        ${dotsSvg}
      </svg>
      ${cardsHtml}
    `;

    // Cache SVGPathElements + totalLengths for 60 FPS animated flow shapes
    synView.animatedPaths = [];
    wireSpecs.forEach((ws) => {
      const pathEl = document.getElementById(ws.domId);
      const wireGrp = pathEl ? pathEl.parentElement : null;
      if (pathEl) {
        try {
          const totalLen = pathEl.getTotalLength();
          if (totalLen > 16) {
            synView.animatedPaths.push({ ...ws, pathEl, wireGrp, totalLen });
          }
        } catch (_) { /* ignore */ }
      }
    });

    // Bind Card Click (focus + select) & Double-Click / Button (enter internal board)
    board.querySelectorAll("[data-drill-btn]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        enterBoardInternalMap(btn.dataset.drillBtn);
      });
    });

    board.querySelectorAll(".syn-card").forEach((cardEl) => {
      cardEl.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const nid = cardEl.dataset.nodeId;
        state.focusedNodeId = state.focusedNodeId === nid ? null : nid;
        selectNode(nid, false);
        if (state.isFullscreen) {
          document.getElementById("inspector").classList.remove("closed-in-fs");
        }
      });

      cardEl.addEventListener("dblclick", (ev) => {
        ev.stopPropagation();
        const nid = cardEl.dataset.nodeId;
        const nd = findNodeAny(nid);
        if (nd && nd.internalGraph && !state.drillBoardId) {
          enterBoardInternalMap(nid);
        } else if (nd && (nd.isBridge || (state.activePlant === "IMP-INGRESSI" && nd.plant !== "IMP-INGRESSI"))) {
          state.activePlant = nd.plant;
          state.drillBoardId = null;
          state.focusedNodeId = null;
          state.selectedNodeId = nid;
          refreshAll();
        }
      });
    });

    fitSynopticBoard();
    applySynopticFocus();
    resizeFlowCanvas();
  }

  // Post-layout anti-overlap nudge for dynamic engines (ELK / Cola / fCoSE / Dagre)
  function resolveDynamicOverlaps(cy) {
    if (!cy || state.layoutEngine === "synoptic") return;
    const leafNodes = cy.nodes("[!isGroup]");
    const nLen = leafNodes.length;
    if (nLen < 2) return;

    const padX = 28;
    const padY = 26;
    let movedAny = false;

    for (let iter = 0; iter < 12; iter++) {
      let overlapFound = false;
      for (let i = 0; i < nLen; i++) {
        const a = leafNodes[i];
        const pa = a.position();
        const wa = (a.data("nodeW") || 268) + padX;
        const ha = (a.data("nodeH") || 128) + padY;

        for (let j = i + 1; j < nLen; j++) {
          const b = leafNodes[j];
          const pb = b.position();
          const wb = (b.data("nodeW") || 268) + padX;
          const hb = (b.data("nodeH") || 128) + padY;

          const overlapX = (wa + wb) / 2 - Math.abs(pb.x - pa.x);
          const overlapY = (ha + hb) / 2 - Math.abs(pb.y - pa.y);

          if (overlapX > 0.5 && overlapY > 0.5) {
            overlapFound = true;
            movedAny = true;
            if (overlapX < overlapY) {
              const dir = pb.x >= pa.x ? 1 : -1;
              const shift = overlapX / 2 + 2;
              a.position({ x: pa.x - dir * shift, y: pa.y });
              b.position({ x: pb.x + dir * shift, y: pb.y });
            } else {
              const dir = pb.y >= pa.y ? 1 : -1;
              const shift = overlapY / 2 + 2;
              a.position({ x: pa.x, y: pa.y - dir * shift });
              b.position({ x: pb.x, y: pb.y + dir * shift });
            }
          }
        }
      }
      if (!overlapFound) break;
    }

    // Also separate overlapping compound group containers cleanly
    const groups = cy.nodes("[?isGroup]");
    for (let gIter = 0; gIter < 10; gIter++) {
      let grpOverlap = false;
      for (let i = 0; i < groups.length; i++) {
        const ga = groups[i];
        const ba = ga.boundingBox({ includeLabels: false });
        for (let j = i + 1; j < groups.length; j++) {
          const gb = groups[j];
          const bb = gb.boundingBox({ includeLabels: false });
          const ox = Math.min(ba.x2, bb.x2) - Math.max(ba.x1, bb.x1) + 28;
          const oy = Math.min(ba.y2, bb.y2) - Math.max(ba.y1, bb.y1) + 28;
          if (ox > 1 && oy > 1) {
            grpOverlap = true;
            movedAny = true;
            const cax = (ba.x1 + ba.x2) / 2;
            const cbx = (bb.x1 + bb.x2) / 2;
            const cay = (ba.y1 + ba.y2) / 2;
            const cby = (bb.y1 + bb.y2) / 2;
            if (ox < oy) {
              const sgn = cbx >= cax ? 1 : -1;
              const dx = ox / 2 + 2;
              ga.descendants().forEach((ch) => ch.position("x", ch.position("x") - sgn * dx));
              gb.descendants().forEach((ch) => ch.position("x", ch.position("x") + sgn * dx));
            } else {
              const sgn = cby >= cay ? 1 : -1;
              const dy = oy / 2 + 2;
              ga.descendants().forEach((ch) => ch.position("y", ch.position("y") - sgn * dy));
              gb.descendants().forEach((ch) => ch.position("y", ch.position("y") + sgn * dy));
            }
          }
        }
      }
      if (!grpOverlap) break;
    }

    if (movedAny) {
      cy.fit(undefined, 46);
    }
  }

  // ==================== LAYOUT OPTIONS (STATIC SYNOPTIC + 4 DYNAMIC ENGINES) ====================
  function buildLayoutOptions(nodes, edges, animateTransition, synopticPosMap) {
    const anim = Boolean(animateTransition);
    const dir = state.flowDir;
    const hasGroups = state.groupBy !== "none";

    if (state.layoutEngine === "synoptic") {
      return {
        name: "preset",
        positions: synopticPosMap ? (node) => synopticPosMap.get(node.id()) : undefined,
        fit: true,
        padding: 46,
        animate: anim,
        animationDuration: anim ? 380 : 0,
        animationEasing: "ease-out-cubic"
      };
    }

    if (state.layoutEngine === "elk") {
      return {
        name: "elk",
        animate: anim,
        animationDuration: anim ? 520 : 0,
        animationEasing: "ease-out-cubic",
        fit: true,
        padding: 48,
        nodeDimensionsIncludeLabels: false,
        elk: {
          "algorithm": "layered",
          "elk.direction": dir === "LR" ? "RIGHT" : "DOWN",
          "elk.hierarchyHandling": "INCLUDE_CHILDREN",
          "elk.spacing.nodeNode": "76",
          "elk.spacing.edgeNode": "42",
          "elk.layered.spacing.nodeNodeBetweenLayers": "128",
          "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
          "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
          "elk.padding": "[top=54,left=34,bottom=34,right=34]"
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
        nodeSpacing: hasGroups ? 48 : 56,
        edgeLength: 385,
        avoidOverlap: true,
        handleDisconnected: true,
        flow: {
          axis: dir === "LR" ? "x" : "y",
          minSeparation: dir === "LR" ? 395 : 225
        }
      };
    }

    if (state.layoutEngine === "fcose") {
      const constraints = [];
      if (!hasGroups) {
        const seen = new Set();
        edges.forEach((e) => {
          if (e.edgeType === "emergency_trip") return;
          const k1 = `${e.source}->${e.target}`;
          const k2 = `${e.target}->${e.source}`;
          if (seen.has(k1) || seen.has(k2)) return;
          seen.add(k1);
          if (dir === "LR") constraints.push({ left: e.source, right: e.target, gap: 340 });
          else constraints.push({ top: e.source, bottom: e.target, gap: 195 });
        });
      }

      return {
        name: "fcose",
        quality: "proof",
        randomize: true,
        animate: anim,
        animationDuration: anim ? 550 : 0,
        fit: true,
        padding: 50,
        nodeSeparation: 165,
        idealEdgeLength: 315,
        nodeRepulsion: 34000,
        gravity: 0.20,
        nestingFactor: 0.85,
        tilingPaddingVertical: 54,
        tilingPaddingHorizontal: 54,
        relativePlacementConstraint: constraints.length ? constraints.slice(0, 24) : undefined
      };
    }

    // Dagre
    return {
      name: "dagre",
      rankDir: dir,
      nodeSep: 76,
      rankSep: dir === "LR" ? 165 : 132,
      animate: anim,
      animationDuration: anim ? 480 : 0,
      fit: true,
      padding: 50
    };
  }

  // ==================== EMERGENCY / FAULT SIMULATION LOGIC ====================
  function isEdgeInterruptedInEmergency(edgeObj) {
    if (state.opState !== "emergency") return false;
    const et = edgeObj.edgeType;
    // Emergency trip commands, fire-resistant lines (except Q7 Portoni EI which opens to close fire doors!), and earth discharges are ACTIVE in emergency!
    if (et === "emergency_trip" || et === "earth_pe") return false;
    if (TRIPPED_EDGE_IDS_IN_EMERGENCY.has(edgeObj.id)) return true;
    if (et === "fire_resistant") return false; // QEPA -> Fire pump & UPS-2 -> 24V loop stay alive!
    if (TRIPPED_SOURCES_IN_EMERGENCY.has(edgeObj.source)) return true;
    // Inside a drilled board: if parent board is tripped (not QEPA / RIP-250)
    if (state.drillBoardId && TRIPPED_SOURCES_IN_EMERGENCY.has(state.drillBoardId) && et === "power_bt") return true;
    return false;
  }

  // Continuous elastic physics loop (WebCola infinite mode from current coordinates without camera jump)
  function stopLivePhysics() {
    if (state.livePhysicsHandle && typeof state.livePhysicsHandle.stop === "function") {
      try { state.livePhysicsHandle.stop(); } catch (_) { /* ignore */ }
    }
    state.livePhysicsHandle = null;
  }

  function startLivePhysics(initialGrabbedNode = null) {
    if (!cyInstance || state.layoutEngine === "synoptic" || !state.livePhysics) return;
    if (state.livePhysicsHandle) return; // already running!
    state.livePhysicsHandle = cyInstance.layout({
      name: "cola",
      animate: true,
      infinite: true,
      fit: false,
      centerGraph: false,
      randomize: false,
      unconstrIter: 0,
      userConstIter: 0,
      allConstIter: 0,
      avoidOverlap: true,
      handleDisconnected: false,
      nodeSpacing: state.groupBy !== "none" ? 30 : 38,
      edgeLength: 300,
      convergenceThreshold: 0.001
    });
    state.livePhysicsHandle.run();

    if (initialGrabbedNode && state.livePhysicsHandle.adaptor) {
      const scr = initialGrabbedNode.scratch("cola");
      if (scr) {
        state.livePhysicsHandle.adaptor.dragstart(scr);
      }
    }
  }

  // ==================== RENDER DIAGRAM (SYNOPTIC BOARD OR CYTOSCAPE GRAPH) ====================
  function renderCytoscape(animateRelayout = false) {
    stopLivePhysics();
    if (state.layoutEngine === "synoptic") {
      if (state.activeLayoutHandle && typeof state.activeLayoutHandle.stop === "function") {
        try { state.activeLayoutHandle.stop(); } catch (_) { /* ignore */ }
      }
      if (cyInstance) {
        cyInstance.destroy();
        cyInstance = null;
      }
      renderSynopticBoard();
      return;
    }

    const synStage = document.getElementById("synopticStage");
    if (synStage) synStage.style.display = "none";
    synView.animatedPaths = [];

    const container = document.getElementById("cyCanvas");
    container.style.display = "block";
    const pal = getPalette();
    const { nodes, edges, isInternal, parentBoard } = computeCurrentGraph();

    // Update breadcrumb bar & bridges checkbox visibility
    const bc = document.getElementById("drillBreadcrumb");
    if (isInternal && parentBoard) {
      bc.classList.add("active");
      document.getElementById("drillTitle").textContent = `🔬 Dentro il Quadro: ${parentBoard.code} — ${parentBoard.label}`;
      document.getElementById("drillSubtitle").textContent = `Mappa di dettaglio dei componenti interni (${nodes.length} componenti · ${edges.length} collegamenti interni)`;
      document.getElementById("lblBridges").style.display = "none";
    } else {
      bc.classList.remove("active");
      document.getElementById("lblBridges").style.display = state.activePlant === "IMP-INGRESSI" ? "none" : "inline-flex";
    }

    if (!nodes.some((n) => n.id === state.selectedNodeId)) {
      const defN = nodes.find((n) => !n.isBridge && n.roleType === "source") || nodes[0];
      if (defN) state.selectedNodeId = defN.id;
    }

    const isSynoptic = false;
    const synopticPosMap = null;
    const pairCounts = new Map();
    edges.forEach((e) => {
      const pk = [e.source, e.target].sort().join("::");
      pairCounts.set(pk, (pairCounts.get(pk) || 0) + 1);
    });

    const elements = [];
    const addedGroups = new Map();

    nodes.forEach((n) => {
      const grp = resolveNodeGroup(n, isInternal);
      if (grp && !addedGroups.has(grp.id)) {
        addedGroups.set(grp.id, grp.label);
      }
    });

    let gIdx = 0;
    addedGroups.forEach((gLabel, gId) => {
      elements.push({
        data: {
          id: gId,
          label: gLabel,
          isGroup: true,
          grpBg: gIdx % 2 === 0 ? pal.surface : pal.bgElevated,
          grpBorder: pal.borderStrong
        }
      });
      gIdx += 1;
    });

    nodes.forEach((n) => {
      const grp = resolveNodeGroup(n, isInternal);
      const card = buildNodeCardDataUri(n, pal, n.id === state.selectedNodeId);
      const elObj = {
        data: {
          id: n.id,
          parent: grp ? grp.id : undefined,
          cardUri: card.uri,
          nodeW: card.w,
          nodeH: card.h,
          isBridge: Boolean(n.isBridge),
          hasInternal: Boolean(n.internalGraph),
          plantId: n.plant
        }
      };
      if (isSynoptic && synopticPosMap && synopticPosMap.has(n.id)) {
        elObj.position = synopticPosMap.get(n.id);
      }
      elements.push(elObj);
    });

    edges.forEach((e) => {
      const interrupted = isEdgeInterruptedInEmergency(e);
      const cStyle = resolveCarrierStyle(e.edgeType, interrupted, pal);
      const color = cStyle.color;
      const lineStyle = cStyle.cyLineStyle;
      const width = cStyle.width;
      const arrowShape = cStyle.arrowShape;

      let lbl = `${e.flowCategory}: ${e.label}`;
      if (interrupted) {
        lbl = e.edgeType === "power_fv"
          ? `⛔ STOP ANTI-ISOLA CEI 0-21 (${e.label})`
          : `⛔ SEZIONATO DA SGANCIO (${e.label})`;
      }

      const curveCfg = { curveStyle: "bezier", cpDistances: [46], cpWeights: [0.5] };

      elements.push({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: lbl,
          color,
          lineStyle,
          width,
          arrowShape,
          edgeType: e.edgeType,
          interrupted,
          bidirectional: Boolean(e.bidirectional),
          curveStyle: curveCfg.curveStyle,
          cpDistances: curveCfg.cpDistances,
          cpWeights: curveCfg.cpWeights
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
      autoungrabify: isSynoptic, // In Mappa Ideale (Fissa), blocks CANNOT be dragged!
      wheelSensitivity: 0.24,
      minZoom: 0.16,
      maxZoom: 2.4,
      style: [
        {
          selector: "node[!isGroup]",
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
          selector: "node[?isGroup]",
          style: {
            "shape": "round-rectangle",
            "background-color": "data(grpBg)",
            "background-opacity": 0.62,
            "border-color": "data(grpBorder)",
            "border-width": 2.0,
            "border-style": "dashed",
            "label": "data(label)",
            "color": pal.text,
            "font-family": '"Segoe UI", Aptos, sans-serif',
            "font-size": 15.5,
            "font-weight": 700,
            "text-valign": "top",
            "text-halign": "left",
            "text-margin-x": 14,
            "text-margin-y": -6,
            "text-background-opacity": 0.95,
            "text-background-color": pal.surface,
            "text-background-padding": "6px",
            "text-background-shape": "roundrectangle",
            "text-border-width": 1,
            "text-border-color": pal.borderStrong,
            "text-border-opacity": 0.85,
            "padding": "32px"
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "data(curveStyle)",
            "control-point-step-size": 54,
            "control-point-distances": "data(cpDistances)",
            "control-point-weights": "data(cpWeights)",
            "width": "data(width)",
            "line-color": "data(color)",
            "line-style": "data(lineStyle)",
            "line-dash-pattern": [8, 5],
            "target-arrow-color": "data(color)",
            "target-arrow-shape": "data(arrowShape)",
            "arrow-scale": 1.25,
            "source-arrow-color": "data(color)",
            "source-arrow-shape": (ele) => ele.data("bidirectional") ? "triangle" : "none",
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
            "width": 4.4,
            "z-index": 20
          }
        }
      ],
      layout: { name: "preset" }
    });

    state.activeLayoutHandle = cyInstance.layout(buildLayoutOptions(nodes, edges, animateRelayout, synopticPosMap));
    cyInstance.one("layoutstop", () => {
      if (!isSynoptic) {
        resolveDynamicOverlaps(cyInstance);
        // In Cola mode start continuous physics right away; in ELK/fCoSE/Dagre preserve their crisp initial layout until the user grabs a node!
        if (state.livePhysics && state.layoutEngine === "cola") {
          startLivePhysics();
        }
      }
    });
    state.activeLayoutHandle.run();

    // Activate continuous physics rebalancing on first manual drag in any graph mode when toggle is ON!
    cyInstance.on("grab", "node[!isGroup]", (evt) => {
      if (state.livePhysics && !state.livePhysicsHandle) {
        startLivePhysics(evt.target);
      }
    });

    // Hover ONLY changes cursor (NO distracting hover dimming!)
    cyInstance.on("mouseover", "node[!isGroup]", () => {
      container.style.cursor = "pointer";
    });
    cyInstance.on("mouseout", "node[!isGroup]", () => {
      container.style.cursor = "default";
    });

    // Click = Focus neighborhood; Double-click = Enter internal switchboard map (or jump bridge)!
    let lastTapTime = 0;
    let lastTapId = null;

    cyInstance.on("tap", "node[!isGroup]", (evt) => {
      const n = evt.target;
      const nid = n.id();
      const now = Date.now();
      const isDouble = lastTapId === nid && (now - lastTapTime) < 360;
      lastTapTime = now;
      lastTapId = nid;

      if (isDouble) {
        if (n.data("hasInternal") && !state.drillBoardId) {
          enterBoardInternalMap(nid);
          return;
        }
        if (n.data("isBridge") || (state.activePlant === "IMP-INGRESSI" && n.data("plantId") !== "IMP-INGRESSI")) {
          state.activePlant = n.data("plantId");
          state.drillBoardId = null;
          state.focusedNodeId = null;
          state.selectedNodeId = nid;
          refreshAll();
          return;
        }
      }

      // Toggle click focus if clicking already-focused node, else focus it!
      if (state.focusedNodeId === nid) {
        state.focusedNodeId = null;
      } else {
        state.focusedNodeId = nid;
      }
      selectNode(nid, false);

      if (state.isFullscreen) {
        document.getElementById("inspector").classList.remove("closed-in-fs");
      }
    });

    cyInstance.on("tap", (evt) => {
      if (evt.target === cyInstance) {
        state.focusedNodeId = null;
        applyClickFocus();
        if (state.isFullscreen) {
          document.getElementById("inspector").classList.add("closed-in-fs");
        }
      }
    });

    applyClickFocus();
    resizeFlowCanvas();
  }

  function applyClickFocus() {
    if (state.layoutEngine === "synoptic") {
      applySynopticFocus();
      return;
    }
    const clearBtn = document.getElementById("btnClearFocus");
    if (!cyInstance) return;
    cyInstance.elements().removeClass("dimmed flow-highlight");

    if (!state.focusedNodeId) {
      clearBtn.style.display = "none";
      return;
    }

    const node = cyInstance.getElementById(state.focusedNodeId);
    if (!node || !node.length) {
      clearBtn.style.display = "none";
      return;
    }

    clearBtn.style.display = "inline-flex";
    const neighborhood = node.neighborhood().union(node);
    const parents = neighborhood.parents();
    cyInstance.elements().not(neighborhood.union(parents)).addClass("dimmed");
    node.connectedEdges().addClass("flow-highlight");
  }

  function refreshSelectedCardGraphics() {
    if (state.layoutEngine === "synoptic") {
      const board = document.getElementById("synopticBoard");
      if (board) {
        board.querySelectorAll(".syn-card").forEach((c) => {
          c.classList.toggle("is-selected", c.dataset.nodeId === state.selectedNodeId);
        });
      }
      return;
    }
    if (!cyInstance) return;
    const pal = getPalette();
    const { nodes } = computeCurrentGraph();
    nodes.forEach((n) => {
      const cyNode = cyInstance.getElementById(n.id);
      if (cyNode && cyNode.length) {
        const card = buildNodeCardDataUri(n, pal, n.id === state.selectedNodeId);
        cyNode.data("cardUri", card.uri);
      }
    });
  }

  function enterBoardInternalMap(boardId) {
    const b = NODE_MAP.get(boardId);
    if (!b || !b.internalGraph) return;
    state.drillBoardId = boardId;
    state.focusedNodeId = null;
    state.selectedNodeId = `${boardId}__MAIN`;
    renderCytoscape(true);
    renderInspector();
  }

  function exitBoardInternalMap() {
    const prevBoard = state.drillBoardId;
    state.drillBoardId = null;
    state.focusedNodeId = null;
    if (prevBoard) state.selectedNodeId = prevBoard;
    renderCytoscape(true);
    renderInspector();
  }

  // ==================== COLORBLIND-SAFE ORIENTED FLOW SHAPES (60 FPS) ====================
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

  function sampleEdgePoint(edge, t, zoom, pan) {
    const s = edge.renderedSourceEndpoint();
    const d = edge.renderedTargetEndpoint();
    if (!s || !d || Number.isNaN(s.x) || Number.isNaN(d.x)) return null;

    const cps = edge.controlPoints();
    if (cps && cps.length === 2) {
      const c0x = cps[0].x * zoom + pan.x;
      const c0y = cps[0].y * zoom + pan.y;
      const c1x = cps[1].x * zoom + pan.x;
      const c1y = cps[1].y * zoom + pan.y;
      const mt = 1 - t;
      return {
        x: mt * mt * mt * s.x + 3 * mt * mt * t * c0x + 3 * mt * t * t * c1x + t * t * t * d.x,
        y: mt * mt * mt * s.y + 3 * mt * mt * t * c0y + 3 * mt * t * t * c1y + t * t * t * d.y
      };
    }
    if (cps && cps.length >= 1) {
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

    return {
      x: s.x + (d.x - s.x) * t,
      y: s.y + (d.y - s.y) * t
    };
  }

  // Draw distinct geometric shapes oriented along angle theta (radians) for colorblind accessibility!
  function drawAccessibleFlowShape(ctx, shapeKind, x, y, theta, size, color, surfaceColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(theta);

    if (shapeKind === "triangle") {
      // ➤ Directional Solid Triangle / Chevron (Electrical Energy)
      ctx.beginPath();
      ctx.moveTo(size * 1.45, 0);
      ctx.lineTo(-size * 1.05, -size * 0.95);
      ctx.lineTo(-size * 0.55, 0);
      ctx.lineTo(-size * 1.05, size * 0.95);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = surfaceColor;
      ctx.stroke();
    } else if (shapeKind === "hexagon") {
      // ⬢ Solid Hexagon with contrasting center dot (Fire-Resistant / UPS Safety Power)
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const px = Math.cos(a) * size * 1.25;
        const py = Math.sin(a) * size * 1.25;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = surfaceColor;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = surfaceColor;
      ctx.fill();
    } else if (shapeKind === "packets") {
      // ▪▪ Twin Rectangular Digital Packets (BMS / Fiber / Intercom Signals)
      const w = size * 1.05;
      const h = size * 1.15;
      ctx.fillStyle = color;
      ctx.strokeStyle = surfaceColor;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.rect(-w * 1.25, -h / 2, w, h);
      ctx.rect(w * 0.25, -h / 2, w, h);
      ctx.fill();
      ctx.stroke();
    } else if (shapeKind === "diamond") {
      // ◇ Hollow High-Contrast Diamond (Emergency Trip Command)
      ctx.beginPath();
      ctx.moveTo(size * 1.4, 0);
      ctx.lineTo(0, -size * 1.15);
      ctx.lineTo(-size * 1.4, 0);
      ctx.lineTo(0, size * 1.15);
      ctx.closePath();
      ctx.fillStyle = surfaceColor;
      ctx.fill();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (shapeKind === "earth_wave") {
      // ⟫ Double Open Discharge Chevron toward Earth (Fault / Surge Discharge ONLY in Emergency)
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-size * 0.9, -size * 0.95);
      ctx.lineTo(size * 0.1, 0);
      ctx.lineTo(-size * 0.9, size * 0.95);
      ctx.moveTo(size * 0.15, -size * 0.95);
      ctx.lineTo(size * 1.15, 0);
      ctx.lineTo(size * 0.15, size * 0.95);
      ctx.stroke();
    }

    ctx.restore();
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

      if (state.animateFlows && state.layoutEngine === "synoptic" && synView.animatedPaths.length) {
        const pal = getPalette();
        const sc = synView.scale;
        const px = synView.panX;
        const py = synView.panY;

        synView.animatedPaths.forEach((ws, idx) => {
          if (ws.interrupted) return;
          if (ws.wireGrp && ws.wireGrp.classList.contains("dimmed")) return;
          const eType = ws.edgeType;
          if (state.opState === "normal" && (eType === "earth_pe" || eType === "emergency_trip")) {
            return;
          }

          const L = ws.totalLen;
          const renderedLen = L * sc;
          if (renderedLen < 20) return;

          let shapeKind = "triangle";
          let speed = 0.00024;
          if (eType === "fire_resistant") {
            shapeKind = "hexagon";
            speed = 0.00028;
          } else if (eType === "bms_bus" || eType === "tlc_signal") {
            shapeKind = "packets";
            speed = 0.00035;
          } else if (eType === "emergency_trip") {
            shapeKind = "diamond";
            speed = 0.00044;
          } else if (eType === "earth_pe") {
            shapeKind = "earth_wave";
            speed = 0.00042;
          }

          const count = Math.max(2, Math.min(4, Math.round(renderedLen / 150)));
          const size = 5.0 * Math.min(1.18, Math.max(0.75, sc));
          const phaseShift = (idx * 0.21) % 1;

          for (let k = 0; k < count; k++) {
            const t = ((timestamp * speed) + phaseShift + k / count) % 1;
            const dNow = t * L;
            const pt = ws.pathEl.getPointAtLength(dNow);
            const ptAhead = ws.pathEl.getPointAtLength(Math.min(L, dNow + 3));
            const ptBehind = ws.pathEl.getPointAtLength(Math.max(0, dNow - 3));
            const theta = Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x);
            drawAccessibleFlowShape(ctx, shapeKind, pt.x * sc + px, pt.y * sc + py, theta, size, ws.color, pal.surface);
          }
        });
      } else if (state.animateFlows && cyInstance) {
        const pal = getPalette();
        const zoom = cyInstance.zoom();
        const pan = cyInstance.pan();

        cyInstance.edges(":visible").forEach((edge, idx) => {
          if (edge.hasClass("dimmed")) return;
          if (edge.data("interrupted")) return; // Tripped branches have ZERO flow!

          const eType = edge.data("edgeType");

          // PHYSICAL FIDELITY: In Normal Operation, Earth (PE) and Emergency Trip wires carry NO flowing current!
          if (state.opState === "normal" && (eType === "earth_pe" || eType === "emergency_trip")) {
            return;
          }

          const s = edge.renderedSourceEndpoint();
          const d = edge.renderedTargetEndpoint();
          if (!s || !d) return;
          const dist = Math.hypot(d.x - s.x, d.y - s.y);
          if (dist < 22) return;

          let shapeKind = "triangle";
          let speed = 0.00026;
          if (eType === "fire_resistant") {
            shapeKind = "hexagon";
            speed = 0.00030;
          } else if (eType === "bms_bus" || eType === "tlc_signal") {
            shapeKind = "packets";
            speed = 0.00038;
          } else if (eType === "emergency_trip") {
            shapeKind = "diamond";
            speed = 0.00048;
          } else if (eType === "earth_pe") {
            shapeKind = "earth_wave";
            speed = 0.00046;
          }

          const count = Math.max(2, Math.min(4, Math.round(dist / 145)));
          const size = 5.4 * Math.min(1.22, Math.max(0.72, zoom));
          const col = edge.data("color");
          const phaseShift = (idx * 0.23) % 1;

          for (let k = 0; k < count; k++) {
            const t = ((timestamp * speed) + phaseShift + k / count) % 1;
            const pt = sampleEdgePoint(edge, t, zoom, pan);
            const ptAhead = sampleEdgePoint(edge, Math.min(1, t + 0.02), zoom, pan);
            const ptBehind = sampleEdgePoint(edge, Math.max(0, t - 0.02), zoom, pan);
            if (!pt || !ptAhead || !ptBehind) continue;

            const theta = Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x);
            drawAccessibleFlowShape(ctx, shapeKind, pt.x, pt.y, theta, size, col, pal.surface);
          }
        });
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);
  }

  // ==================== TOP STRIP & BANNER ====================
  function renderPlantStripAndBanner() {
    const strip = document.getElementById("plantStrip");
    const fsSelect = document.getElementById("fsPlantSelect");

    strip.innerHTML = DATA.plants.map((p) => {
      const isAct = p.id === state.activePlant;
      const cVar = `var(--plant-${p.swatch})`;
      const bgVar = `var(--plant-${p.swatch}-bg)`;
      return `
        <button class="plant-pill ${isAct ? "active" : ""}" data-plant="${p.id}" title="${p.name} — ${p.power}"
          style="${isAct ? `border-color:${cVar}; background:${bgVar};` : ""}">
          <span style="color:${cVar}; display:inline-flex; flex-shrink:0;">${getPlantIconSvg(p.icon, "currentColor")}</span>
          <span style="overflow:hidden; text-overflow:ellipsis;">${p.tabLabel || p.shortName}</span>
        </button>
      `;
    }).join("");

    strip.querySelectorAll(".plant-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activePlant = btn.dataset.plant;
        state.drillBoardId = null;
        state.focusedNodeId = null;
        refreshAll();
      });
    });

    fsSelect.innerHTML = DATA.plants.map((p) =>
      `<option value="${p.id}" ${p.id === state.activePlant ? "selected" : ""}>${p.name}</option>`
    ).join("");

    const activeP = PLANT_MAP.get(state.activePlant) || DATA.plants[0];
    const fg = activeP.flowGuide || {};
    const cVar = `var(--plant-${activeP.swatch})`;

    document.getElementById("howBanner").innerHTML = `
      <div class="how-step">
        <div class="how-step-k" style="color:var(--cp-success);">1 · 📥 Origine / Ingresso</div>
        <div>${fg.in || "-"}</div>
      </div>
      <div class="how-step">
        <div class="how-step-k" style="color:${cVar};">2 · 🛡️ Gestione &amp; Protezione</div>
        <div>${fg.process || "-"}</div>
      </div>
      <div class="how-step">
        <div class="how-step-k" style="color:var(--cp-link);">3 · 📤 Destinazione / Servizio</div>
        <div>${fg.out || "-"}</div>
      </div>
      <div style="text-align:right;">
        <span class="pill" style="color:${cVar}; background:var(--plant-${activeP.swatch}-bg);">${activeP.power}</span>
      </div>
    `;
  }

  // ==================== RIGHT INSPECTOR PANEL ====================
  function renderInspector() {
    const node = findNodeAny(state.selectedNodeId);
    if (!node) return;

    const p = PLANT_MAP.get(node.plant) || DATA.plants[0];
    const fl = FLOOR_MAP.get(node.floor) || { name: node.floor || "" };
    const cVar = `var(--plant-${p.swatch})`;

    const canDrillInternal = Boolean(node.internalGraph) && !state.drillBoardId;
    const canJumpPlant = !state.drillBoardId && node.plant !== state.activePlant && node.plant !== "IMP-INGRESSI";

    document.getElementById("inspHeader").innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <span class="pill" style="color:${cVar}; background:var(--plant-${p.swatch}-bg);">
          ${getPlantIconSvg(p.icon, "currentColor")}
          <span>${node.roleLabel || p.shortName}</span>
        </span>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="mono" style="font-size:11px; color:var(--cp-text-muted);">${node.roomGroup || fl.name}</span>
          <button id="btnCloseInspFs" class="btn fs-only" style="padding:2px 7px; font-size:11px;">✕</button>
        </div>
      </div>
      <h3 class="insp-title">${node.label}</h3>
      <div class="mono" style="font-size:11.5px; color:var(--cp-text-muted);">Sigla: <strong>${node.code}</strong> · ${fl.name}</div>

      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:9px;">
        ${canDrillInternal ? `
          <button id="btnEnterInternal" class="btn btn-primary" style="font-size:12px;">
            🔬 Esplora Componenti Interni del Quadro (${node.internalGraph.nodes.length})
          </button>
        ` : ""}
        ${state.drillBoardId ? `
          <button id="btnBackFromInsp" class="btn" style="font-size:12px;">← Torna alla Mappa Impianto</button>
        ` : ""}
        ${canJumpPlant ? `
          <button id="btnJumpPlant" class="btn" style="font-size:12px;">↪ Apri Impianto "${p.shortName}" →</button>
        ` : ""}
      </div>
    `;

    const bClose = document.getElementById("btnCloseInspFs");
    if (bClose) bClose.addEventListener("click", () => document.getElementById("inspector").classList.add("closed-in-fs"));
    const bInt = document.getElementById("btnEnterInternal");
    if (bInt) bInt.addEventListener("click", () => enterBoardInternalMap(node.id));
    const bBack = document.getElementById("btnBackFromInsp");
    if (bBack) bBack.addEventListener("click", exitBoardInternalMap);
    const bJump = document.getElementById("btnJumpPlant");
    if (bJump) bJump.addEventListener("click", () => {
      state.activePlant = node.plant;
      state.drillBoardId = null;
      state.focusedNodeId = null;
      refreshAll();
    });

    const { edges: curEdges, nodes: curNodes, isInternal } = computeCurrentGraph();
    const curMap = new Map(curNodes.map((x) => [x.id, x]));
    const refEdges = isInternal ? curEdges : DATA.edges.filter((e) => e.edgeType !== "doc_trace");
    const lookupNode = (id) => curMap.get(id) || NODE_MAP.get(id);

    const incoming = refEdges.filter((e) => e.target === node.id);
    const outgoing = refEdges.filter((e) => e.source === node.id);
    const dsList = (node.datasheetIds || []).map((id) => DS_MAP.get(id)).filter(Boolean);
    const incs = INC_BY_NODE.get(node.id) || [];

    const renderIoCard = (edge, otherId, dirPrefix) => {
      const other = lookupNode(otherId);
      if (!other) return "";
      const op = PLANT_MAP.get(other.plant) || p;
      const crossTag = (!isInternal && other.plant !== node.plant)
        ? `<span class="pill" style="font-size:10px; color:var(--plant-${op.swatch});">🔗 ${op.shortName}</span>`
        : "";
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

    const isEarthSink = node.id === "TERRA-RETE" || (node.code && node.code.includes("TERRA PE"));

    const body = document.getElementById("inspBody");
    body.innerHTML = `
      <div class="func-callout">
        <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:var(--cp-accent); margin-bottom:3px;">Funzione del Blocco</div>
        <div style="font-weight:700; font-size:13.5px; margin-bottom:5px;">${node.shortFunc || ""}</div>
        ${node.desc ? `<div style="font-size:12.5px; color:var(--cp-text-muted);">${node.desc}</div>` : ""}
      </div>

      ${node.emergencyNote ? `
        <div class="emg-callout">
          <strong>🚒 Comportamento in Emergenza / Nota Tecnica:</strong><br/>
          ${node.emergencyNote}
        </div>
      ` : ""}

      <div class="io-section">
        <h4 class="io-hdr" style="color:var(--cp-link);">
          ${isEarthSink ? `⏚ Riceve scariche di guasto / fulmine da (${incoming.length})` : `📥 Da dove entra energia / segnale (${incoming.length})`}
        </h4>
        ${incoming.length
          ? incoming.map((e) => renderIoCard(e, e.source, "⬅ Da:")).join("")
          : `<div style="font-size:12px; color:var(--cp-text-muted);">★ Origine primaria del flusso (alimentato da rete esterna o captazione diretta).</div>`
        }
      </div>

      <div class="io-section">
        <h4 class="io-hdr" style="color:var(--cp-accent);">📤 Dove esce / cosa alimenta o comanda (${outgoing.length})</h4>
        ${outgoing.length
          ? outgoing.map((e) => renderIoCard(e, e.target, "➡ Verso:")).join("")
          : `<div style="font-size:12px; color:var(--cp-text-muted);">${isEarthSink ? "⏚ Disperde nel terreno: non invia mai elettricità verso l'impianto." : "🎯 Destinazione finale del servizio."}</div>`
        }
      </div>

      ${(node.circuits && node.circuits.length) ? `
        <details class="acc-block" open>
          <summary>
            <span>🔌 Elenco Partenze &amp; Circuiti Interni (${node.circuits.length})</span>
            <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
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
            <span>📚 Componenti &amp; Schede Tecniche PDF (${dsList.length} PDF)</span>
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
          <span>📐 Dati di Targa &amp; Riferimenti Documentali</span>
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
        const { nodes: visNodes } = computeCurrentGraph();
        if (visNodes.some((x) => x.id === tid)) {
          state.focusedNodeId = tid;
          selectNode(tid, true);
        } else if (NODE_MAP.has(tid)) {
          const target = NODE_MAP.get(tid);
          state.drillBoardId = null;
          state.activePlant = target.plant;
          state.selectedNodeId = tid;
          state.focusedNodeId = tid;
          refreshAll();
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
    applyClickFocus();
    renderInspector();
    if (centerInGraph) {
      if (state.layoutEngine === "synoptic") {
        const cardEl = document.querySelector(`.syn-card[data-node-id="${CSS.escape(nodeId)}"]`);
        const stage = document.getElementById("synopticStage");
        if (cardEl && stage) {
          const cx = parseFloat(cardEl.style.left) + parseFloat(cardEl.style.width) / 2;
          const cy = parseFloat(cardEl.style.top) + parseFloat(cardEl.style.height) / 2;
          synView.panX = stage.clientWidth / 2 - cx * synView.scale;
          synView.panY = stage.clientHeight / 2 - cy * synView.scale;
          applySynopticTransform();
        }
      } else if (cyInstance) {
        const el = cyInstance.getElementById(nodeId);
        if (el && el.length) cyInstance.animate({ center: { eles: el }, duration: 280 });
      }
    }
  }

  function setFullscreenState(enable) {
    state.isFullscreen = enable;
    document.getElementById("appShell").classList.toggle("is-fullscreen", enable);
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
      if (state.layoutEngine === "synoptic") {
        fitSynopticBoard();
      } else if (cyInstance) {
        cyInstance.resize();
        cyInstance.fit(undefined, 48);
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
            state.drillBoardId = null;
            state.activePlant = first.plant;
            state.selectedNodeId = first.id;
            state.focusedNodeId = first.id;
            refreshAll();
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

      const nodeHits = [];
      const circHits = [];
      DATA.nodes.forEach((n) => {
        if (n.nodeClass === "doc_reference") return;
        const hay = `${n.code} ${n.label} ${n.shortFunc || ""} ${n.roomGroup || ""} ${n.desc}`.toLowerCase();
        if (hay.includes(q)) {
          nodeHits.push({ kind: PLANT_MAP.get(n.plant)?.shortName || "Impianto", title: `${n.label} (${n.code})`, sub: n.shortFunc, nodeId: n.id, drill: false });
        }
        (n.circuits || []).forEach((c) => {
          if (`${c.code} ${c.desc} ${c.breaker || ""}`.toLowerCase().includes(q)) {
            circHits.push({ kind: `🔬 Interno ${n.code}`, title: `${c.code} — ${c.desc}`, sub: c.breaker || "", nodeId: n.id, drill: true });
          }
        });
      });
      const hits = [...nodeHits, ...circHits];

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
            if (h.drill && target.internalGraph) {
              renderPlantStripAndBanner();
              enterBoardInternalMap(target.id);
            } else {
              state.drillBoardId = null;
              state.selectedNodeId = target.id;
              state.focusedNodeId = target.id;
              refreshAll();
            }
          }
        });
      });
      dd.classList.add("open");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap")) dd.classList.remove("open");
    });
  }

  function syncToolbarMode() {
    const isSyn = state.layoutEngine === "synoptic";
    const badge = document.getElementById("staticModeBadge");
    const dynWrap = document.getElementById("dynamicControlsWrap");
    if (badge) badge.style.display = isSyn ? "inline-flex" : "none";
    if (dynWrap) dynWrap.style.display = isSyn ? "none" : "inline-flex";
  }

  function refreshAll() {
    syncToolbarMode();
    renderPlantStripAndBanner();
    renderCytoscape(false);
    renderInspector();
  }

  function init() {
    document.querySelectorAll("[data-layout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.layoutEngine = btn.dataset.layout;
        document.querySelectorAll("[data-layout]").forEach((b) => b.classList.toggle("active", b === btn));
        syncToolbarMode();
        renderCytoscape(true);
      });
    });

    document.querySelectorAll("[data-dir]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.flowDir = btn.dataset.dir;
        document.querySelectorAll("[data-dir]").forEach((b) => b.classList.toggle("active", b === btn));
        renderCytoscape(true);
      });
    });

    document.getElementById("groupSelect").addEventListener("change", (e) => {
      state.groupBy = e.target.value;
      renderCytoscape(true);
    });

    document.getElementById("btnReLayout").addEventListener("click", () => {
      renderCytoscape(true);
    });

    const chkLive = document.getElementById("chkLivePhysics");
    const lblLive = document.getElementById("lblLivePhysics");
    if (chkLive) {
      chkLive.addEventListener("change", (e) => {
        state.livePhysics = e.target.checked;
        if (lblLive) {
          lblLive.style.borderColor = state.livePhysics ? "var(--cp-accent)" : "var(--cp-border)";
          lblLive.style.background = state.livePhysics ? "var(--cp-accent-soft)" : "var(--cp-surface)";
        }
        if (state.livePhysics) {
          startLivePhysics();
        } else {
          stopLivePhysics();
        }
      });
    }

    document.querySelectorAll("[data-opstate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.opState = btn.dataset.opstate;
        document.querySelectorAll("[data-opstate]").forEach((b) => b.classList.toggle("active", b === btn));
        renderCytoscape(false);
      });
    });

    document.getElementById("btnToggleFlow").addEventListener("click", (e) => {
      state.animateFlows = !state.animateFlows;
      e.currentTarget.textContent = state.animateFlows ? "⏸ Pausa" : "▶ Avvia";
    });

    document.getElementById("chkBridges").addEventListener("change", (e) => {
      state.showBridges = e.target.checked;
      renderCytoscape(true);
    });

    document.getElementById("btnClearFocus").addEventListener("click", () => {
      state.focusedNodeId = null;
      applyClickFocus();
    });

    document.getElementById("btnExitBoardDrill").addEventListener("click", exitBoardInternalMap);

    document.getElementById("btnFit").addEventListener("click", () => {
      if (state.layoutEngine === "synoptic") {
        fitSynopticBoard();
      } else if (cyInstance) {
        cyInstance.fit(undefined, 48);
      }
    });

    document.getElementById("btnTogglePanel").addEventListener("click", () => {
      if (state.isFullscreen) {
        document.getElementById("inspector").classList.toggle("closed-in-fs");
      } else {
        document.getElementById("mainSplit").classList.toggle("panel-hidden");
        setTimeout(() => {
          resizeFlowCanvas();
          if (state.layoutEngine === "synoptic") fitSynopticBoard();
          else if (cyInstance) cyInstance.resize();
        }, 60);
      }
    });

    // Pan, Wheel-Zoom & Background Click on Synoptic Stage
    const synStage = document.getElementById("synopticStage");
    let isPanningSyn = false;
    let panStartX = 0;
    let panStartY = 0;
    let panMoved = false;

    synStage.addEventListener("mousedown", (e) => {
      if (e.button !== 0 || e.target.closest(".syn-card")) return;
      isPanningSyn = true;
      panMoved = false;
      panStartX = e.clientX - synView.panX;
      panStartY = e.clientY - synView.panY;
      synStage.classList.add("panning");
    });

    window.addEventListener("mousemove", (e) => {
      if (!isPanningSyn) return;
      const nx = e.clientX - panStartX;
      const ny = e.clientY - panStartY;
      if (Math.hypot(nx - synView.panX, ny - synView.panY) > 3) panMoved = true;
      synView.panX = nx;
      synView.panY = ny;
      applySynopticTransform();
    });

    window.addEventListener("mouseup", () => {
      if (isPanningSyn) {
        isPanningSyn = false;
        synStage.classList.remove("panning");
      }
    });

    synStage.addEventListener("click", (e) => {
      if (panMoved || e.target.closest(".syn-card")) return;
      state.focusedNodeId = null;
      applySynopticFocus();
      if (state.isFullscreen) {
        document.getElementById("inspector").classList.add("closed-in-fs");
      }
    });

    synStage.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = synStage.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.11 : 0.90;
      const nextScale = Math.min(2.1, Math.max(0.24, synView.scale * factor));
      synView.panX = mx - ((mx - synView.panX) / synView.scale) * nextScale;
      synView.panY = my - ((my - synView.panY) / synView.scale) * nextScale;
      synView.scale = nextScale;
      applySynopticTransform();
    }, { passive: false });

    document.getElementById("btnFullscreen").addEventListener("click", () => setFullscreenState(true));
    document.getElementById("btnExitFullscreen").addEventListener("click", () => setFullscreenState(false));
    document.getElementById("fsPlantSelect").addEventListener("change", (e) => {
      state.activePlant = e.target.value;
      state.drillBoardId = null;
      state.focusedNodeId = null;
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
        } else if (state.drillBoardId) {
          exitBoardInternalMap();
        } else if (state.isFullscreen) {
          setFullscreenState(false);
        }
      }
    });

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
      if (state.layoutEngine === "synoptic") fitSynopticBoard();
      else if (cyInstance) cyInstance.resize();
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
