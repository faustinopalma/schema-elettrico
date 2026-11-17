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
  const PF_DATA = window.PANNELLI_FISICI_DATA || { panels: [], nodeToPanel: {} };
  const PF_PANEL_BY_SLUG = new Map((PF_DATA.panels || []).map((p) => [p.slug, p]));
  const PLANT_MAP = new Map(DATA.plants.map((p) => [p.id, p]));
  const FLOOR_MAP = new Map(DATA.floors.map((f) => [f.id, f]));
  const NODE_MAP = new Map(DATA.nodes.map((n) => [n.id, n]));
  const DS_MAP = new Map(DATA.datasheets.map((d) => [d.id, d]));

  function buildPanelPageHref(slug, compId) {
    if (!slug) return null;
    const params = new URLSearchParams();
    if (compId) params.set("comp", compId);
    const curTheme = new URLSearchParams(window.location.search).get("scoutTheme");
    if (curTheme) params.set("scoutTheme", curTheme);
    const qs = params.toString();
    return `./pannelli/${slug}.html${qs ? `?${qs}` : ""}`;
  }

  function resolvePhysicalPanelTarget(node, parentBoardId) {
    if (!node) return null;
    const direct = (PF_DATA.nodeToPanel || {})[node.id];
    if (direct) {
      return {
        slug: direct.slug,
        code: direct.code,
        comp: direct.comp || null,
        href: buildPanelPageHref(direct.slug, direct.comp)
      };
    }
    if (parentBoardId && (PF_DATA.nodeToPanel || {})[parentBoardId]) {
      const parentRef = PF_DATA.nodeToPanel[parentBoardId];
      const pObj = PF_PANEL_BY_SLUG.get(parentRef.slug);
      let matchedComp = parentRef.comp || null;
      if (pObj && node.code) {
        const compIds = new Set((pObj.components || []).map((c) => c.id));
        if (node.id.endsWith("__MAIN") && compIds.has("Q1")) {
          matchedComp = "Q1";
        } else if (node.id.endsWith("__BUS") && compIds.has("RP1")) {
          matchedComp = "RP1";
        } else if (node.id.endsWith("__SPD") && compIds.has("SC1")) {
          matchedComp = "SC1";
        } else if (node.id.endsWith("__M1") && compIds.has("M1")) {
          matchedComp = "M1";
        } else if (node.id.endsWith("__DER")) {
          matchedComp = compIds.has("DER1") ? "DER1" : (compIds.has("RD1") ? "RD1" : (compIds.has("RD2") ? "RD2" : (compIds.has("RD4") ? "RD4" : null)));
        } else {
          const tokens = String(node.code).split(/[\s+/·,()]+/).filter(Boolean);
          const hit = tokens.find((tk) => compIds.has(tk));
          if (hit) matchedComp = hit;
        }
      }
      return {
        slug: parentRef.slug,
        code: parentRef.code,
        comp: matchedComp,
        href: buildPanelPageHref(parentRef.slug, matchedComp)
      };
    }
    return null;
  }

  function syncDrillBreadcrumbPhysicalBtn(isInternal, parentBoard) {
    const btn = document.getElementById("btnOpenPhysicalFromDrill");
    if (!btn) return;
    const pTarget = isInternal && parentBoard ? resolvePhysicalPanelTarget(parentBoard, null) : null;
    if (pTarget) {
      btn.href = pTarget.href;
      btn.textContent = `🗄️ Apri Pannello Fisico ${pTarget.code} (Fronte Quadro) →`;
      btn.style.display = "inline-flex";
    } else {
      btn.style.display = "none";
    }
  }

  const ENGINE_LABELS = {
    synoptic: "Tavola Sinottica",
    elk: "Grafo ELK",
    cola: "Grafo Cola",
    fcose: "Grafo fCoSE",
    dagre: "Grafo Dagre"
  };

  function buildCurrentGraphLabel() {
    const eng = ENGINE_LABELS[state.layoutEngine] || "Mappa";
    if (state.faultMode) {
      const tId = state.faultTargetId || state.selectedNodeId;
      const tNode = findNodeAny(tId);
      return `Ricerca Guasto · ${tNode ? tNode.code : "Impianto"}`;
    }
    if (state.drillBoardId && NODE_MAP.has(state.drillBoardId)) {
      const b = NODE_MAP.get(state.drillBoardId);
      return state.layoutEngine !== "synoptic"
        ? `Schema Interno ${b.code} (${eng})`
        : `Schema Interno ${b.code}`;
    }
    const pl = PLANT_MAP.get(state.activePlant);
    const plName = pl ? (pl.tabLabel || pl.shortName) : "Impianto";
    return state.layoutEngine !== "synoptic"
      ? `${eng} · ${plName}`
      : `Mappa ${plName}`;
  }

  function syncUrlWithState() {
    const u = new URL(window.location.href);
    const sp = u.searchParams;
    sp.set("plant", state.activePlant);
    if (state.drillBoardId) sp.set("board", state.drillBoardId);
    else sp.delete("board");
    if (state.selectedNodeId) sp.set("select", state.selectedNodeId);
    else sp.delete("select");
    if (state.focusedNodeId) sp.set("focus", state.focusedNodeId);
    else sp.delete("focus");
    if (state.layoutEngine && state.layoutEngine !== "synoptic") sp.set("view", state.layoutEngine);
    else sp.delete("view");
    if (state.flowDir && state.flowDir !== "TB") sp.set("dir", state.flowDir);
    else sp.delete("dir");
    if (state.groupBy && state.groupBy !== "none") sp.set("group", state.groupBy);
    else sp.delete("group");
    if (state.opState && state.opState !== "normal") sp.set("op", state.opState);
    else sp.delete("op");
    if (state.showBridges) sp.set("bridges", "1");
    else sp.delete("bridges");
    if (!state.livePhysics) sp.set("physics", "0");
    else sp.delete("physics");
    if (state.faultMode && (state.faultTargetId || state.selectedNodeId)) {
      sp.set("fault", state.faultTargetId || state.selectedNodeId);
      if (state.faultCoFailed.length) sp.set("cf", state.faultCoFailed.join(","));
      else sp.delete("cf");
      if (state.faultConfirmedOk.length) sp.set("ok", state.faultConfirmedOk.join(","));
      else sp.delete("ok");
    } else {
      sp.delete("fault");
      sp.delete("cf");
      sp.delete("ok");
    }
    sp.delete("ret");
    sp.delete("retLabel");
    window.history.replaceState({}, "", u.toString());
  }

  function syncToolbarControlsFromState() {
    const viewSel = document.getElementById("viewModeSelect");
    if (viewSel) viewSel.value = state.layoutEngine;
    document.querySelectorAll("[data-dir]").forEach((b) => {
      b.classList.toggle("active", b.dataset.dir === state.flowDir);
    });
    const grpSel = document.getElementById("groupSelect");
    if (grpSel) grpSel.value = state.groupBy;
    document.querySelectorAll("[data-opstate]").forEach((b) => {
      b.classList.toggle("active", b.dataset.opstate === state.opState);
    });
    const chkB = document.getElementById("chkBridges");
    if (chkB) chkB.checked = Boolean(state.showBridges);
    const chkL = document.getElementById("chkLivePhysics");
    const lblL = document.getElementById("lblLivePhysics");
    if (chkL) chkL.checked = Boolean(state.livePhysics);
    if (lblL) {
      lblL.style.borderColor = state.livePhysics ? "var(--cp-accent)" : "var(--cp-border)";
      lblL.style.background = state.livePhysics ? "var(--cp-accent-soft)" : "var(--cp-surface)";
    }
    const fBtn = document.getElementById("btnFaultMode");
    if (fBtn) {
      fBtn.classList.toggle("btn-fault-active", Boolean(state.faultMode));
      fBtn.textContent = state.faultMode ? "🛠️ Ricerca Guasto: ON" : "🛠️ Ricerca Guasto";
    }
    syncToolbarMode();
  }

  function applyStateFromUrlParams(sp) {
    const validViews = new Set(["synoptic", "elk", "cola", "fcose", "dagre"]);
    const validGroups = new Set(["none", "floor", "room", "role", "safety"]);

    const qPlant = sp.get("plant");
    const qBoard = sp.get("board");
    const qSelect = sp.get("select");
    const qFocus = sp.get("focus");
    const qView = sp.get("view");
    const qDir = sp.get("dir");
    const qGroup = sp.get("group");
    const qOp = sp.get("op");
    const qFault = sp.get("fault");
    const qCf = sp.get("cf");
    const qOk = sp.get("ok");

    state.layoutEngine = (qView && validViews.has(qView)) ? qView : "synoptic";
    state.flowDir = qDir === "LR" ? "LR" : "TB";
    state.groupBy = (qGroup && validGroups.has(qGroup)) ? qGroup : "none";
    state.opState = qOp === "emergency" ? "emergency" : "normal";
    state.showBridges = sp.get("bridges") === "1";
    state.livePhysics = sp.get("physics") !== "0";

    if (qPlant && PLANT_MAP.has(qPlant)) {
      state.activePlant = qPlant;
    } else {
      state.activePlant = "IMP-INGRESSI";
    }

    if (qBoard && NODE_MAP.has(qBoard) && NODE_MAP.get(qBoard).internalGraph) {
      const bNode = NODE_MAP.get(qBoard);
      if (!qPlant && bNode.plant) state.activePlant = bNode.plant;
      state.drillBoardId = qBoard;
      state.selectedNodeId = qSelect || `${qBoard}__MAIN`;
      state.focusedNodeId = qFocus || null;
    } else {
      state.drillBoardId = null;
      if (qSelect && NODE_MAP.has(qSelect)) {
        const sNode = NODE_MAP.get(qSelect);
        if (!qPlant && sNode.plant) state.activePlant = sNode.plant;
        state.selectedNodeId = sNode.id;
        state.focusedNodeId = qFocus !== null ? qFocus : null;
      } else {
        state.focusedNodeId = null;
      }
    }

    if (qFault) {
      state.faultMode = true;
      state.faultTargetId = qFault;
      state.faultCoFailed = qCf ? qCf.split(",").filter(Boolean) : [];
      state.faultConfirmedOk = qOk ? qOk.split(",").filter(Boolean) : [];
    } else {
      state.faultMode = false;
      state.faultTargetId = null;
      state.faultCoFailed = [];
      state.faultConfirmedOk = [];
    }
    syncToolbarControlsFromState();
  }

  function syncGlobalNavBackUi() {
    const top = window.SE_NAV ? window.SE_NAV.peek() : null;
    ["btnGlobalNavBack", "btnFsNavBack"].forEach((id) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      if (top) {
        btn.textContent = `← Torna a: ${top.label}`;
        btn.title = `Torna indietro di un singolo step a: ${top.label}`;
        btn.style.display = "inline-flex";
      } else {
        btn.style.display = "none";
      }
    });
  }

  function pushIntraAppStep() {
    syncUrlWithState();
    if (window.SE_NAV) {
      window.SE_NAV.pushCurrent(buildCurrentGraphLabel());
    }
  }

  function navigateToExternalPage(href) {
    if (!href) return;
    syncUrlWithState();
    if (window.SE_NAV) {
      window.SE_NAV.navigateTo(href, buildCurrentGraphLabel());
    } else {
      window.location.href = href;
    }
  }

  function handleGlobalStepBack() {
    if (!window.SE_NAV) return;
    window.SE_NAV.goBack(null, (u) => {
      if (u.origin === window.location.origin && !u.pathname.includes("/pannelli/")) {
        applyStateFromUrlParams(u.searchParams);
        window.history.replaceState({}, "", u.toString());
        refreshAll();
        return true;
      }
      return false;
    });
  }

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
    groupBy: "none",             // Advanced graph views start without container groupings by default!
    opState: "normal",           // 'normal' | 'emergency'
    animateFlows: true,
    showBridges: false,          // Strictly OFF by default! User can enable anytime.
    selectedNodeId: "RETE-DISTRIBUTORE",
    focusedNodeId: null,         // Click-only neighborhood highlight (NO hover dimming!)
    faultMode: false,            // Upstream Breaker & Fuse Fault-Chain Tracing mode
    faultTargetId: null,         // Node ID currently diagnosed for upstream open breakers/fuses
    faultCoFailed: [],           // Sibling loads confirmed ALSO stopped/closed
    faultConfirmedOk: [],        // Sibling loads confirmed STILL working normally
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

  // ==================== UPSTREAM FAULT CHAIN, BREAKER/FUSE EXTRACTOR & DIFFERENTIAL DIAGNOSIS ====================
  const PF_PANEL_BY_NODE = new Map();
  (PF_DATA.panels || []).forEach((p) => {
    if (p.nodeId) PF_PANEL_BY_NODE.set(p.nodeId, p);
  });

  const UVR_24V_GATED_EDGES = new Set(["e07", "e_q6_in", "e_f1", "e53"]);
  const NON_CAUSAL_UPSTREAM_EDGES = new Set(["e33", "e38", "e46", "e47"]);
  const NON_KILLING_FORWARD_EDGES = new Set(["e33", "e38", "e46", "e47", "e62"]);

  const OBSERVABLE_SYMPTOM_CATALOG = [
    { id: "FIRE-PORTONI-EI", label: "🚪 Portoni Tagliafuoco chiusi" },
    { id: "BOX-INTERNI-P1", label: "🚗 Corrente 152 Box assente" },
    { id: "LD-FALDA", label: "💧 Pompe Pozzi di Falda ferme" },
    { id: "LD-IDRICO", label: "🚿 Acqua potabile (Autoclavi) ferma" },
    { id: "LD-POMPE-CT", label: "🌡️ Pompe Clima Centrale -2 ferme" },
    { id: "QEPOR", label: "🏢 Luce / Prese Portineria spente" },
    { id: "LD-PDC-UNITS", label: "❄️ Pompe di Calore in blocco" },
    { id: "GEN-FV-ROOF", label: "☀️ Fotovoltaico staccato" },
    { id: "VIDEOCITOFONO", label: "🔔 Videocitofono spento" },
    { id: "LD-ROOF-A", label: "🛗 Ascensori / UTA Torre A fermi" },
    { id: "QEP-TORRE-A", label: "💡 Luci Piani Torre A spente" },
    { id: "LD-ROOF-B", label: "🛗 Ascensori / UTA Torre B fermi" },
    { id: "QEP-TORRE-B", label: "💡 Luci Piani Torre B spente" }
  ];

  function expandCompTokensFromText(rawText) {
    const out = [];
    const s = String(rawText || "");
    // Dotted ranges: Q6.7–Q6.10 or Q6.1-Q6.2
    const dotRe = /\b([QF]\d+\.)(\d+)\s*[–-]\s*(?:\1)?(\d+)\b/g;
    let m;
    while ((m = dotRe.exec(s)) !== null) {
      const pref = m[1];
      const a = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      if (b >= a && b - a <= 24) {
        for (let k = a; k <= b; k++) out.push(`${pref}${k}`);
      }
    }
    // Integer ranges: Q4–Q14 or Q12-Q21
    const intRe = /\b([QF])(\d+)\s*[–-]\s*(?:\1)?(\d+)\b/g;
    while ((m = intRe.exec(s)) !== null) {
      const pref = m[1];
      const a = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      if (b >= a && b - a <= 30) {
        for (let k = a; k <= b; k++) out.push(`${pref}${k}`);
      }
    }
    // Single component tags: Q1, Q6.11, F3, F14, F8.1, RD4, DER1, K1
    const tokRe = /\b(Q\d+(?:\.\d+)*|F\d+(?:\.\d+)*|RD\d+|DER\d+|K\d+)\b/g;
    while ((m = tokRe.exec(s)) !== null) {
      out.push(m[1]);
    }
    return [...new Set(out)];
  }

  function classifyPanelComp(comp, isMainSwitch) {
    if (comp.kind === "fuse") {
      return { category: "fuse", icon: "🧨", sortRank: 2 };
    }
    if (comp.kind === "diff_relay" || comp.kind === "rccb" || comp.kind === "contactor") {
      return { category: "relay", icon: "⚡", sortRank: 3 };
    }
    return {
      category: "breaker",
      icon: "🛡️",
      sortRank: isMainSwitch ? 4 : 1
    };
  }

  function extractProtectiveDevicesForNode(nodeId, opts) {
    const {
      outgoingEdges = [],
      includeBranch = true,
      includeGeneral = true,
      includeUvr24 = false,
      includeQ7Portoni = false,
      includeCbxFuses = false,
      isTargetSelf = false,
      isInternal = false,
      parentBoardId = null
    } = opts || {};

    // Level-2 Internal Component Mode
    if (isInternal && parentBoardId) {
      const pRef = (PF_DATA.nodeToPanel || {})[parentBoardId];
      const pObj = pRef ? PF_PANEL_BY_SLUG.get(pRef.slug) : null;
      const intNode = findNodeAny(nodeId);
      if (!intNode) return [];
      const tokens = expandCompTokensFromText(`${intNode.code || ""} ${intNode.shortFunc || ""}`);
      if (pObj) {
        const compMap = new Map((pObj.components || []).map((c) => [c.id, c]));
        const picked = new Map();
        const addC = (cid, asMain) => {
          const c = compMap.get(cid);
          if (!c) return;
          if (!["mccb", "mcb", "rcbo", "rccb", "fuse", "diff_relay", "contactor"].includes(c.kind)) return;
          if (!picked.has(c.id)) {
            const cls = classifyPanelComp(c, asMain);
            picked.set(c.id, {
              id: c.id,
              category: cls.category,
              icon: cls.icon,
              sortRank: cls.sortRank,
              badgeText: `${c.id}`,
              shortLabel: c.shortLabel || "",
              ratingBadge: c.ratingBadge || "",
              bayLabel: c.bayLabel || "",
              panelCode: pObj.code,
              panelHref: buildPanelPageHref(pObj.slug, c.id)
            });
          }
        };
        if (nodeId.endsWith("__MAIN")) addC("Q1", true);
        tokens.forEach((t) => addC(t, t === "Q1"));
        [...picked.keys()].forEach((cid) => {
          const c = compMap.get(cid);
          (c?.relatedIds || []).forEach((rid) => {
            const rc = compMap.get(rid);
            if (rc && (rc.kind === "fuse" || rc.kind === "diff_relay" || rc.kind === "rccb")) {
              addC(rc.id, false);
            }
          });
        });
        return [...picked.values()].sort((a, b) => a.sortRank - b.sortRank);
      }
      return tokens.slice(0, 4).map((tk) => ({
        id: tk,
        category: tk.startsWith("F") ? "fuse" : "breaker",
        icon: tk.startsWith("F") ? "🧨" : "🛡️",
        sortRank: tk.startsWith("F") ? 2 : 1,
        badgeText: tk,
        shortLabel: intNode.label || "",
        ratingBadge: "",
        bayLabel: "",
        panelCode: "",
        panelHref: null
      }));
    }

    // Special virtual section Q6-BOX-SEC inside QE.SSC
    if (nodeId === "Q6-BOX-SEC") {
      const pObj = PF_PANEL_BY_SLUG.get("qe-ssc");
      const compMap = new Map((pObj?.components || []).map((c) => [c.id, c]));
      const picked = [];
      const addQ6Comp = (cid, isMainQ6) => {
        const c = compMap.get(cid);
        if (!c) return;
        const cls = classifyPanelComp(c, isMainQ6);
        picked.push({
          id: c.id,
          category: cls.category,
          icon: cls.icon,
          sortRank: cls.sortRank,
          badgeText: c.id === "Q6" ? "Q6 [UVR 24V]" : c.id,
          shortLabel: c.shortLabel || "",
          ratingBadge: c.ratingBadge || "",
          bayLabel: c.bayLabel || "",
          panelCode: "QE.SSC",
          panelHref: buildPanelPageHref("qe-ssc", c.id)
        });
      };
      if (includeBranch) {
        const branchTokens = [];
        outgoingEdges.forEach((e) => {
          expandCompTokensFromText(e.label).forEach((tk) => {
            if (tk !== "Q6" && !branchTokens.includes(tk)) branchTokens.push(tk);
          });
        });
        if (branchTokens.length > 5) {
          const first = compMap.get(branchTokens[0]);
          picked.push({
            id: `${branchTokens[0]}..${branchTokens[branchTokens.length - 1]}`,
            category: "breaker",
            icon: "🛡️",
            sortRank: 1,
            badgeText: `${branchTokens[0]}–${branchTokens[branchTokens.length - 1]}`,
            shortLabel: "Partenze Corselli / Rampa",
            ratingBadge: `${branchTokens.length} interruttori`,
            bayLabel: first?.bayLabel || "",
            panelCode: "QE.SSC",
            panelHref: buildPanelPageHref("qe-ssc", branchTokens[0])
          });
          // Still explicitly surface any fuses coupled to those branches!
          branchTokens.forEach((tk) => {
            const c = compMap.get(tk);
            (c?.relatedIds || []).forEach((rid) => {
              const rc = compMap.get(rid);
              if (rc && rc.kind === "fuse" && !picked.some((p) => p.id === rc.id)) addQ6Comp(rc.id, false);
            });
          });
        } else {
          branchTokens.forEach((tk) => {
            addQ6Comp(tk, false);
            const c = compMap.get(tk);
            (c?.relatedIds || []).forEach((rid) => {
              const rc = compMap.get(rid);
              if (rc && rc.kind === "fuse" && !picked.some((p) => p.id === rc.id)) addQ6Comp(rc.id, false);
            });
          });
        }
      }
      if (includeGeneral || isTargetSelf) {
        addQ6Comp("Q6", true);
      }
      return picked.sort((a, b) => a.sortRank - b.sortRank);
    }

    // Standard Switchboards backed by PF_DATA.panels
    const pObj = PF_PANEL_BY_NODE.get(nodeId);
    if (pObj) {
      const compMap = new Map((pObj.components || []).map((c) => [c.id, c]));
      const picked = new Map();
      const addDev = (cid, isMainSw, customBadge) => {
        const c = compMap.get(cid);
        if (!c) return;
        if (!["mccb", "mcb", "rcbo", "rccb", "fuse", "diff_relay", "contactor"].includes(c.kind)) return;
        if (!picked.has(c.id)) {
          const cls = classifyPanelComp(c, isMainSw);
          const hasUvr = (c.ratingBadge || "").includes("UVR") || (c.ratingBadge || "").includes("24V") || (c.whatItDoes || "").toLowerCase().includes("minima tensione");
          picked.set(c.id, {
            id: c.id,
            category: cls.category,
            icon: cls.icon,
            sortRank: cls.sortRank,
            badgeText: customBadge || (hasUvr && c.kind !== "fuse" && c.kind !== "contactor" ? `${c.id} [UVR]` : c.id),
            shortLabel: c.shortLabel || "",
            ratingBadge: c.ratingBadge || "",
            bayLabel: c.bayLabel || "",
            panelCode: pObj.code,
            panelHref: buildPanelPageHref(pObj.slug, c.id)
          });
        }
      };

      const expandCoupled = (cid) => {
        const c = compMap.get(cid);
        if (!c) return;
        (c.relatedIds || []).forEach((rid) => {
          const rc = compMap.get(rid);
          if (!rc) return;
          // Avoid pulling K1/F3/F14 unless uvr24 is actually involved on this path
          if ((rid === "K1" || rid === "F3" || rid === "F14") && pObj.slug === "qe-ssc" && !includeUvr24) return;
          if (rc.kind === "fuse" || rc.kind === "diff_relay" || rc.kind === "rccb") {
            addDev(rc.id, false);
          }
        });
      };

      if (includeBranch && outgoingEdges.length) {
        const rawTokens = [];
        outgoingEdges.forEach((e) => {
          expandCompTokensFromText(e.label).forEach((tk) => {
            if (tk !== "Q1" || outgoingEdges.some((oe) => /\bQ1\b/.test(oe.label))) {
              if (!rawTokens.includes(tk)) rawTokens.push(tk);
            }
          });
        });

        const validBreakers = rawTokens.filter((tk) => compMap.has(tk) && !tk.startsWith("F"));
        const validFuses = rawTokens.filter((tk) => compMap.has(tk) && tk.startsWith("F"));

        if (validBreakers.length > 5) {
          const b0 = compMap.get(validBreakers[0]);
          picked.set(`${validBreakers[0]}_RANGE`, {
            id: `${validBreakers[0]}–${validBreakers[validBreakers.length - 1]}`,
            category: "breaker",
            icon: "🛡️",
            sortRank: 1,
            badgeText: `${validBreakers[0]}–${validBreakers[validBreakers.length - 1]}`,
            shortLabel: "Interruttori partenze dedicate",
            ratingBadge: `${validBreakers.length} linee`,
            bayLabel: b0?.bayLabel || "",
            panelCode: pObj.code,
            panelHref: buildPanelPageHref(pObj.slug, validBreakers[0])
          });
          validBreakers.forEach((tk) => expandCoupled(tk));
        } else {
          validBreakers.forEach((tk) => {
            addDev(tk, tk === "Q1");
            expandCoupled(tk);
          });
        }
        validFuses.forEach((tk) => addDev(tk, false));
      }

      if (includeQ7Portoni && pObj.slug === "qe-ssc") {
        addDev("Q7", false, "Q7 [UVR]");
        addDev("Q6.11", false);
      }

      if (includeUvr24 && pObj.slug === "qe-ssc") {
        addDev("F3", false, "F3 (4A 24V)");
        addDev("F14", false, "F14 (4A)");
        addDev("K1", false, "K1 (Relè 24V)");
        addDev("Q14", false, "Q14 (UPS2)");
      }

      if (nodeId === "QEREG" && (includeGeneral || includeBranch || isTargetSelf)) {
        addDev("Q1", false);
        ["F1", "F3", "F4", "F5"].forEach((fid) => addDev(fid, false));
      }

      if (includeCbxFuses && pObj.slug === "qe-lp") {
        ["F8.1", "F8.2", "F8.3"].forEach((fid) => addDev(fid, false));
      }

      if ((includeGeneral || isTargetSelf) && compMap.has("Q1")) {
        addDev("Q1", !isTargetSelf);
        expandCoupled("Q1");
      }

      return [...picked.values()].sort((a, b) => a.sortRank - b.sortRank);
    }

    // Non-panel nodes (POD meters, UPS units, VVF buttons, floor QEP boards)
    const nObj = NODE_MAP.get(nodeId);
    if (!nObj) return [];

    if (nodeId.startsWith("POD-") || nodeId.startsWith("CONTATORI-ALLOGGI")) {
      return [{
        id: `${nodeId}_DG`,
        category: "breaker",
        icon: "🛡️",
        sortRank: 1,
        badgeText: "Limitatore Contatore",
        shortLabel: "Interruttore integrato sul contatore di fornitura",
        ratingBadge: nObj.specs?.["Potenza disp."] || "400V",
        bayLabel: nObj.roomGroup || "",
        panelCode: nObj.code,
        panelHref: null
      }];
    }

    if (nodeId === "UPS-1-EI") {
      const list = [];
      if (includeQ7Portoni) {
        list.push({
          id: "Q7",
          category: "breaker",
          icon: "🛡️",
          sortRank: 1,
          badgeText: "Q7 [UVR 24V] (in QE.SSC)",
          shortLabel: "Interruttore uscita XUPS verso Portoni Tagliafuoco",
          ratingBadge: "2P C10 + UVR 24Vac",
          bayLabel: "QE.SSC · Pannello 7",
          panelCode: "QE.SSC",
          panelHref: buildPanelPageHref("qe-ssc", "Q7")
        });
      }
      list.push({
        id: "UPS1_PROT",
        category: "breaker",
        icon: "🔋",
        sortRank: 2,
        badgeText: "Prot. / Batteria UPS 1",
        shortLabel: "Protezione uscita / autonomia batterie UPS 1000VA",
        ratingBadge: "1000 VA Online",
        bayLabel: "Locale Contatori Scala A (-1)",
        panelCode: "UPS-1",
        panelHref: null
      });
      return list;
    }

    if (nodeId === "UPS-2-SGANCIO") {
      return [{
        id: "UPS2_PROT",
        category: "breaker",
        icon: "🔋",
        sortRank: 1,
        badgeText: "Prot. / Batteria UPS 2",
        shortLabel: "Alimenta trasf. 24Vac T14 (se spento apre Q5, Q6, Q7!)",
        ratingBadge: "2000 VA Online",
        bayLabel: "Locale Contatori Scala A (-1)",
        panelCode: "UPS-2",
        panelHref: null
      }];
    }

    if (nodeId === "SGANCI-VVF") {
      return [{
        id: includeUvr24 ? "PEM_24V" : "PULS_VVF",
        category: "relay",
        icon: "🚨",
        sortRank: 1,
        badgeText: includeUvr24 ? "Pulsante NC Box / Linea 24Vac" : "Pulsante Sgancio VVF",
        shortLabel: includeUvr24
          ? "Pulsante VVF Autorimessa o corto/apertura su dorsale 24Vac (es. bobine wallbox)"
          : "Comando di sgancio emergenza VVF del compartimento",
        ratingBadge: includeUvr24 ? "24Vac Fail-Safe" : "230Vac SOR",
        bayLabel: "Ingressi / Portineria",
        panelCode: "VVF",
        panelHref: null
      }];
    }

    if (nodeId === "QEP-TORRE-A" || nodeId === "QEP-TORRE-B") {
      return [{
        id: "DG_QEP",
        category: "breaker",
        icon: "🛡️",
        sortRank: 1,
        badgeText: "DG 25A + Diff. 30mA (QEP)",
        shortLabel: "Sezionatore generale e magnetotermici-differenziali nel centralino di piano",
        ratingBadge: "25A / C10-C16 30mA",
        bayLabel: "Pianerottolo di piano",
        panelCode: nObj.code,
        panelHref: null
      }];
    }

    if (nodeId === "RIP-250") {
      return [{
        id: "RIP250_MORS",
        category: "breaker",
        icon: "🔀",
        sortRank: 3,
        badgeText: "Sbarre Ripartitore 250A",
        shortLabel: "Ripartitore passivo tetrapolare a monte sgancio (senza fusibili)",
        ratingBadge: "4P 250A",
        bayLabel: "Locale Contatori P. Terra",
        panelCode: "RIP-250A",
        panelHref: null
      }];
    }

    return [];
  }

  function computeForwardImpactLevel1(startNodeId, mode, viaEdgeId, allEdges) {
    const impacted = new Set();
    const queue = [];

    if (mode === "branch" && viaEdgeId) {
      const e0 = allEdges.find((x) => x.id === viaEdgeId);
      if (e0) queue.push({ id: e0.target, m: "full" });
    } else if (mode === "sor_btn" && viaEdgeId) {
      const e0 = allEdges.find((x) => x.id === viaEdgeId);
      if (e0) queue.push({ id: e0.target, m: "full" });
    } else if (mode === "uvr24") {
      ["QELP", "Q6-BOX-SEC", "FIRE-PORTONI-EI", "LD-BOX"].forEach((t) => {
        queue.push({ id: t, m: "full" });
      });
    } else {
      queue.push({ id: startNodeId, m: "full" });
    }

    const seen = new Set(queue.map((q) => `${q.id}::${q.m}`));
    while (queue.length > 0) {
      const { id: curr, m } = queue.shift();
      if (m === "full") {
        impacted.add(curr);
        // Hydraulic coupling: stopping groundwater well pumps (LD-FALDA) blocks water-to-water heat pumps (LD-PDC-UNITS)
        if (curr === "LD-FALDA" && !seen.has("LD-PDC-UNITS::full")) {
          seen.add("LD-PDC-UNITS::full");
          queue.push({ id: "LD-PDC-UNITS", m: "full" });
        }
      }

      if (curr === "UPS-2-SGANCIO" && m === "full") {
        ["QELP", "Q6-BOX-SEC", "FIRE-PORTONI-EI", "LD-BOX"].forEach((t) => {
          if (!seen.has(`${t}::full`)) {
            seen.add(`${t}::full`);
            queue.push({ id: t, m: "full" });
          }
        });
        continue;
      }

      if (curr === "SGANCI-VVF") continue;

      allEdges.forEach((e) => {
        if (e.source !== curr) return;
        const et = e.edgeType;
        if (et === "earth_pe" || et === "power_fv" || et === "emergency_trip") return;
        if (NON_KILLING_FORWARD_EDGES.has(e.id)) return;
        if (["FTTH-CSOE", "IRA-CENTRALI", "LD-ESTERNI", "TLC-ALLOGGI-STOA"].includes(e.target) && startNodeId !== curr) {
          return;
        }
        const key = `${e.target}::full`;
        if (!seen.has(key)) {
          seen.add(key);
          queue.push({ id: e.target, m: "full" });
        }
      });
    }

    // CEI 0-21 anti-islanding: if QE.PC loses AC grid voltage, rooftop PV inverter disconnects
    if (impacted.has("QEPC")) {
      impacted.add("GEN-FV-ROOF");
    }
    return impacted;
  }

  function traceUpstreamRawLevel1(targetId) {
    const allEdges = DATA.edges.filter((e) => e.edgeType !== "doc_trace");
    const nodeMeta = new Map(); // nodeId -> { dist, roles: Set, outEdgesUsed: Set, uvr24Involved, sorEdges: Set, q7PortoniInvolved, cbxInvolved }
    const activeEdges = new Set();

    const ensureMeta = (nid, dist) => {
      if (!nodeMeta.has(nid)) {
        nodeMeta.set(nid, {
          dist,
          roles: new Set(),
          outEdgesUsed: new Set(),
          uvr24Involved: false,
          sorEdges: new Set(),
          q7PortoniInvolved: false,
          cbxInvolved: false
        });
      } else if (dist < nodeMeta.get(nid).dist) {
        nodeMeta.get(nid).dist = dist;
      }
      return nodeMeta.get(nid);
    };

    ensureMeta(targetId, 0).roles.add("target");
    const queue = [{ id: targetId, mode: "full", dist: 0 }];
    const seen = new Set([`${targetId}::full`]);

    // Special case: if diagnosing GEN-FV-ROOF (inverter FV disconnected), include both rooftop PV strings AND AC parallel reference QEPC (anti-islanding CEI 0-21)
    if (targetId === "GEN-FV-ROOF") {
      const e20 = allEdges.find((e) => e.id === "e20");
      if (e20) {
        activeEdges.add("e20");
        const mQepc = ensureMeta("QEPC", 1);
        mQepc.roles.add("power");
        mQepc.outEdgesUsed.add(e20);
        seen.add("QEPC::full");
        queue.push({ id: "QEPC", mode: "full", dist: 1 });
      }
    }

    // Special case: if diagnosing LD-PDC-UNITS (geothermal water-to-water heat pumps), groundwater wells LD-FALDA are a direct hydraulic prerequisite!
    if (targetId === "LD-PDC-UNITS") {
      const mFalda = ensureMeta("LD-FALDA", 1);
      mFalda.roles.add("control");
      seen.add("LD-FALDA::full");
      queue.push({ id: "LD-FALDA", mode: "full", dist: 1 });
    }

    while (queue.length > 0) {
      const { id: curr, mode, dist } = queue.shift();

      if (curr === "SGANCI-VVF" && mode === "uvr24") {
        const e24 = allEdges.find((e) => e.id === "e24");
        if (e24) {
          activeEdges.add(e24.id);
          const mUps2 = ensureMeta("UPS-2-SGANCIO", dist + 1);
          mUps2.roles.add("trip");
          mUps2.outEdgesUsed.add(e24);
          if (!seen.has("UPS-2-SGANCIO::full")) {
            seen.add("UPS-2-SGANCIO::full");
            queue.push({ id: "UPS-2-SGANCIO", mode: "full", dist: dist + 1 });
          }
        }
        continue;
      }

      allEdges.forEach((e) => {
        if (e.target !== curr) return;
        const eid = e.id;
        const et = e.edgeType;
        const src = e.source;

        if (et === "earth_pe" && !["TERRA-RETE", "GND-COLLETTORI-EQP", "GND-SPD-4X"].includes(targetId)) {
          return;
        }
        if (NON_CAUSAL_UPSTREAM_EDGES.has(eid)) return;
        // Rooftop PV is supplemental to 160 kW grid on QEPC: only a primary cause when diagnosing GEN-FV-ROOF itself
        if (et === "power_fv" && targetId !== "GEN-FV-ROOF") return;

        // Check if this incoming branch is gated by the 24Vac UVR K1 circuit in QE.SSC!
        if (UVR_24V_GATED_EDGES.has(eid)) {
          const mQessc = ensureMeta("QESSC", dist + 1);
          mQessc.uvr24Involved = true;
          if (eid === "e_f1" || eid === "e53") {
            mQessc.q7PortoniInvolved = true;
            mQessc.roles.add("trip");
            const mUps1 = ensureMeta("UPS-1-EI", dist + 1);
            mUps1.q7PortoniInvolved = true;
          }
          const e25 = allEdges.find((x) => x.id === "e25");
          const eq6 = allEdges.find((x) => x.id === "e_q6_vvf");
          if (e25) activeEdges.add(e25.id);
          if (eid === "e_q6_in" && eq6) activeEdges.add(eq6.id);

          const mSg = ensureMeta("SGANCI-VVF", dist + 1);
          mSg.roles.add("trip");
          mSg.uvr24Involved = true;
          if (e25) mSg.outEdgesUsed.add(e25);
          if (!seen.has("SGANCI-VVF::uvr24")) {
            seen.add("SGANCI-VVF::uvr24");
            queue.push({ id: "SGANCI-VVF", mode: "uvr24", dist: dist + 1 });
          }
        }

        if (eid === "e25") {
          // e25 (24Vac K1) only trips Q5/Q6/Q7, never the main busbar of QESSC unless user selected QESSC itself
          if (targetId === "QESSC") {
            activeEdges.add(eid);
            const mSg = ensureMeta(src, dist + 1);
            mSg.roles.add("trip");
            mSg.uvr24Involved = true;
            mSg.outEdgesUsed.add(e);
            if (!seen.has("SGANCI-VVF::uvr24")) {
              seen.add("SGANCI-VVF::uvr24");
              queue.push({ id: src, mode: "uvr24", dist: dist + 1 });
            }
          }
          return;
        }

        if (eid === "e_q6_vvf") {
          activeEdges.add(eid);
          const mSg = ensureMeta(src, dist + 1);
          mSg.roles.add("trip");
          mSg.uvr24Involved = true;
          mSg.outEdgesUsed.add(e);
          if (!seen.has("SGANCI-VVF::uvr24")) {
            seen.add("SGANCI-VVF::uvr24");
            queue.push({ id: src, mode: "uvr24", dist: dist + 1 });
          }
          return;
        }

        if (et === "emergency_trip") {
          // 230Vac SOR shunt-trip button on AVSSC / AVSCA / AVSCB / AVPC
          activeEdges.add(eid);
          const mSg = ensureMeta(src, dist + 1);
          mSg.roles.add("trip");
          mSg.sorEdges.add(eid);
          mSg.outEdgesUsed.add(e);
          return;
        }

        if (eid === "e36") {
          ensureMeta("QELP", dist).cbxInvolved = true;
        }

        activeEdges.add(eid);
        const mSrc = ensureMeta(src, dist + 1);
        const role = (et === "bms_bus" || et === "tlc_signal") ? "control" : "power";
        mSrc.roles.add(role);
        mSrc.outEdgesUsed.add(e);

        const nextKey = `${src}::full`;
        if (!seen.has(nextKey)) {
          seen.add(nextKey);
          queue.push({ id: src, mode: "full", dist: dist + 1 });
        }
      });
    }

    return { nodeMeta, activeEdges, allEdges };
  }

  function computeFaultDiagnosis(overrideTargetId, overrideCoFailed, overrideConfirmedOk, forceLevel1) {
    const isInternal = !forceLevel1 && Boolean(state.drillBoardId);
    const targetId = overrideTargetId || state.faultTargetId || state.selectedNodeId;
    const coFailedArr = overrideCoFailed !== undefined ? overrideCoFailed : state.faultCoFailed;
    const confirmedOkArr = overrideConfirmedOk !== undefined ? overrideConfirmedOk : state.faultConfirmedOk;
    const coFailedSet = new Set((coFailedArr || []).filter((id) => id !== targetId));
    const confirmedOkSet = new Set((confirmedOkArr || []).filter((id) => id !== targetId && !coFailedSet.has(id)));
    const mustExplainAll = [targetId, ...coFailedSet];

    // LEVEL-2 INTERNAL SWITCHBOARD FAULT CHAIN
    if (isInternal) {
      const board = NODE_MAP.get(state.drillBoardId);
      if (!board || !board.internalGraph) return null;
      const iNodes = board.internalGraph.nodes;
      const iEdges = board.internalGraph.edges;
      const nodeMap = new Map(iNodes.map((n) => [n.id, n]));
      if (!nodeMap.has(targetId)) return null;

      const distMap = new Map([[targetId, 0]]);
      const activeEdgeIds = new Set();
      const q = [targetId];

      while (q.length > 0) {
        const cur = q.shift();
        const d = distMap.get(cur);
        // Special internal 24Vac UVR dependency inside QE.SSC
        const curObj = nodeMap.get(cur);
        if (board.id === "QESSC" && curObj && (curObj.code || "").includes("[UVR]") && cur !== "QESSC__C_17") {
          if (!distMap.has("QESSC__C_17")) {
            distMap.set("QESSC__C_17", d + 1);
            q.push("QESSC__C_17");
          }
          iEdges.forEach((ie) => {
            if (ie.target === "QESSC__C_17") activeEdgeIds.add(ie.id);
          });
        }
        iEdges.forEach((ie) => {
          if (ie.target !== cur) return;
          if (ie.edgeType === "earth_pe" && !targetId.endsWith("__PE") && !targetId.endsWith("__SPD")) return;
          activeEdgeIds.add(ie.id);
          if (!distMap.has(ie.source)) {
            distMap.set(ie.source, d + 1);
            q.push(ie.source);
          }
        });
      }

      const targetSelfDevices = extractProtectiveDevicesForNode(targetId, {
        isTargetSelf: true,
        isInternal: true,
        parentBoardId: board.id
      });

      const steps = [];
      [...distMap.entries()]
        .filter(([nid]) => nid !== targetId)
        .sort((a, b) => a[1] - b[1])
        .forEach(([nid, dist], idx) => {
          const nObj = nodeMap.get(nid);
          const devs = extractProtectiveDevicesForNode(nid, {
            includeBranch: true,
            includeGeneral: true,
            isInternal: true,
            parentBoardId: board.id
          });
          steps.push({
            nodeId: nid,
            node: { ...nObj, plant: board.plant, floor: board.floor, roomGroup: board.roomGroup },
            dist,
            activeRank: idx + 1,
            ruledOut: false,
            isPrimarySuspect: idx === 0,
            roles: nid === "QESSC__C_17" ? ["trip"] : ["power"],
            activeDevices: devs,
            modeHint: nid === "QESSC__C_17"
              ? "Fusibili F14 / F3 (4A) e trasformatore T14 (24Vac) che mantengono armati Q5, Q6 e Q7."
              : (nObj.shortFunc || "Elemento a monte all'interno del quadro.")
          });
        });

      const stepByNodeId = new Map(steps.map((s) => [s.nodeId, s]));
      let breakerCount = targetSelfDevices.filter((d) => d.category === "breaker").length;
      let fuseCount = targetSelfDevices.filter((d) => d.category === "fuse").length;
      steps.forEach((s) => {
        breakerCount += s.activeDevices.filter((d) => d.category === "breaker").length;
        fuseCount += s.activeDevices.filter((d) => d.category === "fuse").length;
      });

      return {
        isInternal: true,
        targetId,
        targetNode: { ...nodeMap.get(targetId), plant: board.plant, floor: board.floor, roomGroup: board.roomGroup },
        targetSelfDevices,
        coFailedSet,
        confirmedOkSet,
        steps,
        activeSteps: steps,
        ruledOutSteps: [],
        stepByNodeId,
        activeEdgeIds,
        ruledOutEdgeIds: new Set(),
        discriminators: [],
        breakerCount,
        fuseCount,
        hasFilters: false
      };
    }

    // LEVEL-1 BUILDING-WIDE FAULT CHAIN & DIFFERENTIAL EXCLUSION
    if (!NODE_MAP.has(targetId)) return null;
    const { nodeMeta, activeEdges: rawEdgeIds, allEdges } = traceUpstreamRawLevel1(targetId);

    const targetNode = NODE_MAP.get(targetId);
    const targetSelfDevices = extractProtectiveDevicesForNode(targetId, {
      includeBranch: false,
      includeGeneral: true,
      isTargetSelf: true
    });

    // Evaluate multi-mode physical hypotheses for each upstream node
    const candidateEntries = [];
    nodeMeta.forEach((meta, nid) => {
      if (nid === targetId) return;
      const nObj = NODE_MAP.get(nid);
      if (!nObj) return;

      const outList = [...meta.outEdgesUsed];
      const modes = [];

      // Mode 1: Individual outgoing feeder breaker(s) on this board toward the faulty chain
      if (outList.length > 0 && nid !== "SGANCI-VVF" && nid !== "UPS-2-SGANCIO") {
        outList.forEach((oe) => {
          const imp = computeForwardImpactLevel1(nid, "branch", oe.id, allEdges);
          modes.push({
            kind: "branch",
            edge: oe,
            impact: imp,
            size: imp.size
          });
        });
      }

      // Mode 2: 24Vac UVR emergency loop (inside QE.SSC: F3/F14/T14/K1/Q14, or UPS-2, or SGANCI-VVF Box)
      if (meta.uvr24Involved && (nid === "QESSC" || nid === "SGANCI-VVF" || nid === "UPS-2-SGANCIO")) {
        const imp = computeForwardImpactLevel1(nid, "uvr24", null, allEdges);
        modes.push({
          kind: "uvr24",
          edge: null,
          impact: imp,
          size: imp.size
        });
      }

      // Mode 3: 230Vac SOR shunt-trip button from SGANCI-VVF
      if (nid === "SGANCI-VVF" && meta.sorEdges.size > 0) {
        meta.sorEdges.forEach((seId) => {
          const imp = computeForwardImpactLevel1("SGANCI-VVF", "sor_btn", seId, allEdges);
          modes.push({
            kind: "sor_btn",
            edgeId: seId,
            impact: imp,
            size: imp.size
          });
        });
      }

      // Mode 4: Full board / upstream supply loss (e.g. Q1 general breaker open or upstream feed dead)
      if (nid !== "SGANCI-VVF") {
        const imp = computeForwardImpactLevel1(nid, "full", null, allEdges);
        modes.push({
          kind: "full",
          edge: null,
          impact: imp,
          size: imp.size
        });
      }

      // Check which modes satisfy ALL user observations (explains target + all coFailed, and doesn't kill any confirmedOk!)
      const validModes = modes.filter((m) => {
        const explainsAll = mustExplainAll.every((reqId) => m.impact.has(reqId));
        if (!explainsAll) return false;
        for (const okId of confirmedOkSet) {
          if (m.impact.has(okId)) return false;
        }
        return true;
      });

      const allModesUnion = new Set();
      modes.forEach((m) => m.impact.forEach((x) => allModesUnion.add(x)));

      const ruledOut = validModes.length === 0;
      const bestBlastSize = ruledOut
        ? 9999
        : Math.min(...validModes.map((m) => m.size));

      const branchValid = validModes.some((m) => m.kind === "branch");
      const fullValid = validModes.some((m) => m.kind === "full");
      const uvrValid = validModes.some((m) => m.kind === "uvr24");
      const validOutEdges = validModes.filter((m) => m.kind === "branch" && m.edge).map((m) => m.edge);

      const devices = extractProtectiveDevicesForNode(nid, {
        outgoingEdges: ruledOut ? outList : (branchValid ? validOutEdges : []),
        includeBranch: ruledOut ? outList.length > 0 : branchValid,
        includeGeneral: ruledOut ? true : fullValid,
        includeUvr24: ruledOut ? meta.uvr24Involved : uvrValid,
        includeQ7Portoni: meta.q7PortoniInvolved && (ruledOut || uvrValid || fullValid || branchValid),
        includeCbxFuses: meta.cbxInvolved && (ruledOut || fullValid || branchValid)
      });

      // Compose crystal-clear diagnostic guidance explaining which breaker/fuse to check on this node
      let modeHint = "";
      if (ruledOut) {
        const missesCoFail = [...coFailedSet].some((cf) => !allModesUnion.has(cf));
        modeHint = missesCoFail
          ? "Escluso come causa unica: un'apertura qui non spiegherebbe gli altri impianti fermi segnalati."
          : "Escluso: se fosse aperto, sarebbero spente anche le utenze che hai indicato come funzionanti.";
      } else if (nid === "QESSC" && uvrValid && !fullValid && !branchValid) {
        modeHint = "🎯 Causa specifica nel quadro QE.SSC: verifica i fusibili F3 / F14 (4A gG), il trasformatore 24Vac T14, il relè K1 e Q14 (l'assenza del 24V fa scattare insieme Q5 Pozzi, Q6 Box e Q7 Portoni EI lasciando attiva la sbarra generale!).";
      } else if (branchValid && !fullValid) {
        const eLbls = validOutEdges.map((e) => e.label).join(" / ");
        modeHint = `🎯 Sbarra generale sana (altre utenze attive): controlla solo la partenza dedicata ${eLbls}.`;
      } else if (nid === "UPS-2-SGANCIO") {
        modeHint = "Se UPS 2 è spento, guasto o scarico cade il 24Vac su T14/K1 facendo aprire insieme Q5 (Pozzi), Q6 (Box) e Q7 (Portoni EI).";
      } else if (nid === "SGANCI-VVF" && meta.uvr24Involved) {
        modeHint = "Controlla che il pulsante VVF Autorimessa non sia azionato e che non ci siano corti/aperture sulla dorsale 24Vac (es. bobine sgancio wallbox).";
      } else if (nid === "LD-FALDA" && targetId === "LD-PDC-UNITS") {
        modeHint = "Interdipendenza idraulica: se le pompe dei pozzi di falda si fermano, le Pompe di Calore vanno in blocco flussostato per mancanza acqua.";
      } else if (outList.length > 0) {
        modeHint = `Linea verso valle: ${outList.map((e) => e.label).join(" · ")}. Controlla l'interruttore di partenza, eventuali fusibili ausiliari e il generale di quadro.`;
      } else {
        modeHint = nObj.shortFunc || "Punto di alimentazione o comando a monte.";
      }

      candidateEntries.push({
        nodeId: nid,
        node: nObj,
        dist: meta.dist,
        ruledOut,
        bestBlastSize,
        roles: [...meta.roles],
        activeDevices: devices,
        allImpactUnion: allModesUnion,
        modeHint
      });
    });

    const hasFilters = coFailedSet.size > 0 || confirmedOkSet.size > 0;
    const activeSteps = candidateEntries.filter((c) => !c.ruledOut);
    const ruledOutSteps = candidateEntries.filter((c) => c.ruledOut).sort((a, b) => a.dist - b.dist);

    if (hasFilters) {
      // Sort by tightest common root cause (smallest blast radius explaining all symptoms), then closest distance!
      activeSteps.sort((a, b) => (a.bestBlastSize - b.bestBlastSize) || (a.dist - b.dist));
    } else {
      activeSteps.sort((a, b) => a.dist - b.dist);
    }

    const minBlast = activeSteps.length > 0 ? activeSteps[0].bestBlastSize : 9999;
    activeSteps.forEach((s, idx) => {
      s.activeRank = idx + 1;
      s.isPrimarySuspect = hasFilters
        ? (s.bestBlastSize <= minBlast + 1 && idx < 3)
        : (idx === 0);
    });

    const steps = [...activeSteps, ...ruledOutSteps];
    const stepByNodeId = new Map(steps.map((s) => [s.nodeId, s]));

    // Determine active vs ruled-out edges along the upstream chain
    const activeEdgeIds = new Set();
    const ruledOutEdgeIds = new Set();
    rawEdgeIds.forEach((eid) => {
      const eObj = allEdges.find((x) => x.id === eid);
      if (!eObj) return;
      const srcStep = stepByNodeId.get(eObj.source);
      const tgtIsActive = eObj.target === targetId || coFailedSet.has(eObj.target) || (stepByNodeId.has(eObj.target) && !stepByNodeId.get(eObj.target).ruledOut);
      if (srcStep && !srcStep.ruledOut && tgtIsActive) {
        activeEdgeIds.add(eid);
      } else {
        ruledOutEdgeIds.add(eid);
      }
    });

    // Build dynamic list of observable discriminator symptoms relevant to this chain
    const totalCandidates = candidateEntries.length;
    const discriminators = OBSERVABLE_SYMPTOM_CATALOG.filter((sym) => {
      if (sym.id === targetId) return false;
      if (coFailedSet.has(sym.id) || confirmedOkSet.has(sym.id)) return true;
      let hitCount = 0;
      candidateEntries.forEach((c) => {
        if (c.allImpactUnion.has(sym.id)) hitCount += 1;
      });
      return hitCount > 0 && hitCount < totalCandidates;
    }).slice(0, 6);

    let breakerCount = targetSelfDevices.filter((d) => d.category === "breaker").length;
    let fuseCount = targetSelfDevices.filter((d) => d.category === "fuse").length;
    activeSteps.forEach((s) => {
      breakerCount += s.activeDevices.filter((d) => d.category === "breaker").length;
      fuseCount += s.activeDevices.filter((d) => d.category === "fuse").length;
    });

    return {
      isInternal: false,
      targetId,
      targetNode,
      targetSelfDevices,
      coFailedSet,
      confirmedOkSet,
      steps,
      activeSteps,
      ruledOutSteps,
      stepByNodeId,
      activeEdgeIds,
      ruledOutEdgeIds,
      discriminators,
      breakerCount,
      fuseCount,
      hasFilters
    };
  }

  function getActiveFaultDiagnosis() {
    if (!state.faultMode) return null;
    return computeFaultDiagnosis();
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
      // LEVEL 1B: Specific Plant (1..8) — Bridges strictly OFF by default unless state.showBridges === true (or selectively pulled in by Fault Mode)!
      const plantOwnNodes = DATA.nodes.filter((n) => n.plant === pid && n.tier <= 2 && n.nodeClass !== "doc_reference");
      const ownSet = new Set(plantOwnNodes.map((n) => n.id));

      plantOwnNodes.forEach((n) => {
        nodes.push({ ...n, isBridge: false });
        includedIds.add(n.id);
      });

      // When Fault Mode is active, selectively include upstream chain nodes across plants so the full chain is visible!
      let faultChainNodes = null;
      let faultChainEdges = null;
      if (state.faultMode && !state.drillBoardId) {
        const tId = state.faultTargetId || state.selectedNodeId;
        if (NODE_MAP.has(tId)) {
          const raw = traceUpstreamRawLevel1(tId);
          faultChainNodes = new Set([...raw.nodeMeta.keys(), ...(state.faultCoFailed || [])]);
          faultChainEdges = raw.activeEdges;
          if (state.layoutEngine !== "synoptic") {
            // In dynamic Cytoscape graphs, include ALL cross-plant chain nodes even multiple hops away!
            faultChainNodes.forEach((cid) => {
              const cn = NODE_MAP.get(cid);
              if (cn && !includedIds.has(cn.id)) {
                nodes.push({ ...cn, isBridge: !ownSet.has(cn.id) });
                includedIds.add(cn.id);
              }
            });
          } else {
            // In static Synoptic mode, include any chain node that has an explicit pre-validated slot on this plant's board!
            const synSlots = (SYNOPTIC_SCHEMAS[pid] && SYNOPTIC_SCHEMAS[pid].slots) || {};
            faultChainNodes.forEach((cid) => {
              const cn = NODE_MAP.get(cid);
              if (cn && !includedIds.has(cn.id) && synSlots[cn.id]) {
                nodes.push({ ...cn, isBridge: true });
                includedIds.add(cn.id);
              }
            });
          }
        }
      }

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
        } else if (faultChainNodes && includedIds.has(e.source) && includedIds.has(e.target) && (faultChainEdges.has(e.id) || sOwn || tOwn)) {
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

  function buildNodeCardDataUri(node, pal, isSelected, faultDiag) {
    const W = node.isInternalComp ? 266 : 304;
    const H = node.isInternalComp ? 102 : 124;
    const col = resolveNodeCarrierColors(node, pal);
    const pInfo = PLANT_MAP.get(node.plant);
    const isHorizontal = state.flowDir === "LR";

    const fStep = faultDiag && faultDiag.stepByNodeId ? faultDiag.stepByNodeId.get(node.id) : null;
    const isFaultTarget = Boolean(faultDiag && faultDiag.targetId === node.id);
    const isFaultCoFail = Boolean(faultDiag && faultDiag.coFailedSet && faultDiag.coFailedSet.has(node.id));
    const isFaultActiveStep = Boolean(fStep && !fStep.ruledOut);

    let cardBg = node.isBridge ? pal.bgElevated : pal.surface;
    let headerBg = node.isBridge ? pal.surfaceSoft : col.bg;
    let strokeCol = isSelected ? col.fg : (node.isBridge ? pal.borderStrong : col.fg);
    let strokeW = isSelected ? 3.6 : (node.roleType === "source" ? 2.6 : 1.9);
    let dashAttr = node.isBridge ? 'stroke-dasharray="7,4"' : "";

    if (isFaultTarget) {
      strokeCol = pal.danger;
      strokeW = 4.0;
      dashAttr = "";
    } else if (isFaultCoFail) {
      strokeCol = pal.danger;
      strokeW = 3.0;
      dashAttr = 'stroke-dasharray="7,4"';
    } else if (isFaultActiveStep) {
      strokeCol = fStep.isPrimarySuspect ? pal.warning : col.fg;
      strokeW = fStep.isPrimarySuspect ? 3.8 : 2.8;
      dashAttr = "";
    }

    let roleBanner = node.isBridge
      ? `↪ PONTE · ${pInfo ? pInfo.shortName.toUpperCase() : ""}`
      : (node.roleLabel || "COMPONENTE");
    if (isFaultTarget) roleBanner = "🎯 PUNTO NON FUNZIONANTE";
    else if (isFaultCoFail) roleBanner = "🔴 ANCHE FERMO";
    else if (isFaultActiveStep) {
      roleBanner = fStep.isPrimarySuspect
        ? `★ #${fStep.activeRank} CAUSA A MONTE`
        : `#${fStep.activeRank} CONTROLLO A MONTE`;
    }

    const cleanTitle = node.label.replace(/\s*\([^)]*\)\s*$/, "").trim();
    const titleLines = wrapTextLines(cleanTitle, node.isInternalComp ? 30 : 32, 1);

    let bodyDesc = node.shortFunc || node.desc || "";
    if (isFaultActiveStep && fStep.activeDevices && fStep.activeDevices.length) {
      bodyDesc = fStep.activeDevices.map((d) => `${d.icon} ${d.badgeText}`).join(" · ");
    } else if (isFaultTarget && faultDiag.targetSelfDevices && faultDiag.targetSelfDevices.length) {
      bodyDesc = "A bordo: " + faultDiag.targetSelfDevices.map((d) => `${d.icon} ${d.badgeText}`).join(" · ");
    }
    const funcLines = wrapTextLines(bodyDesc, node.isInternalComp ? 36 : 41, 2);

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

    if (state.faultMode) {
      clearBtn.style.display = "none";
      const faultDiag = getActiveFaultDiagnosis();
      if (!faultDiag) return;
      const keepNodes = new Set([faultDiag.targetId, ...faultDiag.coFailedSet]);
      faultDiag.activeSteps.forEach((s) => keepNodes.add(s.nodeId));

      wires.forEach((w) => {
        const eid = w.dataset.edgeId;
        if (!faultDiag.activeEdgeIds.has(eid)) {
          w.classList.add("dimmed");
        }
      });
      cards.forEach((c) => {
        const nid = c.dataset.nodeId;
        if (!keepNodes.has(nid) && !c.classList.contains("fault-ruled-out")) {
          c.classList.add("dimmed");
        }
      });
      return;
    }

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
    syncDrillBreadcrumbPhysicalBtn(isInternal, parentBoard);

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
    const COL_GAP = isInternal ? 56 : 44;
    const COL_PITCH = CARD_W + COL_GAP;
    const PAD_LEFT = 204;
    const PAD_RIGHT = 32;
    const PAD_Y = 20;
    const BAND_TOP = 32;
    const BAND_BOT = 14;
    const BAND_H = BAND_TOP + CARD_H + BAND_BOT;
    const CHANNEL_H = isInternal ? 124 : 90;
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

    // Helper: check if two cards on the same row have unobstructed horizontal line-of-sight
    function isRowSpanClear(rowIdx, xA, xB, ignoreIdA, ignoreIdB) {
      const xMin = Math.min(xA, xB) + 4;
      const xMax = Math.max(xA, xB) - 4;
      for (const [nid, bx] of boxes.entries()) {
        if (nid === ignoreIdA || nid === ignoreIdB || bx.row !== rowIdx) continue;
        if (bx.right > xMin && bx.left < xMax) return false;
      }
      return true;
    }

    // Find nearest clear vertical alley; tie-break closest to tieX (b2.cx) so shallower rows take inner sub-lanes and deeper rows pass untouched on outer sub-lanes!
    const usedAlleys = [];
    function findClearAlley(prefX, tieX, yA, yB, idA, idB) {
      const candidates = [];
      const maxColIdx = Math.ceil(spanCols) + 1;
      const laneStep = isInternal ? 12 : 10;
      for (let k = 0; k <= maxColIdx; k++) {
        const ax = PAD_LEFT + k * COL_PITCH - COL_GAP / 2;
        candidates.push(ax - laneStep, ax, ax + laneStep);
      }
      candidates.sort((a, b) => {
        const da = Math.floor(Math.abs(a - prefX) / (COL_GAP * 0.7));
        const db = Math.floor(Math.abs(b - prefX) / (COL_GAP * 0.7));
        if (da !== db) return da - db;
        return Math.abs(a - tieX) - Math.abs(b - tieX);
      });
      for (const cx of candidates) {
        if (!isShaftClear(cx, yA, yB, idA, idB)) continue;
        const clash = usedAlleys.some((u) => Math.abs(u.x - cx) < 8 && Math.min(yB, u.y2) > Math.max(yA, u.y1));
        if (!clash) {
          usedAlleys.push({ x: cx, y1: Math.min(yA, yB), y2: Math.max(yA, yB) });
          return cx;
        }
      }
      return prefX;
    }

    // STEP 1: Classify exit/entry faces AND pre-compute multi-row bypass alleys FIRST
    // so every block's pins are sorted monotonically by each wire's ACTUAL horizontal channel target (eliminating nested/inverted fan-out crossings!)
    const faceAttachments = new Map(); // `${nodeId}::${face}` -> [{ edgeId, isSource, sortCoord }]
    const edgeFaces = new Map();       // edgeId -> { exitFace, entryFace, directSide }

    function addAttachment(nodeId, face, edgeId, isSource, sortCoord) {
      const k = `${nodeId}::${face}`;
      if (!faceAttachments.has(k)) faceAttachments.set(k, []);
      faceAttachments.get(k).push({ edgeId, isSource, sortCoord });
    }

    edges.forEach((e) => {
      e._cachedAlley = undefined;
      const b1 = boxes.get(e.source);
      const b2 = boxes.get(e.target);
      if (!b1 || !b2) return;

      let exitFace = "bot";
      let entryFace = "top";
      let directSide = false;
      let srcSort = b2.cx;
      let tgtSort = b1.cx;

      if (b2.row === b1.row) {
        if (isRowSpanClear(b1.row, b1.cx, b2.cx, e.source, e.target)) {
          const goRight = b2.cx >= b1.cx;
          exitFace = goRight ? "right" : "left";
          entryFace = goRight ? "left" : "right";
          directSide = true;
          srcSort = b2.cy;
          tgtSort = b1.cy;
        } else {
          exitFace = "bot";
          entryFace = "bot";
        }
      } else if (b2.row > b1.row) {
        exitFace = "bot";
        entryFace = "top";
        const yFirstChannel = PAD_Y + b1.row * ROW_PITCH + BAND_H + 20;
        if (b2.row > b1.row + 1 && !isShaftClear(b2.cx, yFirstChannel, b2.top, e.source, e.target)) {
          // Prefer alley on outward side of b1.cx so left/right fan-out stays symmetric and uncrossed
          const prefSideX = b2.cx < b1.cx ? (b2.left - COL_GAP / 2) : (b2.cx > b1.cx ? (b2.right + COL_GAP / 2) : (b2.left - COL_GAP / 2));
          const xAlley = findClearAlley(prefSideX, b2.cx, yFirstChannel, b2.top, e.source, e.target);
          e._cachedAlley = xAlley;
          srcSort = xAlley;
          tgtSort = xAlley;
        }
      } else {
        exitFace = "top";
        entryFace = "bot";
        const yUpChannel = PAD_Y + (b1.row - 1) * ROW_PITCH + BAND_H + 20;
        if (!isShaftClear(b2.cx, b2.bottom, yUpChannel, e.source, e.target)) {
          const xAlley = findClearAlley(b1.cx, b2.cx, b2.bottom, yUpChannel, e.source, e.target);
          e._cachedAlley = xAlley;
          srcSort = xAlley;
          tgtSort = xAlley;
        }
      }

      edgeFaces.set(e.id, { exitFace, entryFace, directSide });
      addAttachment(e.source, exitFace, e.id, true, srcSort);
      addAttachment(e.target, entryFace, e.id, false, tgtSort);
    });

    const edgePins = new Map(); // `${edgeId}::src` or `${edgeId}::tgt` -> { x, y }
    faceAttachments.forEach((list, key) => {
      const [nid, face] = key.split("::");
      const bx = boxes.get(nid);
      if (!bx) return;
      list.sort((a, b) => (a.sortCoord - b.sortCoord) || a.edgeId.localeCompare(b.edgeId));
      const cnt = list.length;

      if (face === "top" || face === "bot") {
        const step = Math.min(30, Math.floor((CARD_W - 40) / Math.max(1, cnt)));
        const y = face === "top" ? bx.top : bx.bottom;
        list.forEach((item, idx) => {
          const x = bx.cx + (idx - (cnt - 1) / 2) * step;
          edgePins.set(`${item.edgeId}::${item.isSource ? "src" : "tgt"}`, { x, y });
        });
      } else {
        const step = Math.min(20, Math.floor((CARD_H - 28) / Math.max(1, cnt)));
        const x = face === "left" ? bx.left : bx.right;
        list.forEach((item, idx) => {
          const y = bx.cy + (idx - (cnt - 1) / 2) * step;
          edgePins.set(`${item.edgeId}::${item.isSource ? "src" : "tgt"}`, { x, y });
        });
      }
    });

    // General Sibling-Aware Pin Straightening Pass:
    // Shifts sibling connectors outward (e.g. pushing a wire arriving from the left further left)
    // whenever two facing blocks overlap so their direct connection becomes 100% straight!
    const MIN_PIN_GAP_X = 28;
    const MIN_PIN_GAP_Y = 16;

    function gapForFace(face, cnt) {
      if (face === "top" || face === "bot") {
        return cnt <= 1 ? MIN_PIN_GAP_X : Math.min(MIN_PIN_GAP_X, Math.floor((CARD_W - 40) / (cnt - 1)));
      }
      return cnt <= 1 ? MIN_PIN_GAP_Y : Math.min(MIN_PIN_GAP_Y, Math.floor((CARD_H - 30) / (cnt - 1)));
    }

    function getMovablePinRange(nodeId, face, edgeId, isSource) {
      const bx = boxes.get(nodeId);
      const list = faceAttachments.get(`${nodeId}::${face}`) || [];
      const idx = list.findIndex((it) => it.edgeId === edgeId && it.isSource === isSource);
      if (!bx || idx < 0) return null;
      const gap = gapForFace(face, list.length);
      const rightCount = list.length - 1 - idx;
      if (face === "top" || face === "bot") {
        return {
          bx, list, idx, gap,
          lo: bx.left + 18 + idx * gap,
          hi: bx.right - 18 - rightCount * gap
        };
      }
      return {
        bx, list, idx, gap,
        lo: bx.top + 14 + idx * gap,
        hi: bx.bottom - 14 - rightCount * gap
      };
    }

    function setPinAndSpreadSiblings(info, coord, axis) {
      const { list, idx, gap } = info;
      const getPin = (i) => edgePins.get(`${list[i].edgeId}::${list[i].isSource ? "src" : "tgt"}`);
      const anchor = getPin(idx);
      if (!anchor) return;
      anchor[axis] = coord;
      for (let i = idx - 1; i >= 0; i--) {
        const cur = getPin(i);
        const nxt = getPin(i + 1);
        if (cur && nxt && cur[axis] > nxt[axis] - gap) {
          cur[axis] = nxt[axis] - gap;
        }
      }
      for (let i = idx + 1; i < list.length; i++) {
        const cur = getPin(i);
        const prv = getPin(i - 1);
        if (cur && prv && cur[axis] < prv[axis] + gap) {
          cur[axis] = prv[axis] + gap;
        }
      }
    }

    for (let pass = 0; pass < 3; pass++) {
      edges.forEach((e) => {
        const b1 = boxes.get(e.source);
        const b2 = boxes.get(e.target);
        const fc = edgeFaces.get(e.id);
        const pS = edgePins.get(`${e.id}::src`);
        const pT = edgePins.get(`${e.id}::tgt`);
        if (!b1 || !b2 || !fc || !pS || !pT) return;

        if ((fc.exitFace === "bot" && fc.entryFace === "top") || (fc.exitFace === "top" && fc.entryFace === "bot")) {
          const sb = getMovablePinRange(e.source, fc.exitFace, e.id, true);
          const tb = getMovablePinRange(e.target, fc.entryFace, e.id, false);
          if (!sb || !tb) return;
          const commonLo = Math.max(sb.lo, tb.lo);
          const commonHi = Math.min(sb.hi, tb.hi);
          if (commonLo <= commonHi) {
            let xTarget = (pS.x + pT.x) / 2;
            if (sb.list.length > 1 && tb.list.length === 1) xTarget = pS.x;
            else if (tb.list.length > 1 && sb.list.length === 1) xTarget = pT.x;
            const xAligned = Math.max(commonLo, Math.min(commonHi, xTarget));
            if (isShaftClear(xAligned, Math.min(pS.y, pT.y) + 4, Math.max(pS.y, pT.y) - 4, e.source, e.target)) {
              setPinAndSpreadSiblings(sb, xAligned, "x");
              setPinAndSpreadSiblings(tb, xAligned, "x");
            }
          }
        } else if (fc.directSide) {
          const sb = getMovablePinRange(e.source, fc.exitFace, e.id, true);
          const tb = getMovablePinRange(e.target, fc.entryFace, e.id, false);
          if (!sb || !tb) return;
          const commonLo = Math.max(sb.lo, tb.lo);
          const commonHi = Math.min(sb.hi, tb.hi);
          if (commonLo <= commonHi) {
            let yTarget = (pS.y + pT.y) / 2;
            if (sb.list.length > 1 && tb.list.length === 1) yTarget = pS.y;
            else if (tb.list.length > 1 && sb.list.length === 1) yTarget = pT.y;
            const yAligned = Math.max(commonLo, Math.min(commonHi, yTarget));
            setPinAndSpreadSiblings(sb, yAligned, "y");
            setPinAndSpreadSiblings(tb, yAligned, "y");
          }
        }
      });
    }

    // STEP 2: Vertical Constraint Graph (VCG) topological channel router -> mathematically eliminates avoidable stem/bar crossings!
    const channelRequests = new Map(); // channelIdx -> [{ reqKey, xS, xE, minX, maxX, span, hasTopStem, hasBotStem }]
    function registerChannelReq(chIdx, reqKey, xS, xE, hasTopStem, hasBotStem) {
      if (!channelRequests.has(chIdx)) channelRequests.set(chIdx, []);
      channelRequests.get(chIdx).push({
        reqKey,
        xS,
        xE,
        minX: Math.min(xS, xE),
        maxX: Math.max(xS, xE),
        span: Math.abs(xE - xS),
        hasTopStem,
        hasBotStem
      });
    }

    edges.forEach((e) => {
      const b1 = boxes.get(e.source);
      const b2 = boxes.get(e.target);
      const fc = edgeFaces.get(e.id);
      const pS = edgePins.get(`${e.id}::src`);
      const pT = edgePins.get(`${e.id}::tgt`);
      if (!b1 || !b2 || !fc || !pS || !pT) return;

      if (fc.directSide) return;
      if (b2.row === b1.row) {
        registerChannelReq(b1.row, `same::${e.id}`, pS.x, pT.x, true, false);
      } else if (b2.row > b1.row) {
        if (e._cachedAlley !== undefined) {
          const xAlley = e._cachedAlley;
          registerChannelReq(b1.row, `dn1::${e.id}`, pS.x, xAlley, true, true);
          registerChannelReq(b2.row - 1, `dn2::${e.id}`, xAlley, pT.x, true, true);
        } else if (Math.abs(pT.x - pS.x) >= 4) {
          registerChannelReq(b1.row, `dn1::${e.id}`, pS.x, pT.x, true, true);
        }
      } else {
        if (e._cachedAlley !== undefined) {
          const xAlley = e._cachedAlley;
          registerChannelReq(b1.row - 1, `up1::${e.id}`, pS.x, xAlley, false, true);
          registerChannelReq(b2.row, `up2::${e.id}`, xAlley, pT.x, true, false);
        } else {
          registerChannelReq(b1.row - 1, `up1::${e.id}`, pS.x, pT.x, true, true);
        }
      }
    });

    const resolvedTrackY = new Map(); // `${chIdx}::${reqKey}` -> yTrack
    channelRequests.forEach((reqs, chIdx) => {
      const n = reqs.length;
      // Build Vertical Constraint Graph: edge i -> j means reqs[i] MUST be placed ABOVE reqs[j] (y_i < y_j)
      const adj = Array.from({ length: n }, () => new Set());
      const indeg = new Array(n).fill(0);

      function mustBeAbove(a, b) {
        // Putting a above b prevents:
        // 1) a's top stem from piercing b's horizontal bar (if a.xS lies inside [b.minX, b.maxX])
        // 2) b's bottom stem from piercing a's horizontal bar (if b.xE lies inside [a.minX, a.maxX])
        const aTopInB = a.hasTopStem && a.xS >= b.minX - 4 && a.xS <= b.maxX + 4 && Math.abs(a.xS - b.xS) > 1;
        const bBotInA = b.hasBotStem && b.xE >= a.minX - 4 && b.xE <= a.maxX + 4 && Math.abs(b.xE - a.xE) > 1;
        return aTopInB || bBotInA;
      }

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const iAboveJ = mustBeAbove(reqs[i], reqs[j]);
          const jAboveI = mustBeAbove(reqs[j], reqs[i]);
          if (iAboveJ && !jAboveI) {
            adj[i].add(j);
            indeg[j]++;
          } else if (jAboveI && !iAboveJ) {
            adj[j].add(i);
            indeg[i]++;
          }
        }
      }

      // Topological order with widest-span tie-breaking
      const ordered = [];
      const visited = new Array(n).fill(false);
      for (let step = 0; step < n; step++) {
        let pick = -1;
        for (let i = 0; i < n; i++) {
          if (visited[i]) continue;
          if (indeg[i] === 0) {
            if (pick === -1 || reqs[i].span > reqs[pick].span) pick = i;
          }
        }
        if (pick === -1) {
          // Cycle fallback: pick largest span among unvisited
          for (let i = 0; i < n; i++) {
            if (!visited[i] && (pick === -1 || reqs[i].span > reqs[pick].span)) pick = i;
          }
        }
        visited[pick] = true;
        ordered.push(pick);
        adj[pick].forEach((nxt) => { indeg[nxt]--; });
      }

      // Pack into non-conflicting horizontal tracks respecting VCG order (trackIdx_j > trackIdx_i if i -> j)
      const bandBot = PAD_Y + chIdx * ROW_PITCH + BAND_H;
      const tracks = []; // [{ items: [idx] }]
      const assignedTrack = new Array(n).fill(-1);

      ordered.forEach((idx) => {
        const rq = reqs[idx];
        // Must sit strictly below any predecessor u where u -> idx
        let minTrack = 0;
        for (let u = 0; u < n; u++) {
          if (adj[u].has(idx) && assignedTrack[u] >= 0) {
            minTrack = Math.max(minTrack, assignedTrack[u] + 1);
          }
        }
        let placedT = -1;
        for (let t = minTrack; t < tracks.length; t++) {
          const clash = tracks[t].some((otherIdx) => {
            const o = reqs[otherIdx];
            return rq.minX <= o.maxX + 10 && rq.maxX >= o.minX - 10;
          });
          if (!clash) {
            placedT = t;
            tracks[t].push(idx);
            break;
          }
        }
        if (placedT === -1) {
          placedT = tracks.length;
          tracks.push([idx]);
        }
        assignedTrack[idx] = placedT;
      });

      const stepY = Math.min(13, Math.max(8, Math.floor((CHANNEL_H - 22) / Math.max(1, tracks.length))));
      for (let i = 0; i < n; i++) {
        resolvedTrackY.set(`${chIdx}::${reqs[i].reqKey}`, bandBot + 13 + assignedTrack[i] * stepY);
      }
    });

    function getTrackY(chIdx, reqKey) {
      return resolvedTrackY.get(`${chIdx}::${reqKey}`) || (PAD_Y + chIdx * ROW_PITCH + BAND_H + 26);
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

    // STEP 3: Compute all wire polylines first so badges can avoid EVERY wire segment!
    const routedEdges = [];
    const allWireSegs = []; // { edgeId, x1, y1, x2, y2 }

    edges.forEach((e) => {
      const b1 = boxes.get(e.source);
      const b2 = boxes.get(e.target);
      const fc = edgeFaces.get(e.id);
      const pStart = edgePins.get(`${e.id}::src`);
      const pEnd = edgePins.get(`${e.id}::tgt`);
      if (!b1 || !b2 || !fc || !pStart || !pEnd) return;

      let pts = [];
      let arrowAngleDeg = 90;
      let badgeCandidates = [];

      if (fc.directSide) {
        const goRight = pEnd.x >= pStart.x;
        pts = [pStart, pEnd];
        arrowAngleDeg = goRight ? 0 : 180;
        const midX = (pStart.x + pEnd.x) / 2;
        const gapW = Math.abs(pEnd.x - pStart.x);
        badgeCandidates = gapW >= 135
          ? [{ x: midX, y: pStart.y - 13 }, { x: midX, y: Math.min(b1.top, b2.top) - 13 }]
          : [{ x: midX, y: Math.min(b1.top, b2.top) - 13 }];
      } else if (b2.row === b1.row) {
        const yUnder = getTrackY(b1.row, `same::${e.id}`);
        pts = [
          pStart,
          { x: pStart.x, y: yUnder },
          { x: pEnd.x, y: yUnder },
          pEnd
        ];
        arrowAngleDeg = -90;
        badgeCandidates = [{ x: (pStart.x + pEnd.x) / 2, y: yUnder + 12 }];
      } else if (b2.row > b1.row) {
        const yBus = getTrackY(b1.row, `dn1::${e.id}`);
        if (e._cachedAlley !== undefined) {
          const xAlley = e._cachedAlley;
          const yBusBottom = getTrackY(b2.row - 1, `dn2::${e.id}`);
          pts = [
            pStart,
            { x: pStart.x, y: yBus },
            { x: xAlley, y: yBus },
            { x: xAlley, y: yBusBottom },
            { x: pEnd.x, y: yBusBottom },
            pEnd
          ];
        } else if (Math.abs(pEnd.x - pStart.x) < 4) {
          pts = [pStart, pEnd];
        } else {
          pts = [
            pStart,
            { x: pStart.x, y: yBus },
            { x: pEnd.x, y: yBus },
            pEnd
          ];
        }
        arrowAngleDeg = 90;
        badgeCandidates = [
          { x: pEnd.x, y: pEnd.y - 14 },
          { x: pEnd.x, y: pEnd.y - 28 }
        ];
      } else {
        const yChStart = getTrackY(b1.row - 1, `up1::${e.id}`);
        if (e._cachedAlley !== undefined) {
          const xAlley = e._cachedAlley;
          const yChTop = getTrackY(b2.row, `up2::${e.id}`);
          pts = [
            pStart,
            { x: pStart.x, y: yChStart },
            { x: xAlley, y: yChStart },
            { x: xAlley, y: yChTop },
            { x: pEnd.x, y: yChTop },
            pEnd
          ];
        } else {
          pts = [
            pStart,
            { x: pStart.x, y: yChStart },
            { x: pEnd.x, y: yChStart },
            pEnd
          ];
        }
        arrowAngleDeg = -90;
        badgeCandidates = [{ x: pEnd.x, y: pEnd.y + 15 }];
      }

      for (let i = 0; i < pts.length - 1; i++) {
        allWireSegs.push({
          edgeId: e.id,
          x1: Math.min(pts[i].x, pts[i + 1].x),
          y1: Math.min(pts[i].y, pts[i + 1].y),
          x2: Math.max(pts[i].x, pts[i + 1].x),
          y2: Math.max(pts[i].y, pts[i + 1].y)
        });
      }
      routedEdges.push({ e, pts, pStart, pEnd, arrowAngleDeg, badgeCandidates });
    });

    // STEP 4: Render SVG Wires, Spaced Exit Port Dots, Arrowheads & Non-Colliding Badges
    const faultDiag = getActiveFaultDiagnosis();
    let svgWiresHtml = "";
    const placedBadgeRects = [];
    const wireSpecs = [];

    // In Fault Mode, place badges for active fault-chain wires first so they never get crowded out
    const orderedRoutedEdges = faultDiag
      ? [...routedEdges].sort((a, b) => {
          const aAct = faultDiag.activeEdgeIds.has(a.e.id) ? 0 : 1;
          const bAct = faultDiag.activeEdgeIds.has(b.e.id) ? 0 : 1;
          return aAct - bAct;
        })
      : routedEdges;

    orderedRoutedEdges.forEach(({ e, pts, pStart, pEnd, arrowAngleDeg, badgeCandidates }) => {
      const interrupted = isEdgeInterruptedInEmergency(e);
      const cStyle = resolveCarrierStyle(e.edgeType, interrupted, pal);
      const color = cStyle.color;
      const dash = cStyle.svgDash;
      const isFaultWire = Boolean(faultDiag && faultDiag.activeEdgeIds.has(e.id));
      const strokeW = isFaultWire ? (cStyle.width + 1.0) : cStyle.width;

      const dPath = buildRoundedOrthoPath(pts, 11);
      if (!dPath) return;

      const dotSvg = `<circle cx="${pStart.x.toFixed(1)}" cy="${pStart.y.toFixed(1)}" r="${isFaultWire ? "3.4" : "2.9"}" fill="${pal.surface}" stroke="${color}" stroke-width="${isFaultWire ? "2.1" : "1.8"}" />`;

      // Arrowhead / Tee at target port
      let headSvg = "";
      if (e.edgeType === "emergency_trip") {
        headSvg = `<g transform="translate(${pEnd.x.toFixed(1)},${pEnd.y.toFixed(1)}) rotate(${arrowAngleDeg})"><line x1="-2" y1="-6" x2="-2" y2="6" stroke="${color}" stroke-width="2.8" stroke-linecap="round"/></g>`;
      } else {
        headSvg = `<g transform="translate(${pEnd.x.toFixed(1)},${pEnd.y.toFixed(1)}) rotate(${arrowAngleDeg})"><polygon points="0,0 -8,-4.5 -8,4.5" fill="${color}"/></g>`;
      }

      // Compact horizontal micro-badge checked against BOTH other badges AND other wires!
      // When Fault Mode is ON, suppress badges on dimmed non-chain wires so breaker/fuse labels stand out cleanly!
      let badgeSvg = "";
      const rawShort = (e.label || "").replace(/\s*·\s*.*/, "").slice(0, isFaultWire ? 26 : 22);
      const shortLbl = interrupted
        ? (e.edgeType === "power_fv" ? "⛔ STOP CEI 0-21" : "⛔ SEZIONATO")
        : (isFaultWire && rawShort ? `🛡️ ${rawShort}` : rawShort);

      if (shortLbl && badgeCandidates.length && (!faultDiag || isFaultWire)) {
        const bw = Math.max(46, shortLbl.length * 5.7 + 12);
        const bh = isFaultWire ? 16.5 : 15;
        for (const cand of badgeCandidates) {
          const bx1 = cand.x - bw / 2;
          const by1 = cand.y - bh / 2;
          const bx2 = bx1 + bw;
          const by2 = by1 + bh;
          const hitsBadge = placedBadgeRects.some((r) =>
            bx1 < r.x2 + 4 && bx2 > r.x1 - 4 && by1 < r.y2 + 2 && by2 > r.y1 - 2
          );
          const hitsOtherWire = !isFaultWire && allWireSegs.some((sg) =>
            sg.edgeId !== e.id && sg.x2 > bx1 - 2 && sg.x1 < bx2 + 2 && sg.y2 > by1 - 2 && sg.y1 < by2 + 2
          );
          if (!hitsBadge && !hitsOtherWire) {
            placedBadgeRects.push({ x1: bx1, y1: by1, x2: bx2, y2: by2 });
            badgeSvg = `
              <g>
                <rect x="${bx1.toFixed(1)}" y="${by1.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh}" rx="4"
                  fill="${pal.surface}" stroke="${interrupted ? pal.danger : (isFaultWire ? color : pal.border)}" stroke-width="${isFaultWire ? "1.6" : "1"}" opacity="0.97" />
                <text x="${cand.x.toFixed(1)}" y="${(cand.y + 3.4).toFixed(1)}" text-anchor="middle"
                  font-family="Segoe UI, Aptos, sans-serif" font-size="${isFaultWire ? "9.6" : "9.3"}" font-weight="${isFaultWire ? "700" : "600"}" fill="${interrupted ? pal.danger : (isFaultWire ? pal.text : pal.textMuted)}">${escXml(shortLbl)}</text>
              </g>
            `;
            break;
          }
        }
      }

      const pathDomId = `synpath_${e.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
      svgWiresHtml += `
        <g class="syn-wire-group ${isFaultWire ? "fault-active" : ""}" data-edge-id="${e.id}" data-source="${e.source}" data-target="${e.target}">
          <path id="${pathDomId}" d="${dPath}" fill="none" stroke="${color}" stroke-width="${strokeW}"
            ${dash ? `stroke-dasharray="${dash}"` : ""} stroke-linecap="round" stroke-linejoin="round" />
          ${dotSvg}
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

    const dotsSvg = "";

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
      const physTarget = !n.isInternalComp ? resolvePhysicalPanelTarget(n, null) : null;

      // Fault-chain status & inline Breaker/Fuse pills on the card!
      let faultCls = "";
      let topRightChipHtml = incs.length > 0
        ? `<span style="background:var(--cp-warning); color:var(--cp-text); font-weight:700; padding:0 5px; border-radius:4px; font-size:9.5px;">⚠ ${incs.length}</span>`
        : `<span class="syn-room-chip" title="${escXml(n.roomGroup || "")}">${escXml(shortRoom)}</span>`;
      let midContentHtml = `<div class="syn-func" title="${escXml(n.shortFunc || n.desc || "")}">${escXml(n.shortFunc || n.desc || "")}</div>`;

      if (faultDiag) {
        const fStep = faultDiag.stepByNodeId.get(n.id);
        const renderInlinePills = (devs) => devs.slice(0, 4).map((d) => {
          const pCls = d.category === "fuse" ? "is-fuse" : (d.category === "breaker" ? "is-breaker" : "");
          const tip = `${d.badgeText} — ${d.shortLabel} (${d.ratingBadge})`;
          return d.panelHref
            ? `<a class="syn-prot-pill ${pCls}" href="${escXml(d.panelHref)}" data-panel-link="true" title="${escXml(tip)}">${d.icon} ${escXml(d.badgeText)}</a>`
            : `<span class="syn-prot-pill ${pCls}" title="${escXml(tip)}">${d.icon} ${escXml(d.badgeText)}</span>`;
        }).join("");

        if (n.id === faultDiag.targetId) {
          faultCls = "fault-target";
          topRightChipHtml = `<span class="syn-fault-badge is-target">🎯 NON FUNZIONA</span>`;
          if (faultDiag.targetSelfDevices && faultDiag.targetSelfDevices.length) {
            midContentHtml = `<div class="syn-prot-strip">${renderInlinePills(faultDiag.targetSelfDevices)}</div>`;
          }
        } else if (faultDiag.coFailedSet.has(n.id)) {
          faultCls = "fault-cofail";
          topRightChipHtml = `<span class="syn-fault-badge is-target">🔴 ANCHE FERMO</span>`;
        } else if (fStep) {
          if (fStep.ruledOut) {
            faultCls = "fault-ruled-out";
            topRightChipHtml = `<span class="syn-room-chip">Escluso</span>`;
          } else {
            faultCls = fStep.isPrimarySuspect ? "fault-top-suspect" : "fault-suspect";
            topRightChipHtml = `<span class="syn-fault-badge ${fStep.isPrimarySuspect ? "is-top" : "is-step"}">${fStep.isPrimarySuspect ? `★ #${fStep.activeRank}` : `#${fStep.activeRank} A MONTE`}</span>`;
            if (fStep.activeDevices && fStep.activeDevices.length) {
              midContentHtml = `<div class="syn-prot-strip">${renderInlinePills(fStep.activeDevices)}</div>`;
            }
          }
        }
      }

      cardsHtml += `
        <div class="syn-card ${n.isBridge ? "is-bridge" : ""} ${isSel ? "is-selected" : ""} ${isTripped ? "is-tripped" : ""} ${faultCls}"
          data-node-id="${n.id}"
          style="left:${bx.left.toFixed(1)}px; top:${bx.top.toFixed(1)}px; width:${CARD_W}px; height:${CARD_H}px; --card-accent:${accent};">
          <div class="syn-card-top">
            <span class="syn-code" title="${escXml(n.code)}">${escXml(n.code)}</span>
            ${topRightChipHtml}
          </div>
          <div class="syn-title" title="${escXml(n.label)}">${escXml(n.label)}</div>
          ${midContentHtml}
          ${(hasDrill || physTarget) ? `
            <div class="syn-card-foot">
              ${physTarget
                ? `<a class="syn-drill-btn" href="${escXml(physTarget.href)}" data-panel-link="true" title="Apri la pagina dedicata al Pannello Fisico (Fronte Quadro)">🗄️ Pannello</a>`
                : `<span style="font-size:9.2px; color:var(--cp-text-muted);">${(n.internalGraph.nodes || []).length} comp.</span>`
              }
              ${hasDrill
                ? `<button class="syn-drill-btn" data-drill-btn="${n.id}" title="Apri lo schema elettrico interno di questo quadro">🔬 Schema ▸</button>`
                : ""
              }
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
    board.querySelectorAll("[data-panel-link]").forEach((lnk) => {
      lnk.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
        ev.preventDefault();
        navigateToExternalPage(lnk.getAttribute("href"));
      });
    });

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
        if (state.faultMode) {
          if (state.faultTargetId !== nid) {
            state.faultTargetId = nid;
            state.faultCoFailed = [];
            state.faultConfirmedOk = [];
            state.selectedNodeId = nid;
            state.focusedNodeId = null;
            refreshAll();
          } else {
            selectNode(nid, false);
          }
          if (state.isFullscreen) {
            document.getElementById("inspector").classList.remove("closed-in-fs");
          }
          return;
        }
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
          pushIntraAppStep();
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
    syncDrillBreadcrumbPhysicalBtn(isInternal, parentBoard);

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

    const faultDiag = getActiveFaultDiagnosis();
    nodes.forEach((n) => {
      const grp = resolveNodeGroup(n, isInternal);
      const card = buildNodeCardDataUri(n, pal, n.id === state.selectedNodeId, faultDiag);
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

      if (state.faultMode) {
        if (state.faultTargetId !== nid) {
          state.faultTargetId = nid;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
          state.selectedNodeId = nid;
          state.focusedNodeId = null;
          refreshAll();
        } else {
          selectNode(nid, false);
        }
        if (state.isFullscreen) {
          document.getElementById("inspector").classList.remove("closed-in-fs");
        }
        return;
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

    if (state.faultMode) {
      clearBtn.style.display = "none";
      const faultDiag = getActiveFaultDiagnosis();
      if (!faultDiag) return;
      const keepIds = new Set([faultDiag.targetId, ...faultDiag.coFailedSet]);
      faultDiag.activeSteps.forEach((s) => keepIds.add(s.nodeId));

      cyInstance.nodes("[!isGroup]").forEach((nd) => {
        if (!keepIds.has(nd.id())) nd.addClass("dimmed");
      });
      cyInstance.edges().forEach((ed) => {
        if (faultDiag.activeEdgeIds.has(ed.id())) {
          ed.addClass("flow-highlight");
        } else {
          ed.addClass("dimmed");
        }
      });
      return;
    }

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
    const faultDiag = getActiveFaultDiagnosis();
    const { nodes } = computeCurrentGraph();
    nodes.forEach((n) => {
      const cyNode = cyInstance.getElementById(n.id);
      if (cyNode && cyNode.length) {
        const card = buildNodeCardDataUri(n, pal, n.id === state.selectedNodeId, faultDiag);
        cyNode.data("cardUri", card.uri);
      }
    });
  }

  function enterBoardInternalMap(boardId) {
    const b = NODE_MAP.get(boardId);
    if (!b || !b.internalGraph) return;
    pushIntraAppStep();
    state.drillBoardId = boardId;
    state.focusedNodeId = null;
    state.selectedNodeId = `${boardId}__MAIN`;
    if (state.faultMode) {
      const outLeaves = b.internalGraph.nodes.filter((sn) => sn.roleType === "load");
      state.faultTargetId = outLeaves.length ? outLeaves[0].id : `${boardId}__MAIN`;
      state.selectedNodeId = state.faultTargetId;
      state.faultCoFailed = [];
      state.faultConfirmedOk = [];
    }
    renderCytoscape(true);
    renderInspector();
    syncUrlWithState();
    syncGlobalNavBackUi();
  }

  function exitBoardInternalMap() {
    const top = window.SE_NAV ? window.SE_NAV.peek() : null;
    if (top && top.url) {
      try {
        const u = new URL(top.url, window.location.href);
        if (u.origin === window.location.origin && !u.pathname.includes("/pannelli/") && !u.searchParams.get("board")) {
          handleGlobalStepBack();
          return;
        }
      } catch (_) { /* fall through */ }
    }
    const prevBoard = state.drillBoardId;
    state.drillBoardId = null;
    state.focusedNodeId = null;
    if (prevBoard) {
      state.selectedNodeId = prevBoard;
      if (state.faultMode) {
        state.faultTargetId = prevBoard;
        state.faultCoFailed = [];
        state.faultConfirmedOk = [];
      }
    }
    renderCytoscape(true);
    renderInspector();
    syncUrlWithState();
    syncGlobalNavBackUi();
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

    // STRICTLY UNIFORM LINEAR VELOCITY (56 px/second in diagram space) across ALL wires regardless of length or signal type!
    const FLOW_SPEED_PX_PER_MS = 0.056;
    const FLOW_SPACING_PX = 135;

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
          if (state.opState === "normal" && (eType === "earth_pe" || (eType === "emergency_trip" && !state.faultMode))) {
            return;
          }

          const L = ws.totalLen;
          if (L * sc < 18) return;

          let shapeKind = "triangle";
          if (eType === "fire_resistant") shapeKind = "hexagon";
          else if (eType === "bms_bus" || eType === "tlc_signal") shapeKind = "packets";
          else if (eType === "emergency_trip") shapeKind = "diamond";
          else if (eType === "earth_pe") shapeKind = "earth_wave";

          const count = Math.max(1, Math.round(L / FLOW_SPACING_PX));
          const stepLen = L / count;
          const size = 5.0 * Math.min(1.18, Math.max(0.75, sc));
          const phasePx = (idx * 37) % stepLen;

          for (let k = 0; k < count; k++) {
            const dNow = ((timestamp * FLOW_SPEED_PX_PER_MS) + phasePx + k * stepLen) % L;
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
        const screenSpeed = FLOW_SPEED_PX_PER_MS * zoom;
        const screenSpacing = FLOW_SPACING_PX * zoom;

        cyInstance.edges(":visible").forEach((edge, idx) => {
          if (edge.hasClass("dimmed")) return;
          if (edge.data("interrupted")) return;

          const eType = edge.data("edgeType");
          if (state.opState === "normal" && (eType === "earth_pe" || (eType === "emergency_trip" && !state.faultMode))) {
            return;
          }

          // Measure true rendered curve length using 4 chord segments so speed is identical on curved and straight wires!
          const p0 = sampleEdgePoint(edge, 0, zoom, pan);
          const p1 = sampleEdgePoint(edge, 0.25, zoom, pan);
          const p2 = sampleEdgePoint(edge, 0.5, zoom, pan);
          const p3 = sampleEdgePoint(edge, 0.75, zoom, pan);
          const p4 = sampleEdgePoint(edge, 1, zoom, pan);
          if (!p0 || !p1 || !p2 || !p3 || !p4) return;
          const arcLen =
            Math.hypot(p1.x - p0.x, p1.y - p0.y) +
            Math.hypot(p2.x - p1.x, p2.y - p1.y) +
            Math.hypot(p3.x - p2.x, p3.y - p2.y) +
            Math.hypot(p4.x - p3.x, p4.y - p3.y);
          if (arcLen < 20) return;

          let shapeKind = "triangle";
          if (eType === "fire_resistant") shapeKind = "hexagon";
          else if (eType === "bms_bus" || eType === "tlc_signal") shapeKind = "packets";
          else if (eType === "emergency_trip") shapeKind = "diamond";
          else if (eType === "earth_pe") shapeKind = "earth_wave";

          const count = Math.max(1, Math.round(arcLen / Math.max(40, screenSpacing)));
          const stepPx = arcLen / count;
          const size = 5.4 * Math.min(1.22, Math.max(0.72, zoom));
          const col = edge.data("color");
          const phasePx = (idx * 37 * zoom) % stepPx;

          for (let k = 0; k < count; k++) {
            const distNow = ((timestamp * screenSpeed) + phasePx + k * stepPx) % arcLen;
            const t = distNow / arcLen;
            const dt = Math.min(0.03, 4 / arcLen);
            const pt = sampleEdgePoint(edge, t, zoom, pan);
            const ptAhead = sampleEdgePoint(edge, Math.min(1, t + dt), zoom, pan);
            const ptBehind = sampleEdgePoint(edge, Math.max(0, t - dt), zoom, pan);
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
        if (state.faultMode) {
          state.faultMode = false;
          state.faultTargetId = null;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
        }
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

  function renderProtChipHtml(d, extAttrName) {
    const cls = d.category === "fuse" ? "is-fuse" : (d.category === "relay" ? "is-relay" : "is-breaker");
    const sub = d.ratingBadge ? ` <span style="font-weight:600; opacity:0.85; font-size:10.5px;">· ${escXml(d.ratingBadge)}</span>` : "";
    const tip = [d.shortLabel, d.bayLabel ? `Posizione: ${d.bayLabel}` : ""].filter(Boolean).join(" — ");
    if (d.panelHref) {
      return `<a class="prot-chip ${cls}" href="${escXml(d.panelHref)}" ${extAttrName}="${escXml(d.panelHref)}" title="${escXml(tip)}">${d.icon} <span class="mono">${escXml(d.badgeText)}</span>${sub} ↗</a>`;
    }
    return `<span class="prot-chip ${cls}" style="cursor:default;" title="${escXml(tip)}">${d.icon} <span class="mono">${escXml(d.badgeText)}</span>${sub}</span>`;
  }

  function buildFaultPanelHtml(faultDiag, isMobile) {
    if (!faultDiag) return "";
    const extAttr = isMobile ? "data-mob-ext" : "data-fault-ext";
    const tNode = faultDiag.targetNode;
    const isOrigin = faultDiag.steps.length === 0 && (!faultDiag.targetSelfDevices || faultDiag.targetSelfDevices.length === 0);

    const selfBlockHtml = (faultDiag.targetSelfDevices && faultDiag.targetSelfDevices.length) ? `
      <div class="fault-step-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
          <div>
            <span class="syn-fault-badge is-target">A BORDO</span>
            <strong style="font-size:12.5px; margin-left:4px;">${escXml(tNode.code)} — Protezione locale</strong>
          </div>
          <span style="font-size:11px; color:var(--cp-text-muted);">📍 ${escXml((tNode.roomGroup || "").replace(/\s*\(.*?\)/g, ""))}</span>
        </div>
        <div class="prot-chips-wrap">
          ${faultDiag.targetSelfDevices.map((d) => renderProtChipHtml(d, extAttr)).join("")}
        </div>
        <div style="font-size:11.5px; color:var(--cp-text-muted);">Verifica per primo l'organo di manovra/protezione generale a bordo dello stesso quadro.</div>
      </div>
    ` : "";

    const renderStepCard = (s) => {
      const fl = FLOOR_MAP.get(s.node.floor) || { name: s.node.floor || "" };
      const loc = (s.node.roomGroup || fl.name || "").replace(/\s*\(.*?\)/g, "");
      const op = PLANT_MAP.get(s.node.plant);
      const isCrossPlant = !isMobile && !faultDiag.isInternal && s.node.plant && s.node.plant !== state.activePlant && state.activePlant !== "IMP-INGRESSI";

      return `
        <div class="fault-step-card ${s.ruledOut ? "is-ruled-out" : (s.isPrimarySuspect ? "is-top-suspect" : "")}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
            <div>
              <span class="syn-fault-badge ${s.ruledOut ? "" : (s.isPrimarySuspect ? "is-top" : "is-step")}">
                ${s.ruledOut ? "ESCLUSO" : (s.isPrimarySuspect && faultDiag.hasFilters ? `★ #${s.activeRank} COLPEVOLE PROBABILE` : `#${s.activeRank} A MONTE`)}
              </span>
              <div style="font-size:13px; font-weight:700; margin-top:3px;">
                ${escXml(s.node.label)} <span class="mono" style="font-size:11px; color:var(--cp-accent);">(${escXml(s.node.code)})</span>
              </div>
            </div>
          </div>
          <div style="font-size:11px; color:var(--cp-text-muted); margin-top:2px;">📍 ${escXml(loc)}</div>

          ${(s.activeDevices && s.activeDevices.length) ? `
            <div class="prot-chips-wrap">
              ${s.activeDevices.map((d) => renderProtChipHtml(d, extAttr)).join("")}
            </div>
          ` : ""}

          <div style="font-size:11.8px; color:var(--cp-text-muted); margin-top:3px;">${escXml(s.modeHint)}</div>

          ${!s.ruledOut ? `
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
              ${isMobile
                ? `<button type="button" class="btn" style="font-size:11px; padding:3px 8px;" data-mob-node="${escXml(s.nodeId)}">🔍 Apri scheda ${escXml(s.node.code)}</button>`
                : `
                  <button type="button" class="btn" style="font-size:11px; padding:3px 8px;" data-fault-inspect="${escXml(s.nodeId)}">🔍 Vedi blocco</button>
                  ${isCrossPlant && op ? `<button type="button" class="btn" style="font-size:11px; padding:3px 8px;" data-fault-jump-plant="${escXml(s.node.plant)}" data-fault-jump-node="${escXml(s.nodeId)}">↪ Mappa ${escXml(op.shortName)}</button>` : ""}
                `
              }
            </div>
          ` : ""}
        </div>
      `;
    };

    const diagBoxHtml = faultDiag.discriminators.length ? `
      <details class="acc-block" ${faultDiag.hasFilters ? "open" : ""} style="margin-bottom:10px;">
        <summary style="font-size:12px;">
          <span>🔍 Restringi causa: stato di altre utenze (${faultDiag.hasFilters ? "attivo" : "opzionale"})</span>
          <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
        </summary>
        <div class="acc-content" style="padding:8px 10px;">
          <div style="font-size:11.3px; color:var(--cp-text-muted); margin-bottom:6px;">
            Indica se un'altra utenza risulta ferma o regolarmente funzionante per escludere automaticamente interruttori e fusibili non coerenti:
          </div>
          ${faultDiag.discriminators.map((sym) => {
            const isFail = faultDiag.coFailedSet.has(sym.id);
            const isOk = faultDiag.confirmedOkSet.has(sym.id);
            return `
              <div class="diag-row">
                <span style="font-weight:600;">${escXml(sym.label)}</span>
                <span class="diag-btn-grp">
                  <button type="button" class="diag-state-btn ${isFail ? "active-fail" : ""}" data-diag-fail="${escXml(sym.id)}">🔴 Fermo</button>
                  <button type="button" class="diag-state-btn ${isOk ? "active-ok" : ""}" data-diag-ok="${escXml(sym.id)}">🟢 OK</button>
                </span>
              </div>
            `;
          }).join("")}
          ${faultDiag.hasFilters ? `
            <div style="margin-top:7px; text-align:right;">
              <button type="button" class="btn" style="font-size:11px; padding:3px 9px;" data-diag-reset="1">↺ Azzera filtri esclusione</button>
            </div>
          ` : ""}
        </div>
      </details>
    ` : "";

    return `
      <div class="fault-panel">
        <div class="fault-panel-hdr">
          <div>
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--cp-danger);">🛠️ Catena di Guasto Attiva</div>
            <div style="font-size:13.5px; font-weight:700; line-height:1.25; margin-top:2px;">
              Interruttori &amp; Fusibili a monte di <span class="mono" style="color:var(--cp-accent);">${escXml(tNode.code)}</span>
            </div>
          </div>
          <button type="button" class="btn" style="font-size:11px; padding:3px 8px; flex-shrink:0;" data-close-fault="1">✕ Chiudi</button>
        </div>

        ${isOrigin ? `
          <div style="font-size:12.5px; color:var(--cp-text-muted); padding:4px 2px;">
            ★ <strong>${escXml(tNode.label)}</strong> è una sorgente primaria: non ci sono interruttori o fusibili condominiali a monte.<br/>
            ${isMobile ? "Apri un quadro o un'utenza a valle per vederne la catena di protezione." : "<strong>Clicca su un qualsiasi quadro o utenza nella mappa</strong> per evidenziarne subito tutti gli interruttori e fusibili a monte."}
          </div>
        ` : `
          <div class="fault-kpi-row">
            <span class="fault-kpi-chip" style="border-color:var(--cp-accent); color:var(--cp-accent);">🛡️ ${faultDiag.breakerCount} Interruttori</span>
            <span class="fault-kpi-chip" style="border-color:var(--cp-warning);">🧨 ${faultDiag.fuseCount} Fusibili</span>
            <span class="fault-kpi-chip">🗄️ ${faultDiag.activeSteps.length} Quadri/Punti a monte</span>
          </div>

          ${diagBoxHtml}

          <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--cp-text-muted); margin:0 0 6px;">
            Sequenza controlli (dal punto guasto risalendo a monte):
          </div>

          ${selfBlockHtml}

          ${faultDiag.activeSteps.length
            ? faultDiag.activeSteps.map(renderStepCard).join("")
            : `<div style="padding:10px; border-radius:8px; background:var(--cp-surface); border:1px dashed var(--cp-danger); font-size:12px;">
                Nessun singolo interruttore o fusibile spiega da solo questa combinazione di utenze ferme/attive (possibile doppio scatto indipendente). Premi <strong>↺ Azzera filtri</strong> per rivedere tutta la catena.
              </div>`
          }

          ${faultDiag.ruledOutSteps.length ? `
            <details class="acc-block" style="margin-top:8px; margin-bottom:0;">
              <summary style="font-size:11.5px; color:var(--cp-text-muted);">
                <span>Esclusi dai riscontri sulle altre utenze (${faultDiag.ruledOutSteps.length})</span>
                <span class="mono">▾</span>
              </summary>
              <div class="acc-content" style="padding:8px;">
                ${faultDiag.ruledOutSteps.map(renderStepCard).join("")}
              </div>
            </details>
          ` : ""}
        `}
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
    const physTarget = resolvePhysicalPanelTarget(node, state.drillBoardId);
    const isFaultTargetHere = state.faultMode && (state.faultTargetId || state.selectedNodeId) === node.id;

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
      <div style="mono" style="font-size:11.5px; color:var(--cp-text-muted);">Sigla: <strong>${node.code}</strong> · ${fl.name}</div>

      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:9px;">
        <button id="btnInspFaultToggle" type="button" class="btn ${isFaultTargetHere ? "btn-fault-active" : ""}" style="font-size:12px; ${!isFaultTargetHere ? "border-color:var(--cp-danger); color:var(--cp-danger);" : ""}">
          ${isFaultTargetHere ? "✕ Chiudi Ricerca Guasto" : `🛠️ Catena Guasto da ${escXml(node.code)}`}
        </button>
        ${physTarget ? `
          <a id="btnOpenPhysFromInsp" class="btn btn-primary" href="${physTarget.href}" style="font-size:12px; text-decoration:none;">
            🗄️ ${state.drillBoardId && physTarget.comp ? `Vedi ${physTarget.comp} nel Pannello Fisico ${physTarget.code}` : `Apri Pannello Fisico (${physTarget.code})`} →
          </a>
        ` : ""}
        ${canDrillInternal ? `
          <button id="btnEnterInternal" class="btn ${physTarget ? "" : "btn-primary"}" style="font-size:12px;">
            🔬 Schema Elettrico Interno (${node.internalGraph.nodes.length})
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

    const bFault = document.getElementById("btnInspFaultToggle");
    if (bFault) {
      bFault.addEventListener("click", () => {
        if (isFaultTargetHere) {
          state.faultMode = false;
          state.faultTargetId = null;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
        } else {
          state.faultMode = true;
          state.faultTargetId = node.id;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
          state.focusedNodeId = null;
        }
        refreshAll();
      });
    }

    const bPhys = document.getElementById("btnOpenPhysFromInsp");
    if (bPhys) {
      bPhys.addEventListener("click", (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigateToExternalPage(bPhys.getAttribute("href"));
      });
    }
    const bClose = document.getElementById("btnCloseInspFs");
    if (bClose) bClose.addEventListener("click", () => document.getElementById("inspector").classList.add("closed-in-fs"));
    const bInt = document.getElementById("btnEnterInternal");
    if (bInt) bInt.addEventListener("click", () => enterBoardInternalMap(node.id));
    const bBack = document.getElementById("btnBackFromInsp");
    if (bBack) bBack.addEventListener("click", exitBoardInternalMap);
    const bJump = document.getElementById("btnJumpPlant");
    if (bJump) bJump.addEventListener("click", () => {
      pushIntraAppStep();
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
    const faultDiag = getActiveFaultDiagnosis();

    const body = document.getElementById("inspBody");
    body.innerHTML = `
      ${faultDiag ? buildFaultPanelHtml(faultDiag, false) : ""}

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
          pushIntraAppStep();
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

    // Fault Panel interactive handlers (Breaker/Fuse deep-links, exclusion filters, step jumps)
    body.querySelectorAll("[data-fault-ext]").forEach((lnk) => {
      lnk.addEventListener("click", (ev) => {
        if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
        ev.preventDefault();
        navigateToExternalPage(lnk.getAttribute("href"));
      });
    });

    const closeFaultBtn = body.querySelector("[data-close-fault]");
    if (closeFaultBtn) {
      closeFaultBtn.addEventListener("click", () => {
        state.faultMode = false;
        state.faultTargetId = null;
        state.faultCoFailed = [];
        state.faultConfirmedOk = [];
        refreshAll();
      });
    }

    body.querySelectorAll("[data-diag-fail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.diagFail;
        state.faultConfirmedOk = state.faultConfirmedOk.filter((x) => x !== sid);
        if (state.faultCoFailed.includes(sid)) {
          state.faultCoFailed = state.faultCoFailed.filter((x) => x !== sid);
        } else {
          state.faultCoFailed = [...state.faultCoFailed, sid];
        }
        refreshAll();
      });
    });

    body.querySelectorAll("[data-diag-ok]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.diagOk;
        state.faultCoFailed = state.faultCoFailed.filter((x) => x !== sid);
        if (state.faultConfirmedOk.includes(sid)) {
          state.faultConfirmedOk = state.faultConfirmedOk.filter((x) => x !== sid);
        } else {
          state.faultConfirmedOk = [...state.faultConfirmedOk, sid];
        }
        refreshAll();
      });
    });

    const resetDiagBtn = body.querySelector("[data-diag-reset]");
    if (resetDiagBtn) {
      resetDiagBtn.addEventListener("click", () => {
        state.faultCoFailed = [];
        state.faultConfirmedOk = [];
        refreshAll();
      });
    }

    body.querySelectorAll("[data-fault-inspect]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nid = btn.dataset.faultInspect;
        const { nodes: visNodes } = computeCurrentGraph();
        if (visNodes.some((x) => x.id === nid)) {
          selectNode(nid, true);
        } else if (NODE_MAP.has(nid)) {
          pushIntraAppStep();
          const tgt = NODE_MAP.get(nid);
          state.drillBoardId = null;
          state.activePlant = tgt.plant;
          state.selectedNodeId = nid;
          refreshAll();
        }
      });
    });

    body.querySelectorAll("[data-fault-jump-plant]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pushIntraAppStep();
        state.drillBoardId = null;
        state.activePlant = btn.dataset.faultJumpPlant;
        if (btn.dataset.faultJumpNode) state.selectedNodeId = btn.dataset.faultJumpNode;
        refreshAll();
      });
    });
  }

  // ==================== ACTIONS, FULLSCREEN & MODALS ====================
  function selectNode(nodeId, centerInGraph) {
    state.selectedNodeId = nodeId;
    refreshSelectedCardGraphics();
    applyClickFocus();
    renderInspector();
    syncUrlWithState();
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
            if (first.plant !== state.activePlant || state.drillBoardId) {
              pushIntraAppStep();
            }
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

      (PF_DATA.panels || []).forEach((pan) => {
        if (`${pan.code} ${pan.title} ${pan.location.room}`.toLowerCase().includes(q)) {
          hits.push({
            kind: `🗄️ Pannello Fisico`,
            title: `${pan.code} — ${pan.title}`,
            sub: `📍 ${pan.location.room} (${pan.enclosure.dimensionsMm})`,
            panelHref: buildPanelPageHref(pan.slug, null)
          });
        }
        (pan.components || []).forEach((pc) => {
          if (`${pc.id} ${pc.shortLabel} ${pc.ratingBadge} ${pc.whatItDoes}`.toLowerCase().includes(q)) {
            hits.push({
              kind: `🗄️ ${pan.code}`,
              title: `${pc.id} · ${pc.shortLabel} (${pc.ratingBadge})`,
              sub: pc.whatItDoes.slice(0, 110),
              panelHref: buildPanelPageHref(pan.slug, pc.id)
            });
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
          if (h.panelHref) {
            navigateToExternalPage(h.panelHref);
          } else if (h.dsId) {
            openSinglePdfModal(h.dsId);
          } else if (h.nodeId) {
            const target = NODE_MAP.get(h.nodeId);
            if (target.plant !== state.activePlant || state.drillBoardId) {
              pushIntraAppStep();
            }
            state.activePlant = target.plant;
            if (h.drill && target.internalGraph) {
              renderPlantStripAndBanner();
              state.drillBoardId = target.id;
              state.focusedNodeId = null;
              state.selectedNodeId = `${target.id}__MAIN`;
              renderCytoscape(true);
              renderInspector();
              syncUrlWithState();
              syncGlobalNavBackUi();
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
    const dynWrap = document.getElementById("dynamicControlsWrap");
    const sel = document.getElementById("viewModeSelect");
    if (sel && sel.value !== state.layoutEngine) sel.value = state.layoutEngine;
    if (dynWrap) dynWrap.style.display = isSyn ? "none" : "inline-flex";
    const fBtn = document.getElementById("btnFaultMode");
    if (fBtn) {
      fBtn.classList.toggle("btn-fault-active", Boolean(state.faultMode));
      fBtn.textContent = state.faultMode ? "🛠️ Ricerca Guasto: ON" : "🛠️ Ricerca Guasto";
    }
  }

  function refreshAll() {
    syncToolbarMode();
    renderPlantStripAndBanner();
    renderCytoscape(false);
    renderInspector();
    syncUrlWithState();
    syncGlobalNavBackUi();
  }

  let desktopInitialized = false;
  let mobileInitialized = false;

  // ==================== SMARTPHONE ESSENTIAL FALLBACK (NO GRAPHS, PC UNTOUCHED) ====================
  const mobState = {
    tab: "plants",           // 'plants' | 'rooms' | 'audit' | 'docs'
    plantId: "IMP-INGRESSI",
    selectedNodeId: null,    // null = list mode | nodeId = essential component sheet
    faultMode: false,        // Smartphone Upstream Breaker & Fuse Fault-Chain mode
    faultCoFailed: [],
    faultConfirmedOk: [],
    query: "",
    history: []              // intra-mobile step stack: { tab, plantId, selectedNodeId, label, scrollY }
  };

  function getMobileNodeAccentVar(node) {
    const nid = node.id || "";
    if (nid === "TERRA-RETE" || node.plant === "IMP-GND") return "var(--cp-border-strong)";
    if (nid === "SGANCI-VVF" || nid === "IRA-CENTRALI") return "var(--cp-danger)";
    if (node.roleType === "ups" || nid === "QEPA" || nid === "LD-POMPA-VVF" || nid === "FIRE-PORTONI-EI") {
      return "var(--cp-warning)";
    }
    if (node.plant === "IMP-BMS" || node.plant === "IMP-TLC") return "var(--cp-link)";
    return "var(--cp-accent)";
  }

  function syncMobileUrl() {
    const u = new URL(window.location.href);
    const sp = u.searchParams;
    sp.set("plant", mobState.plantId);
    if (mobState.selectedNodeId) sp.set("select", mobState.selectedNodeId);
    else sp.delete("select");
    if (mobState.faultMode && mobState.selectedNodeId) {
      sp.set("fault", mobState.selectedNodeId);
      if (mobState.faultCoFailed.length) sp.set("cf", mobState.faultCoFailed.join(","));
      else sp.delete("cf");
      if (mobState.faultConfirmedOk.length) sp.set("ok", mobState.faultConfirmedOk.join(","));
      else sp.delete("ok");
    } else {
      sp.delete("fault");
      sp.delete("cf");
      sp.delete("ok");
    }
    sp.delete("board");
    sp.delete("focus");
    sp.delete("ret");
    sp.delete("retLabel");
    window.history.replaceState({}, "", u.toString());
  }

  function navigateMobileExternal(href) {
    if (!href) return;
    syncMobileUrl();
    const curNode = mobState.selectedNodeId ? NODE_MAP.get(mobState.selectedNodeId) : null;
    const retLbl = curNode
      ? `Scheda ${curNode.code}`
      : `Guida Smartphone (${PLANT_MAP.get(mobState.plantId)?.shortName || "Impianti"})`;
    if (window.SE_NAV) {
      window.SE_NAV.navigateTo(href, retLbl);
    } else {
      window.location.href = href;
    }
  }

  function renderMobileNodeRowHtml(n, extraSubHtml = "") {
    const accentVar = getMobileNodeAccentVar(n);
    const incs = INC_BY_NODE.get(n.id) || [];
    const fl = FLOOR_MAP.get(n.floor) || { name: "" };
    const shortLoc = (n.roomGroup || fl.name || "")
      .replace(/\s*\(.*?\)/g, "")
      .replace(/Principale\s*—\s*/, "");
    return `
      <button type="button" class="mob-node-btn" data-mob-node="${escXml(n.id)}" style="--mob-accent:${accentVar};">
        <div class="mob-node-top">
          <span class="mob-code-badge">${escXml(n.code)}</span>
          <div style="display:flex; align-items:center; gap:6px; min-width:0;">
            ${incs.length ? `<span class="pill" style="font-size:10px; padding:1px 5px; background:var(--cp-warning); color:var(--cp-text);">⚠ ${incs.length}</span>` : ""}
            <span class="mob-room-meta">${escXml(shortLoc)}</span>
            <span style="color:var(--cp-text-muted); font-weight:700;">›</span>
          </div>
        </div>
        <div class="mob-node-title">${escXml(n.label)}</div>
        ${n.shortFunc ? `<div class="mob-node-sub">${escXml(n.shortFunc)}</div>` : ""}
        ${extraSubHtml}
      </button>
    `;
  }

  function buildMobilePlantsTabHtml() {
    const pid = mobState.plantId;
    const activeP = PLANT_MAP.get(pid) || DATA.plants[0];
    const fg = activeP.flowGuide || {};
    const cVar = `var(--plant-${activeP.swatch})`;

    const ownNodes = pid === "IMP-INGRESSI"
      ? DATA.nodes.filter((n) => METERS_OVERVIEW_IDS.has(n.id))
      : DATA.nodes.filter((n) => n.plant === pid && n.tier <= 2 && n.nodeClass !== "doc_reference");

    const schema = SYNOPTIC_SCHEMAS[pid];
    let listHtml = "";

    if (schema && schema.bands && schema.slots) {
      const buckets = schema.bands.map(() => []);
      const unslotted = [];
      ownNodes.forEach((n) => {
        const sl = schema.slots[n.id];
        if (sl && buckets[sl.row]) {
          buckets[sl.row].push({ node: n, col: sl.col });
        } else {
          unslotted.push(n);
        }
      });
      buckets.forEach((arr, rIdx) => {
        if (!arr.length) return;
        arr.sort((a, b) => a.col - b.col);
        listHtml += `<div class="mob-band-title">${escXml(schema.bands[rIdx])}</div>`;
        listHtml += arr.map((it) => renderMobileNodeRowHtml(it.node)).join("");
      });
      if (unslotted.length) {
        listHtml += `<div class="mob-band-title">Altri componenti</div>`;
        listHtml += unslotted.map((n) => renderMobileNodeRowHtml(n)).join("");
      }
    } else {
      listHtml = ownNodes.map((n) => renderMobileNodeRowHtml(n)).join("");
    }

    return `
      <label for="mobPlantSelect" style="display:block; font-size:11.5px; font-weight:700; color:var(--cp-text-muted); margin:0 2px 4px;">Seleziona impianto (${DATA.plants.length}):</label>
      <select id="mobPlantSelect" class="mob-select">
        ${DATA.plants.map((p) => `<option value="${escXml(p.id)}" ${p.id === pid ? "selected" : ""}>${escXml(p.name)}</option>`).join("")}
      </select>

      <div class="mob-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <strong style="font-size:14px;">${escXml(activeP.shortName || activeP.name)}</strong>
          <span class="pill" style="color:${cVar}; background:var(--plant-${activeP.swatch}-bg);">${escXml(activeP.power || "")}</span>
        </div>
        ${activeP.summary ? `<p style="margin:6px 0 0; font-size:12.5px; color:var(--cp-text-muted);">${escXml(activeP.summary)}</p>` : ""}
        <div class="mob-summary-steps">
          <div class="mob-summary-step"><strong style="color:var(--cp-success);">1 · Origine:</strong> ${escXml(fg.in || "-")}</div>
          <div class="mob-summary-step"><strong style="color:${cVar};">2 · Gestione:</strong> ${escXml(fg.process || "-")}</div>
          <div class="mob-summary-step"><strong style="color:var(--cp-link);">3 · Servizio:</strong> ${escXml(fg.out || "-")}</div>
        </div>
      </div>

      ${listHtml}
    `;
  }

  function buildMobileRoomsTabHtml() {
    const floorRank = { F_TERRA: 1, F_M1: 2, F_M2: 3, F_PIANI: 4, F_ROOF: 5, F_EXT: 6 };
    const roomMap = new Map();
    DATA.nodes.forEach((n) => {
      if (n.nodeClass === "doc_reference") return;
      const fl = FLOOR_MAP.get(n.floor) || { name: "Edificio" };
      const rKey = n.roomGroup || fl.name || "Altro";
      if (!roomMap.has(rKey)) {
        roomMap.set(rKey, { label: rKey, rank: floorRank[n.floor] || 9, items: [] });
      }
      roomMap.get(rKey).items.push(n);
    });

    const groups = [...roomMap.values()].sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label, "it"));
    return `
      <div style="font-size:12px; color:var(--cp-text-muted); margin:0 2px 10px;">
        Componenti raggruppati per locale fisico, utile durante un sopralluogo davanti ai quadri.
      </div>
      ${groups.map((g, idx) => `
        <details class="mob-acc" ${idx === 0 ? "open" : ""}>
          <summary>
            <span>📍 ${escXml(g.label)}</span>
            <span class="pill" style="color:var(--cp-accent); background:var(--cp-accent-soft); flex-shrink:0;">${g.items.length}</span>
          </summary>
          <div class="mob-acc-body">
            ${g.items.map((n) => renderMobileNodeRowHtml(n)).join("")}
          </div>
        </details>
      `).join("")}
    `;
  }

  function buildMobileAuditTabHtml() {
    const sevColor = (sev) => {
      if (sev === "critica" || sev === "alta") return "var(--cp-danger)";
      if (sev === "media") return "var(--cp-warning)";
      return "var(--cp-link)";
    };
    return `
      <div style="font-size:12px; color:var(--cp-text-muted); margin:0 2px 10px;">
        ${DATA.inconsistencies.length} verifiche tecniche e particolarità operative emerse dagli schemi costruttivi.
      </div>
      ${DATA.inconsistencies.map((inc) => `
        <div class="mob-card" style="border-left:4px solid ${sevColor(inc.severity)};">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:5px;">
            <span class="mono" style="font-size:11.5px; font-weight:700; color:var(--cp-accent);">${escXml(inc.id)} · ${escXml(inc.severity.toUpperCase())}</span>
            <span style="font-size:11px; color:var(--cp-text-muted);">${escXml(inc.category)}</span>
          </div>
          <div style="font-size:13.5px; font-weight:700; margin-bottom:6px;">${escXml(inc.title)}</div>
          <div style="font-size:12.5px; margin-bottom:6px;"><strong>Riscontro:</strong> ${escXml(inc.finding)}</div>
          <div style="font-size:12px; color:var(--cp-text-muted); margin-bottom:8px;"><strong>Impatto:</strong> ${escXml(inc.impact)}</div>
          ${(inc.affectedNodes && inc.affectedNodes.length) ? `
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              ${inc.affectedNodes.map((nid) => {
                const nd = NODE_MAP.get(nid);
                return nd ? `<button type="button" class="btn" style="font-size:11.5px; padding:4px 9px;" data-mob-node="${escXml(nd.id)}">⚡ ${escXml(nd.code)}</button>` : "";
              }).join("")}
            </div>
          ` : ""}
        </div>
      `).join("")}
    `;
  }

  function buildMobileDocsTabHtml() {
    const curTheme = document.documentElement.getAttribute("data-theme") || "light";
    const atlasHref = `./pannelli/index.html?scoutTheme=${encodeURIComponent(curTheme)}`;
    return `
      <div class="mob-card" style="border-color:var(--cp-accent); background:var(--cp-accent-soft);">
        <div style="font-size:13.5px; font-weight:700; margin-bottom:4px;">🗄️ Atlante dei 18 Pannelli Fisici (Fronte Quadro)</div>
        <div style="font-size:12px; color:var(--cp-text-muted); margin-bottom:9px;">
          Disposizione fisica degli interruttori e apparecchiature all'interno delle carpenterie reali.
        </div>
        <a href="${escXml(atlasHref)}" class="btn btn-primary" data-mob-ext="${escXml(atlasHref)}" style="text-decoration:none; width:100%; justify-content:center;">
          🗄️ Apri i 18 Pannelli Fisici →
        </a>
      </div>

      <div class="mob-band-title">Schede Tecniche PDF Costruttori (${DATA.datasheets.length})</div>
      ${DATA.datasheets.map((d) => `
        <div class="mob-card">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
            <span class="pill" style="color:var(--cp-accent); background:var(--cp-accent-soft);">${escXml(d.brand)}</span>
            <span style="font-size:11px; color:var(--cp-text-muted);">${escXml(d.category)}</span>
          </div>
          <div style="font-size:13.5px; font-weight:700; margin-bottom:4px;">${escXml(d.family)}</div>
          <div style="font-size:12px; color:var(--cp-text-muted); margin-bottom:9px;">${escXml(d.keySpecs)}</div>
          <div style="display:flex; gap:8px;">
            <a class="btn btn-primary" href="${escXml(d.file)}" target="_blank" rel="noopener" style="flex:1; justify-content:center; text-decoration:none;">📄 Apri PDF</a>
            <a class="btn" href="${escXml(d.vendorUrl)}" target="_blank" rel="noopener" style="text-decoration:none;">🌐 Sito</a>
          </div>
        </div>
      `).join("")}
    `;
  }

  function buildMobileSearchResultsHtml(rawQuery) {
    const q = rawQuery.trim().toLowerCase();
    const matchedNodes = [];
    const matchedCircuits = [];
    const matchedDocs = [];

    DATA.nodes.forEach((n) => {
      if (n.nodeClass === "doc_reference") return;
      const hay = `${n.code} ${n.label} ${n.shortFunc || ""} ${n.roomGroup || ""} ${n.desc || ""} ${n.emergencyNote || ""}`.toLowerCase();
      if (hay.includes(q)) matchedNodes.push(n);
      (n.circuits || []).forEach((c) => {
        if (`${c.code} ${c.desc} ${c.breaker || ""} ${c.cable || ""}`.toLowerCase().includes(q)) {
          matchedCircuits.push({ board: n, circuit: c });
        }
      });
    });

    DATA.datasheets.forEach((d) => {
      if (`${d.brand} ${d.family} ${d.keySpecs || ""} ${(d.models || []).join(" ")}`.toLowerCase().includes(q)) {
        matchedDocs.push(d);
      }
    });

    const total = matchedNodes.length + matchedCircuits.length + matchedDocs.length;
    if (!total) {
      return `
        <div class="mob-card" style="text-align:center; color:var(--cp-text-muted); padding:22px 14px;">
          Nessun risultato trovato per <strong>"${escXml(rawQuery)}"</strong>.
        </div>
      `;
    }

    let html = `<div style="font-size:12px; color:var(--cp-text-muted); margin:0 2px 8px;">Risultati per <strong>"${escXml(rawQuery)}"</strong> (${total}):</div>`;

    if (matchedNodes.length) {
      html += `<div class="mob-band-title">Quadri &amp; Componenti (${matchedNodes.length})</div>`;
      html += matchedNodes.slice(0, 20).map((n) => renderMobileNodeRowHtml(n)).join("");
    }

    if (matchedCircuits.length) {
      html += `<div class="mob-band-title">Linee &amp; Interruttori Interni (${matchedCircuits.length})</div>`;
      html += matchedCircuits.slice(0, 20).map(({ board, circuit }) => renderMobileNodeRowHtml(
        board,
        `<div style="margin-top:5px; padding-top:5px; border-top:1px dashed var(--cp-border); font-size:11.5px;">
          <strong class="mono" style="color:var(--cp-accent);">${escXml(circuit.code)}:</strong> ${escXml(circuit.desc)}
          ${circuit.breaker ? `<span style="color:var(--cp-text-muted);"> · ${escXml(circuit.breaker)}</span>` : ""}
        </div>`
      )).join("");
    }

    if (matchedDocs.length) {
      html += `<div class="mob-band-title">Schede PDF (${matchedDocs.length})</div>`;
      html += matchedDocs.slice(0, 10).map((d) => `
        <div class="mob-card">
          <div style="font-size:13px; font-weight:700; margin-bottom:4px;">${escXml(d.brand)} — ${escXml(d.family)}</div>
          <div style="font-size:11.5px; color:var(--cp-text-muted); margin-bottom:8px;">${escXml(d.keySpecs)}</div>
          <a class="btn btn-primary" href="${escXml(d.file)}" target="_blank" rel="noopener" style="text-decoration:none; width:100%; justify-content:center;">📄 Apri PDF</a>
        </div>
      `).join("");
    }

    return html;
  }

  function buildMobileNodeDetailHtml(node) {
    const p = PLANT_MAP.get(node.plant) || DATA.plants[0];
    const fl = FLOOR_MAP.get(node.floor) || { name: node.floor || "" };
    const accentVar = getMobileNodeAccentVar(node);
    const physTarget = resolvePhysicalPanelTarget(node, null);

    const refEdges = DATA.edges.filter((e) => e.edgeType !== "doc_trace");
    const incoming = refEdges.filter((e) => e.target === node.id);
    const outgoing = refEdges.filter((e) => e.source === node.id);
    const dsList = (node.datasheetIds || []).map((id) => DS_MAP.get(id)).filter(Boolean);
    const incs = INC_BY_NODE.get(node.id) || [];
    const isEarthSink = node.id === "TERRA-RETE";

    const renderConnBtn = (edge, otherId, dirArrow) => {
      const other = NODE_MAP.get(otherId);
      if (!other) return "";
      return `
        <button type="button" class="mob-io-btn" data-mob-node="${escXml(other.id)}">
          <div style="min-width:0;">
            <div style="font-size:13px; font-weight:700; line-height:1.25;">
              ${dirArrow} ${escXml(other.label)} <span class="mono" style="font-size:11px; color:var(--cp-accent);">(${escXml(other.code)})</span>
            </div>
            <div style="font-size:11.5px; color:var(--cp-text-muted); margin-top:2px;">
              ${escXml(edge.flowCategory)}: <strong class="mono">${escXml(edge.label)}</strong>
            </div>
          </div>
          <span style="color:var(--cp-accent); font-weight:700; flex-shrink:0;">›</span>
        </button>
      `;
    };

    return `
      <div class="mob-card" style="border-top:4px solid ${accentVar};">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
          <span class="pill" style="color:var(--cp-accent); background:var(--cp-accent-soft);">${escXml(node.roleLabel || p.shortName)}</span>
          <span class="mono" style="font-size:11px; color:var(--cp-text-muted);">${escXml(p.shortName)}</span>
        </div>
        <h2 style="margin:0 0 4px; font-size:16.5px; line-height:1.25;">${escXml(node.label)}</h2>
        <div style="font-size:12px; color:var(--cp-text-muted); margin-bottom:10px;">
          Sigla: <strong class="mono" style="color:var(--cp-text);">${escXml(node.code)}</strong> · 📍 ${escXml(node.roomGroup || fl.name)}
        </div>

        <div style="padding:9px 11px; border-radius:0.625rem; background:var(--cp-bg-elevated); border:1px solid var(--cp-border); margin-bottom:9px;">
          <div style="font-size:13px; font-weight:700; margin-bottom:4px;">${escXml(node.shortFunc || "")}</div>
          ${node.desc ? `<div style="font-size:12px; color:var(--cp-text-muted);">${escXml(node.desc)}</div>` : ""}
        </div>

        ${node.emergencyNote ? `
          <div class="emg-callout" style="margin:0 0 9px;">
            <strong>🚒 Emergenza / Sgancio VVF:</strong><br/>
            ${escXml(node.emergencyNote)}
          </div>
        ` : ""}

        ${physTarget ? `
          <a href="${escXml(physTarget.href)}" data-mob-ext="${escXml(physTarget.href)}" class="btn btn-primary" style="width:100%; justify-content:center; text-decoration:none; margin-top:4px;">
            🗄️ Vedi Fronte Quadro Fisico (${escXml(physTarget.code)}) →
          </a>
        ` : ""}
        <button type="button" id="btnMobFaultToggle" class="btn ${mobState.faultMode ? "btn-fault-active" : ""}" style="width:100%; justify-content:center; margin-top:7px; ${!mobState.faultMode ? "border-color:var(--cp-danger); color:var(--cp-danger);" : ""}">
          ${mobState.faultMode ? "✕ Chiudi Catena di Guasto" : "🛠️ Ricerca Guasto: Interruttori & Fusibili a monte"}
        </button>
      </div>

      ${mobState.faultMode ? buildFaultPanelHtml(computeFaultDiagnosis(node.id, mobState.faultCoFailed, mobState.faultConfirmedOk, true), true) : ""}

      <div class="mob-card">
        <div style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--cp-link); margin-bottom:7px;">
          ${isEarthSink ? `⏚ Riceve scariche di terra da (${incoming.length})` : `📥 A monte — Da dove arriva (${incoming.length})`}
        </div>
        ${incoming.length
          ? incoming.map((e) => renderConnBtn(e, e.source, "⬅")).join("")
          : `<div style="font-size:12px; color:var(--cp-text-muted);">★ Origine primaria di alimentazione o captazione diretta.</div>`
        }

        <div style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--cp-accent); margin:12px 0 7px;">
          📤 A valle — Cosa alimenta / comanda (${outgoing.length})
        </div>
        ${outgoing.length
          ? outgoing.map((e) => renderConnBtn(e, e.target, "➡")).join("")
          : `<div style="font-size:12px; color:var(--cp-text-muted);">${isEarthSink ? "⏚ Disperde nel terreno." : "🎯 Utenza / destinazione finale."}</div>`
        }
      </div>

      ${(node.circuits && node.circuits.length) ? `
        <details class="mob-acc" open>
          <summary>
            <span>🔌 Interruttori &amp; Linee Interne (${node.circuits.length})</span>
            <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
          </summary>
          <div class="mob-acc-body">
            ${node.circuits.map((c) => `
              <div class="mob-circuit-row">
                <div style="display:flex; justify-content:space-between; gap:8px; align-items:baseline;">
                  <strong class="mono" style="color:var(--cp-accent);">${escXml(c.code)}</strong>
                  <span style="font-size:11px; color:var(--cp-text-muted); text-align:right;">${escXml(c.breaker || "")}</span>
                </div>
                <div style="margin-top:2px;">${escXml(c.desc)}</div>
                ${c.cable ? `<div class="mono" style="font-size:11px; color:var(--cp-text-muted); margin-top:2px;">Cavo: ${escXml(c.cable)}</div>` : ""}
              </div>
            `).join("")}
          </div>
        </details>
      ` : ""}

      ${Object.keys(node.specs || {}).length ? `
        <details class="mob-acc" ${(node.circuits && node.circuits.length) ? "" : "open"}>
          <summary>
            <span>📐 Dati di Targa Essenziali</span>
            <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
          </summary>
          <div class="mob-acc-body">
            <div class="mob-spec-grid">
              ${Object.entries(node.specs || {}).map(([k, v]) => `
                <div class="spec-box">
                  <div class="spec-k">${escXml(k)}</div>
                  <div class="spec-v" style="word-break:break-word;">${escXml(v)}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </details>
      ` : ""}

      ${dsList.length ? `
        <details class="mob-acc">
          <summary>
            <span>📚 Schede PDF Componenti (${dsList.length})</span>
            <span class="mono" style="font-size:11px; color:var(--cp-accent);">▾</span>
          </summary>
          <div class="mob-acc-body">
            ${dsList.map((d) => `
              <div style="padding:7px 0; border-top:1px solid var(--cp-border);">
                <div style="font-weight:700; font-size:12.5px;">${escXml(d.brand)} — ${escXml(d.family)}</div>
                <div style="font-size:11.5px; color:var(--cp-text-muted); margin:2px 0 6px;">${escXml(d.keySpecs)}</div>
                <a class="btn btn-primary" href="${escXml(d.file)}" target="_blank" rel="noopener" style="font-size:11.5px; padding:4px 10px; text-decoration:none;">📄 Apri PDF</a>
              </div>
            `).join("")}
          </div>
        </details>
      ` : ""}

      ${incs.length ? `
        <details class="mob-acc" open>
          <summary style="color:var(--cp-danger);">
            <span>⚠️ Rilievi Tecnici (${incs.length})</span>
            <span class="mono" style="font-size:11px;">▾</span>
          </summary>
          <div class="mob-acc-body">
            ${incs.map((inc) => `
              <div style="margin-bottom:8px; font-size:12px;">
                <div><strong>${escXml(inc.id)} [${escXml(inc.severity.toUpperCase())}] — ${escXml(inc.title)}</strong></div>
                <div style="color:var(--cp-text-muted); margin-top:2px;">${escXml(inc.finding)}</div>
              </div>
            `).join("")}
          </div>
        </details>
      ` : ""}
    `;
  }

  function renderMobileMain() {
    const shell = document.getElementById("mobileShell");
    const mainEl = document.getElementById("mobMain");
    if (!shell || !mainEl) return;

    const tabsEl = document.getElementById("mobTabsBar");
    const detBar = document.getElementById("mobDetailBar");
    const backBtn = document.getElementById("mobDetailBackBtn");
    const clearBtn = document.getElementById("mobSearchClear");

    const hasSearch = mobState.query.trim().length >= 2;
    if (clearBtn) clearBtn.style.display = mobState.query.length > 0 ? "inline-flex" : "none";

    shell.querySelectorAll(".mob-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.mobTab === mobState.tab);
    });

    if (hasSearch) {
      if (tabsEl) tabsEl.style.display = "none";
      if (detBar) detBar.style.display = "none";
      mainEl.innerHTML = buildMobileSearchResultsHtml(mobState.query) + buildMobileFooterHtml();
    } else if (mobState.selectedNodeId && NODE_MAP.has(mobState.selectedNodeId)) {
      if (tabsEl) tabsEl.style.display = "none";
      if (detBar) detBar.style.display = "flex";
      if (backBtn) {
        const prev = mobState.history[mobState.history.length - 1];
        backBtn.textContent = prev && prev.label ? `← ${prev.label}` : "← Torna all'elenco";
      }
      mainEl.innerHTML = buildMobileNodeDetailHtml(NODE_MAP.get(mobState.selectedNodeId)) + buildMobileFooterHtml();
    } else {
      if (tabsEl) tabsEl.style.display = "grid";
      if (detBar) detBar.style.display = "none";
      let bodyHtml = "";
      if (mobState.tab === "rooms") bodyHtml = buildMobileRoomsTabHtml();
      else if (mobState.tab === "audit") bodyHtml = buildMobileAuditTabHtml();
      else if (mobState.tab === "docs") bodyHtml = buildMobileDocsTabHtml();
      else bodyHtml = buildMobilePlantsTabHtml();
      mainEl.innerHTML = bodyHtml + buildMobileFooterHtml();
    }

    // Wire dynamic events inside #mobMain
    const pSel = document.getElementById("mobPlantSelect");
    if (pSel) {
      pSel.addEventListener("change", (e) => {
        mobState.plantId = e.target.value;
        mobState.selectedNodeId = null;
        mobState.history = [];
        syncMobileUrl();
        renderMobileMain();
      });
    }

    mainEl.querySelectorAll("[data-mob-node]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.mobNode;
        if (!NODE_MAP.has(targetId)) return;
        if (mobState.query.trim().length >= 2) {
          mobState.query = "";
          const inp = document.getElementById("mobSearchInput");
          if (inp) inp.value = "";
        } else {
          const prevNode = mobState.selectedNodeId ? NODE_MAP.get(mobState.selectedNodeId) : null;
          mobState.history.push({
            tab: mobState.tab,
            plantId: mobState.plantId,
            selectedNodeId: mobState.selectedNodeId,
            label: prevNode ? `Torna a ${prevNode.code}` : "Torna all'elenco",
            scrollY: window.scrollY || 0
          });
        }
        const tNode = NODE_MAP.get(targetId);
        if (tNode.plant && PLANT_MAP.has(tNode.plant) && mobState.plantId !== "IMP-INGRESSI") {
          mobState.plantId = tNode.plant;
        }
        mobState.selectedNodeId = targetId;
        mobState.faultCoFailed = [];
        mobState.faultConfirmedOk = [];
        syncMobileUrl();
        renderMobileMain();
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });

    const mobFaultBtn = document.getElementById("btnMobFaultToggle");
    if (mobFaultBtn) {
      mobFaultBtn.addEventListener("click", () => {
        mobState.faultMode = !mobState.faultMode;
        mobState.faultCoFailed = [];
        mobState.faultConfirmedOk = [];
        syncMobileUrl();
        renderMobileMain();
      });
    }

    const mobCloseFault = mainEl.querySelector("[data-close-fault]");
    if (mobCloseFault) {
      mobCloseFault.addEventListener("click", () => {
        mobState.faultMode = false;
        mobState.faultCoFailed = [];
        mobState.faultConfirmedOk = [];
        syncMobileUrl();
        renderMobileMain();
      });
    }

    mainEl.querySelectorAll("[data-diag-fail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.diagFail;
        mobState.faultConfirmedOk = mobState.faultConfirmedOk.filter((x) => x !== sid);
        if (mobState.faultCoFailed.includes(sid)) {
          mobState.faultCoFailed = mobState.faultCoFailed.filter((x) => x !== sid);
        } else {
          mobState.faultCoFailed = [...mobState.faultCoFailed, sid];
        }
        syncMobileUrl();
        renderMobileMain();
      });
    });

    mainEl.querySelectorAll("[data-diag-ok]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.diagOk;
        mobState.faultCoFailed = mobState.faultCoFailed.filter((x) => x !== sid);
        if (mobState.faultConfirmedOk.includes(sid)) {
          mobState.faultConfirmedOk = mobState.faultConfirmedOk.filter((x) => x !== sid);
        } else {
          mobState.faultConfirmedOk = [...mobState.faultConfirmedOk, sid];
        }
        syncMobileUrl();
        renderMobileMain();
      });
    });

    const mobResetDiag = mainEl.querySelector("[data-diag-reset]");
    if (mobResetDiag) {
      mobResetDiag.addEventListener("click", () => {
        mobState.faultCoFailed = [];
        mobState.faultConfirmedOk = [];
        syncMobileUrl();
        renderMobileMain();
      });
    }

    mainEl.querySelectorAll("[data-mob-ext]").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigateMobileExternal(a.dataset.mobExt);
      });
    });

    const forceBtn = document.getElementById("btnForceDesktopMode");
    if (forceBtn) {
      forceBtn.addEventListener("click", () => {
        try { sessionStorage.setItem("se_force_desktop", "1"); } catch (_) {}
        const u = new URL(window.location.href);
        u.searchParams.delete("mobile");
        u.searchParams.set("desktop", "1");
        window.location.href = u.toString();
      });
    }
  }

  function buildMobileFooterHtml() {
    return `
      <footer class="mob-footer">
        <div style="margin-bottom:8px;">
          📱 <strong>Versione essenziale per smartphone</strong> (senza grafi).<br/>
          Apri il sito da PC per le tavole sinottiche e i grafi interattivi completi.
        </div>
        <button id="btnForceDesktopMode" type="button" class="btn" style="font-size:11.5px;">
          🖥️ Mostra comunque versione PC
        </button>
      </footer>
    `;
  }

  function initMobileFallback() {
    if (mobileInitialized) {
      renderMobileMain();
      return;
    }
    mobileInitialized = true;

    const sp = new URLSearchParams(window.location.search);
    const qPlant = sp.get("plant");
    const qSelect = sp.get("select");
    const qBoard = sp.get("board");
    const qFault = sp.get("fault");
    const qCf = sp.get("cf");
    const qOk = sp.get("ok");
    if (qPlant && PLANT_MAP.has(qPlant)) {
      mobState.plantId = qPlant;
    }
    if (qFault && NODE_MAP.has(qFault)) {
      mobState.selectedNodeId = qFault;
      mobState.faultMode = true;
      mobState.faultCoFailed = qCf ? qCf.split(",").filter(Boolean) : [];
      mobState.faultConfirmedOk = qOk ? qOk.split(",").filter(Boolean) : [];
      const fn = NODE_MAP.get(qFault);
      if (!qPlant && fn.plant && PLANT_MAP.has(fn.plant)) mobState.plantId = fn.plant;
    } else if (qSelect && NODE_MAP.has(qSelect)) {
      mobState.selectedNodeId = qSelect;
      const sn = NODE_MAP.get(qSelect);
      if (!qPlant && sn.plant && PLANT_MAP.has(sn.plant)) mobState.plantId = sn.plant;
    } else if (qBoard && NODE_MAP.has(qBoard)) {
      mobState.selectedNodeId = qBoard;
      const bn = NODE_MAP.get(qBoard);
      if (!qPlant && bn.plant && PLANT_MAP.has(bn.plant)) mobState.plantId = bn.plant;
    }

    const extTop = window.SE_NAV ? window.SE_NAV.peek() : null;
    const shell = document.getElementById("mobileShell");
    shell.innerHTML = `
      <header class="mob-header">
        <div class="mob-header-top">
          <div class="mob-brand">
            <div class="mob-brand-mark">⚡</div>
            <div>
              <h1 class="mob-brand-title">Guida Rapida Impianti</h1>
              <p class="mob-brand-sub">Parti Comuni · Vista essenziale smartphone</p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
            ${extTop ? `<button id="mobExtBackBtn" type="button" class="btn btn-primary" style="font-size:11.5px; padding:5px 9px;">← Indietro</button>` : ""}
            <button id="mobThemeBtn" type="button" class="btn" style="padding:6px 9px;" title="Cambia tema chiaro/scuro">🌓</button>
          </div>
        </div>

        <div class="mob-search-row">
          <span class="mob-search-icon">🔎</span>
          <input id="mobSearchInput" class="mob-search-input" type="search" placeholder="Cerca sigla (QE.SSC, Q6), locale, utenza..." autocomplete="off" />
          <button id="mobSearchClear" class="mob-search-clear" type="button" aria-label="Cancella ricerca">✕</button>
        </div>

        <nav id="mobTabsBar" class="mob-tabs" aria-label="Sezioni guida smartphone">
          <button type="button" class="mob-tab active" data-mob-tab="plants">⚡ Impianti</button>
          <button type="button" class="mob-tab" data-mob-tab="rooms">📍 Locali</button>
          <button type="button" class="mob-tab" data-mob-tab="audit">⚠️ Rilievi</button>
          <button type="button" class="mob-tab" data-mob-tab="docs">📚 Schede</button>
        </nav>

        <div id="mobDetailBar" class="mob-detail-bar" style="display:none;">
          <button id="mobDetailBackBtn" type="button" class="btn btn-primary" style="font-size:12px;">← Torna all'elenco</button>
          <button id="mobDetailCloseBtn" type="button" class="btn" style="font-size:12px;">✕ Elenco</button>
        </div>
      </header>
      <main id="mobMain" class="mob-main"></main>
    `;

    const sInput = document.getElementById("mobSearchInput");
    const sClear = document.getElementById("mobSearchClear");
    sInput.addEventListener("input", () => {
      mobState.query = sInput.value;
      renderMobileMain();
    });
    sClear.addEventListener("click", () => {
      mobState.query = "";
      sInput.value = "";
      renderMobileMain();
      sInput.focus();
    });

    shell.querySelectorAll(".mob-tab").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        mobState.tab = tabBtn.dataset.mobTab;
        mobState.selectedNodeId = null;
        mobState.history = [];
        syncMobileUrl();
        renderMobileMain();
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });

    document.getElementById("mobDetailBackBtn").addEventListener("click", () => {
      const prev = mobState.history.pop();
      if (prev) {
        mobState.tab = prev.tab;
        mobState.plantId = prev.plantId;
        mobState.selectedNodeId = prev.selectedNodeId;
        syncMobileUrl();
        renderMobileMain();
        window.scrollTo({ top: prev.scrollY || 0, behavior: "instant" });
      } else {
        mobState.selectedNodeId = null;
        syncMobileUrl();
        renderMobileMain();
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });

    document.getElementById("mobDetailCloseBtn").addEventListener("click", () => {
      mobState.selectedNodeId = null;
      mobState.history = [];
      syncMobileUrl();
      renderMobileMain();
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    const extBack = document.getElementById("mobExtBackBtn");
    if (extBack && window.SE_NAV) {
      extBack.addEventListener("click", () => {
        window.SE_NAV.goBack(null, null);
      });
    }

    document.getElementById("mobThemeBtn").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      const u = new URL(window.location.href);
      u.searchParams.set("scoutTheme", next);
      window.history.replaceState({}, "", u.toString());
      renderMobileMain();
    });

    renderMobileMain();
  }

  function initDesktop() {
    if (desktopInitialized) return;
    desktopInitialized = true;

    ["btnGlobalNavBack", "btnFsNavBack"].forEach((id) => {
      const b = document.getElementById(id);
      if (b) b.addEventListener("click", handleGlobalStepBack);
    });

    ["btnOpenPanelsAtlas", "btnOpenPhysicalFromDrill"].forEach((id) => {
      const a = document.getElementById(id);
      if (a) {
        a.addEventListener("click", (e) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          navigateToExternalPage(a.getAttribute("href"));
        });
      }
    });

    const viewSel = document.getElementById("viewModeSelect");
    if (viewSel) {
      viewSel.addEventListener("change", (e) => {
        state.layoutEngine = e.target.value;
        syncToolbarMode();
        renderCytoscape(true);
        syncUrlWithState();
      });
    }

    document.querySelectorAll("[data-dir]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.flowDir = btn.dataset.dir;
        document.querySelectorAll("[data-dir]").forEach((b) => b.classList.toggle("active", b === btn));
        renderCytoscape(true);
        syncUrlWithState();
      });
    });

    document.getElementById("groupSelect").addEventListener("change", (e) => {
      state.groupBy = e.target.value;
      renderCytoscape(true);
      syncUrlWithState();
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
        syncUrlWithState();
      });
    }

    document.querySelectorAll("[data-opstate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.opState = btn.dataset.opstate;
        document.querySelectorAll("[data-opstate]").forEach((b) => b.classList.toggle("active", b === btn));
        renderCytoscape(false);
        syncUrlWithState();
      });
    });

    const faultBtn = document.getElementById("btnFaultMode");
    if (faultBtn) {
      faultBtn.addEventListener("click", () => {
        state.faultMode = !state.faultMode;
        if (state.faultMode) {
          state.faultTargetId = state.selectedNodeId;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
          state.focusedNodeId = null;
          if (state.isFullscreen) {
            document.getElementById("inspector").classList.remove("closed-in-fs");
          }
          document.getElementById("mainSplit").classList.remove("panel-hidden");
        } else {
          state.faultTargetId = null;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
        }
        refreshAll();
      });
    }

    document.getElementById("btnToggleFlow").addEventListener("click", (e) => {
      state.animateFlows = !state.animateFlows;
      e.currentTarget.textContent = state.animateFlows ? "⏸ Pausa" : "▶ Avvia";
    });

    document.getElementById("chkBridges").addEventListener("change", (e) => {
      state.showBridges = e.target.checked;
      renderCytoscape(true);
      syncUrlWithState();
    });

    document.getElementById("btnClearFocus").addEventListener("click", () => {
      state.focusedNodeId = null;
      applyClickFocus();
      syncUrlWithState();
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
        } else if (state.faultMode) {
          state.faultMode = false;
          state.faultTargetId = null;
          state.faultCoFailed = [];
          state.faultConfirmedOk = [];
          refreshAll();
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
      const u = new URL(window.location.href);
      u.searchParams.set("scoutTheme", next);
      window.history.replaceState({}, "", u.toString());
      const atlasBtn = document.getElementById("btnOpenPanelsAtlas");
      if (atlasBtn) atlasBtn.href = `./pannelli/index.html?scoutTheme=${encodeURIComponent(next)}`;
      renderCytoscape(false);
      renderInspector();
    });

    window.addEventListener("resize", () => {
      resizeFlowCanvas();
      if (state.layoutEngine === "synoptic") fitSynopticBoard();
      else if (cyInstance) cyInstance.resize();
    });

    // Support full URL state restoration (?plant=..., &board=..., &select=..., &view=..., &dir=..., &group=..., &op=...)
    const initParams = new URLSearchParams(window.location.search);
    const qTheme = initParams.get("scoutTheme");
    if (qTheme) {
      const atlasBtn = document.getElementById("btnOpenPanelsAtlas");
      if (atlasBtn) atlasBtn.href = `./pannelli/index.html?scoutTheme=${encodeURIComponent(qTheme)}`;
    }
    if ([...initParams.keys()].some((k) => k !== "scoutTheme")) {
      applyStateFromUrlParams(initParams);
    }

    setupSearch();
    refreshAll();
    startFlowAnimationLoop();
  }

  function init() {
    const retMobBtn = document.getElementById("btnReturnMobileFallback");
    if (retMobBtn) {
      retMobBtn.addEventListener("click", () => {
        try { sessionStorage.removeItem("se_force_desktop"); } catch (_) {}
        const u = new URL(window.location.href);
        u.searchParams.delete("desktop");
        window.location.href = u.toString();
      });
    }

    if (document.documentElement.classList.contains("is-mobile-fallback")) {
      initMobileFallback();
    } else {
      initDesktop();
    }

    // Smoothly handle responsive cross-over if a browser window is resized across 820px (unless explicitly forced)
    const mqNarrow = window.matchMedia("(max-width: 820px)");
    const onViewportChange = (e) => {
      const sp = new URLSearchParams(window.location.search);
      let forcedDesktop = sp.get("desktop") === "1";
      if (!forcedDesktop && sp.get("mobile") !== "1") {
        try { forcedDesktop = sessionStorage.getItem("se_force_desktop") === "1"; } catch (_) {}
      }
      if (forcedDesktop || sp.get("mobile") === "1") return;
      if (e.matches) {
        document.documentElement.classList.add("is-mobile-fallback");
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        initMobileFallback();
      } else {
        document.documentElement.classList.remove("is-mobile-fallback");
        if (!desktopInitialized) {
          initDesktop();
        } else {
          refreshAll();
          startFlowAnimationLoop();
        }
      }
    };
    if (typeof mqNarrow.addEventListener === "function") {
      mqNarrow.addEventListener("change", onViewportChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
