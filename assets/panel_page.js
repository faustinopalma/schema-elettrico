/* ==========================================================================
   Interactive Physical Switchboard Renderer & 18-Panel Atlas Engine
   Zero hardcoded colors — strictly uses Clawpilot CSS variables var(--cp-*).
   ========================================================================== */
(() => {
  "use strict";

  const PF = window.PANNELLI_FISICI_DATA;
  const IMP = window.IMPIANTO_DATA;
  if (!PF || !PF.panels) return;

  const PANEL_BY_SLUG = new Map(PF.panels.map((p) => [p.slug, p]));
  const DS_MAP = new Map(((IMP && IMP.datasheets) || []).map((d) => [d.id, d]));

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentThemeParam() {
    return new URLSearchParams(window.location.search).get("scoutTheme");
  }

  function withTheme(url) {
    const t = currentThemeParam();
    if (!t) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}scoutTheme=${encodeURIComponent(t)}`;
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    const u = new URL(window.location.href);
    u.searchParams.set("scoutTheme", next);
    window.history.replaceState({}, "", u.toString());
    document.querySelectorAll("a[data-keep-theme]").forEach((a) => {
      const baseHref = a.getAttribute("data-base-href") || a.getAttribute("href");
      a.setAttribute("data-base-href", baseHref.replace(/([?&])scoutTheme=[^&]+(&|$)/, "$1").replace(/[?&]$/, ""));
      a.setAttribute("href", withTheme(a.getAttribute("data-base-href")));
    });
  }

  const KIND_LABELS = {
    mccb: "Interruttore Scatolato / Sezionatore",
    rcbo: "Magnetotermico Differenziale",
    mcb: "Interruttore Magnetotermico",
    rccb: "Interruttore Differenziale Puro",
    fuse: "Portafusibile Sezionatore",
    spd: "Scaricatore Sovratensione SPD",
    diff_relay: "Relè Differenziale Tipo B",
    toroid_ct: "Toroide / Trasf. Amperometrico",
    meter: "Strumento Misura Digitale",
    contactor: "Contattore / Relè Ausiliario",
    timer: "Orologio / Temporizzatore",
    selector: "Selettore Manuale 1-0-2",
    transformer: "Trasformatore di Sicurezza",
    plc_hmi: "Controllore / Touch Panel BMS",
    socket_lamp: "Presa Servizio / Spia Quadro",
    busbar: "Ripartitore Sbarre Modulare",
    terminal: "Morsettiera di Quadro"
  };

  const KIND_SHORT = {
    mccb: "MCCB",
    rcbo: "MT+DIFF",
    mcb: "MT",
    rccb: "DIFF",
    fuse: "FUSIBILE",
    spd: "SPD T1+2",
    diff_relay: "RELÈ B",
    toroid_ct: "TA / TOR",
    meter: "MISURA",
    contactor: "RELÈ / K",
    timer: "TIMER",
    selector: "1-0-2",
    transformer: "TRASF.",
    plc_hmi: "BMS/HMI",
    socket_lamp: "AUX",
    busbar: "SBARRA",
    terminal: "MORSETT."
  };

  function getFilterBucket(kind) {
    if (kind === "mccb" || kind === "rcbo" || kind === "mcb" || kind === "rccb") return "breakers";
    if (kind === "fuse") return "fuses";
    if (kind === "contactor" || kind === "timer" || kind === "selector" || kind === "plc_hmi" || kind === "transformer" || kind === "socket_lamp") return "controls";
    if (kind === "spd" || kind === "diff_relay" || kind === "toroid_ct" || kind === "meter") return "meters_spd";
    return "terminals";
  }

  function renderModuleVisual(comp, isEmergency) {
    const tripped = isEmergency && comp.vvfState === "tripped";
    const k = comp.kind;

    if (k === "mccb") {
      return `
        <span class="mod-lever" title="${tripped ? "Aperto per sgancio VVF" : "Chiuso in servizio"}">
          <span class="mod-lever-dot"></span>
          <span>${tripped ? "0 · OFF (SGANCIO)" : "I · ON"}</span>
        </span>
      `;
    }
    if (k === "rcbo" || k === "rccb") {
      return `
        <div style="display:flex; align-items:center; gap:5px;">
          <span class="mod-lever"><span class="mod-lever-dot"></span><span>${tripped ? "0 OFF" : "I ON"}</span></span>
          <span class="mod-test-btn" title="Tasto prova differenziale">T</span>
        </div>
      `;
    }
    if (k === "mcb") {
      return `
        <span class="mod-lever"><span class="mod-lever-dot"></span><span>${tripped ? "0 OFF" : "I ON"}</span></span>
      `;
    }
    if (k === "fuse") {
      const cal = (comp.ratingBadge.split("·")[1] || comp.ratingBadge).trim();
      return `
        <span class="mod-fuse-cart" title="Cartuccia fusibile cilindrica">
          <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
            <line x1="0" y1="5" x2="16" y2="5" stroke="var(--cp-text)" stroke-width="1.4"/>
            <rect x="3.5" y="1.5" width="9" height="7" rx="1.2" fill="var(--cp-warning)" stroke="var(--cp-text)" stroke-width="1.1"/>
          </svg>
          <span>${esc(cal)}</span>
        </span>
      `;
    }
    if (k === "spd") {
      return `<span class="mod-lcd" style="border-color:var(--cp-success); color:var(--cp-success);">⚡ SPD ⏚ OK</span>`;
    }
    if (k === "diff_relay") {
      return `<span class="mod-lcd" style="border-color:var(--cp-success); color:var(--cp-text);">ΔI Tipo B · OK</span>`;
    }
    if (k === "meter") {
      return `<span class="mod-lcd">${tripped ? "0.0 V · OFF" : "400V · 50Hz · kW"}</span>`;
    }
    if (k === "plc_hmi") {
      if (comp.id === "EXP1") {
        return `<span class="mod-lcd" style="padding:6px 8px;">🖥️ SINOTTICO TOUCH 7&quot; BMS</span>`;
      }
      return `<span class="mod-lcd">📡 BACnet I/O · RUN</span>`;
    }
    if (k === "timer") {
      return `<span class="mod-lcd">🕒 ${comp.ratingBadge.toLowerCase().includes("astro") ? "ASTRO ☀/☾" : "TIMER ⏱"}</span>`;
    }
    if (k === "selector") {
      return `<span class="mod-lever"><span>AUT</span><span style="color:var(--cp-accent);">●</span><span>0 · MAN</span></span>`;
    }
    if (k === "contactor") {
      return `<span class="mod-lever"><span>⎈ Bobina</span><span class="mod-lever-dot"></span></span>`;
    }
    if (k === "transformer") {
      return `<span class="mod-fuse-cart" style="border-color:var(--cp-link);">230V ➔ 24V</span>`;
    }
    if (k === "toroid_ct") {
      return `
        <span class="mod-lever" title="Sensore magnetico chiuso su cavo/sbarra">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="5.2" fill="none" stroke="var(--cp-success)" stroke-width="2"/>
            <circle cx="7" cy="7" r="1.8" fill="var(--cp-accent)"/>
          </svg>
          <span>Sensore</span>
        </span>
      `;
    }
    if (k === "busbar") {
      return `<span class="mod-lcd" style="border-color:var(--cp-border-strong); color:var(--cp-text);">══ L1·L2·L3·N ══</span>`;
    }
    if (k === "socket_lamp") {
      if (comp.id.startsWith("H")) {
        return `<span class="mod-lever"><span class="mod-lever-dot"></span><span>LED 24V</span></span>`;
      }
      return `<span class="mod-lever"><span>🔌 230V</span></span>`;
    }
    return `<span class="mod-lcd" style="border-color:var(--cp-border-strong); color:var(--cp-text-muted);">⋮⋮⋮ Morsetti ⋮⋮⋮</span>`;
  }

  function openPdfModal(dsId) {
    const d = DS_MAP.get(dsId);
    if (!d) return;
    const modal = document.getElementById("ppPdfModal");
    if (!modal) return;
    const relFile = d.file.replace(/^\.\//, "../");
    document.getElementById("ppModalTitle").textContent = `${d.brand} — ${d.family}`;
    document.getElementById("ppModalSub").textContent = d.keySpecs || "";
    const newTab = document.getElementById("ppModalNewTab");
    newTab.href = relFile;
    const vendor = document.getElementById("ppModalVendor");
    if (d.vendorUrl) {
      vendor.href = d.vendorUrl;
      vendor.style.display = "inline-flex";
    } else {
      vendor.style.display = "none";
    }
    document.getElementById("ppModalBody").innerHTML = `<iframe src="${esc(relFile)}#view=FitH" title="${esc(d.family)}"></iframe>`;
    modal.classList.add("open");
  }

  function ensureModalHtml() {
    if (document.getElementById("ppPdfModal")) return;
    const div = document.createElement("div");
    div.id = "ppPdfModal";
    div.className = "pp-modal-backdrop";
    div.setAttribute("role", "dialog");
    div.setAttribute("aria-modal", "true");
    div.innerHTML = `
      <div class="pp-modal">
        <div class="pp-modal-hdr">
          <div>
            <strong id="ppModalTitle" style="font-size:14.5px;">Scheda Tecnica PDF</strong>
            <div id="ppModalSub" class="pp-muted"></div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <a id="ppModalVendor" class="pp-btn" href="#" target="_blank" rel="noopener">🌐 Produttore</a>
            <a id="ppModalNewTab" class="pp-btn pp-btn-primary" href="#" target="_blank" rel="noopener">↗ Apri PDF</a>
            <button id="ppModalClose" class="pp-btn" type="button">✕ Chiudi</button>
          </div>
        </div>
        <div id="ppModalBody" class="pp-modal-body"></div>
      </div>
    `;
    document.body.appendChild(div);
    const close = () => {
      div.classList.remove("open");
      document.getElementById("ppModalBody").innerHTML = "";
    };
    document.getElementById("ppModalClose").addEventListener("click", close);
    div.addEventListener("click", (e) => {
      if (e.target === div) close();
    });
  }

  // =========================================================================
  // DEDICATED SINGLE PANEL PAGE RENDERER
  // =========================================================================
  function initSinglePanelPage(slug) {
    const panel = PANEL_BY_SLUG.get(slug);
    if (!panel) return;
    ensureModalHtml();

    const compMap = new Map(panel.components.map((c) => [c.id, c]));
    const urlComp = new URLSearchParams(window.location.search).get("comp");
    const state = {
      selectedId: (urlComp && compMap.has(urlComp)) ? urlComp : panel.components[0].id,
      filterBucket: "all",
      searchQuery: "",
      isEmergency: false
    };

    const idxInList = PF.panels.findIndex((p) => p.slug === slug);
    const prevP = PF.panels[(idxInList - 1 + PF.panels.length) % PF.panels.length];
    const nextP = PF.panels[(idxInList + 1) % PF.panels.length];

    const counts = {
      all: panel.components.length,
      breakers: panel.components.filter((c) => getFilterBucket(c.kind) === "breakers").length,
      fuses: panel.components.filter((c) => getFilterBucket(c.kind) === "fuses").length,
      controls: panel.components.filter((c) => getFilterBucket(c.kind) === "controls").length,
      meters_spd: panel.components.filter((c) => getFilterBucket(c.kind) === "meters_spd").length,
      terminals: panel.components.filter((c) => getFilterBucket(c.kind) === "terminals").length
    };

    const navTop = window.SE_NAV ? window.SE_NAV.peek() : null;
    let inheritedViewParam = "";
    if (navTop && navTop.url) {
      try {
        const prevView = new URL(navTop.url, window.location.href).searchParams.get("view");
        if (prevView && prevView !== "synoptic") {
          inheritedViewParam = `&view=${encodeURIComponent(prevView)}`;
        }
      } catch (_) { /* ignore */ }
    }

    const mapUrl = withTheme(`../index.html?plant=${encodeURIComponent(panel.plantId)}&select=${encodeURIComponent(panel.nodeId)}${inheritedViewParam}`);
    const internalUrl = withTheme(`../index.html?plant=${encodeURIComponent(panel.plantId)}&board=${encodeURIComponent(panel.nodeId)}${inheritedViewParam}`);
    const atlasUrl = withTheme("./index.html");
    const backBtnLabel = navTop ? `← Torna a: ${navTop.label}` : `← Torna a: Mappa ${panel.plantLabel}`;
    const backBtnTitle = navTop
      ? `Torna indietro di uno step a: ${navTop.label}`
      : `Torna alla mappa d'impianto (${panel.plantLabel})`;

    const isFlush = panel.enclosure.ipRating === "IP40";
    const isFire = Boolean(panel.enclosure.specialWarningPlate);

    function renderSlotButton(cid) {
      const c = compMap.get(cid);
      if (!c) return "";
      const modW = Math.min(10, Math.max(1, c.modules || 2));
      return `
        <button type="button" class="din-mod kind-${esc(c.kind)}" data-comp-id="${esc(c.id)}" data-mod="${modW}"
          title="${esc(c.id)} — ${esc(c.shortLabel)} (${esc(c.ratingBadge)})">
          <div class="mod-top">
            <span class="mod-tag">${esc(c.id)}</span>
            <span class="mod-kind-chip">${esc(KIND_SHORT[c.kind] || c.kind)}</span>
          </div>
          <div class="mod-visual" data-visual-for="${esc(c.id)}">
            ${renderModuleVisual(c, state.isEmergency)}
          </div>
          <div>
            <div class="mod-short">${esc(c.shortLabel)}</div>
            <div class="mod-rating">${esc(c.ratingBadge)}</div>
          </div>
        </button>
      `;
    }

    const leftBayHtml = panel.bays.leftBay ? `
      <div class="cabinet-side-bay">
        <div class="cabinet-bay-hdr">
          <div>${esc(panel.bays.leftBay.title)}</div>
          <div class="cabinet-bay-sub">${esc(panel.bays.leftBay.subtitle || "")}</div>
        </div>
        <div class="cabinet-side-slots">
          ${panel.bays.leftBay.slots.map(renderSlotButton).join("")}
        </div>
      </div>
    ` : "";

    const rightBayHtml = panel.bays.rightBay ? `
      <div class="cabinet-side-bay">
        <div class="cabinet-bay-hdr">
          <div>${esc(panel.bays.rightBay.title)}</div>
          <div class="cabinet-bay-sub">${esc(panel.bays.rightBay.subtitle || "")}</div>
        </div>
        <div class="cabinet-side-slots">
          ${panel.bays.rightBay.slots.map(renderSlotButton).join("")}
        </div>
      </div>
    ` : "";

    const mainRowsHtml = panel.bays.mainBay.rows.map((r) => {
      if (r.isReserve || !r.slots.length) {
        return `
          <div class="din-panel-row is-reserve">
            <div class="din-row-hdr">
              <span>⊕ ${esc(r.title)} — <em style="font-weight:400;">${esc(r.note || "Pannello cieco / Riserva")}</em></span>
              <span class="din-height-tag">H ${r.heightMm} mm · ⊕</span>
            </div>
          </div>
        `;
      }
      return `
        <div class="din-panel-row">
          <div class="din-row-hdr">
            <span>${esc(r.title)}</span>
            <span class="din-height-tag">H ${r.heightMm} mm</span>
          </div>
          <div class="din-rail-track">
            ${r.slots.map(renderSlotButton).join("")}
          </div>
        </div>
      `;
    }).join("");

    const upLinkHtml = panel.upstream.panelSlug
      ? `<a class="pp-btn" data-keep-theme href="${esc(withTheme(`./${panel.upstream.panelSlug}.html${panel.upstream.panelComp ? `?comp=${encodeURIComponent(panel.upstream.panelComp)}` : ""}`))}">🗄️ Apri pannello a monte (${esc(panel.upstream.panelSlug.toUpperCase())})</a>`
      : `<a class="pp-btn" data-keep-theme href="${esc(withTheme(`../index.html?plant=${encodeURIComponent(panel.upstream.mapPlantId)}&select=${encodeURIComponent(panel.upstream.mapNodeId)}`))}">📐 Vedi origine sulla Mappa</a>`;

    const downLinksHtml = panel.downstreamPanels.length
      ? panel.downstreamPanels.map((dp) => `
          <a class="pp-btn pp-btn-primary" style="padding:4px 10px; font-size:11.5px;" data-keep-theme
            href="${esc(withTheme(`./${dp.panelSlug}.html`))}" title="${esc(dp.label)}">
            ➡ ${esc(dp.code)} <span class="mono" style="opacity:0.85;">(da ${esc(dp.viaComp)})</span>
          </a>
        `).join("")
      : `<span class="pp-muted">Alimenta direttamente le utenze finali di campo (nessun sotto-quadro con fascicolo dedicato a valle).</span>`;

    const root = document.getElementById("panelPageRoot");
    root.innerHTML = `
      <header class="pp-topbar">
        <div class="pp-brand">
          <button id="ppBackBtn" type="button" class="pp-btn pp-btn-primary pp-back-btn" title="${esc(backBtnTitle)}">${esc(backBtnLabel)}</button>
          <div class="pp-brand-mark">🗄️</div>
          <div class="pp-brand-text">
            <h1>Pannello Fisico ${esc(panel.code)} — ${esc(panel.title)}</h1>
            <p>📍 ${esc(panel.location.room)} · ${esc(panel.location.floor)} · Carpenteria ${esc(panel.enclosure.dimensionsMm)} (${esc(panel.enclosure.ipRating)})</p>
          </div>
        </div>

        <div class="pp-actions">
          <a class="pp-btn" data-keep-theme href="${esc(withTheme(`./${prevP.slug}.html`))}" title="Pannello precedente: ${esc(prevP.code)}">◀ ${esc(prevP.code)}</a>
          <select id="ppQuickJump" class="pp-select" aria-label="Salta a un altro pannello fisico">
            ${PF.panels.map((p) => `
              <option value="${esc(p.slug)}" ${p.slug === slug ? "selected" : ""}>
                [${String(p.order).padStart(2, "0")}/18] ${esc(p.code)} — ${esc(p.location.room)}
              </option>
            `).join("")}
          </select>
          <a class="pp-btn" data-keep-theme href="${esc(withTheme(`./${nextP.slug}.html`))}" title="Pannello successivo: ${esc(nextP.code)}">${esc(nextP.code)} ▶</a>
          <a class="pp-btn" data-keep-theme href="${esc(withTheme(`../planimetrie/index.html?panel=${encodeURIComponent(slug)}`))}">🗺️ Planimetria</a>
          <a class="pp-btn" data-keep-theme href="${esc(atlasUrl)}">🗄️ Tutti i 18 Pannelli</a>
          <a class="pp-btn" data-keep-theme href="${esc(internalUrl)}">🔬 Schema Elettrico Interno</a>
          <a class="pp-btn" data-keep-theme href="${esc(mapUrl)}">📐 Mappa Impianto</a>
          <button id="ppThemeBtn" class="pp-btn" type="button">🌓 Tema</button>
        </div>
      </header>

      <main class="pp-container">
        ${isFire ? `<div class="pp-fire-plate">🚒 TARGA OBBLIGATORIA VVF SUL FRONTE QUADRO: &ldquo;${esc(panel.enclosure.specialWarningPlate)}&rdquo;</div>` : ""}

        <!-- 3-Column Context Strip: Where is it? | Physical Enclosure | Drill-down Connections -->
        <section class="pp-context-grid" aria-label="Ubicazione, carpenteria e collegamenti del pannello">
          <div class="pp-card">
            <div class="pp-card-kicker">
              <span>📍 Dove si trova nell'edificio</span>
              <span class="pp-pill">${esc(panel.plantLabel)}</span>
            </div>
            <h2 class="pp-loc-headline">${esc(panel.location.room)}</h2>
            <div style="font-size:13px; font-weight:600; margin-bottom:6px;">${esc(panel.location.floor)} · ${esc(panel.location.buildingZone)}</div>
            <div class="pp-muted">${esc(panel.location.whereHowToFind)}</div>
            <div style="margin-top:8px; font-size:12px;"><strong>Installazione:</strong> ${esc(panel.location.mounting)}</div>
            <div style="margin-top:10px;">
              <a id="ppOpenPlanimetriaCardBtn" class="pp-btn pp-btn-primary" data-keep-theme href="${esc(withTheme(`../planimetrie/index.html?panel=${encodeURIComponent(slug)}`))}">
                🗺️ Vedi posizione sulla Planimetria →
              </a>
            </div>
          </div>

          <div class="pp-card">
            <div class="pp-card-kicker">
              <span>🗄️ Carpenteria &amp; Dati di Targa</span>
              <span class="pp-pill mono">${esc(panel.enclosure.ipRating)} · ${esc(panel.enclosure.ral)}</span>
            </div>
            <div style="font-weight:700; font-size:13.5px;">${esc(panel.enclosure.tag)} — ${esc(panel.enclosure.brandModel)}</div>
            <div class="pp-muted" style="margin-top:2px;">${esc(panel.enclosure.doorType)}</div>
            <div class="pp-kv-grid">
              <div class="pp-kv"><div class="pp-kv-k">Dimensioni (H×L×P)</div><div class="pp-kv-v mono">${esc(panel.enclosure.dimensionsMm)}</div></div>
              <div class="pp-kv"><div class="pp-kv-k">Tensione &amp; Sistema</div><div class="pp-kv-v mono">${esc(panel.electricalSpecs.voltage.split("·")[0].trim())} (${esc(panel.electricalSpecs.earthingSystem)})</div></div>
              <div class="pp-kv"><div class="pp-kv-k">Corrente In / Icc</div><div class="pp-kv-v mono">${esc(panel.electricalSpecs.ratedCurrentIn)} · ${esc(panel.electricalSpecs.shortCircuitIcc)}</div></div>
              <div class="pp-kv"><div class="pp-kv-k">Ausiliari</div><div class="pp-kv-v">${esc(panel.electricalSpecs.auxVoltage)}</div></div>
            </div>
          </div>

          <div class="pp-card">
            <div class="pp-card-kicker">
              <span>🔗 Catena Elettrica &amp; Drill-Down</span>
              <span class="pp-pill mono">${panel.components.length} componenti</span>
            </div>
            <div class="pp-chain-row">
              <div class="pp-chain-box">
                <div style="font-weight:700; color:var(--cp-success); margin-bottom:2px;">📥 Alimentato a monte da:</div>
                <div style="margin-bottom:6px;"><strong>${esc(panel.upstream.label)}</strong><br/><span class="pp-muted">${esc(panel.upstream.detail)}</span></div>
                ${upLinkHtml}
              </div>
              <div class="pp-chain-box">
                <div style="font-weight:700; color:var(--cp-accent); margin-bottom:4px;">📤 Sotto-quadri alimentati a valle:</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">${downLinksHtml}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Filter Pills + Search + VVF Simulation -->
        <section class="pp-toolbar" aria-label="Filtri rapidi componenti e simulazione emergenza">
          <div class="pp-filter-group" id="ppFilterGroup">
            <button type="button" class="pp-filter-pill active" data-bucket="all">Tutti (${counts.all})</button>
            ${counts.breakers ? `<button type="button" class="pp-filter-pill" data-bucket="breakers">🔌 Interruttori — Cosa comandano (${counts.breakers})</button>` : ""}
            ${counts.fuses ? `<button type="button" class="pp-filter-pill" data-bucket="fuses">🛡️ Fusibili — Cosa proteggono (${counts.fuses})</button>` : ""}
            ${counts.controls ? `<button type="button" class="pp-filter-pill" data-bucket="controls">⚙️ Comandi, Relè, Orologi &amp; BMS (${counts.controls})</button>` : ""}
            ${counts.meters_spd ? `<button type="button" class="pp-filter-pill" data-bucket="meters_spd">📏 Misure, Toroidi &amp; SPD (${counts.meters_spd})</button>` : ""}
            ${counts.terminals ? `<button type="button" class="pp-filter-pill" data-bucket="terminals">🔗 Morsettiere &amp; Sbarre (${counts.terminals})</button>` : ""}
          </div>

          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <input id="ppLocalSearch" class="pp-input" type="search" placeholder="🔎 Cerca sigla o carico (es. Q1, F5, luce)..." />
            <div class="pp-seg" title="${esc(panel.vvfBehavior)}">
              <button type="button" class="pp-seg-btn active" data-vvf="normal">🟢 Normale</button>
              <button type="button" class="pp-seg-btn" data-vvf="emergency">🚨 Sgancio VVF</button>
            </div>
          </div>
        </section>

        <!-- Workspace: Physical Front Elevation + Sticky Component Detail Card -->
        <section class="pp-workspace">
          <div class="cabinet-stage">
            <div class="cabinet-ruler-top">
              <span><strong>📐 Disposizione Fisica Reale (Fronte Quadro)</strong> — ${esc(panel.bays.mainBay.title)}</span>
              <span class="mono">↔ L ${panel.enclosure.widthMm} mm × ↕ H ${panel.enclosure.heightMm} mm × ↗ P ${panel.enclosure.depthMm} mm</span>
            </div>

            <div class="cabinet-outer ${isFlush ? "is-flush-box" : ""} ${isFire ? "is-fire-box" : ""}">
              <div class="cabinet-nameplate">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="cabinet-nameplate-code">${esc(panel.code)}</span>
                  <strong style="font-size:13px;">${esc(panel.title)}</strong>
                </div>
                <span class="mono" style="font-size:11.5px; color:var(--cp-text-muted);">Clicca un qualsiasi elemento per vedere cosa comanda o protegge</span>
              </div>

              <div class="cabinet-columns">
                ${leftBayHtml}
                <div class="cabinet-main-bay">
                  ${mainRowsHtml}
                </div>
                ${rightBayHtml}
              </div>
            </div>

            <div style="margin-top:10px; padding:10px 12px; border-radius:10px; background:var(--cp-bg-elevated); border:1px solid var(--cp-border); font-size:12px;">
              <strong>🚒 Logica di Emergenza VVF su questo pannello:</strong> ${esc(panel.vvfBehavior)}
            </div>
          </div>

          <aside id="ppInspector" class="pp-inspector" aria-live="polite"></aside>
        </section>

        <!-- Full Filter-Synchronized Engineering Directory Table -->
        <section class="pp-table-card">
          <div class="pp-table-hdr">
            <div>
              <strong style="font-size:15px;">📋 Registro Completo dei Componenti Installati su ${esc(panel.code)}</strong>
              <div class="pp-muted">Ogni interruttore riporta esattamente quale linea/utenza comanda; ogni fusibile riporta quale circuito o apparato protegge.</div>
            </div>
            <span id="ppTableCounter" class="pp-pill mono"></span>
          </div>
          <div class="pp-table-wrap">
            <table class="pp-table">
              <thead>
                <tr>
                  <th style="width:86px;">Sigla</th>
                  <th style="width:185px;">Posizione Fisica</th>
                  <th style="width:240px;">Componente &amp; Costruttore</th>
                  <th style="width:155px;">Taratura / Calibro</th>
                  <th>Funzione Esplicita (Cosa Comanda / Cosa Protegge)</th>
                  <th style="width:170px;">Collegamenti</th>
                </tr>
              </thead>
              <tbody id="ppTableBody"></tbody>
            </table>
          </div>
        </section>
      </main>
    `;

    function matchesFilter(c) {
      if (state.filterBucket !== "all" && getFilterBucket(c.kind) !== state.filterBucket) return false;
      if (state.searchQuery) {
        const hay = `${c.id} ${c.shortLabel} ${c.ratingBadge} ${c.brandModel} ${c.whatItDoes} ${c.cable} ${c.bayLabel}`.toLowerCase();
        if (!hay.includes(state.searchQuery)) return false;
      }
      return true;
    }

    function renderSelectedInspector() {
      const c = compMap.get(state.selectedId) || panel.components[0];
      const relSet = new Set(c.relatedIds || []);
      const isFuse = c.kind === "fuse";
      const isCtrl = getFilterBucket(c.kind) === "controls" || getFilterBucket(c.kind) === "meters_spd";
      const ds = c.datasheetId ? DS_MAP.get(c.datasheetId) : null;
      const targetP = c.targetPanelSlug ? PANEL_BY_SLUG.get(c.targetPanelSlug) : null;

      let vvfBanner = "";
      if (state.isEmergency) {
        if (c.vvfState === "tripped") {
          vvfBanner = `<div style="margin-top:8px; padding:8px 10px; border-radius:8px; border:1px solid var(--cp-danger); color:var(--cp-danger); font-size:12px; font-weight:700;">🚨 STATO EMERGENZA VVF: DISALIMENTATO / APERTO per messa in sicurezza compartimento.</div>`;
        } else if (c.vvfState === "vital") {
          vvfBanner = `<div style="margin-top:8px; padding:8px 10px; border-radius:8px; border:1px solid var(--cp-success); color:var(--cp-success); font-size:12px; font-weight:700;">⚡ STATO EMERGENZA VVF: ATTIVO IN CONTINUITÀ DI SICUREZZA.</div>`;
        }
      }

      document.getElementById("ppInspector").innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap;">
          <span class="pp-insp-tag">${esc(c.id)}</span>
          <span class="pp-pill">${esc(KIND_LABELS[c.kind] || c.kind)}</span>
        </div>
        <h3 style="margin:10px 0 4px; font-size:16px;">${esc(c.shortLabel)}</h3>
        <div class="pp-muted">📍 Posizione nel quadro: <strong>${esc(c.bayLabel)}</strong></div>

        ${vvfBanner}

        <div class="pp-role-callout ${isFuse ? "is-fuse" : ""} ${isCtrl ? "is-ctrl" : ""}">
          <div class="pp-role-kicker">${isFuse ? "🛡️ " : "🔌 "}${esc(c.roleTitle)}</div>
          <div style="font-size:13px; color:var(--cp-text);">${esc(c.whatItDoes)}</div>
        </div>

        <div class="pp-kv-grid">
          <div class="pp-kv" style="grid-column: span 2;">
            <div class="pp-kv-k">Costruttore &amp; Modello As-Built</div>
            <div class="pp-kv-v">${esc(c.brandModel)}</div>
          </div>
          <div class="pp-kv">
            <div class="pp-kv-k">Taratura / Calibro</div>
            <div class="pp-kv-v mono">${esc(c.ratingBadge)}</div>
          </div>
          <div class="pp-kv">
            <div class="pp-kv-k">Ingombro Guida DIN</div>
            <div class="pp-kv-v mono">~${c.modules} mod.</div>
          </div>
          ${c.cable ? `
            <div class="pp-kv" style="grid-column: span 2;">
              <div class="pp-kv-k">Cavo / Collegamento</div>
              <div class="pp-kv-v mono">${esc(c.cable)}</div>
            </div>
          ` : ""}
        </div>

        ${relSet.size ? `
          <div style="margin-top:12px;">
            <div style="font-size:11.5px; font-weight:700; color:var(--cp-text-muted);">🔗 Componenti accoppiati funzionalmente in questo pannello:</div>
            <div class="pp-rel-chips">
              ${Array.from(relSet).map((rid) => {
                const rc = compMap.get(rid);
                return rc ? `<button type="button" class="pp-btn" style="padding:3px 8px; font-size:11.5px;" data-select-comp="${esc(rid)}"><strong class="mono">${esc(rid)}</strong> · ${esc(rc.shortLabel)}</button>` : "";
              }).join("")}
            </div>
          </div>
        ` : ""}

        <div style="display:flex; flex-direction:column; gap:7px; margin-top:14px; padding-top:12px; border-top:1px solid var(--cp-border);">
          <a class="pp-btn pp-btn-primary" style="justify-content:center;" data-keep-theme href="${esc(withTheme(`../planimetrie/index.html?panel=${encodeURIComponent(slug)}&comp=${encodeURIComponent(c.id)}`))}">
            🗺️ Dove si trova ${esc(c.id)} nell'edificio (Planimetria) →
          </a>
          ${targetP ? `
            <a class="pp-btn" style="justify-content:center; border-color:var(--cp-accent); color:var(--cp-accent);" data-keep-theme href="${esc(withTheme(`./${targetP.slug}.html`))}">
              🗄️ Apri Pannello Collegato: ${esc(targetP.code)} →
            </a>
          ` : ""}
          ${ds ? `
            <button type="button" class="pp-btn" style="justify-content:center;" data-open-ds="${esc(ds.id)}">
              📄 Scheda Tecnica PDF: ${esc(ds.brand)} (${esc(ds.family.slice(0, 32))})
            </button>
          ` : ""}
          <a class="pp-btn" style="justify-content:center;" data-keep-theme href="${esc(internalUrl)}">
            🔬 Vedi nello Schema Elettrico Interno di ${esc(panel.code)}
          </a>
        </div>
      `;

      document.getElementById("ppInspector").querySelectorAll("[data-select-comp]").forEach((b) => {
        b.addEventListener("click", () => selectComponent(b.dataset.selectComp, true));
      });
      document.getElementById("ppInspector").querySelectorAll("[data-open-ds]").forEach((b) => {
        b.addEventListener("click", () => openPdfModal(b.dataset.openDs));
      });
    }

    function renderCabinetStatesAndTable() {
      const selComp = compMap.get(state.selectedId) || panel.components[0];
      const relSet = new Set(selComp ? selComp.relatedIds : []);

      document.querySelectorAll(".din-mod[data-comp-id]").forEach((el) => {
        const cid = el.dataset.compId;
        const c = compMap.get(cid);
        if (!c) return;
        const vis = el.querySelector("[data-visual-for]");
        if (vis) vis.innerHTML = renderModuleVisual(c, state.isEmergency);

        el.classList.toggle("is-selected", cid === state.selectedId);
        el.classList.toggle("is-related", cid !== state.selectedId && relSet.has(cid));
        el.classList.toggle("is-dimmed", !matchesFilter(c));
        el.classList.toggle("vvf-tripped", state.isEmergency && c.vvfState === "tripped");
        el.classList.toggle("vvf-vital", state.isEmergency && c.vvfState === "vital");
      });

      const visibleComps = panel.components.filter(matchesFilter);
      document.getElementById("ppTableCounter").textContent = `${visibleComps.length} di ${panel.components.length} componenti mostrati`;

      const tbody = document.getElementById("ppTableBody");
      tbody.innerHTML = visibleComps.map((c) => {
        const isFuse = c.kind === "fuse";
        const targetP = c.targetPanelSlug ? PANEL_BY_SLUG.get(c.targetPanelSlug) : null;
        const ds = c.datasheetId ? DS_MAP.get(c.datasheetId) : null;
        return `
          <tr data-row-comp="${esc(c.id)}" class="${c.id === state.selectedId ? "is-selected" : ""}">
            <td><strong class="mono" style="font-size:13px;">${esc(c.id)}</strong></td>
            <td>
              <div style="font-weight:600;">${esc(c.bayLabel)}</div>
              <div class="pp-muted mono" style="font-size:11px;">~${c.modules} mod. DIN</div>
            </td>
            <td>
              <div style="font-weight:700;">${esc(KIND_LABELS[c.kind] || c.kind)}</div>
              <div class="pp-muted" style="font-size:11.5px;">${esc(c.brandModel)}</div>
            </td>
            <td class="mono" style="font-size:11.5px; font-weight:700;">${esc(c.ratingBadge)}</td>
            <td>
              <span class="role-badge ${isFuse ? "is-fuse" : ""}">${isFuse ? "🛡️ " : "🔌 "}${esc(c.roleTitle)}</span>
              <div><strong>${esc(c.shortLabel)}:</strong> ${esc(c.whatItDoes)}</div>
              ${c.cable ? `<div class="mono pp-muted" style="font-size:11px; margin-top:3px;">Cavo: ${esc(c.cable)}</div>` : ""}
            </td>
            <td>
              <div style="display:flex; flex-direction:column; gap:5px;">
                ${targetP ? `<a class="pp-btn pp-btn-primary" style="padding:3px 8px; font-size:11px;" data-keep-theme href="${esc(withTheme(`./${targetP.slug}.html`))}">🗄️ Pannello ${esc(targetP.code)} →</a>` : ""}
                ${ds ? `<button type="button" class="pp-btn" style="padding:3px 8px; font-size:11px;" data-tbl-ds="${esc(ds.id)}">📄 PDF ${esc(ds.brand)}</button>` : ""}
              </div>
            </td>
          </tr>
        `;
      }).join("");

      tbody.querySelectorAll("tr[data-row-comp]").forEach((tr) => {
        tr.addEventListener("click", (e) => {
          if (e.target.closest("a, button")) return;
          selectComponent(tr.dataset.rowComp, true);
        });
      });
      tbody.querySelectorAll("[data-tbl-ds]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openPdfModal(btn.dataset.tblDs);
        });
      });
    }

    function selectComponent(cid, scrollIntoCabinet) {
      if (!compMap.has(cid)) return;
      state.selectedId = cid;
      const u = new URL(window.location.href);
      u.searchParams.set("comp", cid);
      window.history.replaceState({}, "", u.toString());

      renderSelectedInspector();
      renderCabinetStatesAndTable();

      if (scrollIntoCabinet) {
        const modEl = document.querySelector(`.din-mod[data-comp-id="${CSS.escape(cid)}"]`);
        if (modEl) modEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }

    function currentPanelStepLabel() {
      return state.selectedId ? `Pannello ${panel.code} (${state.selectedId})` : `Pannello ${panel.code}`;
    }

    // Ensure initial URL encodes selected component so returning 1 step restores exact selection
    {
      const uInit = new URL(window.location.href);
      if (!uInit.searchParams.get("comp") && state.selectedId) {
        uInit.searchParams.set("comp", state.selectedId);
        window.history.replaceState({}, "", uInit.toString());
      }
    }

    // Wire events
    document.getElementById("ppBackBtn").addEventListener("click", () => {
      if (window.SE_NAV) {
        window.SE_NAV.goBack(mapUrl);
      } else {
        window.location.href = mapUrl;
      }
    });

    root.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-keep-theme]");
      if (!a) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (window.SE_NAV) {
        e.preventDefault();
        window.SE_NAV.navigateTo(href, currentPanelStepLabel());
      }
    });

    document.querySelectorAll(".din-mod[data-comp-id]").forEach((btn) => {
      btn.addEventListener("click", () => selectComponent(btn.dataset.compId, false));
    });

    document.getElementById("ppQuickJump").addEventListener("change", (e) => {
      const dest = withTheme(`./${e.target.value}.html`);
      if (window.SE_NAV) {
        window.SE_NAV.navigateTo(dest, currentPanelStepLabel());
      } else {
        window.location.href = dest;
      }
    });

    document.getElementById("ppThemeBtn").addEventListener("click", toggleTheme);

    document.querySelectorAll("#ppFilterGroup .pp-filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        state.filterBucket = pill.dataset.bucket;
        document.querySelectorAll("#ppFilterGroup .pp-filter-pill").forEach((p) => p.classList.toggle("active", p === pill));
        renderCabinetStatesAndTable();
      });
    });

    document.getElementById("ppLocalSearch").addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      renderCabinetStatesAndTable();
    });

    document.querySelectorAll("[data-vvf]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.isEmergency = btn.dataset.vvf === "emergency";
        document.querySelectorAll("[data-vvf]").forEach((b) => b.classList.toggle("active", b === btn));
        renderSelectedInspector();
        renderCabinetStatesAndTable();
      });
    });

    renderSelectedInspector();
    renderCabinetStatesAndTable();
    if (urlComp && compMap.has(urlComp)) {
      const modEl = document.querySelector(`.din-mod[data-comp-id="${CSS.escape(urlComp)}"]`);
      if (modEl) setTimeout(() => modEl.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    }
  }

  // =========================================================================
  // 18-PANEL ATLAS OVERVIEW PAGE (pannelli/index.html)
  // =========================================================================
  function initAtlasPage() {
    const root = document.getElementById("panelAtlasRoot");
    if (!root) return;

    const groups = [
      { key: "IMP-SSC", title: "1 · Servizi Supercondominiali, Autorimessa/Box & Sottocentrali Idrica/Pozzi", slugs: ["avssc", "qe-por", "qe-ssc", "qe-ct", "qe-ci", "qe-lp"] },
      { key: "IMP-FIRE", title: "2 · Alimentazione Preferenziale Antincendio (UNI EN 12845)", slugs: ["qe-pa"] },
      { key: "IMP-SCA", title: "3 · Torre / Scala A (Avanquadro, Quadro Generale, Palestra, Deposito Bici)", slugs: ["avsc-a", "qesc-a", "qe-pl", "qe-01bici"] },
      { key: "IMP-SCB", title: "4 · Torre / Scala B (Avanquadro, Quadro Generale, Sala Riunioni, Polifunzionale/Lavanderia)", slugs: ["avsc-b", "qesc-b", "qe-02riunioni", "qe-03polifunz"] },
      { key: "IMP-PDC", title: "5 · Centrale Pompe di Calore Geotermiche & Parallelo Fotovoltaico", slugs: ["avpc", "qe-pc"] },
      { key: "IMP-BMS", title: "6 · Regolazione Termofrigorifera & Supervisione BMS", slugs: ["qe-reg"] }
    ];

    function renderPanelCard(p) {
      const brkCnt = p.components.filter((c) => getFilterBucket(c.kind) === "breakers").length;
      const fusCnt = p.components.filter((c) => c.kind === "fuse").length;
      const auxCnt = p.components.length - brkCnt - fusCnt;

      // Proportional miniature cabinet silhouette (clamped nicely between 34..72px wide and 44..78px tall)
      const wPx = Math.round(Math.min(76, Math.max(32, p.enclosure.widthMm / 20)));
      const hPx = Math.round(Math.min(78, Math.max(40, p.enclosure.heightMm / 28)));
      const activeRows = Math.min(7, Math.max(1, p.bays.mainBay.rows.filter((r) => !r.isReserve).length));
      const railsHtml = Array.from({ length: activeRows }, () => `<div class="atlas-sil-rail"></div>`).join("");

      return `
        <article class="atlas-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px;">
              <span class="cabinet-nameplate-code">${esc(p.code)}</span>
              <span class="pp-pill mono">${esc(p.enclosure.ipRating)} · ${esc(p.enclosure.dimensionsMm)}</span>
            </div>
            <h3 style="margin:0 0 6px; font-size:15px;">${esc(p.title)}</h3>
            <div style="font-size:12.5px; font-weight:600; margin-bottom:8px;">📍 ${esc(p.location.room)} · <span class="pp-muted">${esc(p.location.floor)}</span></div>

            <div class="atlas-mini-cab">
              <div class="atlas-silhouette" style="width:${wPx}px; height:${hPx}px;" title="Proporzione fisica ${esc(p.enclosure.dimensionsMm)}">
                ${railsHtml}
              </div>
              <div style="font-size:12px;">
                <div><strong>${esc(p.enclosure.brandModel.split("(")[0].trim())}</strong></div>
                <div class="pp-muted" style="margin-top:2px;">In = ${esc(p.electricalSpecs.ratedCurrentIn)} · Icc = ${esc(p.electricalSpecs.shortCircuitIcc)}</div>
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
                  <span class="pp-pill" style="font-size:10.5px;">🔌 ${brkCnt} interruttori</span>
                  ${fusCnt ? `<span class="pp-pill" style="font-size:10.5px;">🛡️ ${fusCnt} fusibili</span>` : ""}
                  ${auxCnt ? `<span class="pp-pill" style="font-size:10.5px;">⚙️ ${auxCnt} altri</span>` : ""}
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <a class="pp-btn pp-btn-primary" style="flex:1; justify-content:center;" data-keep-theme href="${esc(withTheme(`./${p.slug}.html`))}">
              🗄️ Apri Pannello →
            </a>
            <a class="pp-btn" data-keep-theme href="${esc(withTheme(`../planimetrie/index.html?panel=${encodeURIComponent(p.slug)}`))}" title="Vedi dove si trova fisicamente sulla planimetria">
              🗺️ Mappa
            </a>
            <a class="pp-btn" data-keep-theme href="${esc(withTheme(`../index.html?plant=${encodeURIComponent(p.plantId)}&board=${encodeURIComponent(p.nodeId)}`))}" title="Apri lo schema elettrico funzionale interno">
              🔬 Schema
            </a>
          </div>
        </article>
      `;
    }

    const navTop = window.SE_NAV ? window.SE_NAV.peek() : null;
    const defaultMapsUrl = withTheme("../index.html");
    const atlasBackLabel = navTop ? `← Torna a: ${navTop.label}` : "← Torna alle Mappe d'Impianto";
    const atlasBackTitle = navTop
      ? `Torna indietro di uno step a: ${navTop.label}`
      : "Torna alla pagina principale dei diagrammi d'impianto";

    root.innerHTML = `
      <header class="pp-topbar">
        <div class="pp-brand">
          <button id="atlasBackBtn" type="button" class="pp-btn pp-btn-primary pp-back-btn" title="${esc(atlasBackTitle)}">${esc(atlasBackLabel)}</button>
          <div class="pp-brand-mark">🗄️</div>
          <div class="pp-brand-text">
            <h1>Atlante dei 18 Pannelli Fisici (Fronte Quadro As-Built)</h1>
            <p>Disposizione fisica reale di ${PF.meta.totalComponents} componenti (${PF.meta.totalBreakers} interruttori · ${PF.meta.totalFuses} fusibili) ricostruita integralmente con drill-down</p>
          </div>
        </div>
        <div class="pp-actions">
          <input id="atlasSearch" class="pp-input" style="min-width:300px;" type="search" placeholder="🔎 Cerca qualsiasi interruttore, fusibile o utenza nei 18 quadri..." />
          <a class="pp-btn" data-keep-theme href="${esc(withTheme("../planimetrie/index.html"))}">🗺️ Planimetrie</a>
          <a class="pp-btn" data-keep-theme href="${esc(defaultMapsUrl)}">📐 Mappe d'Impianto</a>
          <button id="atlasThemeBtn" class="pp-btn" type="button">🌓 Tema</button>
        </div>
      </header>

      <main class="pp-container">
        <div id="atlasSearchResults" style="display:none; margin-bottom:22px;"></div>

        ${groups.map((g) => `
          <section style="margin-bottom:26px;">
            <h2 style="font-size:15.5px; margin:0 0 4px; padding-bottom:6px; border-bottom:1px solid var(--cp-border);">${esc(g.title)}</h2>
            <div class="atlas-grid">
              ${g.slugs.map((s) => renderPanelCard(PANEL_BY_SLUG.get(s))).join("")}
            </div>
          </section>
        `).join("")}
      </main>
    `;

    document.getElementById("atlasBackBtn").addEventListener("click", () => {
      if (window.SE_NAV) {
        window.SE_NAV.goBack(defaultMapsUrl);
      } else {
        window.location.href = defaultMapsUrl;
      }
    });

    root.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-keep-theme]");
      if (!a) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (window.SE_NAV) {
        e.preventDefault();
        window.SE_NAV.navigateTo(href, "Atlante 18 Pannelli Fisici");
      }
    });

    document.getElementById("atlasThemeBtn").addEventListener("click", toggleTheme);

    const sInput = document.getElementById("atlasSearch");
    const sBox = document.getElementById("atlasSearchResults");
    sInput.addEventListener("input", () => {
      const q = sInput.value.trim().toLowerCase();
      if (q.length < 2) {
        sBox.style.display = "none";
        sBox.innerHTML = "";
        return;
      }
      const hits = [];
      PF.panels.forEach((p) => {
        p.components.forEach((c) => {
          const hay = `${p.code} ${p.title} ${p.location.room} ${c.id} ${c.shortLabel} ${c.ratingBadge} ${c.brandModel} ${c.whatItDoes}`.toLowerCase();
          if (hay.includes(q)) hits.push({ p, c });
        });
      });

      sBox.style.display = "block";
      sBox.innerHTML = `
        <div class="pp-table-card">
          <div class="pp-table-hdr">
            <strong>🔎 Risultati ricerca nei 18 Pannelli Fisici per &ldquo;${esc(sInput.value)}&rdquo; (${hits.length} componenti trovati)</strong>
          </div>
          <div class="pp-table-wrap">
            <table class="pp-table">
              <thead>
                <tr>
                  <th>Pannello &amp; Locale</th>
                  <th>Componente</th>
                  <th>Taratura</th>
                  <th>Cosa Comanda / Cosa Protegge</th>
                  <th>Vai al Pannello</th>
                </tr>
              </thead>
              <tbody>
                ${hits.slice(0, 40).map(({ p, c }) => `
                  <tr>
                    <td><strong class="mono">${esc(p.code)}</strong><div class="pp-muted" style="font-size:11px;">${esc(p.location.room)}</div></td>
                    <td><strong class="mono">${esc(c.id)}</strong> · ${esc(c.shortLabel)}<div class="pp-muted" style="font-size:11px;">${esc(c.bayLabel)}</div></td>
                    <td class="mono" style="font-size:11.5px;">${esc(c.ratingBadge)}</td>
                    <td><strong>${esc(c.roleTitle)}:</strong> ${esc(c.whatItDoes)}</td>
                    <td><a class="pp-btn pp-btn-primary" style="padding:4px 9px; font-size:11.5px;" data-keep-theme href="${esc(withTheme(`./${p.slug}.html?comp=${encodeURIComponent(c.id)}`))}">🗄️ Apri su ${esc(p.code)} →</a></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const slug = document.body.getAttribute("data-panel-slug");
    if (slug) {
      initSinglePanelPage(slug);
    } else if (document.body.getAttribute("data-panel-atlas") === "true") {
      initAtlasPage();
    }
  });
})();
