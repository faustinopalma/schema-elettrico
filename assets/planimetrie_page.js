/* ==========================================================================
   Interactive Architectural Floor Plans & Physical Switchboard / Fuse Locator
   Strictly uses Clawpilot (--cp-*) CSS variables — ZERO hardcoded colors.
   ========================================================================== */
(() => {
  "use strict";

  const PL = window.PLANIMETRIE_DATA;
  const PF = window.PANNELLI_FISICI_DATA || { panels: [], nodeToPanel: {} };
  const IMP = window.IMPIANTO_DATA || { nodes: [], plants: [] };
  if (!PL || !PL.floors) return;

  const FLOOR_BY_ID = new Map(PL.floors.map((f) => [f.id, f]));
  const MARKER_BY_ID = new Map(PL.markers.map((m) => [m.id, m]));
  const MARKER_BY_SLUG = new Map();
  PL.markers.forEach((m) => {
    if (m.panelSlug) MARKER_BY_SLUG.set(m.panelSlug, m);
  });
  const PANEL_BY_SLUG = new Map((PF.panels || []).map((p) => [p.slug, p]));

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme")
      || new URLSearchParams(window.location.search).get("scoutTheme")
      || "light";
  }

  function withTheme(url) {
    const t = new URLSearchParams(window.location.search).get("scoutTheme");
    if (!t) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}scoutTheme=${encodeURIComponent(t)}`;
  }

  const state = {
    floorId: "M1",
    selectedMarkerId: "MK-QESSC",
    selectedCompId: null
  };

  function resolveInitialStateFromUrl() {
    const sp = new URLSearchParams(window.location.search);
    const qPanel = sp.get("panel");
    const qComp = sp.get("comp");
    const qNode = sp.get("node");
    const qMarker = sp.get("marker");
    const qFloor = sp.get("floor");

    if (qMarker && MARKER_BY_ID.has(qMarker)) {
      const mk = MARKER_BY_ID.get(qMarker);
      state.selectedMarkerId = mk.id;
      state.floorId = mk.floorId;
      state.selectedCompId = qComp || null;
      return;
    }

    if (qPanel && MARKER_BY_SLUG.has(qPanel)) {
      const mk = MARKER_BY_SLUG.get(qPanel);
      state.selectedMarkerId = mk.id;
      state.floorId = mk.floorId;
      const pObj = PANEL_BY_SLUG.get(qPanel);
      if (qComp && pObj && pObj.components.some((c) => c.id === qComp)) {
        state.selectedCompId = qComp;
      } else {
        state.selectedCompId = null;
      }
      return;
    }

    if (qNode) {
      // Handle Level-2 internal node IDs such as "QESSC__C_4" -> board "QESSC"
      const baseNodeId = qNode.includes("__") ? qNode.split("__")[0] : qNode;
      const mkId = (PL.nodeToMarker || {})[baseNodeId];
      if (mkId && MARKER_BY_ID.has(mkId)) {
        const mk = MARKER_BY_ID.get(mkId);
        state.selectedMarkerId = mk.id;
        state.floorId = mk.floorId;
        state.selectedCompId = qComp || null;
        return;
      }
    }

    if (qFloor && FLOOR_BY_ID.has(qFloor)) {
      state.floorId = qFloor;
      const firstOnFloor = PL.markers.find((m) => m.floorId === qFloor);
      if (firstOnFloor) state.selectedMarkerId = firstOnFloor.id;
      state.selectedCompId = null;
      return;
    }

    // Default: start on Piano Terra overview with Locale Contatori / AVSSC or first marker
    state.floorId = "TERRA";
    state.selectedMarkerId = "MK-AVSSC";
    state.selectedCompId = null;
  }

  function syncUrlState() {
    const u = new URL(window.location.href);
    const sp = u.searchParams;
    const mk = MARKER_BY_ID.get(state.selectedMarkerId);
    sp.set("floor", state.floorId);
    if (mk) {
      if (mk.panelSlug) {
        sp.set("panel", mk.panelSlug);
        sp.delete("marker");
        sp.delete("node");
      } else {
        sp.set("marker", mk.id);
        sp.delete("panel");
        sp.delete("node");
      }
    }
    if (state.selectedCompId) sp.set("comp", state.selectedCompId);
    else sp.delete("comp");
    sp.delete("ret");
    sp.delete("retLabel");
    window.history.replaceState({}, "", u.toString());
  }

  function currentStepLabel() {
    const mk = MARKER_BY_ID.get(state.selectedMarkerId);
    if (!mk) return "Planimetrie";
    return state.selectedCompId
      ? `Planimetria ${mk.code} (${state.selectedCompId})`
      : `Planimetria ${mk.code}`;
  }

  function zoneStyleAttrs(kind) {
    switch (kind) {
      case "lot":
        return `fill="var(--cp-bg)" stroke="var(--cp-border-strong)" stroke-width="2" stroke-dasharray="8 5" rx="14"`;
      case "garden":
        return `fill="color-mix(in srgb, var(--cp-success) 8%, var(--cp-surface))" stroke="var(--cp-border)" stroke-width="1.3" rx="10"`;
      case "building":
        return `fill="var(--cp-surface)" stroke="var(--cp-border-strong)" stroke-width="2.4" rx="10"`;
      case "garage":
        return `fill="var(--cp-surface)" stroke="var(--cp-border-strong)" stroke-width="2.2" rx="8"`;
      case "ramp":
        return `fill="var(--cp-surface-soft)" stroke="var(--cp-border-strong)" stroke-width="1.8" stroke-dasharray="5 3" rx="8"`;
      case "driveway":
        return `fill="var(--cp-bg-elevated)" stroke="var(--cp-border-strong)" stroke-width="1.5" rx="6"`;
      case "box_strip":
        return `fill="var(--cp-surface-soft)" stroke="var(--cp-border)" stroke-width="1.2" rx="5"`;
      case "core":
        return `fill="color-mix(in srgb, var(--cp-link) 9%, var(--cp-surface))" stroke="var(--cp-link)" stroke-width="1.6" rx="6"`;
      case "tech_room":
        return `fill="color-mix(in srgb, var(--cp-accent) 6%, var(--cp-surface))" stroke="var(--cp-border-strong)" stroke-width="1.8" rx="7"`;
      case "tech_room_accent":
        return `fill="var(--cp-accent-soft)" stroke="var(--cp-accent)" stroke-width="2.1" rx="7"`;
      case "fire_room":
        return `fill="color-mix(in srgb, var(--cp-danger) 9%, var(--cp-surface))" stroke="var(--cp-danger)" stroke-width="2" rx="7"`;
      default:
        return `fill="var(--cp-bg-elevated)" stroke="var(--cp-border)" stroke-width="1.3" rx="6"`;
    }
  }

  function markerColors(mk) {
    if (mk.kind === "safety" || mk.kind === "safety_panel") {
      return { stroke: "var(--cp-danger)", fill: "color-mix(in srgb, var(--cp-danger) 15%, var(--cp-surface))", text: "var(--cp-danger)" };
    }
    if (mk.kind === "equip") {
      return { stroke: "var(--cp-link)", fill: "color-mix(in srgb, var(--cp-link) 14%, var(--cp-surface))", text: "var(--cp-link)" };
    }
    return { stroke: "var(--cp-accent)", fill: "var(--cp-accent)", text: "var(--cp-accent-fg)" };
  }

  // Render IEC CAD Switchboard Symbol (crossed rectangle ⊠) + non-colliding label pill
  function renderFloorSvg(floor) {
    const [vx, vy, vw, vh] = floor.viewBox;
    const floorMarkers = PL.markers.filter((m) => m.floorId === floor.id);

    const zonesSvg = (floor.zones || []).map((z) => {
      const titleY = z.sub ? z.y + 18 : z.y + Math.min(20, z.h / 2 + 4);
      const isSmall = z.h < 50 || z.w < 110;
      return `
        <g>
          <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" ${zoneStyleAttrs(z.kind)} />
          <text x="${z.x + 10}" y="${titleY}" font-family="Segoe UI, Aptos, sans-serif" font-size="${isSmall ? "10" : "11.2"}" font-weight="700" fill="var(--cp-text)">${esc(z.label)}</text>
          ${z.sub ? `<text x="${z.x + 10}" y="${titleY + 14}" font-family="Segoe UI, Aptos, sans-serif" font-size="9.8" fill="var(--cp-text-muted)">${esc(z.sub)}</text>` : ""}
        </g>
      `;
    }).join("");

    const pathsSvg = (floor.paths || []).map((p) => {
      const isEarth = p.kind === "earth_ring";
      const col = isEarth ? "var(--cp-success)" : "var(--cp-warning)";
      const dash = isEarth ? "9 6" : "6 4";
      return `<path d="${p.d}" fill="none" stroke="${col}" stroke-width="${isEarth ? "1.6" : "2.4"}" stroke-dasharray="${dash}" opacity="0.82"><title>${esc(p.label)}</title></path>`;
    }).join("");

    const labelsSvg = (floor.labels || []).map((lb) => `
      <text x="${lb.x}" y="${lb.y}" text-anchor="middle" font-family="Segoe UI, Aptos, sans-serif" font-size="10.5" font-weight="700" fill="var(--cp-text-muted)">${esc(lb.text)}</text>
    `).join("");

    // Place non-overlapping callout pills on the overview map (selected marker ALWAYS gets top priority!)
    const placedPills = [];
    const orderedMarkers = [...floorMarkers].sort((a, b) => {
      if (a.id === state.selectedMarkerId) return -1;
      if (b.id === state.selectedMarkerId) return 1;
      return 0;
    });

    const pillByMarker = new Map();
    orderedMarkers.forEach((m) => {
      const isSel = m.id === state.selectedMarkerId;
      const lbl = isSel && state.selectedCompId ? `${m.code} · [${state.selectedCompId}]` : m.code;
      const pw = Math.max(54, lbl.length * 6.4 + 14);
      const ph = 18;
      const candidates = [
        { x: m.x - pw / 2, y: m.y - 29 },
        { x: m.x - pw / 2, y: m.y + 13 },
        { x: m.x + 14, y: m.y - ph / 2 },
        { x: m.x - pw - 14, y: m.y - ph / 2 }
      ];
      for (const c of candidates) {
        const cx = Math.max(8, Math.min(vw - pw - 8, c.x));
        const cy = Math.max(8, Math.min(vh - ph - 8, c.y));
        const hits = placedPills.some((r) =>
          cx < r.x + r.w + 4 && cx + pw > r.x - 4 && cy < r.y + r.h + 3 && cy + ph > r.y - 3
        );
        if (!hits || isSel) {
          placedPills.push({ x: cx, y: cy, w: pw, h: ph });
          pillByMarker.set(m.id, { x: cx, y: cy, w: pw, h: ph, lbl });
          break;
        }
      }
    });

    // Draw selected marker LAST so it sits on top of everything
    const drawOrder = [...floorMarkers].sort((a, b) => (a.id === state.selectedMarkerId ? 1 : (b.id === state.selectedMarkerId ? -1 : 0)));

    const markersSvg = drawOrder.map((m) => {
      const isSel = m.id === state.selectedMarkerId;
      const mc = markerColors(m);
      const pill = pillByMarker.get(m.id);
      const bw = isSel ? 22 : 17;
      const bh = isSel ? 16 : 12;

      return `
        <g class="pl-marker" data-marker-id="${esc(m.id)}">
          <title>${esc(m.code)} — ${esc(m.title)} (${esc(m.room)})</title>
          ${isSel ? `
            <circle class="pl-pulse-circle" cx="${m.x}" cy="${m.y}" r="22" fill="none" stroke="var(--cp-warning)" stroke-width="3" />
            <circle cx="${m.x}" cy="${m.y}" r="16" fill="color-mix(in srgb, var(--cp-warning) 22%, transparent)" stroke="var(--cp-warning)" stroke-width="1.8" />
          ` : ""}
          <!-- IEC / CAD Switchboard Symbol (Crossed Rectangle) -->
          <rect class="pl-marker-box" x="${m.x - bw / 2}" y="${m.y - bh / 2}" width="${bw}" height="${bh}" rx="3"
            fill="var(--cp-surface)" stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="${isSel ? "2.6" : "1.9"}" />
          <line x1="${m.x - bw / 2}" y1="${m.y - bh / 2}" x2="${m.x + bw / 2}" y2="${m.y + bh / 2}" stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="1.3" />
          <line x1="${m.x + bw / 2}" y1="${m.y - bh / 2}" x2="${m.x - bw / 2}" y2="${m.y + bh / 2}" stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="1.3" />

          ${pill ? `
            <rect x="${pill.x.toFixed(1)}" y="${pill.y.toFixed(1)}" width="${pill.w.toFixed(1)}" height="${pill.h}" rx="5"
              fill="${isSel ? "var(--cp-accent)" : "var(--cp-surface)"}"
              stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="${isSel ? "2" : "1.3"}" />
            <text x="${(pill.x + pill.w / 2).toFixed(1)}" y="${(pill.y + 12.6).toFixed(1)}" text-anchor="middle"
              font-family="Consolas, Courier New, monospace" font-size="10.2" font-weight="700"
              fill="${isSel ? "var(--cp-accent-fg)" : "var(--cp-text)"}">${esc(pill.lbl)}</text>
          ` : ""}
        </g>
      `;
    }).join("");

    // North Compass Rose top-right
    const compassSvg = `
      <g transform="translate(${vw - 44}, 42)">
        <circle cx="0" cy="0" r="18" fill="var(--cp-surface)" stroke="var(--cp-border-strong)" stroke-width="1.3" />
        <polygon points="0,-13 -5,4 0,0 5,4" fill="var(--cp-accent)" />
        <text x="0" y="13" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="8.5" font-weight="700" fill="var(--cp-text-muted)">N</text>
      </g>
    `;

    return `
      <svg viewBox="${vx} ${vy} ${vw} ${vh}" role="img" aria-label="${esc(floor.fullTitle)}">
        <defs>
          <pattern id="plGridPattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="var(--cp-border)" stroke-width="0.6" opacity="0.55" />
          </pattern>
        </defs>
        <rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="url(#plGridPattern)" />
        ${pathsSvg}
        ${zonesSvg}
        ${labelsSvg}
        ${markersSvg}
        ${compassSvg}
      </svg>
    `;
  }

  function renderRoomZoomSvg(zoomObj) {
    if (!zoomObj) return "";
    const [vx, vy, vw, vh] = zoomObj.viewBox;

    const roomsSvg = (zoomObj.rooms || []).map((r) => `
      <g>
        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" ${zoneStyleAttrs(r.kind)} />
        <text x="${r.x + 10}" y="${r.y + 18}" font-family="Segoe UI, Aptos, sans-serif" font-size="11" font-weight="700" fill="var(--cp-text)">${esc(r.label)}</text>
      </g>
    `).join("");

    const fixturesSvg = (zoomObj.fixtures || []).map((f) => `
      <g>
        <rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="4" fill="var(--cp-surface-soft)" stroke="var(--cp-border-strong)" stroke-width="1.1" stroke-dasharray="4 2" />
        <text x="${f.x + f.w / 2}" y="${f.y + f.h / 2 + 3.5}" text-anchor="middle" font-family="Segoe UI, Aptos, sans-serif" font-size="9.5" font-weight="600" fill="var(--cp-text-muted)">${esc(f.label)}</text>
      </g>
    `).join("");

    const pinsSvg = (zoomObj.pins || []).map((p) => {
      const mk = MARKER_BY_ID.get(p.markerId);
      if (!mk) return "";
      const isSel = p.markerId === state.selectedMarkerId;
      const mc = markerColors(mk);
      const txt = isSel && state.selectedCompId ? `${p.label} → [${state.selectedCompId}]` : p.label;
      const pw = Math.max(66, txt.length * 5.8 + 14);

      return `
        <g class="pl-marker" data-marker-id="${esc(p.markerId)}">
          ${isSel ? `<circle class="pl-pulse-circle" cx="${p.x}" cy="${p.y}" r="20" fill="none" stroke="var(--cp-warning)" stroke-width="3" />` : ""}
          <rect class="pl-marker-box" x="${p.x - 11}" y="${p.y - 8}" width="22" height="16" rx="3"
            fill="var(--cp-surface)" stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="${isSel ? "2.6" : "1.8"}" />
          <line x1="${p.x - 11}" y1="${p.y - 8}" x2="${p.x + 11}" y2="${p.y + 8}" stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="1.3" />
          <line x1="${p.x + 11}" y1="${p.y - 8}" x2="${p.x - 11}" y2="${p.y + 8}" stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="1.3" />

          <rect x="${(p.x - pw / 2).toFixed(1)}" y="${p.y + 11}" width="${pw.toFixed(1)}" height="17" rx="4"
            fill="${isSel ? "var(--cp-accent)" : "var(--cp-surface)"}"
            stroke="${isSel ? "var(--cp-warning)" : mc.stroke}" stroke-width="${isSel ? "1.8" : "1.1"}" />
          <text x="${p.x}" y="${p.y + 22.8}" text-anchor="middle"
            font-family="Consolas, Courier New, monospace" font-size="9.6" font-weight="700"
            fill="${isSel ? "var(--cp-accent-fg)" : "var(--cp-text)"}">${esc(txt)}</text>
        </g>
      `;
    }).join("");

    return `
      <svg viewBox="${vx} ${vy} ${vw} ${vh}" role="img" aria-label="${esc(zoomObj.title)}">
        <rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="var(--cp-bg)" />
        ${roomsSvg}
        ${fixturesSvg}
        ${pinsSvg}
      </svg>
    `;
  }

  function renderPage() {
    const root = document.getElementById("planimetrieRoot");
    if (!root) return;

    const activeFloor = FLOOR_BY_ID.get(state.floorId) || PL.floors[0];
    const mk = MARKER_BY_ID.get(state.selectedMarkerId) || PL.markers[0];
    const panel = mk && mk.panelSlug ? PANEL_BY_SLUG.get(mk.panelSlug) : null;
    const compObj = (panel && state.selectedCompId)
      ? panel.components.find((c) => c.id === state.selectedCompId) || null
      : null;

    const floorMarkers = PL.markers.filter((m) => m.floorId === activeFloor.id);
    const activeZoom = (mk && mk.floorId === activeFloor.id && mk.zoomId && PL.roomZooms[mk.zoomId])
      ? PL.roomZooms[mk.zoomId]
      : (floorMarkers.find((m) => m.zoomId && PL.roomZooms[m.zoomId])
          ? PL.roomZooms[floorMarkers.find((m) => m.zoomId && PL.roomZooms[m.zoomId]).zoomId]
          : null);

    const navTop = window.SE_NAV ? window.SE_NAV.peek() : null;
    const defaultHomeUrl = withTheme(`../index.html?plant=${encodeURIComponent(mk.plantId || "IMP-INGRESSI")}&select=${encodeURIComponent(mk.nodeId || "RETE-DISTRIBUTORE")}`);
    const backLabel = navTop ? `← Torna a: ${navTop.label}` : "← Torna alla Mappa Impianti";

    const panelHref = panel
      ? withTheme(`../pannelli/${panel.slug}.html${compObj ? `?comp=${encodeURIComponent(compObj.id)}` : ""}`)
      : null;
    const faultHref = mk.nodeId
      ? withTheme(`../index.html?plant=${encodeURIComponent(mk.plantId || "IMP-SSC")}&select=${encodeURIComponent(mk.nodeId)}&fault=${encodeURIComponent(mk.nodeId)}`)
      : null;
    const mapHref = mk.nodeId
      ? withTheme(`../index.html?plant=${encodeURIComponent(mk.plantId || "IMP-INGRESSI")}&select=${encodeURIComponent(mk.nodeId)}`)
      : withTheme("../index.html");

    root.innerHTML = `
      <header class="pl-topbar">
        <div class="pl-brand">
          <button id="plBackBtn" type="button" class="pl-btn pl-btn-primary pl-back-btn" title="${esc(backLabel)}">${esc(backLabel)}</button>
          <div class="pl-brand-mark">🗺️</div>
          <div class="pl-brand-text">
            <h1>Planimetrie &amp; Posizione Fisica Quadri / Fusibili</h1>
            <p>Piante architettoniche rigenerate da PL.01–PL.12 · Localizzazione per piano, stanza, parete e guida DIN</p>
          </div>
        </div>

        <div class="pl-actions">
          <div class="pl-search-wrap">
            <span class="pl-search-icon">🔎</span>
            <input id="plSearchInput" class="pl-search-input" type="search" placeholder="Dove si trova un fusibile, interruttore o quadro? (es. F3, Q5, QE.SSC)" autocomplete="off" />
            <div id="plSearchDropdown" class="pl-search-dd"></div>
          </div>
          <a class="pl-btn" data-nav-link href="${esc(withTheme("../pannelli/index.html"))}">🗄️ 18 Pannelli Fisici</a>
          <a class="pl-btn" data-nav-link href="${esc(mapHref)}">📐 Schemi Elettrici</a>
          <button id="plThemeBtn" type="button" class="pl-btn">🌓 Tema</button>
        </div>
      </header>

      <nav class="pl-floor-strip" aria-label="Seleziona il livello dell'edificio">
        ${PL.floors.map((fl) => {
          const cnt = PL.markers.filter((m) => m.floorId === fl.id).length;
          const isTargetFloor = mk && mk.floorId === fl.id;
          return `
            <button type="button" class="pl-floor-btn ${fl.id === activeFloor.id ? "active" : ""}" data-floor-id="${esc(fl.id)}">
              <div>
                <div class="pl-floor-title">${isTargetFloor ? "🎯 " : ""}${esc(fl.shortTitle)}</div>
                <div class="pl-floor-sub">${esc(fl.plRef)}</div>
              </div>
              <span class="pl-floor-count">${cnt} quadri</span>
            </button>
          `;
        }).join("")}
      </nav>

      <main class="pl-workspace">
        <div class="pl-map-col">
          <!-- Main Recreated Floor Plan -->
          <section class="pl-card">
            <div class="pl-card-hdr">
              <div>
                <strong style="font-size:15px;">${esc(activeFloor.fullTitle)}</strong>
                <div style="font-size:12px; color:var(--cp-text-muted); margin-top:2px;">${esc(activeFloor.summary)}</div>
              </div>
              <span class="mono" style="font-size:11.5px; font-weight:700; padding:3px 9px; border-radius:6px; background:var(--cp-accent-soft); color:var(--cp-accent);">
                ${esc(activeFloor.elevation)} · ${esc(activeFloor.plRef)}
              </span>
            </div>

            <div class="pl-svg-frame">
              ${renderFloorSvg(activeFloor)}
            </div>

            <div class="pl-legend-bar">
              <strong style="color:var(--cp-text);">Legenda pianta:</strong>
              <span class="pl-legend-item"><span class="pl-legend-dot" style="border-color:var(--cp-accent); background:var(--cp-accent-soft);"></span> Quadro elettrico / Locale tecnico</span>
              <span class="pl-legend-item"><span class="pl-legend-dot" style="border-color:var(--cp-danger); background:color-mix(in srgb, var(--cp-danger) 15%, var(--cp-surface));"></span> Presidio VVF / UPS / Antincendio</span>
              <span class="pl-legend-item"><span class="pl-legend-dot" style="border-color:var(--cp-link); background:color-mix(in srgb, var(--cp-link) 12%, var(--cp-surface));"></span> Scale / Ascensori / Apparati TLC</span>
              <span class="pl-legend-item"><span class="pl-legend-dot" style="border-color:var(--cp-warning); border-radius:50%;"></span> Punto attualmente selezionato</span>
            </div>
          </section>

          <!-- 1:50 Detailed Technical Room Zoom (when available on this floor) -->
          ${activeZoom ? `
            <section class="pl-card">
              <div class="pl-card-hdr">
                <div>
                  <strong style="font-size:14px;">${esc(activeZoom.title)}</strong>
                  <div style="font-size:12px; color:var(--cp-text-muted);">${esc(activeZoom.subtitle)}</div>
                </div>
                ${activeFloor.id === "M1" ? `
                  <div style="display:flex; gap:6px;">
                    <button type="button" class="pl-btn ${mk.zoomId === "ZOOM_M1_TORREA" ? "pl-btn-primary" : ""}" style="font-size:11.5px; padding:4px 9px;" data-pick-marker="MK-QESSC">Stralcio Torre A (QE.SSC / QE.CI)</button>
                    <button type="button" class="pl-btn ${mk.zoomId === "ZOOM_M1_TORREB" ? "pl-btn-primary" : ""}" style="font-size:11.5px; padding:4px 9px;" data-pick-marker="MK-QESCB">Stralcio Torre B (QESC-B)</button>
                  </div>
                ` : ""}
              </div>
              <div class="pl-svg-frame">
                ${renderRoomZoomSvg(activeZoom)}
              </div>
            </section>
          ` : ""}
        </div>

        <!-- Right Location & Step-by-Step Physical Wayfinding Card -->
        <aside class="pl-inspector">
          <div class="pl-card">
            ${compObj ? `
              <div class="pl-comp-spotlight">
                <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:var(--cp-danger);">
                  ${compObj.kind === "fuse" ? "🧨 FUSIBILE LOCALIZZATO" : "🛡️ COMPONENTE LOCALIZZATO"}
                </div>
                <div style="font-size:15px; font-weight:700; margin-top:2px;">
                  <span class="mono" style="color:var(--cp-accent);">${esc(compObj.id)}</span> — ${esc(compObj.shortLabel)}
                </div>
                <div style="font-size:12px; color:var(--cp-text-muted); margin-top:2px;">
                  Calibro: <strong class="mono">${esc(compObj.ratingBadge)}</strong> · Dentro <strong>${esc(panel.code)}</strong> → <strong>${esc(compObj.bayLabel)}</strong>
                </div>
              </div>
            ` : ""}

            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="mono" style="font-size:12px; font-weight:700; padding:2px 8px; border-radius:6px; background:var(--cp-accent); color:var(--cp-accent-fg);">${esc(mk.code)}</span>
              <span style="font-size:11.5px; font-weight:700; color:var(--cp-text-muted);">${esc(FLOOR_BY_ID.get(mk.floorId)?.shortTitle || "")}</span>
            </div>
            <h2 style="margin:0 0 4px; font-size:16px; line-height:1.25;">${esc(mk.title)}</h2>
            <div style="font-size:12.5px; color:var(--cp-accent); font-weight:700; margin-bottom:10px;">📍 ${esc(mk.room)}</div>

            <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--cp-text-muted); margin-bottom:6px;">
              🧭 Come trovarlo fisicamente sul posto:
            </div>

            <div class="pl-way-step">
              <span class="pl-way-num">1</span>
              <div><strong>Livello edificio:</strong> ${esc(FLOOR_BY_ID.get(mk.floorId)?.fullTitle.split("—")[0].trim() || mk.floorId)} (${esc(FLOOR_BY_ID.get(mk.floorId)?.elevation || "")}).</div>
            </div>

            <div class="pl-way-step">
              <span class="pl-way-num">2</span>
              <div><strong>Percorso di accesso:</strong> ${esc(mk.howToReach)}</div>
            </div>

            <div class="pl-way-step">
              <span class="pl-way-num">3</span>
              <div><strong>Parete esatta nel locale:</strong> ${esc(mk.wallSpot)}</div>
            </div>

            ${compObj ? `
              <div class="pl-way-step" style="border-color:var(--cp-warning);">
                <span class="pl-way-num" style="background:var(--cp-warning); color:var(--cp-text);">4</span>
                <div><strong>Posizione dentro l'armadio ${esc(panel.code)}:</strong> apri il portello e individua <strong>${esc(compObj.bayLabel)}</strong> → sigla <strong class="mono">${esc(compObj.id)}</strong> (${esc(compObj.shortLabel)}).</div>
              </div>
            ` : ""}

            ${panel ? `
              <div style="margin-top:10px; padding-top:9px; border-top:1px dashed var(--cp-border);">
                <label for="plCompPicker" style="display:block; font-size:11px; font-weight:700; color:var(--cp-text-muted); margin-bottom:4px;">
                  🔎 Cerca un singolo fusibile o interruttore dentro ${esc(panel.code)} (${panel.components.length}):
                </label>
                <select id="plCompPicker" class="pl-search-input" style="padding-left:10px;">
                  <option value="">— Intero quadro ${esc(panel.code)} —</option>
                  ${panel.components.map((c) => `
                    <option value="${esc(c.id)}" ${compObj && compObj.id === c.id ? "selected" : ""}>
                      ${c.kind === "fuse" ? "🧨" : "🛡️"} ${esc(c.id)} — ${esc(c.shortLabel)} (${esc(c.bayLabel)})
                    </option>
                  `).join("")}
                </select>
              </div>
            ` : ""}

            <div style="display:flex; flex-direction:column; gap:7px; margin-top:12px; padding-top:10px; border-top:1px solid var(--cp-border);">
              ${panelHref ? `
                <a class="pl-btn pl-btn-primary" style="justify-content:center;" data-nav-link href="${esc(panelHref)}">
                  🗄️ Apri Fronte Quadro ${esc(panel.code)}${compObj ? ` su ${esc(compObj.id)}` : ""} →
                </a>
              ` : ""}
              ${faultHref ? `
                <a class="pl-btn" style="justify-content:center; border-color:var(--cp-danger); color:var(--cp-danger);" data-nav-link href="${esc(faultHref)}">
                  🛠️ Avvia Ricerca Guasto da ${esc(mk.code)} →
                </a>
              ` : ""}
              <a class="pl-btn" style="justify-content:center;" data-nav-link href="${esc(mapHref)}">
                📐 Vedi nello Schema Elettrico d'Impianto →
              </a>
            </div>
          </div>

          <div class="pl-card">
            <div style="font-size:11.5px; font-weight:700; text-transform:uppercase; color:var(--cp-text-muted); margin-bottom:8px;">
              Quadri &amp; Presidi su questo piano (${floorMarkers.length}):
            </div>
            <div class="pl-board-chips">
              ${floorMarkers.map((fm) => `
                <button type="button" class="pl-board-chip ${fm.id === mk.id ? "active" : ""}" data-pick-marker="${esc(fm.id)}">
                  ${esc(fm.code)}
                </button>
              `).join("")}
            </div>
          </div>
        </aside>
      </main>
    `;

    // Bind events
    document.getElementById("plBackBtn").addEventListener("click", () => {
      if (window.SE_NAV) {
        window.SE_NAV.goBack(defaultHomeUrl);
      } else {
        window.location.href = defaultHomeUrl;
      }
    });

    document.getElementById("plThemeBtn").addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      const u = new URL(window.location.href);
      u.searchParams.set("scoutTheme", next);
      window.history.replaceState({}, "", u.toString());
      renderPage();
    });

    root.querySelectorAll("[data-floor-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const fid = btn.dataset.floorId;
        state.floorId = fid;
        const curMk = MARKER_BY_ID.get(state.selectedMarkerId);
        if (!curMk || curMk.floorId !== fid) {
          const first = PL.markers.find((m) => m.floorId === fid);
          if (first) state.selectedMarkerId = first.id;
          state.selectedCompId = null;
        }
        syncUrlState();
        renderPage();
      });
    });

    const selectMarker = (markerId, compId = null) => {
      const targetMk = MARKER_BY_ID.get(markerId);
      if (!targetMk) return;
      state.selectedMarkerId = targetMk.id;
      state.floorId = targetMk.floorId;
      state.selectedCompId = compId;
      syncUrlState();
      renderPage();
    };

    root.querySelectorAll("[data-marker-id]").forEach((el) => {
      el.addEventListener("click", () => selectMarker(el.dataset.markerId, null));
    });

    root.querySelectorAll("[data-pick-marker]").forEach((btn) => {
      btn.addEventListener("click", () => selectMarker(btn.dataset.pickMarker, null));
    });

    const compPicker = document.getElementById("plCompPicker");
    if (compPicker) {
      compPicker.addEventListener("change", (e) => {
        state.selectedCompId = e.target.value || null;
        syncUrlState();
        renderPage();
      });
    }

    root.querySelectorAll("a[data-nav-link]").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const href = a.getAttribute("href");
        if (!href) return;
        if (window.SE_NAV) {
          e.preventDefault();
          syncUrlState();
          window.SE_NAV.navigateTo(href, currentStepLabel());
        }
      });
    });

    setupPlanimetriaSearch(selectMarker);
  }

  function setupPlanimetriaSearch(selectMarkerFn) {
    const input = document.getElementById("plSearchInput");
    const dd = document.getElementById("plSearchDropdown");
    if (!input || !dd) return;

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        dd.classList.remove("open");
        return;
      }

      const hits = [];
      PL.markers.forEach((m) => {
        const hay = `${m.code} ${m.title} ${m.room} ${m.wallSpot}`.toLowerCase();
        if (hay.includes(q)) {
          const fl = FLOOR_BY_ID.get(m.floorId);
          hits.push({
            markerId: m.id,
            compId: null,
            title: `${m.code} — ${m.title}`,
            sub: `📍 ${fl ? fl.shortTitle : m.floorId} · ${m.room}`
          });
        }
      });

      (PF.panels || []).forEach((p) => {
        const mk = MARKER_BY_SLUG.get(p.slug);
        if (!mk) return;
        const fl = FLOOR_BY_ID.get(mk.floorId);
        (p.components || []).forEach((c) => {
          const hay = `${c.id} ${c.shortLabel} ${c.ratingBadge} ${c.whatItDoes} ${p.code}`.toLowerCase();
          if (hay.includes(q)) {
            hits.push({
              markerId: mk.id,
              compId: c.id,
              title: `${c.kind === "fuse" ? "🧨" : "🛡️"} ${c.id} in ${p.code} — ${c.shortLabel}`,
              sub: `📍 ${fl ? fl.shortTitle : ""} · ${mk.room} → ${c.bayLabel}`
            });
          }
        });
      });

      const top = hits.slice(0, 18);
      dd.innerHTML = top.length
        ? top.map((h, i) => `
            <div class="pl-search-item" data-hit-idx="${i}">
              <div style="font-weight:700; font-size:12.5px;">${esc(h.title)}</div>
              <div style="font-size:11.5px; color:var(--cp-text-muted);">${esc(h.sub)}</div>
            </div>
          `).join("")
        : `<div class="pl-search-item" style="color:var(--cp-text-muted);">Nessun quadro, interruttore o fusibile trovato per "${esc(input.value)}"</div>`;

      dd.querySelectorAll("[data-hit-idx]").forEach((el) => {
        el.addEventListener("click", () => {
          const h = top[parseInt(el.dataset.hitIdx, 10)];
          dd.classList.remove("open");
          selectMarkerFn(h.markerId, h.compId);
        });
      });
      dd.classList.add("open");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".pl-search-wrap")) dd.classList.remove("open");
    }, { once: true });
  }

  resolveInitialStateFromUrl();
  syncUrlState();
  renderPage();
})();
