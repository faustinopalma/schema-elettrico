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

  // Curated set of nodes for "0. Mappa Contatori, Ingressi & Alimentazione Box"
  const METERS_OVERVIEW_IDS = new Set([
    "RETE-DISTRIBUTORE",
    "POD-SSC", "POD-SCA", "POD-SCB", "POD-PDC",
    "CONTATORI-ALLOGGI-A", "CONTATORI-ALLOGGI-B",
    "RIP-250", "QEPA",
    "AVSSC", "QESSC",
    "Q6-BOX-SEC", "BOX-INTERNI-P1", "BOX-INTERNI-P2",
    "AVSCA", "QESCA",
    "AVSCB", "QESCB",
    "AVPC", "QEPC", "GEN-FV-ROOF"
  ]);

  // Branches interrupted when Emergency / Shunt Trip Simulation is active
  const TRIPPED_SOURCES_IN_EMERGENCY = new Set([
    "Q6-BOX-SEC", "QELP", "AVSCA", "QESCA", "AVSCB", "QESCB", "AVPC", "QEPC", "GEN-FV-ROOF", "UPS-1-EI"
  ]);
  const TRIPPED_EDGE_IDS_IN_EMERGENCY = new Set([
    "e07", "e_q6_in", "e_box_p1", "e_box_p2", "e52", "e53", "e_f1", "e20"
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
    activeLayoutHandle: null
  };

  let cyInstance = null;
  let rafId = null;

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
    const col = plantColors(node.plant, pal);
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

  // ==================== AUTHORED IDEAL STATIC SYNOPTIC MAPS (ZERO OVERLAPS, FIXED BLOCKS) ====================
  const SYNOPTIC_POSITIONS = {
    "IMP-INGRESSI": {
      "RETE-DISTRIBUTORE":   { x: 380,  y: 0 },
      // Locale Contatori Principale — Piano Terra (4 Contatori Parti Comuni + Quadri Generali)
      "POD-SSC":             { x: -700, y: 255 },
      "POD-SCA":             { x: 60,   y: 255 },
      "POD-SCB":             { x: 560,  y: 255 },
      "POD-PDC":             { x: 1060, y: 255 },
      "RIP-250":             { x: -700, y: 475 },
      "AVSCA":               { x: 60,   y: 475 },
      "AVSCB":               { x: 560,  y: 475 },
      "AVPC":                { x: 1060, y: 475 },
      "AVSSC":               { x: -885, y: 695 },
      "QEPA":                { x: -515, y: 695 },
      "QESSC":               { x: -885, y: 915 },
      "Q6-BOX-SEC":          { x: -515, y: 915 },
      // Copertura Edifici (+48 m)
      "GEN-FV-ROOF":         { x: 1530, y: 475 },
      // Piani Interrati (-1 e -2): 4 zone fisiche completamente separate in orizzontale
      "BOX-INTERNI-P1":      { x: -910, y: 1245 },
      "BOX-INTERNI-P2":      { x: -535, y: 1245 },
      "QESCA":               { x: -75,  y: 1245 },
      "CONTATORI-ALLOGGI-A": { x: 285,  y: 1245 },
      "QESCB":               { x: 685,  y: 1245 },
      "CONTATORI-ALLOGGI-B": { x: 1045, y: 1245 },
      "QEPC":                { x: 1445, y: 1245 }
    },
    "IMP-SSC": {
      "RETE-DISTRIBUTORE":   { x: -375, y: -250 },
      // Locale Contatori Principale — Piano Terra
      "POD-SSC":             { x: -375, y: 0 },
      "RIP-250":             { x: -375, y: 220 },
      "AVSSC":               { x: -560, y: 440 },
      "QEPA":                { x: -190, y: 440 },
      "QESSC":               { x: -560, y: 660 },
      "Q6-BOX-SEC":          { x: -190, y: 660 },
      // Portineria & Ingressi (P. Terra)
      "FTTH-CSOE":           { x: 265,  y: 220 },
      "VIDEOCITOFONO":       { x: 630,  y: 220 },
      "QEPOR":               { x: 265,  y: 440 },
      "IRA-CENTRALI":        { x: 630,  y: 440 },
      "SGANCI-VVF":          { x: 995,  y: 440 },
      // Aree Esterne & Sottosuolo
      "LD-ESTERNI":          { x: 265,  y: 690 },
      "TERRA-RETE":          { x: 630,  y: 690 },
      // Locale Contatori Scala A (-1) per ponti UPS
      "UPS-1-EI":            { x: 1030, y: 690 },
      "UPS-2-SGANCIO":       { x: 1395, y: 690 },
      // Piani Interrati (-1 e -2): 4 blocchi di stanze distinti da sinistra a destra
      "BOX-INTERNI-P1":      { x: -1020, y: 1010 },
      "BOX-INTERNI-P2":      { x: -655,  y: 1010 },
      "LD-BOX":              { x: -290,  y: 1010 },
      "QECI":                { x: 135,   y: 1010 },
      "LD-IDRICO":           { x: 135,   y: 1235 },
      "QECT":                { x: 535,   y: 1010 },
      "QEREG":               { x: 895,   y: 1010 },
      "LD-POMPE-CT":         { x: 535,   y: 1235 },
      "QELP":                { x: 1300,  y: 1010 },
      "LD-FALDA":            { x: 1300,  y: 1235 },
      "LD-POMPA-VVF":        { x: 1660,  y: 1235 }
    },
    "IMP-SCA": {
      "RETE-DISTRIBUTORE":   { x: 0,    y: -250 },
      "POD-SCA":             { x: 0,    y: 0 },
      "AVSCA":               { x: 0,    y: 220 },
      "QESCA":               { x: 0,    y: 485 },
      // Portineria & Terra (ponti opzionali)
      "VIDEOCITOFONO":       { x: -990, y: 220 },
      "SGANCI-VVF":          { x: -625, y: 220 },
      "FTTH-CSOE":           { x: -990, y: 445 },
      "IRA-CENTRALI":        { x: -625, y: 445 },
      "TERRA-RETE":          { x: 520,  y: 485 },
      // Ventaglio 5 destinazioni Torre A
      "QEPL":                { x: -750, y: 805 },
      "QEDB":                { x: -385, y: 805 },
      "LD-SCALA-CANT-A":     { x: 0,    y: 805 },
      "QEP-TORRE-A":         { x: 385,  y: 805 },
      "MBUS-CONTAB":         { x: 385,  y: 1030 },
      "LD-ROOF-A":           { x: 770,  y: 805 }
    },
    "IMP-SCB": {
      "RETE-DISTRIBUTORE":   { x: 0,    y: -250 },
      "POD-SCB":             { x: 0,    y: 0 },
      "AVSCB":               { x: 0,    y: 220 },
      "QESCB":               { x: 0,    y: 485 },
      // Portineria & Terra (ponti opzionali)
      "VIDEOCITOFONO":       { x: -990, y: 220 },
      "SGANCI-VVF":          { x: -625, y: 220 },
      "FTTH-CSOE":           { x: -990, y: 445 },
      "IRA-CENTRALI":        { x: -625, y: 445 },
      "TERRA-RETE":          { x: 520,  y: 485 },
      // Ventaglio 5 destinazioni Torre B
      "QESR":                { x: -750, y: 805 },
      "QESP":                { x: -385, y: 805 },
      "LD-SCALA-CANT-B":     { x: 0,    y: 805 },
      "QEP-TORRE-B":         { x: 385,  y: 805 },
      "MBUS-CONTAB":         { x: 385,  y: 1030 },
      "LD-ROOF-B":           { x: 770,  y: 805 }
    },
    "IMP-PDC": {
      "RETE-DISTRIBUTORE":   { x: -245, y: -250 },
      "POD-PDC":             { x: -245, y: 0 },
      "AVPC":                { x: -245, y: 225 },
      "SGANCI-VVF":          { x: -690, y: 225 },
      "GEN-FV-ROOF":         { x: 265,  y: 225 },
      "QEREG":               { x: -375, y: 540 },
      "QEPC":                { x: 10,   y: 540 },
      "LD-PDC-UNITS":        { x: 10,   y: 770 },
      "TERRA-RETE":          { x: 500,  y: 540 }
    },
    "IMP-FIRE": {
      // Locale Contatori Principale — Piano Terra
      "RIP-250":             { x: -1080, y: 0 },
      "QEPA":                { x: -715,  y: 0 },
      "AVSSC":               { x: -1080, y: 220 },
      "AVSCA":               { x: -350,  y: 220 },
      "AVSCB":               { x: 15,    y: 220 },
      "AVPC":                { x: 380,   y: 220 },
      "QESSC":               { x: -1080, y: 440 },
      "Q6-BOX-SEC":          { x: -715,  y: 440 },
      // Portineria & Ingressi (P. Terra)
      "QEPOR":               { x: 1180,  y: 0 },
      "SGANCI-VVF":          { x: 815,   y: 220 },
      "IRA-CENTRALI":        { x: 1180,  y: 220 },
      // Piani Interrati (-1 e -2) — 4 stanze ben distanziate
      "LD-POMPA-VVF":        { x: -1080, y: 810 },
      "LD-BOX":              { x: -690,  y: 810 },
      "FIRE-PORTONI-EI":     { x: -325,  y: 810 },
      "UPS-1-EI":            { x: 100,   y: 780 },
      "UPS-2-SGANCIO":       { x: 465,   y: 780 },
      "QESCA":               { x: 100,   y: 1005 },
      "QESCB":               { x: 900,   y: 810 }
    },
    "IMP-BMS": {
      "QECI":                { x: -830, y: 240 },
      "BMS-SONDE-CAMPO":     { x: 0,    y: 0 },
      "QECT":                { x: -375, y: 240 },
      "QEREG":               { x: 0,    y: 240 },
      "QEPC":                { x: 375,  y: 240 },
      "BMS-ATTUATORI-VALV":  { x: 0,    y: 480 },
      "QELP":                { x: 830,  y: 240 },
      "QEP-TORRE-A":         { x: -375, y: 780 },
      "MBUS-CONTAB":         { x: 0,    y: 780 },
      "QEP-TORRE-B":         { x: 375,  y: 780 }
    },
    "IMP-TLC": {
      "QESCA":               { x: -960, y: 0 },
      "QESCB":               { x: -960, y: 265 },
      "TLC-ANTENNE-STOM":    { x: -200, y: 0 },
      "QESSC":               { x: 480,  y: 0 },
      "QEPOR":               { x: -530, y: 280 },
      "FTTH-CSOE":           { x: -165, y: 280 },
      "VIDEOCITOFONO":       { x: 200,  y: 280 },
      "QEPL":                { x: 640,  y: 280 },
      "QESR":                { x: 1005, y: 280 },
      "TLC-ALLOGGI-STOA":    { x: 15,   y: 580 }
    },
    "IMP-GND": {
      "GND-SPD-4X":          { x: 0,    y: 0 },
      "QESCA":               { x: -820, y: 265 },
      "QESSC":               { x: -375, y: 265 },
      "GND-COLLETTORI-EQP":  { x: 0,    y: 265 },
      "QESCB":               { x: 440,  y: 265 },
      "QEPC":                { x: 880,  y: 265 },
      "TERRA-RETE":          { x: 0,    y: 575 }
    }
  };

  function computeInternalSynopticPositions(nodes) {
    const pos = new Map();
    const sec1 = nodes.filter((n) => (n.roleGroup || "").startsWith("1 ·"));
    const sec2 = nodes.filter((n) => (n.roleGroup || "").startsWith("2 ·"));
    const sec3 = nodes.filter((n) => (n.roleGroup || "").startsWith("3 ·"));
    const sec4 = nodes.filter((n) => (n.roleGroup || "").startsWith("4 ·"));

    // Section 1: Incomer & Main Breaker (+ optional Type B Relay)
    const inNode = sec1.find((n) => n.id.endsWith("__IN"));
    const mainNode = sec1.find((n) => n.id.endsWith("__MAIN"));
    const derNode = sec1.find((n) => n.id.endsWith("__DER"));
    if (inNode) pos.set(inNode.id, { x: 0, y: 0 });
    if (mainNode) pos.set(mainNode.id, { x: 0, y: 195 });
    if (derNode) pos.set(derNode.id, { x: -350, y: 195 });

    // Section 2: Main Busbar, Multimeter, SPD -> PE Bar
    const busNode = sec2.find((n) => n.id.endsWith("__BUS"));
    const m1Node = sec2.find((n) => n.id.endsWith("__M1"));
    const spdNode = sec2.find((n) => n.id.endsWith("__SPD"));
    const peNode = sec2.find((n) => n.id.endsWith("__PE"));
    if (m1Node) pos.set(m1Node.id, { x: -350, y: 455 });
    if (busNode) pos.set(busNode.id, { x: 0, y: 455 });
    if (spdNode) pos.set(spdNode.id, { x: 350, y: 455 });
    if (peNode) pos.set(peNode.id, { x: 700, y: 455 });

    // Section 3: Main Outgoing Feeders in symmetric rows of max 5 cards
    let curY = 745;
    const colsMax = 5;
    const colGap = 315;
    const rowGap = 185;
    for (let i = 0; i < sec3.length; i++) {
      const r = Math.floor(i / colsMax);
      const rowCount = Math.min(colsMax, sec3.length - r * colsMax);
      const c = i % colsMax;
      const x = (c - (rowCount - 1) / 2) * colGap;
      pos.set(sec3[i].id, { x, y: curY + r * rowGap });
    }
    if (sec3.length > 0) {
      curY += Math.ceil(sec3.length / colsMax) * rowGap + 125;
    }

    // Section 4: Sub-section Q6 + RP1 & Garage/Box circuits (for QE.SSC)
    if (sec4.length > 0) {
      const q6Hub = sec4.find((n) => n.id.endsWith("__Q6_RP1"));
      const q6Children = sec4.filter((n) => n !== q6Hub);
      if (q6Hub) {
        pos.set(q6Hub.id, { x: 0, y: curY });
        curY += 215;
      }
      for (let i = 0; i < q6Children.length; i++) {
        const r = Math.floor(i / colsMax);
        const rowCount = Math.min(colsMax, q6Children.length - r * colsMax);
        const c = i % colsMax;
        const x = (c - (rowCount - 1) / 2) * colGap;
        pos.set(q6Children[i].id, { x, y: curY + r * rowGap });
      }
    }

    // Fallback for any unclassified internal node
    nodes.forEach((n, idx) => {
      if (!pos.has(n.id)) pos.set(n.id, { x: (idx % 4) * 320, y: curY + 220 });
    });
    return pos;
  }

  function resolveSynopticPositions(nodes, isInternal) {
    if (isInternal) return computeInternalSynopticPositions(nodes);
    const map = SYNOPTIC_POSITIONS[state.activePlant] || {};
    const out = new Map();
    nodes.forEach((n, idx) => {
      const p = map[n.id];
      out.set(n.id, p ? { x: p.x, y: p.y } : { x: (idx % 5) * 360, y: Math.floor(idx / 5) * 240 });
    });
    return out;
  }

  function computeSynopticEdgeCurve(e, posMap, pairCounts) {
    if (e.id === "e56") {
      return { curveStyle: "unbundled-bezier", cpDistances: [-95], cpWeights: [0.45] };
    }
    if (e.id === "e54") {
      return { curveStyle: "unbundled-bezier", cpDistances: [80], cpWeights: [0.5] };
    }
    const pk = [e.source, e.target].sort().join("::");
    if ((pairCounts.get(pk) || 0) > 1) {
      return { curveStyle: "bezier", cpDistances: [46], cpWeights: [0.5] };
    }
    const p1 = posMap.get(e.source);
    const p2 = posMap.get(e.target);
    if (!p1 || !p2) {
      return { curveStyle: "bezier", cpDistances: [42], cpWeights: [0.5] };
    }
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const L = Math.hypot(dx, dy) || 1;

    // Purely vertical alignment -> straight line
    if (Math.abs(dx) < 22) {
      return { curveStyle: "unbundled-bezier", cpDistances: [0], cpWeights: [0.5] };
    }
    // Same horizontal band -> straight if adjacent, gentle arch if spanning across columns
    if (Math.abs(dy) < 80) {
      const arch = Math.abs(dx) > 460 ? (dx > 0 ? -78 : 78) : 0;
      return { curveStyle: "unbundled-bezier", cpDistances: [arch], cpWeights: [0.5] };
    }
    // Vertical/diagonal tier transition -> graceful vertical-first cubic S-curve!
    const rawD = -(0.38 * dx * dy) / L;
    const d = Math.max(-85, Math.min(85, rawD));
    return {
      curveStyle: "unbundled-bezier",
      cpDistances: [d, -d],
      cpWeights: [0.35, 0.65]
    };
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

  // ==================== RENDER CYTOSCAPE ====================
  function renderCytoscape(animateRelayout = false) {
    const container = document.getElementById("cyCanvas");
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

    const isSynoptic = state.layoutEngine === "synoptic";
    const synopticPosMap = isSynoptic ? resolveSynopticPositions(nodes, isInternal) : null;
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
      let color = plantColors(e.plant, pal).fg;
      let lineStyle = "solid";
      let width = 3.0;
      let arrowShape = "triangle";

      if (e.edgeType === "fire_resistant") {
        color = pal.danger;
        width = 3.5;
      } else if (e.edgeType === "emergency_trip") {
        color = pal.danger;
        lineStyle = "dashed";
        width = state.opState === "emergency" ? 3.5 : 2.2;
        arrowShape = "tee";
      } else if (e.edgeType === "bms_bus" || e.edgeType === "tlc_signal") {
        color = pal.link;
        lineStyle = "dashed";
        width = 2.4;
      } else if (e.edgeType === "earth_pe") {
        color = state.opState === "emergency" ? pal.warning : pal.borderStrong;
        lineStyle = "dashed";
        width = state.opState === "emergency" ? 3.4 : 2.0;
      } else if (e.edgeType === "power_fv") {
        color = pal.warning;
        width = 3.4;
      }

      let lbl = `${e.flowCategory}: ${e.label}`;
      if (interrupted) {
        color = pal.borderStrong;
        lineStyle = "dotted";
        width = 2.0;
        lbl = e.edgeType === "power_fv"
          ? `⛔ STOP ANTI-ISOLA CEI 0-21 (${e.label})`
          : `⛔ SEZIONATO DA SGANCIO (${e.label})`;
      }

      const curveCfg = isSynoptic
        ? computeSynopticEdgeCurve(e, synopticPosMap, pairCounts)
        : { curveStyle: "bezier", cpDistances: [46], cpWeights: [0.5] };

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
      }
    });
    state.activeLayoutHandle.run();

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

      if (state.animateFlows && cyInstance) {
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
    if (centerInGraph && cyInstance) {
      const el = cyInstance.getElementById(nodeId);
      if (el && el.length) cyInstance.animate({ center: { eles: el }, duration: 280 });
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
      if (cyInstance) {
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
      if (cyInstance) cyInstance.fit(undefined, 48);
    });

    document.getElementById("btnTogglePanel").addEventListener("click", () => {
      if (state.isFullscreen) {
        document.getElementById("inspector").classList.toggle("closed-in-fs");
      } else {
        document.getElementById("mainSplit").classList.toggle("panel-hidden");
        setTimeout(() => { resizeFlowCanvas(); if (cyInstance) cyInstance.resize(); }, 60);
      }
    });

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
