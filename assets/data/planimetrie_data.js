/* ==========================================================================
   Scratch-Regenerated Architectural Floor Plans & Switchboard Physical Atlas
   Reconstructed from As-Built layouts PL.01–PL.12 (zero PDF cutouts/crops,
   100% anonymized, vector geometry + 1:50 technical room zooms).
   ========================================================================== */
window.PLANIMETRIE_DATA = {
  floors: [
    {
      id: "TERRA",
      shortTitle: "Piano Terra (0,0 m)",
      fullTitle: "Piano Terra — Ingressi, Portineria, Locale Contatori & Lotizzazione",
      plRef: "Rif. Tavole PL.05 · PL.07 · PL.11 · PL.12",
      elevation: "Quota 0,00 m",
      summary: "Accesso carraio e pedonale sul lato Sud-Est con Portineria, Varco Rampa Autorimessa (pulsanti VVF), Locale Contatori Principale Retrocabina (4 POD + 4 Avanquadri + QE.PA) e Modulo Antincendio esterno.",
      viewBox: [0, 0, 1000, 600],
      zones: [
        { x: 24, y: 20, w: 952, h: 560, kind: "lot", label: "PERIMETRO COMPLESSO & GIARDINO CONDOMINIALE" },
        { x: 60, y: 46, w: 470, h: 240, kind: "garden", label: "AREA VERDE NORD-OVEST" },
        { x: 118, y: 84, w: 330, h: 162, kind: "building", label: "TORRE B — PIANO TERRA", sub: "Ingresso Pedonale B · Cantine P.T." },
        { x: 224, y: 124, w: 114, h: 72, kind: "core", label: "Scala / Asc. B" },
        { x: 356, y: 298, w: 392, h: 246, kind: "garden", label: "GIARDINO CENTRALE & PERCORSI PEDONALI" },
        { x: 404, y: 316, w: 286, h: 170, kind: "building", label: "TORRE A — PIANO TERRA", sub: "Ingresso Pedonale A · Cantine P.T." },
        { x: 500, y: 354, w: 108, h: 72, kind: "core", label: "Scala / Asc. A" },
        { x: 846, y: 74, w: 96, h: 330, kind: "ramp", label: "RAMPA CARRAIA", sub: "Discesa verso Piani -1 / -2" },
        { x: 556, y: 498, w: 150, h: 68, kind: "tech_room", label: "PORTINERIA", sub: "Guardiola & Servizi" },
        { x: 708, y: 468, w: 116, h: 98, kind: "driveway", label: "VARCO CARRAIO", sub: "Ingresso Autorimessa" },
        { x: 826, y: 498, w: 136, h: 68, kind: "tech_room_accent", label: "LOCALE CONTATORI", sub: "4 POD + 4 Avanquadri" },
        { x: 834, y: 422, w: 120, h: 64, kind: "fire_room", label: "MODULO VVF ESTERNO", sub: "Pompa Antincendio 15kW" }
      ],
      paths: [
        {
          d: "M 850 510 L 790 510 L 790 430 L 580 430 L 580 390 M 580 430 L 310 430 L 310 196",
          kind: "conduit",
          label: "Cavidotto interrato Ø160/Ø125 verso Piani -1 / -2 (QE.SSC, QE.PC, QESC-A, QESC-B)"
        },
        {
          d: "M 48 36 L 948 36 L 948 568 L 48 568 Z",
          kind: "earth_ring",
          label: "Anello disperdente perimetrale Cu 50 mm² + 14 picchetti"
        }
      ],
      labels: [
        { x: 685, y: 589, text: "▲ ACCESSO DA STRADA PUBBLICA (CANCELLO CARRAIO & PEDONALE)" }
      ]
    },
    {
      id: "RIALZATO",
      shortTitle: "Piano Rialzato (+2,4 m)",
      fullTitle: "Piano Rialzato Torri A & B — Palestra, Deposito Bici, Sala Riunioni & Spazio Polifunzionale",
      plRef: "Rif. Tavole PL.06 (Torre A) · PL.08 (Torre B)",
      elevation: "Quota +2,40 m",
      summary: "Spazi comuni condominiali ai piani rialzati delle due torri, ciascuno servito dal proprio centralino dedicato a incasso vicino alla porta d'ingresso dal pianerottolo.",
      viewBox: [0, 0, 1000, 560],
      zones: [
        { x: 30, y: 34, w: 446, h: 492, kind: "building", label: "TORRE A — PIANO RIALZATO (PL.06)", sub: "Accesso da Ingresso Torre A (rampa 13 alzate)" },
        { x: 52, y: 84, w: 164, h: 196, kind: "tech_room", label: "DEPOSITO BICICLETTE", sub: "+ Spogliatoio Personale" },
        { x: 226, y: 186, w: 102, h: 146, kind: "core", label: "SCALA A & 2 ASC.", sub: "Pianerottolo + Cavedio" },
        { x: 286, y: 84, w: 170, h: 256, kind: "tech_room_accent", label: "PALESTRA CONDOMINIALE", sub: "+ Spogliatoi Uomini/Donne" },
        { x: 52, y: 302, w: 260, h: 198, kind: "muted_area", label: "Alloggio Piano Rialzato A", sub: "(Proprietà privata)" },

        { x: 524, y: 34, w: 446, h: 492, kind: "building", label: "TORRE B — PIANO RIALZATO (PL.08)", sub: "Accesso da Ingresso Torre B (rampa interna)" },
        { x: 546, y: 84, w: 168, h: 224, kind: "tech_room", label: "SALA RIUNIONI", sub: "Locale ad uso condominiale" },
        { x: 724, y: 186, w: 102, h: 146, kind: "core", label: "SCALA B & 2 ASC.", sub: "Filtro Aerato + Cavedio" },
        { x: 836, y: 84, w: 114, h: 312, kind: "tech_room_accent", label: "SPAZIO POLIFUNZIONALE", sub: "Sala ricreativa & Lavanderia" },
        { x: 546, y: 346, w: 274, h: 154, kind: "muted_area", label: "Alloggio Piano Rialzato B", sub: "(Proprietà privata)" }
      ],
      paths: [],
      labels: []
    },
    {
      id: "M1",
      shortTitle: "Piano -1 (-3,2 m)",
      fullTitle: "Piano Primo Interrato (-1) — Autorimessa, Locale Contatori A (con QE.SSC!), Contatori B & Centrale Idrica",
      plRef: "Rif. Tavole PL.02 · PL.04 (Stralcio 1:50 Locali Tecnici)",
      elevation: "Quota -3,20 m",
      summary: "Primo livello autorimessa (Box 1.1–77.1). Sotto Torre A ospita sia la Centrale Idrica (QE.CI) sia il Locale Contatori Scala A dove si trovano QESC-A, l'armadio generale QE.SSC (con fusibili F3/F14 24V!) e i due UPS 1 e 2. Sotto Torre B ospita il Locale Contatori Scala B (QESC-B).",
      viewBox: [0, 0, 1000, 620],
      zones: [
        { x: 34, y: 30, w: 830, h: 276, kind: "garage", label: "AUTORIMESSA PIANO -1 · ALA NORD-OVEST (Box 1.1 ÷ 42.1)" },
        { x: 396, y: 270, w: 468, h: 318, kind: "garage", label: "AUTORIMESSA PIANO -1 · ALA SUD-EST (Box 43.1 ÷ 77.1)" },
        { x: 866, y: 84, w: 98, h: 356, kind: "ramp", label: "RAMPA (-1)", sub: "Da P.Terra / Verso -2" },

        { x: 54, y: 46, w: 720, h: 42, kind: "box_strip", label: "Schiera Box Nord (Box 14.1 ÷ 26.1)" },
        { x: 54, y: 248, w: 326, h: 44, kind: "box_strip", label: "Schiera Box Ovest (Box 46.1 ÷ 58.1)" },
        { x: 414, y: 528, w: 162, h: 46, kind: "box_strip", label: "Box 67.1 · 66.1" },
        { x: 668, y: 528, w: 178, h: 46, kind: "box_strip", label: "Box 65.1 · 64.1 · 63.1" },

        { x: 158, y: 112, w: 96, h: 112, kind: "core", label: "SCALA B & 2 ASC.", sub: "Filtro + Cavedio B" },
        { x: 262, y: 112, w: 146, h: 52, kind: "muted_area", label: "Immondezzaio B" },
        { x: 262, y: 168, w: 146, h: 58, kind: "tech_room_accent", label: "LOCALE CONTATORI B", sub: "QESC-B · IRA B · Contat. B" },

        { x: 472, y: 350, w: 148, h: 122, kind: "tech_room", label: "CENTRALE IDRICA", sub: "QE.CI · Autoclavi GP1/GP2" },
        { x: 626, y: 350, w: 96, h: 122, kind: "core", label: "2 ASC. & SCALA A", sub: "Cavedio + Filtro A" },
        { x: 728, y: 334, w: 118, h: 152, kind: "muted_area", label: "Cantine Torre A", sub: "C36 ÷ C45 + Immond. A" },
        { x: 580, y: 492, w: 84, h: 82, kind: "tech_room_accent", label: "LOC. CONTATORI A", sub: "QE.SSC + QESC-A + UPS 1/2" }
      ],
      paths: [],
      labels: [
        { x: 500, y: 22, text: "PIANTA GENERALE PRIMO INTERRATO (-1) — SCALA A (SUD-EST) & SCALA B (NORD-OVEST)" }
      ]
    },
    {
      id: "M2",
      shortTitle: "Piano -2 (-6,4 m)",
      fullTitle: "Piano Secondo Interrato (-2) — Autorimessa, Centrale Tecnologica (QE.CT, QE.PC, QE-REG) & Locale Pompe (QE.LP)",
      plRef: "Rif. Tavole PL.01 · PL.03 (Stralcio 1:50 Centrali)",
      elevation: "Quota -6,40 m",
      summary: "Secondo livello autorimessa (Box 1.2–75.2). Sotto Torre A ospita la grande Centrale Tecnologica climatizzazione con i 3 armadi QE.CT, QE-REG e QE.PC (parallelo FV). Sotto Torre B ospita il Locale Pompe di falda con QE.LP.",
      viewBox: [0, 0, 1000, 620],
      zones: [
        { x: 34, y: 30, w: 830, h: 276, kind: "garage", label: "AUTORIMESSA PIANO -2 · ALA NORD-OVEST (Box 1.2 ÷ 42.2)" },
        { x: 396, y: 270, w: 468, h: 318, kind: "garage", label: "AUTORIMESSA PIANO -2 · ALA SUD-EST (Box 43.2 ÷ 75.2)" },
        { x: 866, y: 124, w: 98, h: 276, kind: "ramp", label: "ARRIVO RAMPA (-2)", sub: "Fine discesa carraia" },

        { x: 54, y: 46, w: 720, h: 42, kind: "box_strip", label: "Schiera Box Nord (Box 14.2 ÷ 26.2)" },
        { x: 414, y: 528, w: 432, h: 46, kind: "box_strip", label: "Schiera Box Sud (Box 62.2 ÷ 74.2)" },

        { x: 158, y: 112, w: 96, h: 118, kind: "core", label: "SCALA B & 2 ASC.", sub: "Filtro + Cavedio B" },
        { x: 262, y: 112, w: 156, h: 52, kind: "muted_area", label: "Cantine Torre B (C122–C127)" },
        { x: 262, y: 168, w: 156, h: 62, kind: "tech_room_accent", label: "LOCALE POMPE", sub: "QE.LP · Pozzi Falda P.10/P.11" },

        { x: 446, y: 326, w: 188, h: 178, kind: "tech_room_accent", label: "CENTRALE TECNOLOGICA", sub: "QE.CT · QE-REG · QE.PC · 3× PDC" },
        { x: 640, y: 358, w: 92, h: 138, kind: "core", label: "2 ASC. & SCALA A", sub: "Cavedio + Filtro A" },
        { x: 738, y: 326, w: 112, h: 178, kind: "muted_area", label: "Cantine Torre A", sub: "C46 ÷ C64" }
      ],
      paths: [],
      labels: [
        { x: 500, y: 22, text: "PIANTA GENERALE SECONDO INTERRATO (-2) — CENTRALE TECNOLOGICA (A) & LOCALE POMPE FALDA (B)" }
      ]
    },
    {
      id: "PIANI_ROOF",
      shortTitle: "Piani 1°–14° & Tetto",
      fullTitle: "Piani Tipo Residenziali (1° ÷ 14°) & Coperture Tecniche Solari (+48 m)",
      plRef: "Rif. Tavole PL.09 (Torre A) · PL.10 (Torre B) · Schemi QEP",
      elevation: "Quote +5,5 m ÷ +48,0 m",
      summary: "Ad ogni piano delle due torri, nella nicchia Cavedio Impianti sul pianerottolo ascensori, trovano posto il centralino QEP di piano e i collettori M-Bus. In copertura (+48 m) sono installati i 2 campi fotovoltaici, le UTA e i macchinari ascensori.",
      viewBox: [0, 0, 1000, 540],
      zones: [
        { x: 32, y: 36, w: 446, h: 468, kind: "building", label: "PIANTA TIPO PIANO 1° ÷ 14° (TORRE A / TORRE B)", sub: "Schema identico su tutti i 14 livelli abitativi" },
        { x: 56, y: 88, w: 146, h: 386, kind: "muted_area", label: "Alloggi Lato Ovest", sub: "QDSA + STOA fibra interni" },
        { x: 308, y: 88, w: 146, h: 386, kind: "muted_area", label: "Alloggi Lato Est", sub: "QDSA + STOA fibra interni" },
        { x: 208, y: 120, w: 94, h: 112, kind: "core", label: "VANO SCALA", sub: "Filtro Aerato REI" },
        { x: 208, y: 238, w: 94, h: 96, kind: "tech_room", label: "PIANEROTTOLO", sub: "+ 2 Ascensori" },
        { x: 208, y: 340, w: 94, h: 78, kind: "tech_room_accent", label: "CAVEDIO IMPIANTI", sub: "Nicchia QEP + M-Bus" },

        { x: 522, y: 36, w: 446, h: 468, kind: "building", label: "COPERTURE TECNICHE TORRI A & B (+48,0 m)", sub: " Lastrico solare tecnico e vani macchine" },
        { x: 548, y: 92, w: 188, h: 172, kind: "tech_room_accent", label: "TETTO TORRE A", sub: "Campo FV A + UTA A + Asc. A" },
        { x: 754, y: 92, w: 188, h: 172, kind: "tech_room_accent", label: "TETTO TORRE B", sub: "Campo FV B + UTA B + Asc. B" },
        { x: 548, y: 288, w: 394, h: 184, kind: "tech_room", label: " SOTTOTETTO / LOCALE TECNICO SOMMITALE", sub: "Inverter FV (discesa a QE.PC -2) + Antenne TV/SAT & Centrale Ottica STOM" }
      ],
      paths: [],
      labels: []
    }
  ],

  // 1:50 Detailed Room Interior Zooms (matching PL.11, PL.04, PL.03)
  roomZooms: {
    ZOOM_PT_INGRESSO: {
      title: "🔍 Stralcio 1:50 — Portineria, Varco VVF & Locale Contatori Principale (PL.11 / PL.12.1)",
      subtitle: "Disposizione interna sulle pareti dei tre ambienti d'ingresso al Piano Terra",
      viewBox: [0, 0, 860, 290],
      rooms: [
        { x: 18, y: 78, w: 266, h: 188, kind: "tech_room", label: "PORTINERIA (Guardiola)" },
        { x: 26, y: 88, w: 86, h: 168, kind: "muted_area", label: "Spogliatoio / WC / Rack FTTH" },
        { x: 294, y: 58, w: 206, h: 208, kind: "driveway", label: "INGRESSO AUTORIMESSA (Varco)" },
        { x: 510, y: 118, w: 332, h: 148, kind: "tech_room_accent", label: "LOCALE CONTATORI PRINCIPALE (Retrocabina)" },
        { x: 548, y: 20, w: 256, h: 86, kind: "fire_room", label: "MODULO ANTINCENDIO ESTERNO PREFABBRICATO" }
      ],
      fixtures: [
        { x: 155, y: 162, w: 66, h: 36, label: "Banco Portiere" },
        { x: 320, y: 242, w: 154, h: 14, label: "Cancello Carraio Automatico" }
      ],
      pins: [
        { markerId: "MK-FTTH-CSOE", x: 68, y: 126, label: "CSOE Fibra" },
        { markerId: "MK-QEPOR", x: 176, y: 98, label: "QE-POR (Incasso parete Nord)" },
        { markerId: "MK-ALLARMI-PA", x: 264, y: 196, label: "Pannello Allarmi PA" },
        { markerId: "MK-SGANCI-VVF", x: 482, y: 92, label: "4× Pulsanti VVF" },
        { markerId: "MK-AVPC", x: 558, y: 150, label: "POD + AVPC" },
        { markerId: "MK-AVSCA", x: 634, y: 150, label: "POD + AVSC-A" },
        { markerId: "MK-AVSCB", x: 710, y: 150, label: "POD + AVSC-B" },
        { markerId: "MK-AVSSC", x: 792, y: 150, label: "POD + RIP + AVSSC" },
        { markerId: "MK-QEPA", x: 792, y: 218, label: "QE.PA (VVF)" },
        { markerId: "MK-POMPA-VVF", x: 676, y: 64, label: "Motopompa VVF 15kW" }
      ]
    },

    ZOOM_M1_TORREA: {
      title: "🔍 Stralcio 1:50 — Piano -1 Torre A: Locale Contatori A (QE.SSC + QESC-A + UPS) & Centrale Idrica (PL.04)",
      subtitle: "Posizione esatta sulle pareti: nota QE.SSC sulla parete sinistra del Locale Contatori A, tra Box 66.1 e Box 64.1",
      viewBox: [0, 0, 860, 320],
      rooms: [
        { x: 20, y: 24, w: 280, h: 256, kind: "tech_room", label: "CENTRALE IDRICA SANITARIA (-1)" },
        { x: 308, y: 24, w: 108, h: 256, kind: "core", label: "CAVEDIO & 2 ASC. A" },
        { x: 424, y: 24, w: 72, h: 256, kind: "driveway", label: "CORRIDOIO / FILTRO" },
        { x: 506, y: 34, w: 76, h: 86, kind: "box_strip", label: "Box 66.1" },
        { x: 768, y: 34, w: 74, h: 86, kind: "box_strip", label: "Box 64.1" },
        { x: 588, y: 24, w: 174, h: 266, kind: "tech_room_accent", label: "LOCALE CONTATORI SCALA A (-1)" }
      ],
      fixtures: [
        { x: 36, y: 90, w: 68, h: 98, label: "Gruppi GP1 + GP2" },
        { x: 96, y: 228, w: 154, h: 36, label: "Pre-autoclavi 01 & 02" },
        { x: 724, y: 128, w: 30, h: 122, label: "Contat. Alloggi A" }
      ],
      pins: [
        { markerId: "MK-QECI", x: 244, y: 54, label: "QE.CI (ingresso DX)" },
        { markerId: "MK-QESCA", x: 618, y: 98, label: "QESC-A (parete SX)" },
        { markerId: "MK-QESSC", x: 618, y: 162, label: "QE.SSC + Sez. Q6 (parete SX)" },
        { markerId: "MK-UPS1", x: 706, y: 56, label: "UPS 1 (Portoni EI)" },
        { markerId: "MK-UPS2", x: 706, y: 98, label: "UPS 2 (Sgancio 24V)" },
        { markerId: "MK-IRA-A", x: 642, y: 258, label: "Centrale IRA A" }
      ]
    },

    ZOOM_M1_TORREB: {
      title: "🔍 Stralcio 1:50 — Piano -1 Torre B: Locale Contatori Scala B (PL.04)",
      subtitle: "Adiacente al Vano Ascensori Torre B e al Locale Immondezzaio B, di fronte al Box 27.1",
      viewBox: [0, 0, 860, 270],
      rooms: [
        { x: 24, y: 24, w: 130, h: 222, kind: "core", label: "VANO SCALA B" },
        { x: 162, y: 24, w: 140, h: 222, kind: "core", label: "FILTRO & 2 ASC. B" },
        { x: 310, y: 24, w: 68, h: 222, kind: "driveway", label: "DISIMPEGNO" },
        { x: 386, y: 24, w: 356, h: 92, kind: "muted_area", label: "LOCALE IMMONDEZZAIO B" },
        { x: 386, y: 124, w: 356, h: 122, kind: "tech_room_accent", label: "LOCALE CONTATORI SCALA B (-1)" },
        { x: 752, y: 84, w: 86, h: 110, kind: "box_strip", label: "Box 27.1" }
      ],
      fixtures: [
        { x: 688, y: 138, w: 42, h: 94, label: "Contat. Alloggi B" }
      ],
      pins: [
        { markerId: "MK-QESCB", x: 518, y: 218, label: "QESC-B (parete Sud)" },
        { markerId: "MK-IRA-B", x: 416, y: 218, label: "Centrale IRA B" }
      ]
    },

    ZOOM_M2_CENTRALI: {
      title: "🔍 Stralcio 1:50 — Piano -2: Centrale Tecnologica (Torre A) & Locale Pompe Falda (Torre B) (PL.03)",
      subtitle: "Posizione interna sulle pareti dei 4 grandi armadi tecnologici al Piano Secondo Interrato",
      viewBox: [0, 0, 860, 310],
      rooms: [
        { x: 20, y: 24, w: 336, h: 262, kind: "tech_room_accent", label: "LOCALE POMPE FALDA (-2 · Sotto Torre B)" },
        { x: 388, y: 24, w: 452, h: 262, kind: "tech_room_accent", label: "CENTRALE TECNOLOGICA (-2 · Sotto Torre A)" }
      ],
      fixtures: [
        { x: 138, y: 68, w: 188, h: 44, label: "Filtri a Calza 01-02 & Ciclonico (Pozzi P.10/P.11)" },
        { x: 264, y: 226, w: 74, h: 38, label: "Pozzetto PS4" },
        { x: 518, y: 128, w: 214, h: 92, label: "3× Pompe di Calore (PC 2B · PC 1 · PC 2A)" },
        { x: 406, y: 98, w: 94, h: 88, label: "16 Pompe P.01–P.09" }
      ],
      pins: [
        { markerId: "MK-QELP", x: 64, y: 138, label: "QE.LP + CBX1 (parete Ovest ingresso)" },
        { markerId: "MK-QEREG", x: 676, y: 54, label: "QE-REG (BMS Cylon)" },
        { markerId: "MK-QECT", x: 774, y: 54, label: "QE.CT (parete Nord porta)" },
        { markerId: "MK-QEPC", x: 444, y: 232, label: "QE.PC (800A + FV Q5)" }
      ]
    }
  },

  // Physical Switchboard & Equipment Markers across all 5 Floors
  markers: [
    // ==================== PIANO TERRA ====================
    {
      id: "MK-QEPOR",
      code: "QE-POR",
      title: "Quadro Elettrico Locale Portineria",
      floorId: "TERRA",
      x: 616,
      y: 516,
      kind: "panel",
      panelSlug: "qe-por",
      nodeId: "QEPOR",
      plantId: "IMP-SSC",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Portineria (Guardiola Ingresso)",
      wallSpot: "Incassato sulla parete nord del locale centrale della Portineria (PL.11).",
      howToReach: "Entrando dal varco pedonale principale al Piano Terra, accedi alla guardiola di Portineria sulla sinistra prima della rampa box: il centralino 36 moduli con portella bianca è incassato sulla parete nord."
    },
    {
      id: "MK-FTTH-CSOE",
      code: "CSOE / FTTH",
      title: "Centro Servizi Ottico Edificio & Rack Dati",
      floorId: "TERRA",
      x: 574,
      y: 544,
      kind: "equip",
      panelSlug: null,
      nodeId: "FTTH-CSOE",
      plantId: "IMP-TLC",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Tecnico / Retro Portineria",
      wallSpot: "Vano tecnico sul lato sinistro del blocco Portineria.",
      howToReach: "Piano Terra, lato ovest del blocco Portineria: ospita i ROE fibra ottica degli operatori e le apparecchiature head-end."
    },
    {
      id: "MK-ALLARMI-PA",
      code: "ALL. POMPA VVF",
      title: "Pannello Ripetizione Allarmi Pompa Antincendio",
      floorId: "TERRA",
      x: 688,
      y: 546,
      kind: "safety",
      panelSlug: null,
      nodeId: "IRA-CENTRALI",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Portineria (lato vetrata varco)",
      wallSpot: "Parete est della Portineria affacciata sull'Ingresso Autorimessa (PL.11).",
      howToReach: "Dentro la guardiola di Portineria al Piano Terra, sulla parete destra accanto alla vetrata di controllo del varco carraio."
    },
    {
      id: "MK-SGANCI-VVF",
      code: "PULSANTI VVF",
      title: "Postazione Pulsanti di Sgancio Emergenza VVF (Autorimessa, Scala A, Scala B, FV)",
      floorId: "TERRA",
      x: 804,
      y: 484,
      kind: "safety",
      panelSlug: null,
      nodeId: "SGANCI-VVF",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Varco Ingresso Autorimessa (Esterno presidiato)",
      wallSpot: "Pilastro / parete destra appena oltre il cancello carraio, prima dell'imbocco della rampa (PL.11 e PL.12.1).",
      howToReach: "Al Piano Terra, varcato il cancello carraio tra Portineria e Locale Contatori, trovi sulla parete destra in custodie rosse IP55 a rottura vetro tutti i pulsanti selettivi di sgancio emergenza VVF."
    },
    {
      id: "MK-AVPC",
      code: "AVPC + POD 160kW",
      title: "Contatore & Avanquadro Pompe di Calore (AVPC — 630A)",
      floorId: "TERRA",
      x: 844,
      y: 516,
      kind: "panel",
      panelSlug: "avpc",
      nodeId: "AVPC",
      plantId: "IMP-PDC",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Contatori Principale (Retrocabina)",
      wallSpot: "Parete nord, 1ª postazione a sinistra entrando nel Locale Contatori Principale (PL.11 / PL.12.1).",
      howToReach: "Piano Terra, a destra del varco carraio Ingresso Autorimessa: entra nel Locale Contatori Principale; AVPC (cassa ABB Gemini 630A con relè Dossena DER1 e fusibile F1) è il primo quadro a sinistra sulla parete nord, sotto il contatore da 160 kW."
    },
    {
      id: "MK-AVSCA",
      code: "AVSC-A + POD A",
      title: "Contatore & Avanquadro Servizi Scala A (AVSC-A — 160A)",
      floorId: "TERRA",
      x: 878,
      y: 516,
      kind: "panel",
      panelSlug: "avsc-a",
      nodeId: "AVSCA",
      plantId: "IMP-SCA",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Contatori Principale (Retrocabina)",
      wallSpot: "Parete nord, 2ª postazione da sinistra accanto ad AVPC (PL.11).",
      howToReach: "Piano Terra, dentro il Locale Contatori Principale a destra del varco carraio: seconda postazione sulla parete di fronte, abbinata al contatore da 50 kW della Torre A."
    },
    {
      id: "MK-AVSCB",
      code: "AVSC-B + POD B",
      title: "Contatore & Avanquadro Servizi Scala B (AVSC-B — 160A)",
      floorId: "TERRA",
      x: 912,
      y: 516,
      kind: "panel",
      panelSlug: "avsc-b",
      nodeId: "AVSCB",
      plantId: "IMP-SCB",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Contatori Principale (Retrocabina)",
      wallSpot: "Parete nord, 3ª postazione da sinistra accanto ad AVSC-A (PL.11).",
      howToReach: "Piano Terra, dentro il Locale Contatori Principale a destra del varco carraio: terza postazione sulla parete nord, abbinata al contatore da 50 kW della Torre B."
    },
    {
      id: "MK-AVSSC",
      code: "AVSSC + RIP-250",
      title: "Contatore Supercondominio (80 kW), Ripartitore 250A & Avanquadro AVSSC",
      floorId: "TERRA",
      x: 944,
      y: 516,
      kind: "panel",
      panelSlug: "avssc",
      nodeId: "AVSSC",
      plantId: "IMP-SSC",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Contatori Principale (Retrocabina)",
      wallSpot: "Parete nord-est, 4ª postazione in fondo a destra nel Locale Contatori Principale (PL.11 / PL.12.1).",
      howToReach: "Piano Terra, dentro il Locale Contatori Principale: ultima postazione a destra sulla parete nord, subito sotto il contatore da 80 kW e il ripartitore RIP-250A. Da qui parte il cavidotto interrato Ø160 verso QE.SSC al Piano -1."
    },
    {
      id: "MK-QEPA",
      code: "QE.PA (VVF)",
      title: "Quadro Preferenziale Pompa Antincendio (QE.PA — Solo Magnetico)",
      floorId: "TERRA",
      x: 944,
      y: 552,
      kind: "safety_panel",
      panelSlug: "qe-pa",
      nodeId: "QEPA",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Locale Contatori Principale (Retrocabina)",
      wallSpot: "Accanto a RIP-250A e AVSSC sul lato destro del Locale Contatori Principale, contrassegnato da targa rossa VVF (PL.11 / PL.12.1).",
      howToReach: "Piano Terra, in fondo a destra nel Locale Contatori Principale: centralino stagno IP66 con targa rossa UNI EN 12845 attestato a monte dello sgancio generale."
    },
    {
      id: "MK-POMPA-VVF",
      code: "MODULO POMPA VVF",
      title: "Modulo Antincendio Esterno Prefabbricato (Motopompa 15 kW + Ausiliari)",
      floorId: "TERRA",
      x: 894,
      y: 454,
      kind: "safety",
      panelSlug: null,
      nodeId: "LD-POMPA-VVF",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_PT_INGRESSO",
      room: "Modulo Antincendio Esterno Prefabbricato",
      wallSpot: "Locale/modulo prefabbricato esterno posto immediatamente a nord del Locale Contatori Principale (PL.11 / PL.12.1).",
      howToReach: "Piano Terra, subito alle spalle (lato nord) del Locale Contatori Principale, lungo il fianco dell'imbocco rampa: ospita la motopompa antincendio da 15 kW e il quadro servizi ausiliari."
    },

    // ==================== PIANO RIALZATO (+2,4 m) ====================
    {
      id: "MK-QEDB",
      code: "QE.01BICI",
      title: "Centralino Locale Deposito Biciclette (QEDB / QE.01BICI)",
      floorId: "RIALZATO",
      x: 196,
      y: 198,
      kind: "panel",
      panelSlug: "qe-01bici",
      nodeId: "QEDB",
      plantId: "IMP-SCA",
      zoomId: null,
      room: "Deposito Biciclette Condominiale — Torre A",
      wallSpot: "Incassato a parete presso l'ingresso del Deposito Biciclette / Disimpegno (PL.06).",
      howToReach: "Dall'Ingresso di Torre A al Piano Terra sali al Piano Rialzato: sul lato sinistro (ala ovest) entra nel Deposito Biciclette condominiale; il centralino 36 moduli è incassato a muro vicino alla porta."
    },
    {
      id: "MK-QEPL",
      code: "QE.PL",
      title: "Centralino Locale Palestra Condominiale (QE.PL)",
      floorId: "RIALZATO",
      x: 312,
      y: 210,
      kind: "panel",
      panelSlug: "qe-pl",
      nodeId: "QEPL",
      plantId: "IMP-SCA",
      zoomId: null,
      room: "Palestra Condominiale — Torre A",
      wallSpot: "Incassato a parete accanto alla porta d'accesso dalla rampa/pianerottolo di Torre A (PL.06).",
      howToReach: "Dall'Ingresso di Torre A sali la rampa interna (13 alzate) fino al pianerottolo del Piano Rialzato: entra nella Palestra condominiale sul lato destro; QE.PL è incassato a parete vicino all'ingresso."
    },
    {
      id: "MK-QESR",
      code: "QE.02RIUN",
      title: "Centralino Sala Riunioni Condominiale (QESR / QE.02RIUNIONI)",
      floorId: "RIALZATO",
      x: 696,
      y: 210,
      kind: "panel",
      panelSlug: "qe-02riunioni",
      nodeId: "QESR",
      plantId: "IMP-SCB",
      zoomId: null,
      room: "Sala Riunioni — Torre B",
      wallSpot: "Incassato sulla parete est della Sala Riunioni presso la porta dal pianerottolo Torre B (PL.08).",
      howToReach: "Dall'Ingresso di Torre B sali al Piano Rialzato: dal pianerottolo davanti agli ascensori, entra a sinistra nella Sala Riunioni condominiale; il centralino è incassato accanto alla porta."
    },
    {
      id: "MK-QESP",
      code: "QE.03POLI",
      title: "Centralino Spazio Polifunzionale & Lavanderia (QESP / QE.03POLIFUNZ)",
      floorId: "RIALZATO",
      x: 854,
      y: 238,
      kind: "panel",
      panelSlug: "qe-03polifunz",
      nodeId: "QESP",
      plantId: "IMP-SCB",
      zoomId: null,
      room: "Spazio Polifunzionale / Lavanderia — Torre B",
      wallSpot: "Incassato sulla parete ovest dello Spazio Polifunzionale accanto alla porta dal pianerottolo (PL.08).",
      howToReach: "Dall'Ingresso di Torre B sali la rampa al Piano Rialzato: sul lato destro del pianerottolo entra nello Spazio Polifunzionale / Lavanderia; il centralino è a parete subito vicino all'ingresso."
    },

    // ==================== PIANO PRIMO INTERRATO (-1) ====================
    {
      id: "MK-QESSC",
      code: "QE.SSC (+ Sez. Q6)",
      title: "Quadro Generale Servizi Supercondominiali & Sezione Box Q6 (con Fusibili 24V F3/F14!)",
      floorId: "M1",
      x: 604,
      y: 546,
      kind: "panel",
      panelSlug: "qe-ssc",
      nodeId: "QESSC",
      plantId: "IMP-SSC",
      zoomId: "ZOOM_M1_TORREA",
      room: "Locale Contatori Scala A — Piano -1",
      wallSpot: "Armadio H=201 cm sulla PARETE SINISTRA entrando nel Locale Contatori Scala A, subito a fianco di QESC-A e di fronte a UPS 1 / UPS 2 (PL.04).",
      howToReach: "Scendi al Piano -1 (Scala/Ascensori Torre A oppure rampa box) e vai nel corsello sud sotto Torre A: la porta del Locale Contatori Scala A si trova esattamente tra il Box 66.1 (a sinistra) e il Box 64.1 (a destra). Entrando, QE.SSC è il grande armadio con porta in vetro sulla parete sinistra."
    },
    {
      id: "MK-QESCA",
      code: "QESC-A",
      title: "Quadro Generale Edificio Scala / Torre A (QESC-A)",
      floorId: "M1",
      x: 604,
      y: 514,
      kind: "panel",
      panelSlug: "qesc-a",
      nodeId: "QESCA",
      plantId: "IMP-SCA",
      zoomId: "ZOOM_M1_TORREA",
      room: "Locale Contatori Scala A — Piano -1",
      wallSpot: "Parete sinistra entrando nel Locale Contatori Scala A, primo armadio accanto a QE.SSC (PL.04).",
      howToReach: "Piano -1 sotto Torre A, corridoio/corsello sud tra il Box 66.1 e il Box 64.1: apri il Locale Contatori Scala A; QESC-A è il primo armadio a pavimento sulla parete sinistra."
    },
    {
      id: "MK-UPS2",
      code: "UPS 2 (2000VA 24V)",
      title: "UPS 2 Online (2000 VA) — Alimentazione Circuito 24Vac Sgancio Autorimessa",
      floorId: "M1",
      x: 646,
      y: 530,
      kind: "safety",
      panelSlug: null,
      nodeId: "UPS-2-SGANCIO",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_M1_TORREA",
      room: "Locale Contatori Scala A — Piano -1",
      wallSpot: "Parete nord-est (subito a destra entrando dalla porta del Locale Contatori Scala A), accanto a UPS 1 e di fronte a QE.SSC (PL.04).",
      howToReach: "Piano -1 sotto Torre A, dentro il Locale Contatori Scala A (tra Box 66.1 e Box 64.1): subito a destra della porta d'ingresso, nella stessa stanza di QE.SSC."
    },
    {
      id: "MK-UPS1",
      code: "UPS 1 (1000VA EI)",
      title: "UPS 1 Online (1000 VA) — Continuità Portoni Tagliafuoco Autorimessa",
      floorId: "M1",
      x: 646,
      y: 504,
      kind: "safety",
      panelSlug: null,
      nodeId: "UPS-1-EI",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_M1_TORREA",
      room: "Locale Contatori Scala A — Piano -1",
      wallSpot: "Parete nord-est subito a destra della porta d'ingresso del Locale Contatori Scala A, affiancato a UPS 2 (PL.04).",
      howToReach: "Piano -1 sotto Torre A, dentro il Locale Contatori Scala A (tra Box 66.1 e Box 64.1): subito a destra entrando."
    },
    {
      id: "MK-IRA-A",
      code: "IRA TORRE A",
      title: "Centrale Rivelazione ed Allarme Incendi — Torre A (FM16G)",
      floorId: "M1",
      x: 622,
      y: 566,
      kind: "safety",
      panelSlug: null,
      nodeId: "IRA-CENTRALI",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_M1_TORREA",
      room: "Locale Contatori Scala A — Piano -1",
      wallSpot: "Parete sud (in fondo) del Locale Contatori Scala A (PL.04).",
      howToReach: "Piano -1 sotto Torre A, parete di fondo del Locale Contatori Scala A (tra Box 66.1 e Box 64.1)."
    },
    {
      id: "MK-QECI",
      code: "QE.CI",
      title: "Quadro Centrale Idrica Sanitaria (Autoclavi GP1 & GP2)",
      floorId: "M1",
      x: 594,
      y: 374,
      kind: "panel",
      panelSlug: "qe-ci",
      nodeId: "QECI",
      plantId: "IMP-SSC",
      zoomId: "ZOOM_M1_TORREA",
      room: "Centrale Idrica — Piano -1 (Torre A)",
      wallSpot: "Parete nord-est subito a destra entrando nella Centrale Idrica, a ridosso del Cavedio Impianti (PL.04).",
      howToReach: "Scendi al Piano -1 con Scala/Ascensori di Torre A: percorri il corridoio verso nord (direzione Box 68.1) costeggiando gli ascensori; entra nella porta della Centrale Idrica sulla sinistra, QE.CI è subito a parete accanto al cavedio."
    },
    {
      id: "MK-QESCB",
      code: "QESC-B",
      title: "Quadro Generale Edificio Scala / Torre B (QESC-B)",
      floorId: "M1",
      x: 342,
      y: 210,
      kind: "panel",
      panelSlug: "qesc-b",
      nodeId: "QESCB",
      plantId: "IMP-SCB",
      zoomId: "ZOOM_M1_TORREB",
      room: "Locale Contatori Scala B — Piano -1",
      wallSpot: "Parete sud del Locale Contatori Scala B (PL.04).",
      howToReach: "Scendi al Piano -1 con Scala/Ascensori di Torre B: attraversa il filtro aerato e il disimpegno davanti agli ascensori (a sud del Locale Immondezzaio B, di fronte al Box 27.1); entra nel Locale Contatori B, QESC-B è sulla parete sud."
    },
    {
      id: "MK-IRA-B",
      code: "IRA TORRE B",
      title: "Centrale Rivelazione ed Allarme Incendi — Torre B (FM15L)",
      floorId: "M1",
      x: 282,
      y: 210,
      kind: "safety",
      panelSlug: null,
      nodeId: "IRA-CENTRALI",
      plantId: "IMP-FIRE",
      zoomId: "ZOOM_M1_TORREB",
      room: "Locale Contatori Scala B — Piano -1",
      wallSpot: "Parete sud-ovest vicino all'ingresso del Locale Contatori Scala B (PL.04).",
      howToReach: "Piano -1 sotto Torre B, all'ingresso del Locale Contatori Scala B."
    },
    {
      id: "MK-PORTONI-M1",
      code: "PORTONI EI (-1)",
      title: "Portoni Tagliafuoco Scorrevoli Autorimessa (Piano -1)",
      floorId: "M1",
      x: 416,
      y: 284,
      kind: "safety",
      panelSlug: null,
      nodeId: "FIRE-PORTONI-EI",
      plantId: "IMP-FIRE",
      zoomId: null,
      room: "Varchi di compartimentazione Corselli Box (-1)",
      wallSpot: "Nicchie portoni tagliafuoco lungo i varchi di compartimentazione tra rampa e ali autorimessa (PL.02 / PL.04).",
      howToReach: "Lungo i varchi carrai principali dell'autorimessa al Piano -1 (trattenuti aperti dai magneti alimentati da UPS 1 → interruttore Q7 [UVR] in QE.SSC)."
    },

    // ==================== PIANO SECONDO INTERRATO (-2) ====================
    {
      id: "MK-QECT",
      code: "QE.CT",
      title: "Quadro Elettrico Centrale Tecnologica (16 Pompe Clima/ACS)",
      floorId: "M2",
      x: 604,
      y: 348,
      kind: "panel",
      panelSlug: "qe-ct",
      nodeId: "QECT",
      plantId: "IMP-SSC",
      zoomId: "ZOOM_M2_CENTRALI",
      room: "Centrale Tecnologica — Piano -2 (Sotto Torre A)",
      wallSpot: "Parete nord subito a destra della porta superiore d'ingresso alla Centrale Tecnologica (PL.03).",
      howToReach: "Scendi al Piano -2 (Scala/Ascensori Torre A), percorri il corridoio verso nord oltre il Cavedio Impianti (di fronte a Cantina C63 / vicino ai Box 70.2–71.2) ed entra nella porta della Centrale Tecnologica: QE.CT è subito lì di fronte/destra sulla parete nord."
    },
    {
      id: "MK-QEREG",
      code: "QE-REG (BMS)",
      title: "Quadro Regolazione & Supervisione BMS (ABB Cylon + Touch 7\")",
      floorId: "M2",
      x: 556,
      y: 348,
      kind: "panel",
      panelSlug: "qe-reg",
      nodeId: "QEREG",
      plantId: "IMP-BMS",
      zoomId: "ZOOM_M2_CENTRALI",
      room: "Centrale Tecnologica — Piano -2 (Sotto Torre A)",
      wallSpot: "Parete nord della Centrale Tecnologica, immediatamente a sinistra di QE.CT vicino alla porta d'ingresso (PL.03).",
      howToReach: "Piano -2 sotto Torre A: entrando dalla porta nord della Centrale Tecnologica, trovi l'armadio QE-REG (con schermo Touch sul fronte) subito affiancato a sinistra di QE.CT."
    },
    {
      id: "MK-QEPC",
      code: "QE.PC (800A + FV)",
      title: "Quadro Centrale Pompe di Calore & Unico Parallelo Fotovoltaico (Q5)",
      floorId: "M2",
      x: 474,
      y: 468,
      kind: "panel",
      panelSlug: "qe-pc",
      nodeId: "QEPC",
      plantId: "IMP-PDC",
      zoomId: "ZOOM_M2_CENTRALI",
      room: "Centrale Tecnologica — Piano -2 (Sotto Torre A)",
      wallSpot: "Parete ovest / sud-ovest della Centrale Tecnologica, oltre i 3 gruppi frigoriferi verso il Filtro Aerato (PL.03).",
      howToReach: "Piano -2 sotto Torre A, dentro la Centrale Tecnologica: attraversa la sala costeggiando le 3 macchine PC2B/PC1/PC2A (oppure entra dal filtro aerato sud); il grande armadio a 3 colonne QE.PC è sulla parete ovest in basso a sinistra."
    },
    {
      id: "MK-QELP",
      code: "QE.LP (Pozzi)",
      title: "Quadro Locale Pompe Pozzi di Falda & Modulo BMS Remoto CBX1",
      floorId: "M2",
      x: 286,
      y: 198,
      kind: "panel",
      panelSlug: "qe-lp",
      nodeId: "QELP",
      plantId: "IMP-SSC",
      zoomId: "ZOOM_M2_CENTRALI",
      room: "Locale Pompe — Piano -2 (Sotto Torre B)",
      wallSpot: "Parete ovest subito a sinistra entrando dalla porta del Locale Pompe di fronte agli ascensori di Torre B (PL.03).",
      howToReach: "Scendi al Piano -2 con Scala/Ascensori di Torre B: uscito dagli ascensori (a sud del Corridoio Cantine C124–C127, vicino al Box 27.2), apri la porta di fronte del Locale Pompe; QE.LP è subito sulla parete sinistra."
    },

    // ==================== PIANI TIPO 1°–14° & COPERTURE ====================
    {
      id: "MK-QEP",
      code: "32× QEP (Piani)",
      title: "Centralini di Piano QEP.01–05 & Collettori M-Bus (16 Torre A + 16 Torre B)",
      floorId: "PIANI_ROOF",
      x: 255,
      y: 378,
      kind: "equip",
      panelSlug: null,
      nodeId: "QEP-TORRE-A",
      plantId: "IMP-SCA",
      zoomId: null,
      room: "Nicchia Cavedio Impianti — Pianerottoli Piani 1° ÷ 14°",
      wallSpot: "Sportello Cavedio Impianti sul pianerottolo ascensori di ciascun piano (PL.09 e PL.10).",
      howToReach: "Ad ogni piano abitativo (dal 1° al 14° sia in Torre A sia in Torre B), uscendo dagli ascensori sul pianerottolo comune apri lo sportello tecnico del Cavedio Impianti accanto al filtro fumo."
    },
    {
      id: "MK-FV-ROOF",
      code: "FV A+B & INVERTER",
      title: "Campi Fotovoltaici Coperture Torri A & B + Inverter (discesa a QE.PC -2)",
      floorId: "PIANI_ROOF",
      x: 745,
      y: 350,
      kind: "equip",
      panelSlug: null,
      nodeId: "GEN-FV-ROOF",
      plantId: "IMP-PDC",
      zoomId: null,
      room: "Coperture Solari & Locale Tecnico Sommitale (+48 m)",
      wallSpot: "Lastrici solari di Torre A e Torre B + vano tecnico in copertura (PL.09 / PL.10).",
      howToReach: "Sali fino all'ultimo livello tecnico in copertura delle Torri A e B (+48 m); la linea AC trifase scende nel cavedio fino all'interruttore Q5 dentro QE.PC al Piano -2."
    },
    {
      id: "MK-STOM-ROOF",
      code: "ANTENNE & STOM",
      title: "Impianto Antenne TV/SAT & Centrale Ottica di Testa STOM",
      floorId: "PIANI_ROOF",
      x: 845,
      y: 418,
      kind: "equip",
      panelSlug: null,
      nodeId: "TLC-ANTENNE-STOM",
      plantId: "IMP-TLC",
      zoomId: null,
      room: "Copertura / Sottotetto Tecnico (+48 m)",
      wallSpot: "Palo antenne in copertura e quadro ottico di testa STOM nel vano tecnico sommitale.",
      howToReach: "Vano tecnico sommitale in copertura; invia i segnali ottici TV/SAT giù fino al CSOE in Portineria."
    }
  ],

  // Map every Node ID in impianto_data.js (including loads & virtual sections) to its physical marker!
  nodeToMarker: {
    "RETE-DISTRIBUTORE": "MK-AVSSC",
    "POD-SSC": "MK-AVSSC",
    "RIP-250": "MK-AVSSC",
    "AVSSC": "MK-AVSSC",
    "QEPA": "MK-QEPA",
    "LD-POMPA-VVF": "MK-POMPA-VVF",
    "POD-SCA": "MK-AVSCA",
    "AVSCA": "MK-AVSCA",
    "POD-SCB": "MK-AVSCB",
    "AVSCB": "MK-AVSCB",
    "POD-PDC": "MK-AVPC",
    "AVPC": "MK-AVPC",
    "QEPOR": "MK-QEPOR",
    "FTTH-CSOE": "MK-FTTH-CSOE",
    "VIDEOCITOFONO": "MK-QEPOR",
    "LD-ESTERNI": "MK-QEPOR",
    "SGANCI-VVF": "MK-SGANCI-VVF",
    "IRA-CENTRALI": "MK-ALLARMI-PA",
    "QESSC": "MK-QESSC",
    "Q6-BOX-SEC": "MK-QESSC",
    "BOX-INTERNI-P1": "MK-QESSC",
    "BOX-INTERNI-P2": "MK-QESSC",
    "LD-BOX": "MK-PORTONI-M1",
    "FIRE-PORTONI-EI": "MK-PORTONI-M1",
    "QESCA": "MK-QESCA",
    "CONTATORI-ALLOGGI-A": "MK-QESCA",
    "UPS-1-EI": "MK-UPS1",
    "UPS-2-SGANCIO": "MK-UPS2",
    "QECI": "MK-QECI",
    "LD-IDRICO": "MK-QECI",
    "QESCB": "MK-QESCB",
    "CONTATORI-ALLOGGI-B": "MK-QESCB",
    "QEPL": "MK-QEPL",
    "QEDB": "MK-QEDB",
    "QESR": "MK-QESR",
    "QESP": "MK-QESP",
    "QECT": "MK-QECT",
    "LD-POMPE-CT": "MK-QECT",
    "QEREG": "MK-QEREG",
    "BMS-SONDE-CAMPO": "MK-QEREG",
    "BMS-ATTUATORI-VALV": "MK-QEREG",
    "QEPC": "MK-QEPC",
    "LD-PDC-UNITS": "MK-QEPC",
    "QELP": "MK-QELP",
    "LD-FALDA": "MK-QELP",
    "QEP-TORRE-A": "MK-QEP",
    "QEP-TORRE-B": "MK-QEP",
    "MBUS-CONTAB": "MK-QEP",
    "LD-SCALA-CANT-A": "MK-QESCA",
    "LD-SCALA-CANT-B": "MK-QESCB",
    "LD-ROOF-A": "MK-FV-ROOF",
    "LD-ROOF-B": "MK-FV-ROOF",
    "GEN-FV-ROOF": "MK-FV-ROOF",
    "FV-TETTO-A": "MK-FV-ROOF",
    "FV-TETTO-B": "MK-FV-ROOF",
    "TLC-ANTENNE-STOM": "MK-STOM-ROOF",
    "TLC-ALLOGGI-STOA": "MK-QEP",
    "TERRA-RETE": "MK-AVSSC",
    "GND-SPD-4X": "MK-QESSC",
    "GND-COLLETTORI-EQP": "MK-AVSSC"
  }
};
