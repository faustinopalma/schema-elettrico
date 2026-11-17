window.PANNELLI_FISICI_DATA = {
  "meta": {
    "totalPanels": 18,
    "totalComponents": 429,
    "totalBreakers": 223,
    "totalFuses": 52,
    "standard": "CEI EN 61439-1 / 61439-2 / 61439-3"
  },
  "nodeToPanel": {
    "AVSSC": {
      "slug": "avssc",
      "code": "AVSSC",
      "comp": null
    },
    "QEPOR": {
      "slug": "qe-por",
      "code": "QE-POR",
      "comp": null
    },
    "QESSC": {
      "slug": "qe-ssc",
      "code": "QE.SSC",
      "comp": null
    },
    "QECT": {
      "slug": "qe-ct",
      "code": "QE.CT",
      "comp": null
    },
    "QECI": {
      "slug": "qe-ci",
      "code": "QE.CI",
      "comp": null
    },
    "QELP": {
      "slug": "qe-lp",
      "code": "QE.LP",
      "comp": null
    },
    "QEPA": {
      "slug": "qe-pa",
      "code": "QE.PA",
      "comp": null
    },
    "AVSCA": {
      "slug": "avsc-a",
      "code": "AVSC-A",
      "comp": null
    },
    "QESCA": {
      "slug": "qesc-a",
      "code": "QESC-A",
      "comp": null
    },
    "QEPL": {
      "slug": "qe-pl",
      "code": "QE.PL",
      "comp": null
    },
    "QEDB": {
      "slug": "qe-01bici",
      "code": "QE.01BICI",
      "comp": null
    },
    "AVSCB": {
      "slug": "avsc-b",
      "code": "AVSC-B",
      "comp": null
    },
    "QESCB": {
      "slug": "qesc-b",
      "code": "QESC-B",
      "comp": null
    },
    "QESR": {
      "slug": "qe-02riunioni",
      "code": "QE.02RIUNIONI",
      "comp": null
    },
    "QESP": {
      "slug": "qe-03polifunz",
      "code": "QE.03POLIFUNZ",
      "comp": null
    },
    "AVPC": {
      "slug": "avpc",
      "code": "AVPC",
      "comp": null
    },
    "QEPC": {
      "slug": "qe-pc",
      "code": "QE.PC",
      "comp": null
    },
    "QEREG": {
      "slug": "qe-reg",
      "code": "QE-REG",
      "comp": null
    },
    "Q6-BOX-SEC": {
      "slug": "qe-ssc",
      "code": "QE.SSC (Sez. Q6)",
      "comp": "Q6"
    }
  },
  "panels": [
    {
      "order": 1,
      "slug": "avssc",
      "code": "AVSSC",
      "title": "Avanquadro Servizi Supercondominiali",
      "nodeId": "AVSSC",
      "plantId": "IMP-SSC",
      "plantLabel": "1 · Supercondominio",
      "swatch": "ssc",
      "location": {
        "buildingZone": "Corpo Parti Comuni Generali",
        "floor": "Piano Terra (0,0 m)",
        "room": "Locale Contatori Principale",
        "mounting": "Quadro murale in resina isolante con porta trasparente incernierata a sinistra",
        "whereHowToFind": "Installato a parete nel Locale Contatori Principale al Piano Terra, immediatamente a valle del ripartitore generale RIP-250A e del contatore trifase da 80 kW dei Servizi Supercondominiali."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB Serie Gemini 1SL0226A00 (cassa in resina termoindurente con porta trasparente)",
        "dimensionsMm": "1005 × 840 × 360 mm",
        "heightMm": 1005,
        "widthMm": 840,
        "depthMm": 360,
        "ipRating": "IP66",
        "ral": "RAL 7035",
        "doorType": "Porta trasparente a battente singolo (cerniere SX)",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "250 A",
        "shortCircuitIcc": "15 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Contatore POD Servizi Supercondominiali (80 kW) → Ripartitore RIP-250A",
        "detail": "Linea unipolare FG16OM16 3×(1×150) + 1×150N mm² proveniente dal Ripartitore Generale 250A nel medesimo Locale Contatori.",
        "panelSlug": null,
        "mapNodeId": "RIP-250",
        "mapPlantId": "IMP-INGRESSI"
      },
      "downstreamPanels": [
        {
          "code": "QE.SSC",
          "label": "Quadro Generale Servizi Supercondominiali",
          "viaComp": "Q2",
          "panelSlug": "qe-ssc"
        },
        {
          "code": "QE-POR",
          "label": "Quadro Locale Portineria",
          "viaComp": "Q7",
          "panelSlug": "qe-por"
        }
      ],
      "vvfBehavior": "In caso di comando di sgancio generale emergenza o intervento del relè differenziale Tipo B DER1, la bobina a lancio di corrente (SOR 230Vac) apre l'interruttore generale scatolato Q1 (250A), togliendo tensione a tutte le utenze derivate da AVSSC (mentre la motopompa antincendio QE.PA resta alimentata perché attestata a monte su RIP-250A).",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Fronte Modulare Interno (4 pannelli: 150 + 300 + 300 + 150 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 · Testata cieca ingresso cavi",
              "heightMm": 150,
              "isReserve": true,
              "note": "Spazio superiore attestazione corde 150 mm²",
              "slots": []
            },
            {
              "id": "R2",
              "title": "Pannello 2 · Interruttori Scatolati Principali",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "Q1",
                "Q2"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 · Copertura sbarre e passacavi",
              "heightMm": 300,
              "isReserve": true,
              "note": "Vano smistamento interno verso piastra di fondo e toroidi",
              "slots": []
            },
            {
              "id": "R4",
              "title": "Pannello 4 · Guida DIN Protezioni Ausiliarie e Partenze Dirette",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "F1",
                "DER1",
                "Q3",
                "F3",
                "Q4",
                "Q5",
                "Q6",
                "Q7",
                "Q8",
                "Q9"
              ]
            }
          ]
        },
        "rightBay": {
          "title": "Piastra di Fondo Interna (Dietro pannello cieco)",
          "subtitle": "Toroidi chiusi Ø110 mm sul montante 95/150 mm²",
          "slots": [
            "TAD1",
            "TAB1"
          ]
        }
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 6,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Generale Quadro",
          "ratingBadge": "MCCB 4P 250A · 36kA",
          "brandModel": "ABB SACE Tmax XT3N 250 TMD 250-2500 4P + Bobina lancio SOR 230Vac (1SDA068070R1 + 1SDA066325R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale dell'Avanquadro AVSSC: seziona e protegge dalle sovracorrenti l'intera sbarra a 250A da cui derivano il quadro generale QE.SSC (tramite Q2), il quadro Portineria QE-POR (tramite Q7) e i servizi del Locale Contatori, cancello, irrigazione e ausiliari antincendio. Viene aperto a distanza dal relè differenziale Tipo B DER1.",
          "cable": "Ingresso FG16OM16 3×(1×150)+1×150N mm² · Uscita interna 95 mm²",
          "relatedIds": [
            "DER1",
            "F1",
            "TAD1",
            "TAB1",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "mccb",
          "modules": 6,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Montante → QE.SSC",
          "ratingBadge": "MCCB 4P 250A N50% · 36kA",
          "brandModel": "ABB SACE Tmax XT3N 250 TMD 4P N50% (1SDA068066R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il montante principale di potenza che alimenta il Quadro Generale Servizi Supercondominiali (QE.SSC).",
          "cable": "FG16OM16 3×(1×150) + 1×150N + 1×75PE mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": "qe-ssc",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Prot. Relè DER1 & Sgancio",
          "ratingBadge": "1P+N 10×38 · 4A gG",
          "brandModel": "ABB E90 / M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 4A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a monte di Q1 (sempre in tensione anche a Q1 aperto): protegge da cortocircuito l'alimentazione ausiliaria 230Vac del relè differenziale Tipo B DER1 e il circuito della bobina a lancio di corrente (SOR) che fa scattare Q1.",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "DER1",
            "Q1",
            "TAD1",
            "TAB1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "DER1",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Relè Diff. Generale",
          "ratingBadge": "Tipo B · 48÷400Vac",
          "brandModel": "Dossena DER3BDUAL/6D (9DER3BDUAL/6D) Relè differenziale elettronico Tipo B a doppio toroide",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Monitora tramite la coppia di toroidi TAD1 (AC/A) e TAB1 (DC/Tipo B) eventuali dispersioni verso terra (anche in corrente continua liscia generata da inverter/UPS a valle) sul montante generale e comanda l'apertura immediata di Q1.",
          "cable": "Cavi schermati sensori WD1 / WB1",
          "relatedIds": [
            "F1",
            "TAD1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Luce Loc. Contatori",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito di illuminazione ordinaria LED del Locale Contatori Principale al Piano Terra (e alimenta a valle il portafusibile F3 della luce di emergenza).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "F3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F3",
          "kind": "fuse",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Luce Emerg. Contatori",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q3: protegge la linea di ricarica/inibizione delle plafoniere autonome di illuminazione di emergenza del Locale Contatori Principale. Aprendo F3 si simula il black-out locale per il test batterie.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Prese Loc. Contatori",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio 230V installate nel Locale Contatori Principale per manutenzione e strumentazione.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Cancello Motorizzato",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il quadro bordo macchina del cancello carraio motorizzato di accesso al complesso.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Impianto Irrigazione",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la centralina ed elettrovalvole dell'impianto di irrigazione delle aree verdi comuni.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Linea → QE-POR",
          "ratingBadge": "2P C40 · 6kA",
          "brandModel": "ABB S202 C40 Interruttore magnetotermico 2P 40A 6kA (S466301)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge contro sovraccarico e cortocircuito la linea monofase in doppio isolamento che alimenta il Quadro Locale Portineria (QE-POR).",
          "cable": "FG16OM16 3G10 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-por",
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Scorta",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore di scorta cablato su sbarra e predisposto per future utenze monofase del Locale Contatori.",
          "cable": "Predisposto 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q9",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (150 mm)",
          "shortLabel": "Serv. Aus. Antincendio",
          "ratingBadge": "4P C32 · 300mA A · 15kA",
          "brandModel": "ABB S204P-C32 + Blocco differenziale DDA204 A-40/0,3A (S590815 + B427987)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea trifase dedicata al Quadro Servizi Ausiliari Pompe Antincendio (pompa di compensazione/jockey, mantenimento carica, scaldiglie e illuminazione locale pompe VVF).",
          "cable": "FG16OM16 5G10 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TAD1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Piastra di Fondo Interna",
          "shortLabel": "Toroide AC/A Ø110mm",
          "ratingBadge": "Ø110 mm · AC/Puls.",
          "brandModel": "Dossena D110 (9D110) Toroide chiuso Ø110 mm per correnti differenziali AC/A",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Abbraccia le corde di potenza in uscita da Q1 per rilevare correnti di guasto verso terra alternate e pulsanti unidirezionali, inviando il segnale al relè DER1.",
          "cable": "Cavo sensore WD1",
          "relatedIds": [
            "DER1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "TAB1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Piastra di Fondo Interna",
          "shortLabel": "Toroide DC Ø110mm",
          "ratingBadge": "Ø110 mm · Tipo B DC",
          "brandModel": "Dossena B110 (9B110) Toroide chiuso Ø110 mm per correnti differenziali continue Tipo B",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Secondo toroide accoppiato a DER1 per il rilevamento delle correnti di guasto in continua liscia e ad alta frequenza (protezione Tipo B).",
          "cable": "Cavo sensore WB1",
          "relatedIds": [
            "DER1",
            "TAD1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        }
      ]
    },
    {
      "order": 2,
      "slug": "qe-por",
      "code": "QE-POR",
      "title": "Quadro Elettrico Locale Portineria",
      "nodeId": "QEPOR",
      "plantId": "IMP-SSC",
      "plantLabel": "1 · Supercondominio",
      "swatch": "ssc",
      "location": {
        "buildingZone": "Ingresso Principale / Guardiola",
        "floor": "Piano Terra (0,0 m)",
        "room": "Locale Portineria",
        "mounting": "Centralino da incasso a parete 36 moduli (3 file × 12 moduli) con portella cieca bianca",
        "whereHowToFind": "Incassato a parete all'interno del Locale Portineria al Piano Terra (guardiola ingresso pedonale/carraio), dove sono ospitati anche il rack dati condominiale e il pannello ripetizione allarmi antincendio."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "FAEG FG14636 Centralino da incasso 36 moduli con portella cieca",
        "dimensionsMm": "510 × 335 × 85 mm",
        "heightMm": 510,
        "widthMm": 335,
        "depthMm": 85,
        "ipRating": "IP40",
        "ral": "RAL 9016 (Bianco)",
        "doorType": "Portella cieca in tecnopolimero incernierata a sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "230 Vac · 50 Hz (1F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "40 A",
        "shortCircuitIcc": "4,5 / 6 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-3"
      },
      "upstream": {
        "label": "Avanquadro Servizi Supercondominiali AVSSC (Interruttore Q7 · C40)",
        "detail": "Cavo FG16OM16 3G10 mm² in doppio isolamento proveniente dall'interruttore Q7 di AVSSC.",
        "panelSlug": "avssc",
        "panelComp": "Q7",
        "mapNodeId": "AVSSC",
        "mapPlantId": "IMP-SSC"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Non è soggetto allo sgancio selettivo della sola autorimessa, in modo da preservare in Portineria l'alimentazione ordinaria del Rack Dati (Q9) e del Quadro Ripetizione Allarmi Pompe Antincendio (Q7); si diseccita solo in caso di apertura generale di AVSSC.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": " Telaio Incasso 36 Moduli (3 Guide DIN × 12 Moduli)",
          "rows": [
            {
              "id": "R1",
              "title": "Fila DIN 1 · Generale, Ripartitore e Servizi Igienici/Prese",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q1",
                "Q2",
                "Q3",
                "Q4",
                "RP1"
              ]
            },
            {
              "id": "R2",
              "title": "Fila DIN 2 · Illuminazione, Clima, Allarmi VVF e Acque Piovane",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q5",
                "F5",
                "Q6",
                "Q7",
                "Q8"
              ]
            },
            {
              "id": "R3",
              "title": "Fila DIN 3 · Armadio Dati, Luci Esterne con Astronomico e Scorte",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q9",
                "Q10",
                "Q11",
                "OR11",
                "K11",
                "Q12",
                "Q13"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Generale Portineria",
          "ratingBadge": "1P+N C40 · 4,5kA",
          "brandModel": "BTicino BTDIN45 FA81NC40 Magnetotermico 1P+N 40A curva C",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale manuale del quadro Portineria: seziona l'arrivo linea da AVSSC-Q7 e alimenta il ripartitore modulare RP1 per tutte le 12 linee derivate.",
          "cable": "Ingresso FG16OM16 3G10 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FN84",
          "vvfState": "normal"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese 01 Portineria",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito prese a spina 10/16A e Schuko della postazione di lavoro in Portineria.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Scaldasalviette Bagno",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 / A16 Magnetotermico differenziale 1P+N 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il termoarredo / scaldasalviette elettrico del servizio igienico annesso alla Portineria.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Boiler Elettrico ACS",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge lo scaldacqua / boiler elettrico per la produzione locale di acqua calda sanitaria del bagno Portineria.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 4,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Ripartitore 125A",
          "ratingBadge": "Morsettiera 4P · 125A",
          "brandModel": "Ripartitore modulare isolato su guida DIN 125A (Icw 6kA)",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Distribuisce in modo ordinato fase e neutro in uscita dal generale Q1 a tutti gli interruttori differenziali delle tre file DIN.",
          "cable": "FS17 10 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Luce Portineria",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria del locale Portineria, disimpegno e bagno annesso; a valle alimenta il fusibile F5 delle lampade di emergenza.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "F5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Luce Emergenza",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "BTicino BTDIN F321N Portafusibile sezionatore 1P+N 32A con fusibile 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q5: protegge la linea di ricarica/controllo degli apparecchi illuminanti autonomi di emergenza della Portineria.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-F321N",
          "vvfState": "normal"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Climatizzatore Split",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'unità esterna/interna monosplit a pompa di calore per la climatizzazione autonoma della Portineria.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Ripetiz. Allarmi VVF",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il Quadro di Ripetizione Allarmi delle Pompe Antincendio presidiato in Portineria (segnalazione ottico-acustica stato motopompa UNI EN 12845).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "vital"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Pompa Acque Piovane",
          "ratingBadge": "1P+N C16 · 30mA Tipo F · 6kA",
          "brandModel": "BTicino BTDIN60 GN8813F16 Magnetotermico differenziale C16 30mA Tipo F (alta immunità inverter)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il quadro della pompa sommersa della vasca di raccolta e riuso acque piovane (differenziale Tipo F specifico per carichi con componenti multifrequenza).",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q9",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Armadio Dati / Rack",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'alimentazione 230Vac dell'Armadio Rack Dati / TLC condominiale in Portineria (switch rete, centralini videocitofonici, apparati fibra/TV).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q10",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Predisp. Cancello",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Linea predisposta per alimentazione/comando locale cancello motorizzato da Portineria.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Luci Esterne Ingresso",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge il circuito di illuminazione esterna dell'ingresso principale, commutato automaticamente dall'orologio astronomico OR11 tramite il contattore K11.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "OR11",
            "K11"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "OR11",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Orologio Astronomico",
          "ratingBadge": "230Vac · Astro",
          "brandModel": "Vemer ASTline VE344800 Interruttore orario crepuscolare astronomico digitale 2 moduli",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Calcola automaticamente l'ora di tramonto e alba sulle coordinate geografiche locali e pilota la bobina del contattore K11 per accendere e spegnere le luci esterne di ingresso.",
          "cable": "Ausiliario L.Q11",
          "relatedIds": [
            "Q11",
            "K11"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "normal"
        },
        {
          "id": "K11",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Contattore Luci Est.",
          "ratingBadge": "1NO 25A · Bob. 230V",
          "brandModel": "BTicino FT1A1N230M Contattore modulare 1NO 25A con comando manuale",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta la potenza verso i corpi illuminanti esterni su ordine dell'orologio astronomico OR11, evitando l'usura del micro-relè interno dell'orologio.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q11",
            "OR11"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FT1A",
          "vvfState": "normal"
        },
        {
          "id": "Q12",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore di riserva già cablato a monte per futuri circuiti ausiliari di Portineria.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        },
        {
          "id": "Q13",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore di riserva da 16A già cablato a monte per future prese o apparecchiature in Portineria.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "normal"
        }
      ]
    },
    {
      "order": 3,
      "slug": "qe-ssc",
      "code": "QE.SSC",
      "title": "Quadro Generale Servizi Supercondominiali & Sezione Autorimessa/Box",
      "nodeId": "QESSC",
      "plantId": "IMP-SSC",
      "plantLabel": "1 · Supercondominio",
      "swatch": "ssc",
      "location": {
        "buildingZone": "Torre A — Locali Tecnici & Contatori Piano -1",
        "floor": "Piano Primo Interrato (-1 · -3,2 m)",
        "room": "Locale Contatori Scala A",
        "mounting": "Armadio metallico autoportante a pavimento H=2013 mm con porta in vetro e colonna laterale SX risalita cavi",
        "whereHowToFind": "Posizionato a pavimento nel Locale Contatori Scala A al Piano -1 (corsello sud sotto Torre A, tra il Box 66.1 e il Box 64.1 — tavola PL.04), sulla parete sinistra entrando dalla porta, subito a fianco dell'armadio QESC-A e di fronte ai gruppi UPS 1 e UPS 2 (riceve il montante da AVSSC tramite il cavidotto interrato Ø160 di PL.12.1)."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB Serie E-Power H1900 (colonna apparecchi 36 moduli + vano risalita cavi laterale SX + zoccolo)",
        "dimensionsMm": "2013 × 1315 × 447 mm",
        "heightMm": 2013,
        "widthMm": 1315,
        "depthMm": 447,
        "ipRating": "IP65",
        "ral": "RAL 7035",
        "doorType": "Porta trasparente in vetro temperato su colonna apparecchiature + anta cieca vano cavi SX",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "250 A (Sbarre 400 A)",
        "shortCircuitIcc": "15 kA",
        "auxVoltage": "230 Vac · 24 Vac SELV (da UPS2 per sgancio VVF)",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Avanquadro Servizi Supercondominiali AVSSC (Interruttore Q2 · 250A)",
        "detail": "Cavi unipolari FG16OM16 3×(1×150/185) + 1×150/185N + PE provenienti dall'interruttore Q2 di AVSSC.",
        "panelSlug": "avssc",
        "panelComp": "Q2",
        "mapNodeId": "AVSSC",
        "mapPlantId": "IMP-SSC"
      },
      "downstreamPanels": [
        {
          "code": "QE.CT",
          "label": "Quadro Centrale Tecnologica (Piano -2)",
          "viaComp": "Q3",
          "panelSlug": "qe-ct"
        },
        {
          "code": "QE.CI",
          "label": "Quadro Centrale Idrica Sanitaria (Piano -1)",
          "viaComp": "Q4",
          "panelSlug": "qe-ci"
        },
        {
          "code": "QE.LP",
          "label": "Quadro Locale Pompe Acqua di Falda & BMS (Piano -2)",
          "viaComp": "Q5",
          "panelSlug": "qe-lp"
        }
      ],
      "vvfBehavior": "Architettura di sgancio selettivo VVF a sicurezza positiva (24Vac da UPS2 tramite trasformatore T14 e relè K1): premendo un pulsante di emergenza autorimessa cade il 24Vac e scattano le 3 bobine di minima tensione di Q5 (Locale Pompe QE.LP), Q6 (intera Autorimessa -1/-2 e tutti i 152 Box privati!) e Q7 (rilascio elettromagneti Portoni Tagliafuoco EI), lasciando invece attive le centrali non soggette al compartimento autorimessa.",
      "bays": {
        "leftBay": {
          "title": "Vano Risalita Cavi SX",
          "subtitle": "Morsettiere verticali potenza, comandi e UPS",
          "slots": [
            "X1",
            "X2",
            "XUPS"
          ]
        },
        "mainBay": {
          "title": "Colonna Apparecchiature 36 Moduli (9 pannelli frontali: 250+200+300+6×200 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 (250 mm) · Sezionatore Generale di Quadro",
              "heightMm": 250,
              "isReserve": false,
              "slots": [
                "Q1"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (200 mm) · Partenza Scatolata Locale Pompe (Sotto Sgancio VVF)",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q5"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (300 mm) · SPD, Fusibili Misura/SPD, Multimetro e Montanti Centrali",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "SC1",
                "F1",
                "F2",
                "M1",
                "Q2",
                "Q3",
                "Q4"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Sezione Autorimessa Q6, Pompe Meteo e Box Piano -1",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q6",
                "RP1",
                "Q6.1",
                "Q6.2",
                "Q6.3",
                "Q6.4"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Box Piano -2, Prese Garage, Luci Rampa e Corsello -1",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q6.5",
                "Q6.6",
                "Q6.7",
                "Q6.8",
                "OR6.8",
                "K6.8",
                "SA6.8",
                "Q6.8.1",
                "Q6.8.2",
                "OR6.8.2",
                "K6.8.2",
                "SA6.8.2",
                "F6.8.1",
                "F6.8.2",
                "Q6.9",
                "Q6.9.1",
                "TS6.9.1",
                "K6.9.1",
                "SA6.9.1",
                "Q6.9.2",
                "K6.9.2"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 6 (200 mm) · Ausiliari Corsello -1, Luci Corsello -2, UPS1 e Luci Esterne",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "KIR6",
                "SA6.9.2",
                "F6.9.3",
                "F6.9.4",
                "Q6.10",
                "Q6.10.1",
                "TS6.10.1",
                "K6.10.1",
                "SA6.10.1",
                "Q6.10.2",
                "K6.10.2",
                "KIR10",
                "SA6.10.2",
                "F6.10.3",
                "F6.10.4",
                "Q6.11",
                "Q6.12",
                "Q8",
                "K8",
                "K8.1",
                "Q9",
                "K9",
                "K9.1",
                "OR8",
                "SA8"
              ]
            },
            {
              "id": "R7",
              "title": "Pannello 7 (200 mm) · Orologio Esterno, Videocitofono, UPS2 e Logica Sgancio VVF 24Vac",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "OR9",
                "SA9",
                "Q10",
                "Q11",
                "Q12",
                "Q13",
                "Q14",
                "Q7",
                "F14",
                "T14",
                "F3",
                "K1"
              ]
            },
            {
              "id": "R8",
              "title": "Pannello 8 (200 mm) · Riserva Modulare",
              "heightMm": 200,
              "isReserve": true,
              "note": "Guida DIN libera per ampliamenti futuri",
              "slots": []
            },
            {
              "id": "R9",
              "title": "Pannello 9 (200 mm) · Riserva Modulare Inferiore",
              "heightMm": 200,
              "isReserve": true,
              "note": "Guida DIN libera / fondo armadio",
              "slots": []
            }
          ]
        },
        "rightBay": {
          "title": "Sbarre & TA Interni (Retro Q1)",
          "subtitle": "4 Trasformatori Amperometrici 250/5A",
          "slots": [
            "TA1",
            "TA2",
            "TA3",
            "TA4"
          ]
        }
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 6,
          "bayLabel": "Pannello 1 (250 mm)",
          "shortLabel": "Sezionatore Generale",
          "ratingBadge": "4P 400A · Icc 36kA",
          "brandModel": "ABB SACE Tmax XT5D 400A 4P Fisso (1SDA054600R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale sottocarico del quadro QE.SSC: alimenta il sistema di sbarre principali in rame da 400A (Icw 15kA) da cui derivano tutte le centrali tecnologiche, l'autorimessa e i servizi comuni.",
          "cable": "Sbarra flessibile 20×1×3 (250A)",
          "relatedIds": [
            "TA1",
            "TA2",
            "TA3",
            "TA4",
            "SC1",
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "normal"
        },
        {
          "id": "Q5",
          "kind": "mccb",
          "modules": 6,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Montante → QE.LP",
          "ratingBadge": "MCCB 4P 160/250A + Sgancio VVF",
          "brandModel": "ABB SACE Tmax XT3N 250 TMD 160A 4P + Bobina minima tensione 24-30Vac/dc (1SDA068064R1 + 1SDA066322R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il montante di grande potenza verso il Quadro Locale Pompe Acqua di Falda (QE.LP, Piano -2). Dotato di bobina di minima tensione 24Vac pilotata da K1 per lo sgancio automatico di emergenza VVF.",
          "cable": "FG16OM16 3×(1×120) + 1×120N + 1×70PE mm²",
          "relatedIds": [
            "K1",
            "T14",
            "F3"
          ],
          "targetPanelSlug": "qe-lp",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "SC1",
          "kind": "spd",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Scaricatore Fulmini",
          "ratingBadge": "SPD Tipo 1+2 · Iimp 50kA",
          "brandModel": "DEHN DEHNshield DSH TT 255 FM (941 315) Scaricatore combinato spinterometrico Tipo 1+2",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'intero sistema di sbarre del supercondominio e le apparecchiature elettroniche a valle dalle sovratensioni da fulmine (10/350 µs) e di manovra, scaricando verso il collettore equipotenziale di terra.",
          "cable": "FS17 25 mm² + Ingresso Terra diretto",
          "relatedIds": [
            "F1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DEHN-941315",
          "vvfState": "vital"
        },
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Prot. Scaricatore SC1",
          "ratingBadge": "3P+N 22×58 · 125A gG",
          "brandModel": "Legrand 021605 Portafusibile sezionatore 3P+N per cartucce cilindriche 22×58 da 125A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge da cortocircuito franco di fine vita la derivazione dalle sbarre 400A verso lo scaricatore di sovratensione SC1 e consente di sezionarlo in sicurezza per manutenzione.",
          "cable": "FS17 25 mm²",
          "relatedIds": [
            "SC1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Prot. Multimetro M1",
          "ratingBadge": "3P+N 10×38 · 2A gG",
          "brandModel": "ABB M204743 Portafusibile sezionatore 3P+N 32A con cartucce 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge le tre prese voltmetriche di fase (L1, L2, L3) e l'alimentazione ausiliaria 230Vac dello strumento di misura multifunzione digitale M1.",
          "cable": "FS17 2,5 / 1,5 mm²",
          "relatedIds": [
            "M1",
            "TA2",
            "TA3",
            "TA4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "M1",
          "kind": "meter",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Wattmetro Trifase",
          "ratingBadge": "V / A / kW / kWh / cosφ",
          "brandModel": "Vemer EV3M-4DIN (VE333100) Analizzatore di rete / wattmetro trifase digitale 4 moduli DIN",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura in tempo reale tensioni concatenate/stellate, correnti di linea (tramite TA2, TA3, TA4 da 250/5A), potenze attive/reattive, fattore di potenza ed energia assorbita dai servizi supercondominiali.",
          "cable": "Ingressi voltmetrici da F2 · Amperometrici da TA2-TA4",
          "relatedIds": [
            "F2",
            "TA2",
            "TA3",
            "TA4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "normal"
        },
        {
          "id": "Q2",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Rifasamento Autom.",
          "ratingBadge": "MCCB 3P 100/160A + Diff.",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD 100A 3P + Relè differenziale RC Sel (1SDA066807R1 + 1SDA067123R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la batteria automatica di condensatori del Quadro di Rifasamento Automatico trifase (asservito al segnale amperometrico di TA1).",
          "cable": "FG16OM16 4G35 mm²",
          "relatedIds": [
            "TA1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "normal"
        },
        {
          "id": "Q3",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Montante → QE.CT",
          "ratingBadge": "MCCB 4P 80/160A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD 80-800 4P (1SDA066817R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase che scende al Piano -2 per alimentare il Quadro Centrale Tecnologica (QE.CT: pompe circolazione, trattamento acqua e supervisione).",
          "cable": "FG16OM16 5G16 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-ct",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "normal"
        },
        {
          "id": "Q4",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Montante → QE.CI",
          "ratingBadge": "MCCB 4P 80/160A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD 80-800 4P (1SDA066817R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase verso il Piano -1 che alimenta il Quadro Centrale Idrica Sanitaria (QE.CI: gruppi di pressurizzazione acqua potabile GP1 e GP2).",
          "cable": "FG16OM16 5G16 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-ci",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "normal"
        },
        {
          "id": "Q6",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Generale Autorimessa & Box",
          "ratingBadge": "4P C63 · 15kA + Sgancio VVF",
          "brandModel": "ABB S204P-C63 4P 15kA + Bobina di minima tensione 24Vac (S590846 + A428398)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore Generale della Sezione Autorimessa: alimenta tramite il ripartitore RP1 tutte le linee luce/prese corselli, rampa, pompe meteo PS1/PS2 e TUTTI i 152 Box auto privati (Q6.3–Q6.6). In caso di emergenza VVF la bobina 24Vac sgancia istantaneamente l'intera autorimessa e tutti i box.",
          "cable": "FS17 16 mm² verso RP1",
          "relatedIds": [
            "RP1",
            "Q6.1",
            "Q6.2",
            "Q6.3",
            "Q6.4",
            "Q6.5",
            "Q6.6",
            "K1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Ripartitore Garage",
          "ratingBadge": "Morsettiera 4P · 125A",
          "brandModel": "Ripartitore modulare tetrapolare isolato 125A della sezione sotto sgancio Autorimessa",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Distribuisce l'alimentazione sezionabile sotto sgancio VVF proveniente da Q6 a tutte le partenze Q6.1 ÷ Q6.12 dei piani interrati -1 e -2.",
          "cable": "Sbarra sezione Q6",
          "relatedIds": [
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "Q6.1",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Pompa Meteo PS1",
          "ratingBadge": "4P D20 · 300mA A · 15kA",
          "brandModel": "ABB S204P-D20 + Blocco diff. DDA204 A-25/0,3A (S591812 + B427986)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il quadro dell'elettropompa sommersa acque meteoriche PS1 a servizio delle rampe/autorimessa.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [
            "Q6",
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.2",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Pompa Meteo PS2",
          "ratingBadge": "4P D20 · 300mA A · 15kA",
          "brandModel": "ABB S204P-D20 + Blocco diff. DDA204 A-25/0,3A (S591812 + B427986)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il quadro dell'elettropompa sommersa acque meteoriche PS2.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [
            "Q6",
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.3",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Box Privati P.-1 (Circ.1)",
          "ratingBadge": "4P C16 · 30mA A · 15kA",
          "brandModel": "ABB S204P-C16 + Blocco diff. DDA204 A-25/0,03A (S590785 + B427980)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase (distribuita sulle 3 fasi) per prese e punti luce interni dei Box auto privati del Piano 1° Interrato — Circuito 1 (sotto sgancio VVF tramite Q6).",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "Q6",
            "RP1",
            "Q6.4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.4",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Box Privati P.-1 (Circ.2)",
          "ratingBadge": "4P C16 · 30mA A · 15kA",
          "brandModel": "ABB S204P-C16 + Blocco diff. DDA204 A-25/0,03A (S590785 + B427980)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase per prese e punti luce interni dei Box auto privati del Piano 1° Interrato — Circuito 2 (sotto sgancio VVF tramite Q6).",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "Q6",
            "RP1",
            "Q6.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.5",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Box Privati P.-2 (Circ.1)",
          "ratingBadge": "4P C16 · 30mA A · 15kA",
          "brandModel": "ABB S204P-C16 + Blocco diff. DDA204 A-25/0,03A (S590785 + B427980)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase per prese e punti luce interni dei Box auto privati del Piano 2° Interrato — Circuito 1 (sotto sgancio VVF tramite Q6).",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "Q6",
            "RP1",
            "Q6.6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.6",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Box Privati P.-2 (Circ.2)",
          "ratingBadge": "4P C16 · 30mA A · 15kA",
          "brandModel": "ABB S204P-C16 + Blocco diff. DDA204 A-25/0,03A (S590785 + B427980)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase per prese e punti luce interni dei Box auto privati del Piano 2° Interrato — Circuito 2 (sotto sgancio VVF tramite Q6).",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "Q6",
            "RP1",
            "Q6.5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Autorimessa",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio comuni installate lungo i corselli dell'autorimessa.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Gen. Luce Rampa",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore capogruppo dell'illuminazione Rampa Autorimessa: alimenta i sotto-circuiti Q6.8.1 (notturna), Q6.8.2 (biregime), F6.8.1 (emergenza rampa) e F6.8.2 (ausiliari orologi).",
          "cable": "Interno verso K6.8 / F6.8.1 / F6.8.2",
          "relatedIds": [
            "OR6.8",
            "K6.8",
            "Q6.8.1",
            "Q6.8.2",
            "F6.8.1",
            "F6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "OR6.8",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Astro Luce Rampa",
          "ratingBadge": "Astronomico 230V",
          "brandModel": "Vemer ASTline VE344800 Interruttore orario astronomico",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comanda in automatico (tramite selettore SA6.8 e contattore K6.8) l'accensione crepuscolare dell'illuminazione rampa autorimessa.",
          "cable": "Protetto da F6.8.2",
          "relatedIds": [
            "F6.8.2",
            "SA6.8",
            "K6.8",
            "Q6.8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "K6.8",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Contatt. Luce Rampa",
          "ratingBadge": "2P 20A · Man/Auto",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A 230Vac",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Inserisce la linea di potenza per le luci della rampa autorimessa su comando di OR6.8 o forzatura manuale di SA6.8.",
          "cable": "Interno da Q6.8 verso Q6.8.1/Q6.8.2",
          "relatedIds": [
            "Q6.8",
            "OR6.8",
            "SA6.8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA6.8",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Sel. Rampa 1-0-2",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore modulare 16A I-0-II (M093873)",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Selettore frontale a 3 posizioni per impostare le luci rampa in Automatico (da orologio OR6.8), Spento (0) o Manuale fisso.",
          "cable": "Circuito comando K6.8",
          "relatedIds": [
            "OR6.8",
            "K6.8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.8.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Notturna Rampa",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico compatto 1P+N + contatto ausiliario SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il ramo base dell'illuminazione notturna della rampa carraia. Se scatta, il contatto ausiliario fa intervenire la luce di emergenza rampa.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.8",
            "K6.8",
            "F6.8.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.8.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Biregime Rampa",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico compatto 1P+N + contatto ausiliario SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il secondo circuito (biregime) delle luci rampa, parzializzato nelle ore notturne profonde tramite OR6.8.2 e K6.8.2.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.8",
            "OR6.8.2",
            "K6.8.2",
            "SA6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "OR6.8.2",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Orologio Biregime Rampa",
          "ratingBadge": "Digitale Settimanale",
          "brandModel": "Vemer Simply-W VE513800 Orologio digitale settimanale",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Programma le fasce orarie di spegnimento parziale notturno (biregime) della rampa pilotando il contattore K6.8.2.",
          "cable": "Protetto da F6.8.2",
          "relatedIds": [
            "F6.8.2",
            "SA6.8.2",
            "K6.8.2",
            "Q6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "K6.8.2",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Contatt. Bireg. Rampa",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il circuito luci biregime rampa a valle di Q6.8.2 secondo il programma di OR6.8.2 o del selettore SA6.8.2.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.8.2",
            "OR6.8.2",
            "SA6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA6.8.2",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Sel. Bireg. Rampa",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore modulare 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il circuito luci biregime rampa tra funzionamento Automatico (orologio OR6.8.2), Spento (0) e Manuale continuo.",
          "cable": "Comando K6.8.2",
          "relatedIds": [
            "OR6.8.2",
            "K6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F6.8.1",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luci Emerg. Rampa",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge la linea dedicata alle lampade di emergenza della rampa autorimessa (in serie ai contatti ausiliari di Q6.8.1 e Q6.8.2 per accensione automatica anche in caso di scatto locale).",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q6.8",
            "Q6.8.1",
            "Q6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "F6.8.2",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prot. Ausiliari Rampa",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge il circuito ausiliario 230Vac che alimenta l'orologio astronomico OR6.8, l'orologio settimanale OR6.8.2, i selettori SA6.8/SA6.8.2 e le bobine dei contattori K6.8/K6.8.2.",
          "cable": "FS17 1,5 mm²",
          "relatedIds": [
            "OR6.8",
            "OR6.8.2",
            "K6.8",
            "K6.8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.9",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Gen. Luce Corsello -1",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale illuminazione Corsello Box Piano 1° Interrato (-1): alimenta i rami temporizzato (Q6.9.1), notturno/sensori (Q6.9.2), emergenza (F6.9.3) e ausiliari (F6.9.4).",
          "cable": "Interno gruppo Q6.9",
          "relatedIds": [
            "Q6.9.1",
            "Q6.9.2",
            "F6.9.3",
            "F6.9.4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.9.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Temp. Corsello -1",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito luce temporizzata del corsello box al Piano -1 (commutato da K6.9.1).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "Q6.9",
            "TS6.9.1",
            "K6.9.1",
            "SA6.9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TS6.9.1",
          "kind": "timer",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Temp. Luce Corsello -1",
          "ratingBadge": "Temporizzatore Scale",
          "brandModel": "ABB E232-230 Temporizzatore luce scale 230Vac",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Riceve i comandi dai pulsanti luminosi del corsello Piano -1 e mantiene eccitato per il tempo impostato il contattore K6.9.1.",
          "cable": "Protetto da F6.9.4",
          "relatedIds": [
            "F6.9.4",
            "K6.9.1",
            "SA6.9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K6.9.1",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Contatt. Temp. -1",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Alimenta le plafoniere temporizzate del corsello box Piano -1 su comando di TS6.9.1 o SA6.9.1.",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "Q6.9.1",
            "TS6.9.1",
            "SA6.9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA6.9.1",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Sel. Temp. Cors. -1",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-202 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Seleziona il modo Automatico (pulsanti/temporizzatore TS6.9.1), Spento o Accensione fissa manuale per la luce temporizzata corsello Piano -1.",
          "cable": "Comando K6.9.1",
          "relatedIds": [
            "TS6.9.1",
            "K6.9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.9.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Nott. Corsello -1",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito luce notturna / presenza del corsello box Piano -1 (commutato da K6.9.2).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.9",
            "K6.9.2",
            "KIR6",
            "SA6.9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K6.9.2",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Contatt. Nott. -1",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta l'illuminazione notturna del corsello box Piano -1 su comando dei rilevatori IR (KIR6) o del selettore SA6.9.2.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.9.2",
            "KIR6",
            "SA6.9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "KIR6",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Relè Sensori IR -1",
          "ratingBadge": "2P 20A · Rilev. IR",
          "brandModel": "ABB EN20-20N-06 Contattore ausiliario interfaccia sensori presenza IR corsello -1",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Ripete il segnale dei sensori di movimento infrarossi del corsello box Piano -1 per comandare il contattore luci K6.9.2.",
          "cable": "Morsettiera X2 · Protetto da F6.9.4",
          "relatedIds": [
            "F6.9.4",
            "K6.9.2",
            "SA6.9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA6.9.2",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Sel. Nott. Cors. -1",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-202 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta la luce notturna corsello Piano -1 tra Automatico (sensori IR KIR6), Spento (0) e Manuale fisso.",
          "cable": "Comando K6.9.2",
          "relatedIds": [
            "KIR6",
            "K6.9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F6.9.3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Emerg. Cors. -1",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge la linea dedicata agli apparecchi autonomi di illuminazione di emergenza del corsello box Piano 1° Interrato.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q6.9",
            "Q6.9.1",
            "Q6.9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "F6.9.4",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Prot. Aus. Cors. -1",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge il circuito ausiliario 230Vac di comando luci del corsello Piano -1 (temporizzatore TS6.9.1, sensori IR/KIR6, selettori e bobine K6.9.1/K6.9.2).",
          "cable": "FS17 1,5 mm²",
          "relatedIds": [
            "Q6.9",
            "TS6.9.1",
            "KIR6",
            "K6.9.1",
            "K6.9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.10",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Gen. Luce Corsello -2",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale illuminazione Corsello Box Piano 2° Interrato (-2): alimenta Q6.10.1, Q6.10.2, F6.10.3 e F6.10.4.",
          "cable": "Interno gruppo Q6.10",
          "relatedIds": [
            "Q6.10.1",
            "Q6.10.2",
            "F6.10.3",
            "F6.10.4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.10.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Temp. Corsello -2",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito luce temporizzata del corsello box al Piano -2 (commutato da K6.10.1).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "Q6.10",
            "TS6.10.1",
            "K6.10.1",
            "SA6.10.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TS6.10.1",
          "kind": "timer",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Temp. Luce Corsello -2",
          "ratingBadge": "Temporizzatore Scale",
          "brandModel": "ABB E232-230 Temporizzatore luce scale 230Vac",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Gestisce l'accensione temporizzata da pulsanti per il corsello box Piano -2 pilotando il contattore K6.10.1.",
          "cable": "Protetto da F6.10.4",
          "relatedIds": [
            "F6.10.4",
            "K6.10.1",
            "SA6.10.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K6.10.1",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Temp. -2",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta la linea luci temporizzate del corsello box Piano -2.",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "Q6.10.1",
            "TS6.10.1",
            "SA6.10.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA6.10.1",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Sel. Temp. Cors. -2",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-202 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Seleziona Automatico / 0 / Manuale per la luce temporizzata del corsello box Piano -2.",
          "cable": "Comando K6.10.1",
          "relatedIds": [
            "TS6.10.1",
            "K6.10.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.10.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Nott. Corsello -2",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito luce notturna / presenza del corsello box Piano -2.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.10",
            "K6.10.2",
            "KIR10",
            "SA6.10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K6.10.2",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Nott. -2",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta la linea luci notturne del corsello box Piano -2.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q6.10.2",
            "KIR10",
            "SA6.10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "KIR10",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Relè Sensori IR -2",
          "ratingBadge": "2P 20A · Rilev. IR",
          "brandModel": "ABB EN20-20N-06 Contattore ausiliario interfaccia sensori IR corsello -2",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Interfaccia i rilevatori di presenza IR del corsello Piano -2 per comandare il contattore K6.10.2.",
          "cable": "Morsettiera X2 · Protetto da F6.10.4",
          "relatedIds": [
            "F6.10.4",
            "K6.10.2",
            "SA6.10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA6.10.2",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Sel. Nott. Cors. -2",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-202 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Seleziona Automatico / 0 / Manuale per la luce notturna del corsello box Piano -2.",
          "cable": "Comando K6.10.2",
          "relatedIds": [
            "KIR10",
            "K6.10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F6.10.3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Emerg. Cors. -2",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge la linea dedicata alle lampade di emergenza del corsello box Piano 2° Interrato (nota: sullo schema foglio 8.F il cartiglio riporta per refuso 'Piano I° Interrato', ma è derivato da L2.Q6.10 Piano II° Interrato).",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q6.10",
            "Q6.10.1",
            "Q6.10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "F6.10.4",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Prot. Aus. Cors. -2",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge il circuito ausiliario 230Vac di comando luci del corsello Piano -2 (TS6.10.1, sensori IR/KIR10, selettori e bobine K6.10.1/K6.10.2).",
          "cable": "FS17 1,5 mm²",
          "relatedIds": [
            "Q6.10",
            "TS6.10.1",
            "KIR10",
            "K6.10.1",
            "K6.10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Ingresso Rete → UPS 1",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta da rete ordinaria l'ingresso del soccorritore UPS 1 dedicato ai Portoni Tagliafuoco dell'autorimessa (l'uscita tamponata rientra in morsettiera XUPS verso Q7).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "XUPS",
            "Q7"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6.12",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Scorta Autorimessa",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Circuito di riserva sulla sbarra sotto sgancio dell'autorimessa.",
          "cable": "Riserva",
          "relatedIds": [
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Percorsi Pedonali",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + Blocco diff. DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge la linea di illuminazione dei percorsi pedonali esterni al Piano Terra (rami notturno K8 e biregime K8.1).",
          "cable": "FG16OM16 3G4 / 3G2,5 mm²",
          "relatedIds": [
            "K8",
            "K8.1",
            "OR8",
            "OR9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "K8",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Pedonali Nott.",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il circuito luci notturne dei percorsi pedonali Piano Terra su comando dell'orologio astronomico OR8 e selettore SA8.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q8",
            "OR8",
            "SA8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "K8.1",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Pedonali Bireg.",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Parzializza il ramo biregime dei percorsi pedonali nelle ore centrali della notte su comando di OR9 e SA9.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q8",
            "OR9",
            "SA9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q9",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Area Esterna",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + Blocco diff. DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge i circuiti di illuminazione dell'area esterna condominiale (rami notturno K9 e biregime K9.1).",
          "cable": "FG16OM16 3G4 / 3G2,5 mm²",
          "relatedIds": [
            "K9",
            "K9.1",
            "OR8",
            "OR9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "K9",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Area Est. Nott.",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB ESB20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta l'illuminazione notturna dell'area esterna su comando dell'astronomico OR8 e SA8.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q9",
            "OR8",
            "SA8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "K9.1",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Area Est. Bireg.",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB ESB20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il ramo biregime dell'illuminazione area esterna su comando dell'orologio settimanale OR9 e SA9.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q9",
            "OR9",
            "SA9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "OR8",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Astro Luci Esterne",
          "ratingBadge": "Astronomico 230V",
          "brandModel": "Vemer ASTline VE344800 Interruttore orario astronomico",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comanda al tramonto/alba l'accensione dei contattori K8 (percorsi pedonali) e K9 (area esterna).",
          "cable": "Alimentato da Q10",
          "relatedIds": [
            "Q10",
            "SA8",
            "K8",
            "K9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "normal"
        },
        {
          "id": "SA8",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Sel. Luci Est. Base",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Seleziona funzionamento Automatico (OR8), Spento o Manuale per l'illuminazione notturna esterna e pedonale.",
          "cable": "Comando K8 / K9",
          "relatedIds": [
            "OR8",
            "K8",
            "K9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "OR9",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Orologio Bireg. Esterno",
          "ratingBadge": "Digitale Settimanale",
          "brandModel": "Vemer Simply-W VE513800 Orologio digitale settimanale",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Gestisce la riduzione notturna (biregime) dei percorsi pedonali e area esterna comandando K8.1 e K9.1.",
          "cable": "Alimentato da Q10",
          "relatedIds": [
            "Q10",
            "SA9",
            "K8.1",
            "K9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "normal"
        },
        {
          "id": "SA9",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Sel. Bireg. Esterno",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Seleziona Automatico (OR9), Spento o Manuale per i circuiti biregime esterni.",
          "cable": "Comando K8.1 / K9.1",
          "relatedIds": [
            "OR9",
            "K8.1",
            "K9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q10",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Ausiliari Luci Esterne",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge ed alimenta il circuito ausiliario degli orologi OR8, OR9, selettori SA8, SA9 e bobine dei contattori K8, K8.1, K9, K9.1.",
          "cable": "FS17 2,5 / 1,5 mm²",
          "relatedIds": [
            "OR8",
            "OR9",
            "SA8",
            "SA9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Videocitofono Comuni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge gli alimentatori/postazioni principali dell'impianto videocitofonico digitale delle parti comuni.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-VDP",
          "vvfState": "normal"
        },
        {
          "id": "Q12",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore di riserva da 16A sulle sbarre ordinarie di QE.SSC.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q13",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore di riserva da 10A sulle sbarre ordinarie di QE.SSC.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q14",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Ingresso Rete → UPS 2",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta l'ingresso rete del soccorritore UPS 2 dedicato a mantenere in vita senza interruzioni il circuito di sgancio emergenza VVF 24Vac dell'autorimessa.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "XUPS",
            "F14",
            "T14"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "Q7",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Portoni Tagliafuoco",
          "ratingBadge": "2P C10 + Sgancio VVF 24V",
          "brandModel": "ABB S202 C10 2P 6kA + Bobina di minima tensione 24Vac (S465700 + A428398)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimentato dall'uscita tamponata di UPS 1 (morsettiera XUPS): alimenta i magneti di ritenuta dei Portoni Tagliafuoco EI dell'autorimessa. All'azionamento del pulsante di sgancio VVF la bobina a minima tensione apre Q7 facendo chiudere i portoni EI.",
          "cable": "FG16OM16 3G2,5 mm² da XUPS",
          "relatedIds": [
            "Q6.11",
            "XUPS",
            "K1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F14",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Prot. Primario T14 (UPS2)",
          "ratingBadge": "1P+N 10×38 · 4A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 4A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Alimentato dall'uscita di continuità UPS 2 (cablaggio arancio): protegge l'avvolgimento primario a 230Vac del trasformatore di sicurezza T14 per il circuito di sgancio VVF.",
          "cable": "FS17 2,5 mm² da XUPS",
          "relatedIds": [
            "Q14",
            "XUPS",
            "T14",
            "F3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "T14",
          "kind": "transformer",
          "modules": 3,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Trasf. Sgancio VVF",
          "ratingBadge": "63VA · 230 / 24Vac SELV",
          "brandModel": "ABB TS 63/12-24 C (M429287) Trasformatore di sicurezza modulare 63VA",
          "roleTitle": "COSA ALIMENTA",
          "whatItDoes": "Genera la bassissima tensione di sicurezza 24Vac (sotto continuità UPS 2) per la catena serie dei pulsanti di sgancio emergenza VVF dell'autorimessa e per il relè K1.",
          "cable": "Primario da F14 · Secondario verso F3",
          "relatedIds": [
            "F14",
            "F3",
            "K1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "F3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Prot. Secondario 24V VVF",
          "ratingBadge": "1P+N 10×38 · 4A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 4A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge il circuito secondario a 24Vac in uscita da T14 che percorre i pulsanti a rottura vetro di sgancio emergenza autorimessa (su morsettiera XUPS) ed eccita K1 e le bobine di minima tensione.",
          "cable": "2×(1×1,5) mm² circuito 24Vac VVF",
          "relatedIds": [
            "T14",
            "K1",
            "Q5",
            "Q6",
            "Q7"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "K1",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Relè Sgancio VVF 24V",
          "ratingBadge": "2P 20A · Bobina 24Vac",
          "brandModel": "ABB ESB20-20N-01 Contattore ausiliario 24Vac per sgancio emergenza autorimessa",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Mantenuto normalmente eccitato a 24Vac attraverso la serie NC dei pulsanti VVF: all'apertura di un qualsiasi pulsante cade e toglie tensione (24VEM) alle bobine di minima tensione di Q5 (QE.LP), Q6 (Autorimessa e 152 Box) e Q7 (Portoni EI).",
          "cable": "Circuito sicurezza positiva 24Vac",
          "relatedIds": [
            "F3",
            "T14",
            "Q5",
            "Q6",
            "Q7"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Vano Risalita Cavi SX",
          "shortLabel": "Morsettiera Potenza X1",
          "ratingBadge": "Potenza & Utenze",
          "brandModel": "Morsettiera componibile su guida DIN verticale per linee di potenza e partenze",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta ordinatamente tutti i cavi multipolari in partenza da QE.SSC verso le centrali (QE.CT, QE.CI), i 4 circuiti box (Q6.3–Q6.6), le pompe meteo, le luci corselli/esterne e gli ingressi UPS.",
          "cable": "Vano cavi SX (Fogli 17-19)",
          "relatedIds": [
            "Q6.3",
            "Q6.4",
            "Q6.5",
            "Q6.6"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "X2",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Vano Risalita Cavi SX",
          "shortLabel": "Morsettiera Segnali X2",
          "ratingBadge": "Comandi, Pulsanti, IR, TA",
          "brandModel": "Morsettiera ausiliaria su guida DIN per comandi remoti e segnali",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta i circuiti pulsanti luce corselli, i sensori di presenza infrarossi (IR) dei piani -1 e -2 e il segnale amperometrico TA1 per il quadro di rifasamento.",
          "cable": "Vano cavi SX (Foglio 20)",
          "relatedIds": [
            "TA1",
            "KIR6",
            "KIR10"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "XUPS",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Vano Risalita Cavi SX",
          "shortLabel": "Morsettiera Sicurezza XUPS",
          "ratingBadge": "Linee UPS1, UPS2 & VVF",
          "brandModel": "Morsettiera segregata circuiti con alimentazione separata (colore arancio)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Segrega i circuiti alimentati da sorgente esterna (rimangono in tensione anche a Q1 aperto!): ritorni 230Vac da UPS 1 (portoni EI) e UPS 2 (trasformatore T14) e anello pulsanti di sgancio VVF.",
          "cable": "Vano cavi SX (Foglio 21)",
          "relatedIds": [
            "Q6.11",
            "Q7",
            "Q14",
            "F14",
            "K1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-CAVO-FTG18",
          "vvfState": "vital"
        },
        {
          "id": "TA1",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Sbarre / Retro Q1",
          "shortLabel": "TA Rifasamento",
          "ratingBadge": "250 / 5 A",
          "brandModel": "IME TA32750C250 Trasformatore di corrente 250/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Rileva la corrente sulla fase L1 a valle di Q1 e invia il segnale 0-5A tramite X2 alla centralina del Quadro di Rifasamento Automatico.",
          "cable": "FS17 2,5 mm² verso X2",
          "relatedIds": [
            "Q1",
            "Q2",
            "X2"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "TA2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Sbarre / Retro Q1",
          "shortLabel": "TA Fase L1 → M1",
          "ratingBadge": "250 / 5 A",
          "brandModel": "IME TA32750C250 Trasformatore di corrente 250/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Trasformatore amperometrico sulla fase L1 collegato al wattmetro digitale M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "TA3",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Sbarre / Retro Q1",
          "shortLabel": "TA Fase L2 → M1",
          "ratingBadge": "250 / 5 A",
          "brandModel": "IME TA32750C250 Trasformatore di corrente 250/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Trasformatore amperometrico sulla fase L2 collegato al wattmetro digitale M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "TA4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Sbarre / Retro Q1",
          "shortLabel": "TA Fase L3 → M1",
          "ratingBadge": "250 / 5 A",
          "brandModel": "IME TA32750C250 Trasformatore di corrente 250/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Trasformatore amperometrico sulla fase L3 collegato al wattmetro digitale M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        }
      ]
    },
    {
      "order": 4,
      "slug": "qe-ct",
      "code": "QE.CT",
      "title": "Quadro Elettrico Centrale Tecnologica",
      "nodeId": "QECT",
      "plantId": "IMP-SSC",
      "plantLabel": "1 · Supercondominio",
      "swatch": "ssc",
      "location": {
        "buildingZone": "Sottocentrali Termofrigorifere Interrate",
        "floor": "Piano Secondo Interrato (-2 · -6,4 m)",
        "room": "Centrale Tecnologica",
        "mounting": "Armadio metallico componibile a pavimento a doppia colonna (600 + 400 mm) IP55",
        "whereHowToFind": "Installato a pavimento nella Centrale Tecnologica al Piano -2, accanto a QE.PC e QE-REG. Alimenta tutti i gruppi di pompaggio secondari/primari climatizzazione e ACS (P.01 ÷ P.09), il trattamento acqua/antilegionella, la contabilizzazione e il quadro di supervisione BMS QE-REG."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy M IP55 (Q855B620 + Q855B420)",
        "dimensionsMm": "2149 × 1010 × 250 mm",
        "heightMm": 2149,
        "widthMm": 1010,
        "depthMm": 250,
        "ipRating": "IP55",
        "ral": "RAL 7035",
        "doorType": "Doppia anta: vano risalita cavi SX con porta cieca (400 mm) + colonna apparecchiature DX con porta vetro (600 mm)",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "160 A",
        "shortCircuitIcc": "10 kA (18 kA condiz.)",
        "auxVoltage": "230 Vac · Contatti stato/guasto su X4 verso BMS",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Quadro Generale Servizi Supercondominiali QE.SSC (Interruttore Q3 · 80/160A)",
        "detail": "Linea trifase FG16OM16 5G16 mm² proveniente dall'interruttore scatolato Q3 del quadro QE.SSC.",
        "panelSlug": "qe-ssc",
        "panelComp": "Q3",
        "mapNodeId": "QESSC",
        "mapPlantId": "IMP-SSC"
      },
      "downstreamPanels": [
        {
          "code": "QE-REG",
          "label": "Quadro Regolazione & Supervisione BMS",
          "viaComp": "Q20",
          "panelSlug": "qe-reg"
        }
      ],
      "vvfBehavior": "Locale tecnico compartimentato: segue lo stato della dorsale principale da AVSSC / QE.SSC. Ogni singolo interruttore (Q1 ÷ Q23) è equipaggiato con contatto ausiliario di allarme/stato attestato sulla morsettiera X4 per il telecontrollo sul BMS QE-REG.",
      "bays": {
        "leftBay": {
          "title": "Colonna Risalita Cavi SX (400 mm)",
          "subtitle": "Morsettiere potenza X1 e teleallarmi X4 (80 morsetti)",
          "slots": [
            "X1",
            "X4"
          ]
        },
        "mainBay": {
          "title": "Colonna Apparecchiature DX (600 mm · Testata 100 + Pannello 300 + 7×200 mm)",
          "rows": [
            {
              "id": "R0",
              "title": "Pannello Superiore (100 mm) · Fascia Cieca Testata",
              "heightMm": 100,
              "isReserve": true,
              "note": "Spazio piegatura conduttori ingresso",
              "slots": []
            },
            {
              "id": "R1",
              "title": "Pannello 1 (300 mm · Sup.) · Sezionatore Generale, Ripartitore e Luce Centrale",
              "heightMm": 160,
              "isReserve": false,
              "slots": [
                "Q1",
                "RP1",
                "Q2",
                "F2"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 1 (300 mm · Inf.) · Prese Servizio, Pompe P.01 Scambiatori e Ricircolo ACS P.02/P.03",
              "heightMm": 140,
              "isReserve": false,
              "slots": [
                "Q3",
                "Q4",
                "Q4.1",
                "Q4.2",
                "Q5",
                "Q5.1",
                "Q5.2",
                "Q6",
                "Q7"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 2 (200 mm) · Gruppo Pompe Gemellari P.04 (Circuito PC1-SC1)",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q8",
                "Q8.1",
                "Q8.2"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 3 (200 mm) · Gruppo Pompe Gemellari P.05 (Volano Termico PC1)",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q9",
                "Q9.1",
                "Q9.2"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 4 (200 mm) · Gruppo Pompe Gemellari P.06 (Climatizzazione Locali Comuni Torre B)",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q10",
                "Q10.1",
                "Q10.2"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 5 (200 mm) · Gruppo Pompe Inverter P.07 (Climatizzazione Bassa Pressione)",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q11",
                "Q11.1",
                "Q11.2",
                "Q11.3"
              ]
            },
            {
              "id": "R7",
              "title": "Pannello 6 (200 mm) · Gruppo Pompe Gemellari P.08 (Circuito Primario Alta Pressione)",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q12",
                "Q12.1",
                "Q12.2"
              ]
            },
            {
              "id": "R8",
              "title": "Pannello 7 (200 mm) · Gruppo Pompe Inverter P.09 (Media/Alta Pressione), Pompa Meteo PS3 e Trattamento",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q13",
                "Q13.1",
                "Q13.2",
                "Q13.3",
                "Q14",
                "Q15"
              ]
            },
            {
              "id": "R9",
              "title": "Pannello 8 (200 mm) · Antilegionella, Contabilizzazione, Regolatori, Supervisione QE-REG e Ausiliari",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q16",
                "Q17",
                "Q18",
                "Q19",
                "Q20",
                "Q21",
                "Q22",
                "Q23"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 1 Sup.",
          "shortLabel": "Sezionatore Generale",
          "ratingBadge": "4P 160A · Icc 18kA",
          "brandModel": "ABB SACE Tmax XT1D 160 4P Fisso + contatto ausiliario MAUX (1SDA068209R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale sottocarico del quadro Centrale Tecnologica: alimenta il ripartitore tetrapolare RP1 (160A) e invia lo stato aperto/chiuso/scattato ai morsetti X4.1-2 verso il BMS.",
          "cable": "Ingresso FG16OM16 5G16 mm²",
          "relatedIds": [
            "RP1",
            "X4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "normal"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 4,
          "bayLabel": "Pannello 1 Sup.",
          "shortLabel": "Ripartitore 160A",
          "ratingBadge": "Sbarre 4P · 160A",
          "brandModel": "Ripartitore modulare tetrapolare 160A (Icw 10kA) + Barra PE rame 20×5 mm",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Ripartisce le tre fasi e il neutro a tutti i gruppi pompe e circuiti ausiliari della Centrale Tecnologica.",
          "cable": "FS17 25 mm² da Q1",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 1 Sup.",
          "shortLabel": "Luce Centrale Tecnol.",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto segnalazione S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria della Centrale Tecnologica al Piano -2 e alimenta a valle il fusibile F2 delle lampade di emergenza.",
          "cable": "Uscita morsettiera X1",
          "relatedIds": [
            "F2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 Sup.",
          "shortLabel": "Luce Emergenza C.T.",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con fusibile 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q2: protegge la linea dedicata agli apparecchi illuminanti autonomi di emergenza della Centrale Tecnologica.",
          "cable": "Uscita morsettiera X1",
          "relatedIds": [
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "normal"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Prese Servizio C.T.",
          "ratingBadge": "4P C16 · 30mA A · 10kA",
          "brandModel": "ABB S204M-C16 + DDA204 A-25/0,03A + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il gruppo prese interbloccate CEE 400V/230V di servizio nella Centrale Tecnologica.",
          "cable": "Uscita X1 (FS17 4 mm²)",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Gen. Gruppo P.01/1",
          "ratingBadge": "1P+N C16 · 300mA A",
          "brandModel": "ABB DS201 C16 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale capogruppo del primo banco pompe scambiatore/accumulatore ACS (alimenta Q4.1 e Q4.2).",
          "cable": "Interno verso Q4.1 / Q4.2",
          "relatedIds": [
            "Q4.1",
            "Q4.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q4.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Pompa P.01A/1 ACS",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il circolatore P.01A/1 del circuito accumulatore/scambiatore ACS.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q4.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Pompa P.01B/1 ACS",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il circolatore gemello P.01B/1 del circuito accumulatore/scambiatore ACS.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Gen. Gruppo P.01/2",
          "ratingBadge": "1P+N C16 · 300mA A",
          "brandModel": "ABB DS201 C16 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale capogruppo del secondo banco pompe scambiatore/accumulatore ACS (alimenta Q5.1 e Q5.2).",
          "cable": "Interno verso Q5.1 / Q5.2",
          "relatedIds": [
            "Q5.1",
            "Q5.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q5.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Pompa P.01A/2 ACS",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il circolatore P.01A/2 del secondo circuito accumulatore/scambiatore ACS.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q5.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Pompa P.01B/2 ACS",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il circolatore P.01B/2 del secondo circuito accumulatore/scambiatore ACS.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Pompa P.02 Ricirc. ACS",
          "ratingBadge": "1P+N C10 · 300mA A",
          "brandModel": "ABB DS201 C10 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge l'elettropompa P.02 di ricircolo sanitario ACS (zona Alta Pressione, pilotata dal BMS QE-REG / SA2.5).",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 1 Inf.",
          "shortLabel": "Pompa P.03 Ricirc. ACS",
          "ratingBadge": "1P+N C10 · 300mA A",
          "brandModel": "ABB DS201 C10 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge l'elettropompa P.03 di ricircolo sanitario ACS (zona Bassa Pressione, pilotata dal BMS QE-REG / SA2.6).",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Gen. Gruppo P.04",
          "ratingBadge": "4P C16 · 300mA Tipo B",
          "brandModel": "ABB S204M-C16 + Blocco diff. DDA204 B APR-25/0,3A (Tipo B per inverter)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione generale differenziale Tipo B (specifica per circolatori elettronici a inverter) del gruppo pompe P.04 (alimenta Q8.1 e Q8.2).",
          "cable": "Interno verso Q8.1 / Q8.2",
          "relatedIds": [
            "Q8.1",
            "Q8.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q8.1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Pompa P.04A (PC1-SC1)",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la pompa trifase P.04A del circuito primario ACS / scambiatore PC1-SC1.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q8.2",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Pompa P.04B (PC1-SC1)",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la pompa trifase gemella P.04B del circuito PC1-SC1.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q9",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Gen. Gruppo P.05",
          "ratingBadge": "4P C16 · 300mA Tipo B",
          "brandModel": "ABB S204M-C16 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione generale differenziale Tipo B del gruppo pompe P.05 volano termico / evaporatore PC1 (alimenta Q9.1 e Q9.2).",
          "cable": "Interno verso Q9.1 / Q9.2",
          "relatedIds": [
            "Q9.1",
            "Q9.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q9.1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Pompa P.05A Volano",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la pompa trifase P.05A del volano termico PC1.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q9.2",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Pompa P.05B Volano",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la pompa trifase gemella P.05B del volano termico PC1.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q10",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Gen. Gruppo P.06",
          "ratingBadge": "4P C16 · 300mA Tipo B",
          "brandModel": "ABB S204M-C16 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione generale differenziale Tipo B del gruppo pompe P.06 climatizzazione spazi comuni (alimenta Q10.1 e Q10.2).",
          "cable": "Interno verso Q10.1 / Q10.2",
          "relatedIds": [
            "Q10.1",
            "Q10.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q10.1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Pompa P.06A Spazi Com.",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa P.06A per la climatizzazione dei locali condominiali.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q10"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q10.2",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Pompa P.06B Spazi Com.",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa gemella P.06B per la climatizzazione dei locali condominiali.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q10"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q11",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "MT Gruppo P.07 (B.P.)",
          "ratingBadge": "4P D32 · 10kA",
          "brandModel": "ABB S204M-D32 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione magnetotermica curva D del gruppo pompe secondarie climatizzazione Bassa Pressione P.07 (in serie al differenziale Tipo B Q11.1).",
          "cable": "Serie verso Q11.1",
          "relatedIds": [
            "Q11.1",
            "Q11.2",
            "Q11.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q11.1",
          "kind": "rccb",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Diff. Tipo B P.07",
          "ratingBadge": "4P 40A · 300mA Tipo B",
          "brandModel": "ABB F204 B-40/0,3 Interruttore differenziale puro Tipo B + contatto aux",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge dai guasti a terra in AC e DC liscia gli inverter delle due pompe di rilancio Bassa Pressione Q11.2 (P.07A) e Q11.3 (P.07B).",
          "cable": "Alimenta Q11.2 e Q11.3",
          "relatedIds": [
            "Q11",
            "Q11.2",
            "Q11.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q11.2",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Pompa P.07A Clima B.P.",
          "ratingBadge": "4P D25 · 10kA",
          "brandModel": "ABB S204M-D25 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa a giri variabili P.07A di distribuzione climatizzazione Bassa Pressione alle torri.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q11",
            "Q11.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q11.3",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Pompa P.07B Clima B.P.",
          "ratingBadge": "4P D25 · 10kA",
          "brandModel": "ABB S204M-D25 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa gemella P.07B di distribuzione climatizzazione Bassa Pressione.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q11",
            "Q11.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q12",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Gen. Gruppo P.08",
          "ratingBadge": "4P C16 · 300mA Tipo B",
          "brandModel": "ABB S204M-C16 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione generale differenziale Tipo B del gruppo pompe primario Alta Pressione P.08 (alimenta Q12.1 e Q12.2).",
          "cable": "Interno verso Q12.1 / Q12.2",
          "relatedIds": [
            "Q12.1",
            "Q12.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q12.1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Pompa P.08A Prim. A.P.",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la pompa P.08A del circuito primario Alta Pressione / scambiatore.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q12"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q12.2",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Pompa P.08B Prim. A.P.",
          "ratingBadge": "4P C10 · 10kA",
          "brandModel": "ABB S204M-C10 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la pompa gemella P.08B del circuito primario Alta Pressione.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q12"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q13",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "MT Gruppo P.09 (M.P./A.P.)",
          "ratingBadge": "4P D32 · 10kA",
          "brandModel": "ABB S204M-D32 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione magnetotermica curva D del gruppo pompe secondarie climatizzazione Media/Alta Pressione P.09 (in serie a Q13.1).",
          "cable": "Serie verso Q13.1",
          "relatedIds": [
            "Q13.1",
            "Q13.2",
            "Q13.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q13.1",
          "kind": "rccb",
          "modules": 4,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Diff. Tipo B P.09",
          "ratingBadge": "4P 40A · 300mA Tipo B",
          "brandModel": "ABB F204 B-40/0,3 Interruttore differenziale puro Tipo B + contatto aux",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge dai guasti differenziali AC/DC gli inverter delle pompe secondarie Alta/Media Pressione Q13.2 (P.09A) e Q13.3 (P.09B).",
          "cable": "Alimenta Q13.2 e Q13.3",
          "relatedIds": [
            "Q13",
            "Q13.2",
            "Q13.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q13.2",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Pompa P.09A Clima A.P.",
          "ratingBadge": "4P D25 · 10kA",
          "brandModel": "ABB S204M-D25 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa a inverter P.09A di distribuzione climatizzazione piani alti (Media/Alta Pressione).",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q13",
            "Q13.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q13.3",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Pompa P.09B Clima A.P.",
          "ratingBadge": "4P D25 · 10kA",
          "brandModel": "ABB S204M-D25 4P + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa gemella a inverter P.09B climatizzazione Media/Alta Pressione.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q13",
            "Q13.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q14",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Pompa Drenaggio PS3",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa di aggottamento/drenaggio pozzetto PS3 della Centrale Tecnologica.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q15",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Trattamento T3-T4",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge le apparecchiature di dosaggio chimico / trattamento acqua circuito tecnico T3-T4.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q16",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Antilegionella & Addolc.",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il sistema antilegionella e trattamento/addolcimento acqua in Centrale Tecnologica.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q17",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Contabilizz. Calore",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i concentratori/master dell'impianto di contabilizzazione dell'energia termica e frigorifera.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q18",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Regolatori Termici 230V",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i regolatori ausiliari e servocomandi a 230Vac di centrale.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q19",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Regolatore di Cascata",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il regolatore di cascata del sistema di generazione termofrigorifera.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q20",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Linea → Quadro QE-REG",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il Quadro di Regolazione e Supervisione BMS (QE-REG) installato a fianco nella Centrale Tecnologica.",
          "cable": "FS17 / FG16OM16 verso QE-REG (X1)",
          "relatedIds": [],
          "targetPanelSlug": "qe-reg",
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q21",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 16A.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q22",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 10A.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q23",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 8 (200 mm)",
          "shortLabel": "Ausiliari Quadro 230V",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge i circuiti ausiliari interni a 230Vac del quadro QE.CT.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna Risalita Cavi SX",
          "shortLabel": "Morsettiera Potenza X1",
          "ratingBadge": "Partenze Pompe P.01–P.09",
          "brandModel": "Morsettiera verticale di potenza su guida DIN (Fogli 12–15)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta ordinatamente tutti i cavi di alimentazione verso i circolatori e le pompe gemellari P.01 ÷ P.09, PS3, trattamento acque e QE-REG.",
          "cable": "Colonna cavi SX",
          "relatedIds": [
            "Q1",
            "Q20"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "X4",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna Risalita Cavi SX",
          "shortLabel": "Morsettiera Allarmi X4",
          "ratingBadge": "80 Morsetti Stato/Guasto",
          "brandModel": "Morsettiera segnali ausiliari (morsetti 1÷80, cablaggio arancio, Fogli 16–18)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Raccoglie i contatti puliti di allarme remoto / sgancio di TUTTI gli interruttori Q1 ÷ Q23 per riportare la diagnostica al sistema di supervisione BMS.",
          "cable": "Colonna cavi SX",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": "qe-reg",
          "datasheetId": null,
          "vvfState": "normal"
        }
      ]
    },
    {
      "order": 5,
      "slug": "qe-ci",
      "code": "QE.CI",
      "title": "Quadro Elettrico Centrale Idrica Sanitaria",
      "nodeId": "QECI",
      "plantId": "IMP-SSC",
      "plantLabel": "1 · Supercondominio",
      "swatch": "ssc",
      "location": {
        "buildingZone": "Locali Tecnici Interrati",
        "floor": "Piano Primo Interrato (-1 · -3,2 m)",
        "room": "Centrale Idrica",
        "mounting": "Cassa metallica murale/autoportante ABB Energy M IP55 con porta in vetro incernierata a destra",
        "whereHowToFind": "Installato all'interno della Centrale Idrica al Piano -1, dove alimenta i due gruppi di pressurizzazione acqua potabile (autoclavi inverter GP1 e GP2 per zona Bassa Pressione e Alta Pressione delle due torri), le preautoclavi con compressore e l'addolcitore/antilegionella."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy M Q855B612 IP55",
        "dimensionsMm": "1249 × 612 × 250 mm",
        "heightMm": 1249,
        "widthMm": 612,
        "depthMm": 250,
        "ipRating": "IP55",
        "ral": "RAL 7035",
        "doorType": "Porta frontale trasparente in vetro temperato (cerniere DX)",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "160 A",
        "shortCircuitIcc": "10 kA (18 kA condiz.)",
        "auxVoltage": "230 Vac · Contatti stato/allarme verso BMS",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Quadro Generale Servizi Supercondominiali QE.SSC (Interruttore Q4 · 80/160A)",
        "detail": "Linea trifase FG16OM16 5G16 mm² proveniente dall'interruttore scatolato Q4 di QE.SSC.",
        "panelSlug": "qe-ssc",
        "panelComp": "Q4",
        "mapNodeId": "QESSC",
        "mapPlantId": "IMP-SSC"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Locale idrico dedicato: tutti gli interruttori Q1 ÷ Q12 riportano il contatto ausiliario di stato/scatto in morsettiera per l'allarme remoto sul supervisore BMS QE-REG.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Colonna Unica 24 Moduli (6 sezioni: 100 + 300 + 4×200 mm)",
          "rows": [
            {
              "id": "R0",
              "title": "Pannello 0 (100 mm) · Fascia Cieca Superiore",
              "heightMm": 100,
              "isReserve": true,
              "note": "Ingresso linea da QE.SSC",
              "slots": []
            },
            {
              "id": "R1",
              "title": "Pannello 1 (300 mm) · Sezionatore Generale 160A e Ripartitore 4P",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "Q1",
                "RP1"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (200 mm) · Luce, Emergenza, Prese Servizio e Gruppo Autoclave GP1",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q2",
                "F2",
                "Q3",
                "Q4",
                "Q4.1"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (200 mm) · Gruppo Autoclave GP2 e Preautoclavi con Compressore 01/02",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q5",
                "Q5.1",
                "Q6",
                "Q7"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Antilegionella/Addolcitore, Regolatori, Scorte e Ausiliari",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q8",
                "Q9",
                "Q10",
                "Q11",
                "Q12"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Morsettiere Orizzontali di Potenza e Segnali",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "X1",
                "X2"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Sezionatore Generale",
          "ratingBadge": "4P 160A · Icc 18kA",
          "brandModel": "ABB SACE Tmax XT1D 160 4P + contatto MAUX (1SDA068209R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale sottocarico del quadro Centrale Idrica: alimenta il ripartitore tetrapolare RP1.",
          "cable": "Ingresso FG16OM16 5G16 mm² da QE.SSC-Q4",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "normal"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Ripartitore 160A",
          "ratingBadge": "Sbarre 4P · 160A",
          "brandModel": "Ripartitore modulare tetrapolare 160A (Icw 10kA) + Barra PE rame 12×4 mm",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Distribuisce le 3 fasi e il neutro ai gruppi di pressurizzazione GP1/GP2 e ai servizi della Centrale Idrica.",
          "cable": "FS17 25 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Luce Centrale Idrica",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria della Centrale Idrica (e alimenta a valle il fusibile F2 dell'emergenza).",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "F2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Luce Emergenza C.I.",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q2: protegge la linea dedicata alle lampade autonome di emergenza della Centrale Idrica.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "normal"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Prese Servizio C.I.",
          "ratingBadge": "4P C16 · 30mA A · 10kA",
          "brandModel": "ABB S204M-C16 + DDA204 A-25/0,03A + contatto aux",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio trifase/monofase della Centrale Idrica.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q4",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "MT Gruppo Press. GP1",
          "ratingBadge": "4P D40 · 10kA",
          "brandModel": "ABB S204M-D40 4P + contatto aux S2C-S/H6R (S601931)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione magnetotermica curva D40 per il quadro bordo macchina del Gruppo di Pressurizzazione Idrica a inverter GP1 (in serie a Q4.1).",
          "cable": "FS17 10 mm² verso Q4.1 / X1",
          "relatedIds": [
            "Q4.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q4.1",
          "kind": "rccb",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Diff. Tipo B GP1",
          "ratingBadge": "4P 40A · 300mA Tipo B",
          "brandModel": "ABB F204 B-40/0,3 Differenziale puro Tipo B + contatto aux",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge dai guasti differenziali AC e DC liscia il gruppo pompe a giri variabili GP1.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q5",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "MT Gruppo Press. GP2",
          "ratingBadge": "4P D40 · 10kA",
          "brandModel": "ABB S204M-D40 4P + contatto aux S2C-S/H6R (S601931)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protezione magnetotermica curva D40 per il quadro bordo macchina del secondo Gruppo di Pressurizzazione Idrica a inverter GP2 (nota: sullo schema foglio 4.D ha il refuso grafico 'Q13', mentre in distinta e fronte quadro è correttamente Q5).",
          "cable": "FS17 10 mm² verso Q5.1 / X1",
          "relatedIds": [
            "Q5.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q5.1",
          "kind": "rccb",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Diff. Tipo B GP2",
          "ratingBadge": "4P 40A · 300mA Tipo B",
          "brandModel": "ABB F204 B-40/0,3 Differenziale puro Tipo B + contatto aux",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge dai guasti differenziali AC e DC liscia il secondo gruppo pompe a inverter GP2.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Preautoclave + Compr. 01",
          "ratingBadge": "4P C16 · 300mA A · 10kA",
          "brandModel": "ABB S204M-C16 + DDA204 A-25/0,3A + contatto aux",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il sistema preautoclave 01 completo di compressore d'aria e valvola di ritegno motorizzata.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Preautoclave + Compr. 02",
          "ratingBadge": "4P C16 · 300mA A · 10kA",
          "brandModel": "ABB S204M-C16 + DDA204 A-25/0,3A + contatto aux",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il sistema preautoclave 02 completo di compressore d'aria e valvola di ritegno.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Antilegionella & Addolc.",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge le centraline di addolcimento, filtrazione e dosaggio antilegionella dell'acqua sanitaria.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q9",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Regolatori Idrici 230V",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i regolatori ed elettrovalvole a 230Vac della Centrale Idrica.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q10",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 16A.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 10A.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "Q12",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Ausiliari Quadro 230V",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge il circuito ausiliario 230Vac del quadro QE.CI.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Morsettiera Potenza X1",
          "ratingBadge": "Partenze GP1, GP2 & Servizi",
          "brandModel": "Morsettiera orizzontale su guida DIN per cavi di potenza (Fogli 7–8)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta i cavi di uscita verso i gruppi di pressurizzazione GP1, GP2, preautoclavi 01/02, luci, prese e trattamento acqua.",
          "cable": "Fondo quadro SX",
          "relatedIds": [
            "Q4.1",
            "Q5.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "X2",
          "kind": "terminal",
          "modules": 4,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Morsettiera Allarmi X2/X4",
          "ratingBadge": "26 Morsetti Teleallarme",
          "brandModel": "Morsettiera ausiliaria contatti stato/guasto (indicata X2 sul fronte quadro e X4 nello schema/indice, Foglio 9)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Raccoglie i contatti puliti di stato e scatto degli interruttori Q1 ÷ Q12 per inviarli al supervisore BMS QE-REG.",
          "cable": "Fondo quadro DX",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": "qe-reg",
          "datasheetId": null,
          "vvfState": "normal"
        }
      ]
    },
    {
      "order": 6,
      "slug": "qe-lp",
      "code": "QE.LP",
      "title": "Quadro Locale Pompe Acqua di Falda & Periferica BMS CBX1",
      "nodeId": "QELP",
      "plantId": "IMP-SSC",
      "plantLabel": "1 · Supercondominio",
      "swatch": "ssc",
      "location": {
        "buildingZone": "Locali Tecnici Interrati",
        "floor": "Piano Secondo Interrato (-2 · -6,4 m)",
        "room": "Locale Pompe (Pozzi Acqua di Falda)",
        "mounting": "Armadio metallico componibile a pavimento a doppia colonna (600 + 400 mm) IP55",
        "whereHowToFind": "Installato a pavimento nel Locale Pompe al Piano -2. Alimenta e regola tramite inverter e controllore BACnet integrato (ABB Cylon CBX1) le elettropompe sommerse di emungimento acqua geotermica dai Pozzi di Falda P1 e P2 a servizio delle Pompe di Calore."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy M IP55 (Q855B616 + Q855B416)",
        "dimensionsMm": "1749 × 1010 × 250 mm",
        "heightMm": 1749,
        "widthMm": 1010,
        "depthMm": 250,
        "ipRating": "IP55",
        "ral": "RAL 7035",
        "doorType": "Doppia anta: colonna risalita cavi/morsetti SX cieca (400 mm) + colonna apparecchi DX con porta vetro (600 mm)",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "250 A",
        "shortCircuitIcc": "10 kA (36 kA condiz.)",
        "auxVoltage": "230 Vac · 24 Vac SELV (trasformatore T8 per modulo BMS CBX1)",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Quadro Generale Servizi Supercondominiali QE.SSC (Interruttore Q5 · 160/250A)",
        "detail": "Cavi unipolari FG16OM16 3×(1×120) + 1×120N + 1×70PE mm² provenienti dall'interruttore Q5 di QE.SSC (dotato di bobina di sgancio VVF).",
        "panelSlug": "qe-ssc",
        "panelComp": "Q5",
        "mapNodeId": "QESSC",
        "mapPlantId": "IMP-SSC"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Essendo alimentato dall'interruttore Q5 di QE.SSC (provvisto di bobina di minima tensione 24Vac dell'anello sgancio autorimessa), in caso di emergenza VVF l'intero quadro QE.LP viene messo fuori tensione automaticamente.",
      "bays": {
        "leftBay": {
          "title": "Colonna Cavi & Ausiliari SX (400 mm)",
          "subtitle": "Morsettiere X1, X2, X4 e Trasformatore 24Vac T8",
          "slots": [
            "X1",
            "X2",
            "X4",
            "T8"
          ]
        },
        "mainBay": {
          "title": "Colonna Apparecchiature DX (600 mm · 3×300 + 3×200 + 100 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 (300 mm) · Sezionatore Generale 250A",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "Q1"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (300 mm) · Ripartitore Sbarre Tetrapolare 250A",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "RP1"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (300 mm) · Interruttori Scatolati Pompe Pozzi Falda + Relè Diff. Tipo B e Toroidi",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "RD4",
                "Q4",
                "RD5",
                "Q5",
                "TAD4",
                "TAB4",
                "TAD5",
                "TAB5"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Fusibili Relè Diff., Luce/Prese Locale Pompe, Pompa Meteo PS4 e Trattamenti",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "F4",
                "F5",
                "Q2",
                "F2",
                "Q3",
                "Q6",
                "Q7",
                "Q8",
                "Q9"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Ausiliari, Fusibili 24Vac, Presa, Controllore BMS Cylon CBX1 e Selettori Pozzi",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q10",
                "Q11",
                "F8.1",
                "PR8",
                "F8.2",
                "F8.3",
                "H24",
                "CBX1",
                "SA1.1",
                "SA1.2",
                "SA1.3"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 6 (200 mm) · Modulo Interfaccia Relè Ausiliari Pompe Pozzi",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "K1."
              ]
            },
            {
              "id": "R7",
              "title": "Pannello 7 (100 mm) · Zoccolo / Fascia Cieca Inferiore",
              "heightMm": 100,
              "isReserve": true,
              "note": "Chiusura inferiore armadio",
              "slots": []
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 6,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Sezionatore Generale",
          "ratingBadge": "4P 250A · Icc 36kA",
          "brandModel": "ABB SACE Tmax XT3D 250A 4P + contatto MAUX (1SDA068211R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale sottocarico del quadro QE.LP: seziona l'arrivo linea da QE.SSC-Q5 e alimenta il ripartitore principale RP1 da 250A.",
          "cable": "Arrivo 3×120 + 120N + 70PE mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 6,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Ripartitore 250A",
          "ratingBadge": "Sbarre 4P · 250A",
          "brandModel": "Ripartitore modulare tetrapolare 250A (Icw 10kA) + Barra PE rame 20×5 mm",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Distribuisce la potenza trifase alle due partenze scatolate da 125A dei pozzi geotermici (Q4, Q5) e alle utenze ausiliarie.",
          "cable": "Sbarra 250A",
          "relatedIds": [
            "Q1",
            "Q4",
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "RD4",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Relè Diff. Pozzo P2",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale Tipo B a doppio toroide per linea Q4",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Sorveglia tramite i toroidi TAD4/TAB4 le dispersioni AC e DC degli inverter della pompa sommersa P.10 (Pozzo P2) e comanda la bobina di sgancio di Q4.",
          "cable": "Protetto da F4",
          "relatedIds": [
            "F4",
            "Q4",
            "TAD4",
            "TAB4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Pompa P.10 (Pozzo P2)",
          "ratingBadge": "MCCB 4P 125A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 125 TMD 4P + Bobina lancio SOR 230V + contatto MAUX (1SDA066888R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea trifase della pompa di prelievo acqua di falda P.10 (Pozzo P2).",
          "cable": "FG16OM16 35 mm² su X1",
          "relatedIds": [
            "RD4",
            "F4",
            "TAD4",
            "TAB4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "RD5",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Relè Diff. Pozzo P1",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale Tipo B a doppio toroide per linea Q5",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Sorveglia tramite i toroidi TAD5/TAB5 le dispersioni AC e DC degli inverter delle pompe P.11/1 e P.11/2 (Pozzo P1) e comanda lo sgancio di Q5.",
          "cable": "Protetto da F5",
          "relatedIds": [
            "F5",
            "Q5",
            "TAD5",
            "TAB5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Pompe P.11/1-2 (Pozzo P1)",
          "ratingBadge": "MCCB 4P 125A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 125 TMD 4P + Bobina lancio SOR 230V + contatto MAUX (1SDA066888R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea trifase delle pompe di prelievo acqua di falda P.11/1 e P.11/2 (Pozzo P1).",
          "cable": "FG16OM16 35 mm² su X1",
          "relatedIds": [
            "RD5",
            "F5",
            "TAD5",
            "TAB5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "TAD4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Toroide AC Pozzo P2",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 (9D80) Toroide chiuso Ø80 mm su partenza Q4",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC/pulsante per il relè RD4 della pompa Pozzo P2.",
          "cable": "Cavo WD4",
          "relatedIds": [
            "RD4",
            "TAB4",
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAB4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Toroide DC Pozzo P2",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 (9B80) Toroide chiuso Ø80 mm su partenza Q4",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale in corrente continua (Tipo B) per il relè RD4 della pompa Pozzo P2.",
          "cable": "Cavo WB4",
          "relatedIds": [
            "RD4",
            "TAD4",
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAD5",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Toroide AC Pozzo P1",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 (9D80) Toroide chiuso Ø80 mm su partenza Q5",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC/pulsante per il relè RD5 delle pompe Pozzo P1.",
          "cable": "Cavo WD5",
          "relatedIds": [
            "RD5",
            "TAB5",
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAB5",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 3 (300 mm)",
          "shortLabel": "Toroide DC Pozzo P1",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 (9B80) Toroide chiuso Ø80 mm su partenza Q5",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale in corrente continua (Tipo B) per il relè RD5 delle pompe Pozzo P1.",
          "cable": "Cavo WB5",
          "relatedIds": [
            "RD5",
            "TAD5",
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "F4",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prot. Relè RD4",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione ausiliaria 230Vac del relè differenziale RD4 e la bobina di lancio corrente di Q4.",
          "cable": "FS17 1,5 mm²",
          "relatedIds": [
            "RD4",
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prot. Relè RD5",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione ausiliaria 230Vac del relè differenziale RD5 e la bobina di lancio corrente di Q5.",
          "cable": "FS17 1,5 mm²",
          "relatedIds": [
            "RD5",
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Luce Locale Pompe",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB DS201 C10 A30 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria del Locale Pompe al Piano -2 (e alimenta F2 per le lampade di emergenza).",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "F2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Luce Emerg. Loc. Pompe",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q2: protegge la linea dedicata agli apparecchi autonomi di emergenza del Locale Pompe.",
          "cable": "Morsettiera X1",
          "relatedIds": [
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prese Servizio CEE",
          "ratingBadge": "4P C16 · 30mA A · 10kA",
          "brandModel": "ABB S204M-C16 + DDA204 A-25/0,03A + contatto aux",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il gruppo prese di servizio 400V/230V nel Locale Pompe.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Pompa Drenaggio PS4",
          "ratingBadge": "4P C16 · 300mA Tipo B",
          "brandModel": "ABB S204M-C16 + DDA204 B APR-25/0,3A + contatto aux",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'elettropompa sommersa di drenaggio/acque meteoriche PS4 del Locale Pompe.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Antilegionella / Addolc.",
          "ratingBadge": "1P+N C10 · 300mA A",
          "brandModel": "ABB DS201 C10 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge eventuali apparecchiature di trattamento/condizionamento acqua nel Locale Pompe.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Regolatori & Aux BMS",
          "ratingBadge": "1P+N C10 · 300mA A",
          "brandModel": "ABB DS201 C10 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta i regolatori 230Vac e fornisce a monte la tensione per la presa di servizio PR8 (tramite F8.1) e per il trasformatore 24Vac T8 del modulo BMS CBX1 (tramite F8.2).",
          "cable": "Alimenta F8.1, F8.2 e X1",
          "relatedIds": [
            "F8.1",
            "F8.2",
            "T8",
            "CBX1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q9",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Scorta Trifase",
          "ratingBadge": "4P C16 · 300mA Tipo B",
          "brandModel": "ABB S204M-C16 + DDA204 B APR-25/0,3A + contatto aux",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Partenza di riserva tetrapolare con protezione differenziale Tipo B.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q10",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Scorta Monofase",
          "ratingBadge": "1P+N C10 · 300mA A",
          "brandModel": "ABB DS201 C10 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Partenza monofase di riserva.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Ausiliari Quadro 230V",
          "ratingBadge": "1P+N C10 · 300mA A",
          "brandModel": "ABB DS201 C10 A300 + contatto aux S2C-S/H6R",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge i circuiti ausiliari a 230Vac del quadro QE.LP.",
          "cable": "Morsettiera X1",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F8.1",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prot. Presa Quadro PR8",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Limita a max 2A e protegge da cortocircuito la presa Schuko interna PR8 per il collegamento del PC portatile di telecontrollo/manutenzione.",
          "cable": "Alimenta PR8",
          "relatedIds": [
            "Q8",
            "PR8"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "PR8",
          "kind": "socket_lamp",
          "modules": 3,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Presa Servizio Quadro",
          "ratingBadge": "Schuko/IT · Max 2A",
          "brandModel": "ABB M1173 Presa bivalente Schuko/Italia su guida DIN (2,5 mod.)",
          "roleTitle": "COSA ALIMENTA",
          "whatItDoes": "Presa ausiliaria interna al quadro per PC di programmazione BMS o strumenti di verifica (protetta a 2A da F8.1).",
          "cable": "Protetta da F8.1",
          "relatedIds": [
            "F8.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F8.2",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prot. Primario Trasf. T8",
          "ratingBadge": "1P+N 10×38 · 1A aM",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A aM",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge contro i cortocircuiti e lo spunto magnetizzante l'avvolgimento primario a 230Vac del trasformatore T8 (100VA).",
          "cable": "Alimenta primario T8",
          "relatedIds": [
            "Q8",
            "T8",
            "F8.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F8.3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prot. Secondario 24V BMS",
          "ratingBadge": "1P+N 10×38 · 4A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 4A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'uscita secondaria a 24Vac del trasformatore T8 che alimenta la spia H24, il modulo BACnet CBX1, la scheda relè K1. e i trasduttori di pressione/livello pozzi.",
          "cable": "Bus 24Vac interno",
          "relatedIds": [
            "T8",
            "H24",
            "CBX1",
            "K1."
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "H24",
          "kind": "socket_lamp",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Spia Presenza 24Vac",
          "ratingBadge": "LED Bianco 12-48V",
          "brandModel": "ABB E219-B48 Spia luminosa modulare a LED bianca (M093923)",
          "roleTitle": "COSA SEGNALA",
          "whatItDoes": "Segnala visivamente a quadro chiuso (attraverso la porta in vetro) la regolarità della tensione ausiliaria 24Vac per la periferica BMS CBX1.",
          "cable": "24Vac da F8.3",
          "relatedIds": [
            "F8.3",
            "T8",
            "CBX1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "CBX1",
          "kind": "plc_hmi",
          "modules": 6,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Controllore BMS Pozzi",
          "ratingBadge": "BACnet MS/TP · 16 I/O",
          "brandModel": "ABB Cylon CBX-8R8 (Indirizzo 1) Periferica BACnet 8 ingressi universali + 8 uscite",
          "roleTitle": "COSA SUPERVISIONA E COMANDA",
          "whatItDoes": "Acquisisce sonda pressione SP01, pressostati PS01/PS02, livelli pozzi LV01/LV02 e allarmi pompe, e pilota in modulazione 0-10Vdc + marcia/arresto gli inverter delle pompe acqua di falda P11A, P11B (Pozzo 1) e P11C (Pozzo 2), comunicando su bus RS-485 con il supervisore MTX1 in QE-REG.",
          "cable": "Bus RS-485 BACnet verso QE-REG",
          "relatedIds": [
            "F8.3",
            "K1.",
            "SA1.1",
            "SA1.2",
            "SA1.3",
            "X2"
          ],
          "targetPanelSlug": "qe-reg",
          "datasheetId": "DS-CYLON-CBX-FLX",
          "vvfState": "tripped"
        },
        {
          "id": "SA1.1",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Sel. Pompa P11A (Pozzo 1)",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Selettore frontale per porre il comando marcia della pompa sommersa P11A (Pozzo 1) in Automatico da BMS CBX1 (tramite K1.1), Spento (0) o Manuale.",
          "cable": "Morsettiera X2.35-37",
          "relatedIds": [
            "CBX1",
            "K1."
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA1.2",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Sel. Pompa P11B (Pozzo 1)",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Selettore frontale Automatico / 0 / Manuale per il comando marcia della pompa sommersa P11B (Pozzo 1, tramite relè K1.2).",
          "cable": "Morsettiera X2.38-41",
          "relatedIds": [
            "CBX1",
            "K1."
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SA1.3",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Sel. Pompa P11C (Pozzo 2)",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Selettore frontale Automatico / 0 / Manuale per il comando marcia della pompa sommersa P11C (Pozzo 2, tramite relè K1.3).",
          "cable": "Morsettiera X2.43-46",
          "relatedIds": [
            "CBX1",
            "K1."
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K1.",
          "kind": "contactor",
          "modules": 4,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Modulo 4 Relè Pompe",
          "ratingBadge": "4× Relè 24Vac · Cabur",
          "brandModel": "Cabur XR041E24 Modulo interfaccia a 4 relè estraibili 24Vac (K1.1 ÷ K1.4)",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Disaccoppia galvanicamente le uscite digitali del controllore BMS CBX1 per comandare attraverso i selettori SA1.1–SA1.3 l'abilitazione marcia degli inverter pompe falda P11A, P11B e P11C.",
          "cable": "24Vac da CBX1 · Contatti su X2",
          "relatedIds": [
            "CBX1",
            "SA1.1",
            "SA1.2",
            "SA1.3"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna Cavi SX",
          "shortLabel": "Morsettiera Potenza X1",
          "ratingBadge": "Partenze Pompe & Utenze",
          "brandModel": "Morsettiera verticale potenza su guida DIN (Foglio 10)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta i cavi di potenza delle pompe pozzi P.10, P.11/1-2, pompa drenaggio PS4, prese e luci.",
          "cable": "Colonna SX",
          "relatedIds": [
            "Q4",
            "Q5",
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X2",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna Cavi SX",
          "shortLabel": "Morsettiera BMS X2",
          "ratingBadge": "54 Morsetti Sonde/Inverter/Bus",
          "brandModel": "Morsettiera segnali analogici 0-10V, livelli pozzi, comandi marcia e bus BACnet RS-485 (Fogli 11–12)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta la dorsale RS-485 da QE-REG, la sonda pressione SP01, pressostati PS01/PS02, livelli LV01/LV02, allarmi e segnali 0-10Vdc verso gli inverter dei pozzi.",
          "cable": "Colonna SX",
          "relatedIds": [
            "CBX1",
            "K1."
          ],
          "targetPanelSlug": "qe-reg",
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X4",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna Cavi SX",
          "shortLabel": "Morsettiera Allarmi X4",
          "ratingBadge": "22 Morsetti Stato Interr.",
          "brandModel": "Morsettiera contatti ausiliari stato/guasto interruttori Q1 ÷ Q11 (Foglio 13)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Riporta a distanza lo stato di tutti gli interruttori di QE.LP.",
          "cable": "Colonna SX",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": "qe-reg",
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "T8",
          "kind": "transformer",
          "modules": 3,
          "bayLabel": "Fondo Colonna SX",
          "shortLabel": "Trasformatore BMS T8",
          "ratingBadge": "100VA · 230 / 24Vac",
          "brandModel": "Italweber CFM00400CC04-I Trasformatore monofase di sicurezza 100VA 230-400V / 12-0-12V (24Vac)",
          "roleTitle": "COSA ALIMENTA",
          "whatItDoes": "Installato nella parte inferiore del vano laterale SX per dissipazione ottimale: trasforma il 230Vac (da F8.2) in 24Vac (protetto da F8.3) per alimentare CBX1, K1. e i trasduttori di campo.",
          "cable": "Primario F8.2 · Secondario F8.3",
          "relatedIds": [
            "F8.2",
            "F8.3",
            "CBX1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 7,
      "slug": "qe-pa",
      "code": "QE.PA",
      "title": "Quadro Alimentazione Motopompa Principale Antincendio (UNI EN 12845)",
      "nodeId": "QEPA",
      "plantId": "IMP-FIRE",
      "plantLabel": "5 · Antincendio & Sicurezza",
      "swatch": "fire",
      "location": {
        "buildingZone": "Corpo Parti Comuni Generali — Alimentazione Preferenziale VVF",
        "floor": "Piano Terra (0,0 m)",
        "room": "Locale Contatori Principale",
        "mounting": "Centralino stagno da parete in materiale isolante (doppio isolamento) IP65 con portello trasparente chiudibile a chiave",
        "whereHowToFind": "Installato in posizione dedicata e segnalata nel Locale Contatori Principale al Piano Terra, derivato A MONTE dell'interruttore generale di AVSSC (direttamente dal ripartitore RIP-250A) affinché rimanga SEMPRE in tensione anche durante lo sgancio generale d'emergenza dei Vigili del Fuoco."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB 65P12X12 Centralino stagno da parete in resina IP65 con porta trasparente e serratura a chiave",
        "dimensionsMm": "320 × 250 × 155 mm",
        "heightMm": 320,
        "widthMm": 250,
        "depthMm": 155,
        "ipRating": "IP65 (Doppio Isolamento)",
        "ral": "RAL 7035 + Targa Rossa VVF",
        "doorType": "Portello fumé trasparente con chiusura di sicurezza a chiave",
        "specialWarningPlate": "ALIMENTAZIONE DEL MOTORE DELLA POMPA ANTINCENDIO — NON APRIRE L'INTERRUTTORE IN CASO DI INCENDIO"
      },
      "electricalSpecs": {
        "voltage": "400 Vac · 50 Hz (3F+PE — senza neutro)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "40 A (linea dimensionata al 150% In motore 15 kW)",
        "shortCircuitIcc": "15 kA",
        "auxVoltage": "Contatto ausiliario monitoraggio posizione interruttore",
        "standard": "CEI 64-8 Sez. 560 · UNI EN 12845 · CEI EN 61439"
      },
      "upstream": {
        "label": "Ripartitore Generale di Potenza RIP-250A (a monte dell'interruttore generale AVSSC!)",
        "detail": "Derivazione preferenziale in cavo resistente al fuoco FTG18OM16 3×16 mm² attestata direttamente a valle del contatore/ripartitore prima di Q1(AVSSC).",
        "panelSlug": null,
        "mapNodeId": "RIP-250",
        "mapPlantId": "IMP-FIRE"
      },
      "downstreamPanels": [],
      "vvfBehavior": "CIRCUITO VITALE DI SICUREZZA ANTINCENDIO: NON viene MAI sganciato dai pulsanti di emergenza VVF, utilizza cavo resistente al fuoco per 90 minuti (FTG18OM16 4G16 mm²) ed è privo di sganciatore termico da sovraccarico affinché la pompa antincendio da 15 kW continui a erogare acqua agli idranti fino a distruzione.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Centralino Stagno Monofila 12 Moduli (Sotto Chiave)",
          "rows": [
            {
              "id": "R1",
              "title": "Guida DIN Unica · Protezione Solo Magnetica + Differenziale Selettivo Antincendio",
              "heightMm": 180,
              "isReserve": false,
              "slots": [
                "Q1"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 6,
          "bayLabel": "Guida DIN Unica (Sotto Chiave)",
          "shortLabel": "Linea Pompa Antincendio 15kW",
          "ratingBadge": "3P K40 SOLO MAGN. + Diff. 0,5A",
          "brandModel": "ABB S203M-K40 Solo Magnetico (S615099) + Blocco diff. DDA203 A 40A 0,5A (B427977) + Contatto aux stato S2C-H6R (A563826)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta in cavo resistente al fuoco FTG18OM16 4G16 mm² il quadro bordo macchina dell'elettropompa principale antincendio da 15 kW (Piano -2). Conformemente alla norma UNI EN 12845 protegge SOLO dal cortocircuito franco (sganciatore solo magnetico) e dai contatti indiretti (Idn = 0,5A), omettendo intenzionalmente la protezione termica da sovraccarico. Il contatto ausiliario segnala al pannello d'allarme in Portineria qualsiasi apertura accidentale dell'interruttore.",
          "cable": "FTG18OM16 4G16 mm² (Resistente al fuoco PH90)",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-CAVO-FTG18",
          "vvfState": "vital"
        }
      ]
    },
    {
      "order": 8,
      "slug": "avsc-a",
      "code": "AVSC-A",
      "title": "Avanquadro Generale Scala / Torre A",
      "nodeId": "AVSCA",
      "plantId": "IMP-SCA",
      "plantLabel": "2 · Servizi Torre A",
      "swatch": "sca",
      "location": {
        "buildingZone": "Corpo Parti Comuni Generali → Montante Torre A",
        "floor": "Piano Terra (0,0 m)",
        "room": "Locale Contatori Principale",
        "mounting": "Quadro murale in resina isolante con porta trasparente incernierata a sinistra",
        "whereHowToFind": "Installato nel Locale Contatori Principale al Piano Terra immediatamente a valle del contatore trifase da 50 kW dedicato ai Servizi Comuni della Scala / Torre A; protegge l'intera dorsale sub-orizzontale verso il quadro generale QESC-A posto al Piano -1."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB Serie Gemini 1SL0212A00 (cassa in resina termoindurente IP66 con porta trasparente)",
        "dimensionsMm": "550 × 460 × 260 mm",
        "heightMm": 550,
        "widthMm": 460,
        "depthMm": 260,
        "ipRating": "IP66",
        "ral": "RAL 7035",
        "doorType": "Porta trasparente a battente singolo (cerniere SX)",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "160 A",
        "shortCircuitIcc": "18 kA",
        "auxVoltage": "230 Vac (bobina sgancio e relè Tipo B)",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Contatore POD Servizi Scala A (50 kW · 400V Trifase)",
        "detail": "Cavi unipolari FG16OM16 3×(1×70) + 1×70N mm² dal gruppo di misura del distributore nel Locale Contatori Principale.",
        "panelSlug": null,
        "mapNodeId": "POD-SCA",
        "mapPlantId": "IMP-INGRESSI"
      },
      "downstreamPanels": [
        {
          "code": "QESC-A",
          "label": "Quadro Generale Scala / Torre A (Piano -1)",
          "viaComp": "Q1",
          "panelSlug": "qesc-a"
        }
      ],
      "vvfBehavior": "Dotato di bobina di sgancio a lancio di corrente 230Vac sull'interruttore generale Q1: l'azionamento del pulsante di sgancio emergenza Energia Scala A o l'intervento del relè differenziale Tipo B RD1/DER1 seziona l'intero montante verso Torre A.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Fronte Modulare Interno (3 sezioni: 150 + 225 + 150 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 (150 mm) · Testata Ingresso Cavi da Contatore",
              "heightMm": 150,
              "isReserve": true,
              "note": "Attestazione corde 70 mm²",
              "slots": []
            },
            {
              "id": "R2",
              "title": "Pannello 2 (225 mm) · Fusibile Ausiliario, Relè Diff. Tipo B e MCCB Generale 160A",
              "heightMm": 225,
              "isReserve": false,
              "slots": [
                "F1",
                "RD1",
                "Q1"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (150 mm · Interno Fondo) · Coppia Toroidi Chiusi Ø80 mm",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "TAD1",
                "TAB1"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 2,
          "bayLabel": "Pannello 2 (225 mm)",
          "shortLabel": "Prot. Relè RD1 & Sgancio",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a monte di Q1 (sempre in tensione): protegge da cortocircuito l'alimentazione del relè differenziale Tipo B RD1 e il circuito di sgancio a lancio di corrente dell'interruttore Q1.",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "RD1",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 2 (225 mm)",
          "shortLabel": "Relè Diff. Montante A",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D (indicato RD1 sul fronte quadro e DER1 in distinta) Relè differenziale Tipo B",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'intero montante da 70 mm² verso la Torre A dai guasti a terra AC, pulsanti e in corrente continua (generati da inverter ascensori/UTA), comandando lo sgancio di Q1.",
          "cable": "Collegato a TAD1 + TAB1",
          "relatedIds": [
            "F1",
            "TAD1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 2 (225 mm)",
          "shortLabel": "Montante → QESC-A",
          "ratingBadge": "MCCB 4P 160A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD (112-160A) 4P + Bobina lancio SOR 230V + Contatto stato MAUX (1SDA066821R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale di partenza che alimenta e protegge il montante principale diretto al Quadro Generale Scala A (QESC-A, Piano -1).",
          "cable": "FG16OM16 3×(1×70) + 1×70N + 1×35PE mm²",
          "relatedIds": [
            "RD1",
            "F1",
            "TAD1",
            "TAB1"
          ],
          "targetPanelSlug": "qesc-a",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "TAD1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Pannello 3 (Fondo)",
          "shortLabel": "Toroide AC Ø80mm",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 (9D80) Toroide chiuso Ø80 mm",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Rileva le componenti alternate e pulsanti di dispersione verso terra sul montante Torre A per il relè RD1.",
          "cable": "Cavo WD1",
          "relatedIds": [
            "RD1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "TAB1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Pannello 3 (Fondo)",
          "shortLabel": "Toroide DC Ø80mm",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 (9B80) Toroide chiuso Ø80 mm",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Rileva le componenti continue lisce di guasto a terra (protezione Tipo B) sul montante Torre A per il relè RD1.",
          "cable": "Cavo WB1",
          "relatedIds": [
            "RD1",
            "TAD1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        }
      ]
    },
    {
      "order": 9,
      "slug": "qesc-a",
      "code": "QESC-A",
      "title": "Quadro Generale Servizi Comuni Scala / Torre A",
      "nodeId": "QESCA",
      "plantId": "IMP-SCA",
      "plantLabel": "2 · Servizi Torre A",
      "swatch": "sca",
      "location": {
        "buildingZone": "Torre A — Servizi Generali di Edificio",
        "floor": "Piano Primo Interrato (-1 · -3,2 m)",
        "room": "Locale Contatori Scala A",
        "mounting": "Armadio metallico autoportante a pavimento ABB Energy-L (colonna apparecchi DX 24 mod. + risalita cavi SX)",
        "whereHowToFind": "Installato a pavimento nel Locale Contatori dedicato della Torre A al Piano -1. Riceve il montante da AVSC-A e distribuisce energia a tutti i servizi comuni verticali e orizzontali della Torre A (ascensori DX/SX, UTA, estrattore cappe, 16 quadri di piano QEP, cantine e sale condominiali)."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy L Q843B818 (metallo con porta in vetro IP43)",
        "dimensionsMm": "1949 × 816 × 250 mm",
        "heightMm": 1949,
        "widthMm": 816,
        "depthMm": 250,
        "ipRating": "IP43",
        "ral": "RAL 7035",
        "doorType": "Porta in vetro incernierata a destra + risalita cavi interna laterale sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "160 A (Sbarre 250 A)",
        "shortCircuitIcc": "15 kA (18 kA condiz.)",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Avanquadro Scala A AVSC-A (Interruttore Q1 · 160A)",
        "detail": "Montante in cavi unipolari FG16OM16 3×(1×70) + 1×70N + 1×35PE mm² dal Locale Contatori Principale al Piano Terra.",
        "panelSlug": "avsc-a",
        "panelComp": "Q1",
        "mapNodeId": "AVSCA",
        "mapPlantId": "IMP-SCA"
      },
      "downstreamPanels": [
        {
          "code": "QE.PL",
          "label": "Quadro Palestra Condominiale Torre A",
          "viaComp": "Q9",
          "panelSlug": "qe-pl"
        },
        {
          "code": "QE.01BICI",
          "label": "Quadro Deposito Biciclette Torre A",
          "viaComp": "Q22",
          "panelSlug": "qe-01bici"
        }
      ],
      "vvfBehavior": "Sottoposto allo sgancio di emergenza energia di Torre A (comando su AVSC-A / Q1).",
      "bays": {
        "leftBay": {
          "title": "Vano Risalita Cavi Interno SX",
          "subtitle": "4 TA 150/5A e Morsettiere verticali X1, X2",
          "slots": [
            "TA1",
            "TA2",
            "TA3",
            "TA4",
            "X1",
            "X2"
          ]
        },
        "mainBay": {
          "title": "Colonna Apparecchiature DX 24 Moduli (QESC-A)",
          "rows": [
            {
              "id": "R0",
              "title": "Fascia Superiore (50 mm) · Testata Armadio",
              "heightMm": 50,
              "isReserve": true,
              "note": "Chiusura superiore colonna DX",
              "slots": []
            },
            {
              "id": "R1",
              "title": "Pannello 1 (300 mm) · Sezionatore Generale, Multimetro, Relè Diff. Tipo B e UTA Copertura",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "Q1",
                "M1",
                "F3",
                "RD2",
                "Q2",
                "TAB2",
                "TAD2"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (200 mm) · Scaricatore SPD, Fusibile Multimetro, Rifasamento e Ascensore Destro",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "SC1",
                "F2",
                "Q3",
                "Q4",
                "Q5"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (200 mm) · Ascensore Sinistro, Estrattore Cappe Copertura e Quadro Sala Condominiale",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q6",
                "Q7",
                "Q8",
                "Q9"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Dorsale 16 Quadri di Piano, M-Bus, Prese/Luci Vano Scala e Cantine P.Terra",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q10",
                "Q11",
                "Q12",
                "Q13",
                "TS13",
                "K13",
                "F13",
                "Q14",
                "F14",
                "Q15"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Cantine P.-1 / P.-2, Locale Contatori Torre A e Locale Immondezzaio",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q16",
                "F16",
                "Q17",
                "Q18",
                "F18",
                "Q19",
                "Q20",
                "Q20.1",
                "Q20.2",
                "F20",
                "Q21",
                "Q21.1",
                "Q21.2",
                "F21"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 6 (200 mm) · QE.01BICI, FTTH/TV, Videocitofono, Locali Comuni e Luce Esterna",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q22",
                "Q23",
                "Q24",
                "Q25",
                "Q26",
                "Q27",
                "K27",
                "OR27"
              ]
            },
            {
              "id": "R7",
              "title": "Pannello 7 (200 mm) · Scorta Finale e Riserva Modulare",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q28"
              ]
            },
            {
              "id": "R8",
              "title": "Fascia Inferiore (150 mm) · Fondo Colonna",
              "heightMm": 150,
              "isReserve": true,
              "note": "Zoccolo / chiusura inferiore",
              "slots": []
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Sezionatore Generale",
          "ratingBadge": "4P 160A · Icc 18kA",
          "brandModel": "ABB SACE Tmax XT1D 160 4P Fisso (1SDA068209R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale del quadro principale di Torre A: seziona il montante proveniente da AVSC-A e alimenta le sbarre verticali da 250A dell'edificio.",
          "cable": "Ingresso FG16OM16 3×(1×70)+1×70N+1×35PE mm²",
          "relatedIds": [
            "TA1",
            "TA2",
            "TA3",
            "TA4",
            "SC1",
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "M1",
          "kind": "meter",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Wattmetro Torre A",
          "ratingBadge": "V / A / kW / kWh",
          "brandModel": "Vemer EV3M-4DIN (VE333100) Wattmetro trifase multifunzione su guida DIN",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura tensioni, correnti delle tre fasi (tramite TA2, TA3, TA4 da 150/5A), potenza ed energia assorbita dai servizi comuni della Torre A.",
          "cable": "Protetto da F2 · Ingressi da TA2-TA4",
          "relatedIds": [
            "F2",
            "TA2",
            "TA3",
            "TA4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "F3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Prot. Relè Diff. RD2",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione ausiliaria 230Vac del relè differenziale Tipo B RD2 e il circuito di sgancio dell'interruttore Q2 (UTA Copertura Torre A).",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "RD2",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Relè Diff. UTA Tetto",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale elettronico Tipo B per partenza Q2",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Rileva tramite i toroidi TAD2 e TAB2 eventuali dispersioni a terra in AC o DC degli inverter ventilatori dell'Unità Trattamento Aria (UTA) in copertura Torre A, aprendo Q2.",
          "cable": "Sensori TAD2 + TAB2 · Protetto da F3",
          "relatedIds": [
            "F3",
            "Q2",
            "TAD2",
            "TAB2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "UTA in Copertura",
          "ratingBadge": "MCCB 4P 80/160A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD 80-800 4P (1SDA066817R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il montante diretto in copertura (+48 m) che alimenta il quadro bordo macchina dell'Unità Trattamento Aria (UTA / VMC centralizzata) della Torre A.",
          "cable": "FG16OM16 5G25 mm²",
          "relatedIds": [
            "RD2",
            "F3",
            "TAD2",
            "TAB2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "TAB2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Sotto Q2)",
          "shortLabel": "Toroide DC UTA",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 (9B80) Toroide chiuso Ø80 mm su linea Q2",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale in corrente continua liscia abbinato al relè RD2 sulla partenza UTA Copertura.",
          "cable": "Cavo WB3",
          "relatedIds": [
            "RD2",
            "TAD2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAD2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Sotto Q2)",
          "shortLabel": "Toroide AC UTA",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 (9D80) Toroide chiuso Ø80 mm su linea Q2",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC/pulsante abbinato al relè RD2 sulla partenza UTA Copertura.",
          "cable": "Cavo WD3",
          "relatedIds": [
            "RD2",
            "TAB2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "SC1",
          "kind": "spd",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Scaricatore Fulmini",
          "ratingBadge": "SPD Tipo 1+2 · 50kA",
          "brandModel": "DEHN DEHNshield DSH TT 255 FM (941 315) Scaricatore combinato Tipo 1+2",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge le sbarre e le dorsali elettroniche/ascensori della Torre A dalle sovratensioni atmosferiche e di manovra.",
          "cable": "FS17 25 mm² verso barra PE 25×5 mm (nota: sui quadri QESC-A/B collegato direttamente alle sbarre in regime di autoprotezione ≤160A di Q1)",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DEHN-941315",
          "vvfState": "vital"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Prot. Multimetro M1",
          "ratingBadge": "3P+N 10×38 · 2A gG",
          "brandModel": "ABB M204743 Portafusibile sezionatore 3P+N 32A con cartucce 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge gli ingressi voltmetrici trifase e l'alimentazione ausiliaria 230Vac del multimetro digitale M1 di Torre A.",
          "cable": "FS17 2,5 / 1,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 3,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Rifasamento Autom.",
          "ratingBadge": "3P C32 · 300mA A · 10kA",
          "brandModel": "ABB S203M-C32 + Blocco diff. DDA203 A 40A 0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il Quadro di Rifasamento Automatico trifase a servizio della Torre A (asservito a TA1).",
          "cable": "FG16OM16 4G10 mm²",
          "relatedIds": [
            "TA1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Ascensore DX — F.M.",
          "ratingBadge": "4P K20 · 300mA Tipo B-APR",
          "brandModel": "ABB S204M-K20 + Blocco diff. DDA204 B APR-25/0,3A (curva K motori + Tipo B inverter)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea Forza Motrice 400V del quadro manovra Ascensore Destro della Torre A.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Ascensore DX — Luce",
          "ratingBadge": "1P+N C16 · 300mA A",
          "brandModel": "ABB DS201 C16 A300 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea separata Luce cabina, vano corsa, allarme e teleallarme dell'Ascensore Destro Torre A.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Ascensore SX — F.M.",
          "ratingBadge": "4P K20 · 300mA Tipo B-APR",
          "brandModel": "ABB S204M-K20 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea Forza Motrice 400V del quadro manovra Ascensore Sinistro della Torre A.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [
            "Q7"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Ascensore SX — Luce",
          "ratingBadge": "1P+N C16 · 300mA A",
          "brandModel": "ABB DS201 C16 A300 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea Luce cabina/vano e ausiliari dell'Ascensore Sinistro Torre A.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Estrattore Cappe Tetto",
          "ratingBadge": "4P C20 · 300mA Tipo B-APR",
          "brandModel": "ABB S204M-C20 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il torrino estrattore centralizzato cappe cucina installato in copertura della Torre A.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q9",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Linea → QE.PL",
          "ratingBadge": "4P C50 · 10kA",
          "brandModel": "ABB S204M-C50 4P 10kA (S544030)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase diretta al Piano Rialzato per alimentare il Quadro Palestra Condominiale Torre A (QE.PL).",
          "cable": "FG16OM16 5G16 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-pl",
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q10",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "16× Quadri Piano (QEP)",
          "ratingBadge": "4P C25 · 10kA",
          "brandModel": "ABB S204M-C25 4P 10kA (S550772)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il montante verticale trifase nel cavedio impianti che alimenta i 16 Quadri Elettrici di Piano (QEP.01, QEP.02, 11×QEP.03, 2×QEP.04 al 7°/10°, QEP.05 al 14°) della Torre A.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Amplif. Bus Contabilizz.",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + Blocco diff. DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i ripetitori/amplificatori del bus di contabilizzazione consumi lungo la colonna montante della Torre A.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q12",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prese Vano Scala",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la colonna prese di servizio pulizie/manutenzione nel vano scala della Torre A.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q13",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Gen. Luce Vano Scala",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge l'intero sistema di illuminazione del Vano Scala Torre A: ramo permanente, ramo temporizzato (tramite TS13 + K13) e lampade di emergenza (tramite F13).",
          "cable": "FG16OM16 5G4 + 3G4 mm²",
          "relatedIds": [
            "TS13",
            "K13",
            "F13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TS13",
          "kind": "timer",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Temp. Luce Scale",
          "ratingBadge": "Temporizzatore 230V",
          "brandModel": "ABB E232-230 Temporizzatore luce scale",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Riceve la pressione dei pulsanti luminosi ai piani del vano scala Torre A ed eccita a tempo il contattore K13.",
          "cable": "Alimentato da Q13",
          "relatedIds": [
            "Q13",
            "K13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K13",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Contatt. Luce Scale",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 / ESB20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il montante luci temporizzate del vano scala Torre A su impulso di TS13.",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "Q13",
            "TS13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F13",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Luce Emerg. Vano Scala",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q13: protegge la dorsale dedicata agli apparecchi autonomi di illuminazione di emergenza del vano scala Torre A.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q14",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Luce Cantine P.Terra",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione dei corridoi cantine al Piano Terra della Torre A (e alimenta F14).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "F14"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F14",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Emerg. Cantine P.Terra",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q14: protegge il circuito lampade di emergenza dei corridoi cantine al Piano Terra Torre A.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q14"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q15",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prese Cantine P.Terra",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio comuni lungo i corridoi cantine al Piano Terra Torre A.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q16",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Cantine P.-1",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione dei corridoi cantine al Piano 1° Interrato (-1) esclusivi della Torre A (e alimenta F16).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "F16"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F16",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Cantine P.-1",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q16: protegge la linea lampade di emergenza dei corridoi cantine Piano -1 Torre A.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q16"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q17",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Cantine P.-1",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio nei corridoi cantine al Piano -1 della Torre A.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q18",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Cantine P.-2",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione dei corridoi cantine al Piano 2° Interrato (-2) della Torre A (e alimenta F18).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "F18"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F18",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Cantine P.-2",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q18: protegge la linea lampade di emergenza dei corridoi cantine al Piano -2 Torre A.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q18"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q19",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Cantine P.-2",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio comuni dei corridoi cantine al Piano -2 Torre A.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q20",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Gen. Loc. Contatori A",
          "ratingBadge": "1P+N C25 · 30mA A",
          "brandModel": "ABB DS201 C25 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale dei servizi elettrici interni al Locale Contatori Scala A al Piano -1 (alimenta Q20.1, Q20.2 e F20).",
          "cable": "Interno gruppo Q20",
          "relatedIds": [
            "Q20.1",
            "Q20.2",
            "F20"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q20.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Loc. Contat. A",
          "ratingBadge": "1P+N C16 · 6kA",
          "brandModel": "ABB SN201 C16 Magnetotermico compatto 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese 230V del Locale Contatori Scala A (Piano -1).",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q20"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q20.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Loc. Contat. A",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la luce ordinaria del Locale Contatori Scala A (con contatto ausiliario verso l'emergenza F20).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q20",
            "F20"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F20",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Loc. Contat. A",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge la linea lampade di emergenza del Locale Contatori Scala A al Piano -1.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q20",
            "Q20.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q21",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Gen. Immondezzaio A",
          "ratingBadge": "1P+N C25 · 30mA A",
          "brandModel": "ABB DS201 C25 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale del Locale Rifiuti / Immondezzaio Torre A (alimenta Q21.1, Q21.2 e F21).",
          "cable": "Interno gruppo Q21",
          "relatedIds": [
            "Q21.1",
            "Q21.2",
            "F21"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q21.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Immondezz. A",
          "ratingBadge": "1P+N C16 · 6kA",
          "brandModel": "ABB SN201 C16 Magnetotermico compatto 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio del Locale Immondezzaio Torre A.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q21"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q21.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Immondezz. A",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione del Locale Immondezzaio Torre A.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q21",
            "F21"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F21",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Immondezz. A",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge il circuito lampade di emergenza del Locale Immondezzaio Torre A.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q21",
            "Q21.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q22",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Linea → QE.01BICI",
          "ratingBadge": "1P+N C25 · 6kA",
          "brandModel": "ABB S201Na C25 Magnetotermico 1P+N 25A 6kA (S531795)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea monofase al Piano Rialzato che alimenta il Quadro Deposito Biciclette Torre A (QE.01BICI).",
          "cable": "FG16OM16 3G6 / 3G10 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-01bici",
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q23",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Impianto FTTH / TV A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il centro stella ottico / centralini testa impianto TV-SAT e multiservizio FTTH della Torre A.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-VDP",
          "vvfState": "tripped"
        },
        {
          "id": "Q24",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Videocitofono Torre A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge gli alimentatori/distributori di colonna dell'impianto videocitofonico digitale della Torre A.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-VDP",
          "vvfState": "tripped"
        },
        {
          "id": "Q25",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 16A.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q26",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce/Prese Locali Comuni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i servizi elettrici dei disimpegni/locali tecnici comuni della Torre A.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q27",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Esterna Ingresso A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge l'illuminazione esterna dell'ingresso pedonale Torre A, gestita automaticamente dall'orologio astronomico OR27 e dal contattore K27.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "K27",
            "OR27"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K27",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Luce Esterna",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 / ESB20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il circuito luci esterne ingresso Torre A su ordine dell'interruttore astronomico OR27.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q27",
            "OR27"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "OR27",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Astro Luce Esterna",
          "ratingBadge": "Astronomico 230V",
          "brandModel": "Vemer ASTline VE344800 Interruttore orario crepuscolare astronomico",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Accende al tramonto e spegne all'alba l'illuminazione esterna dell'ingresso Torre A tramite il contattore K27.",
          "cable": "Alimentato da Q27",
          "relatedIds": [
            "Q27",
            "K27"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "Q28",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 7 (200 mm)",
          "shortLabel": "Rivelazione Incendio / Scorta",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Partenza monofase protetta 10A 30mA indicata a scorta nel fascicolo quadrista (prevista nell'unifilare di progetto per centrale rivelazione incendio Torre A).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TA1",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Rifasamento 150/5A",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Invia tramite morsettiera X2 il segnale amperometrico al Quadro di Rifasamento Automatico di Torre A.",
          "cable": "FS17 2,5 mm² su X2",
          "relatedIds": [
            "Q3",
            "X2"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Fase L1 → M1",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura amperometrica fase L1 per il wattmetro M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA3",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Fase L2 → M1",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura amperometrica fase L2 per il wattmetro M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Fase L3 → M1",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura amperometrica fase L3 per il wattmetro M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "Morsettiera Potenza X1",
          "ratingBadge": "Dorsali Torre A",
          "brandModel": "Morsettiera verticale di potenza su guida DIN",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta tutte le partenze verso UTA, ascensori DX/SX, 16 quadri di piano QEP, cantine, locale contatori, immondezzaio e quadri secondari di Torre A.",
          "cable": "Colonna cavi SX",
          "relatedIds": [
            "Q10",
            "Q9",
            "Q22"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X2",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "Morsettiera Ausiliari X2",
          "ratingBadge": "Pulsanti Scale & TA",
          "brandModel": "Morsettiera ausiliaria comandi pulsanti scale e TA rifasamento",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta il ritorno dei pulsanti luce vano scala per TS13 e i conduttori del TA1 rifasamento.",
          "cable": "Colonna cavi SX",
          "relatedIds": [
            "TS13",
            "TA1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 10,
      "slug": "qe-pl",
      "code": "QE.PL",
      "title": "Quadro Elettrico Palestra Condominiale (Torre A)",
      "nodeId": "QEPL",
      "plantId": "IMP-SCA",
      "plantLabel": "2 · Servizi Torre A",
      "swatch": "sca",
      "location": {
        "buildingZone": "Torre A — Spazi Comuni",
        "floor": "Piano Rialzato (+2,4 m)",
        "room": "Locale Palestra ad Uso Condominiale",
        "mounting": "Centralino da incasso a muro 36 moduli (3 file × 12 moduli) con portella cieca bianca",
        "whereHowToFind": "Incassato a parete nella Palestra condominiale al Piano Rialzato della Torre A."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "FAEG FG14636 Centralino da incasso 36 moduli con portella cieca",
        "dimensionsMm": "510 × 335 × 85 mm",
        "heightMm": 510,
        "widthMm": 335,
        "depthMm": 85,
        "ipRating": "IP40",
        "ral": "RAL 9016 (Bianco)",
        "doorType": "Portella cieca incernierata a sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "50 A",
        "shortCircuitIcc": "6 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-3"
      },
      "upstream": {
        "label": "Quadro Generale Scala A QESC-A (Interruttore Q9 · 4P C50)",
        "detail": "Linea trifase FG16OM16 5G16 mm² proveniente da Q9 del quadro QESC-A.",
        "panelSlug": "qesc-a",
        "panelComp": "Q9",
        "mapNodeId": "QESCA",
        "mapPlantId": "IMP-SCA"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Segue l'alimentazione del quadro generale di Torre A (QESC-A / AVSC-A).",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Telaio Incasso 36 Moduli (3 Guide DIN × 12 Moduli)",
          "rows": [
            {
              "id": "R1",
              "title": "Fila DIN 1 · Generale Trifase C50, Prese Sala Attrezzi e Ripartitore 4P",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q1",
                "Q2",
                "Q3",
                "RP1"
              ]
            },
            {
              "id": "R2",
              "title": "Fila DIN 2 · Unità Interne Clima, Luce/Emergenza, SOS Bagno Disabili e Recuperatore",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q4",
                "Q5",
                "F5",
                "Q6",
                "R6",
                "Q7",
                "Q8"
              ]
            },
            {
              "id": "R3",
              "title": "Fila DIN 3 · Unità Esterna Climatizzazione Trifase (Tipo B) e Scorte",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q9.1",
                "Q9",
                "Q10",
                "Q11"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Generale Palestra",
          "ratingBadge": "4P C50 · 6kA",
          "brandModel": "BTicino BTDIN60 FN84C50 Magnetotermico 4P 50A 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale tetrapolare della Palestra Torre A: seziona l'arrivo 5G16 mm² da QESC-A e alimenta il ripartitore RP1.",
          "cable": "Ingresso FG16OM16 5G16 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FN84",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese 01 Palestra",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il primo circuito prese 10/16A/Schuko della sala palestra (attrezzi cardio e servizi).",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese 02 Palestra",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il secondo circuito prese 10/16A/Schuko della palestra e spogliatoi.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 4,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Ripartitore 4P 125A",
          "ratingBadge": "Sbarra 4P · 125A",
          "brandModel": "Ripartitore modulare tetrapolare su guida DIN 125A (Icw 6kA)",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Equilibra e distribuisce le tre fasi e il neutro dal generale Q1 a tutte le partenze monofase e trifase del quadro palestra.",
          "cable": "FS17 16 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Unità Interne Clima",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le unità interne di climatizzazione a servizio della palestra.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Luce + Automazioni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria e le automazioni serramenti della palestra (e alimenta a valle F5).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "F5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Luce Emergenza",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "BTicino BTDIN F321N Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q5: protegge la linea dedicata alle lampade autonome di illuminazione di emergenza della Palestra e servizi.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-F321N",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Alim. SOS Disabili",
          "ratingBadge": "1P+N C6 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A6 Magnetotermico differenziale 1P+N C6 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge e alimenta il circuito di chiamata di soccorso del WC e doccia disabili della palestra (relè R6, tirante a cordicella, pulsante di reset e targa ottico-acustica).",
          "cable": "FG16OM16 5G1,5 + 3G1,5 mm²",
          "relatedIds": [
            "R6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "R6",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Relè Chiamata SOS",
          "ratingBadge": "Set/Reset · 230Vac",
          "brandModel": "Finder Serie 13.11 (13.11.8.230.0000) Relè di chiamata bistabile con comando di reset",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Memorizza la richiesta di aiuto azionata dal tirante nel bagno/doccia disabili della palestra attivando la segnalazione luminosa/acustica esterna fino alla pressione del pulsante locale di tacitazione/reset.",
          "cable": "Protetto da Q6",
          "relatedIds": [
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-FINDER-1311",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Scaldasalviette Bagno",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge lo scaldasalviette elettrico dei servizi igienici/spogliatoi della palestra.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Recuperatore Calore",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'unità di ventilazione meccanica con recuperatore di calore dedicata al ricambio aria della palestra.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q9.1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "MT Unità Esterna Clima",
          "ratingBadge": "4P D20 · 6kA",
          "brandModel": "BTicino BTDIN60 FN84D20 Magnetotermico 4P curva D 20A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge da sovraccarico e cortocircuito (curva D per spunto compressore) l'unità motocondensante esterna trifase a inverter della climatizzazione palestra (in serie al differenziale Tipo B Q9).",
          "cable": "Linea trifase 400V",
          "relatedIds": [
            "Q9"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FN84",
          "vvfState": "tripped"
        },
        {
          "id": "Q9",
          "kind": "rccb",
          "modules": 4,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Diff. Tipo B Clima Est.",
          "ratingBadge": "4P 40A · 300mA Tipo B",
          "brandModel": "BTicino G744B40 Interruttore differenziale puro 4P 40A Idn=0,3A Tipo B",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge dai guasti a terra in AC e in corrente continua liscia l'inverter trifase dell'unità esterna climatizzazione palestra.",
          "cable": "In serie a Q9.1",
          "relatedIds": [
            "Q9.1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q10",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Circuito di riserva da 16A.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Circuito di riserva da 10A.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 11,
      "slug": "qe-01bici",
      "code": "QE.01BICI",
      "title": "Quadro Elettrico Deposito Biciclette & Servizi Annessi (Torre A)",
      "nodeId": "QEDB",
      "plantId": "IMP-SCA",
      "plantLabel": "2 · Servizi Torre A",
      "swatch": "sca",
      "location": {
        "buildingZone": "Torre A — Spazi Comuni",
        "floor": "Piano Rialzato (+2,4 m)",
        "room": "Locale Deposito Biciclette Condominiale",
        "mounting": "Centralino da incasso a muro 36 moduli (1 fila occupata + 2 file libere) con portella cieca bianca",
        "whereHowToFind": "Incassato a parete nel locale Deposito Biciclette e servizi annessi al Piano Rialzato della Torre A."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "FAEG FG14636 Centralino da incasso 36 moduli con portella cieca",
        "dimensionsMm": "510 × 335 × 85 mm",
        "heightMm": 510,
        "widthMm": 335,
        "depthMm": 85,
        "ipRating": "IP40",
        "ral": "RAL 9016 (Bianco)",
        "doorType": "Portella cieca incernierata a sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "230 Vac · 50 Hz (1F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "25 A",
        "shortCircuitIcc": "4,5 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-3"
      },
      "upstream": {
        "label": "Quadro Generale Scala A QESC-A (Interruttore Q22 · 1P+N C25)",
        "detail": "Linea monofase FG16OM16 3G6/3G10 mm² proveniente da Q22 del quadro QESC-A.",
        "panelSlug": "qesc-a",
        "panelComp": "Q22",
        "mapNodeId": "QESCA",
        "mapPlantId": "IMP-SCA"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Segue l'alimentazione del quadro generale QESC-A.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Telaio Incasso 36 Moduli (3 Guide DIN × 12 Moduli)",
          "rows": [
            {
              "id": "R1",
              "title": "Fila DIN 1 · Generale, Prese Deposito/Servizi, Scaldasalviette, Luce ed Emergenza",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q1",
                "Q2",
                "Q3",
                "Q4",
                "Q5",
                "F5"
              ]
            },
            {
              "id": "R2",
              "title": "Fila DIN 2 · Riserva Modulare Libera",
              "heightMm": 150,
              "isReserve": true,
              "note": "Guida DIN vuota (12 moduli disponibili, es. future prese ricarica e-bike)",
              "slots": []
            },
            {
              "id": "R3",
              "title": "Fila DIN 3 · Riserva Modulare Libera",
              "heightMm": 150,
              "isReserve": true,
              "note": "Guida DIN vuota (12 moduli disponibili)",
              "slots": []
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Generale Quadro",
          "ratingBadge": "1P+N C25 · 4,5kA",
          "brandModel": "BTicino BTDIN45 FA81NC25 Magnetotermico 1P+N 25A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale manuale del quadro Deposito Biciclette: seziona l'intera distribuzione locale.",
          "cable": "Ingresso da QESC-A (Q22)",
          "relatedIds": [
            "Q2",
            "Q3",
            "Q4",
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FN84",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese Deposito Bici",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese a spina 230V all'interno del locale Deposito Biciclette.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese Locali Servizio",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese e il boiler dei locali di servizio/bagni annessi al deposito bici.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Scaldasalviette Servizi",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge gli scaldasalviette elettrici dei locali di servizio annessi.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Luce + Automazioni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria e le automazioni del Deposito Biciclette (e alimenta a valle F5).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "F5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Luce Emergenza",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "BTicino BTDIN F321N Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q5: protegge la linea dedicata alle lampade autonome di illuminazione di emergenza del Deposito Biciclette.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-F321N",
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 12,
      "slug": "avsc-b",
      "code": "AVSC-B",
      "title": "Avanquadro Generale Scala / Torre B",
      "nodeId": "AVSCB",
      "plantId": "IMP-SCB",
      "plantLabel": "3 · Servizi Torre B",
      "swatch": "scb",
      "location": {
        "buildingZone": "Corpo Parti Comuni Generali → Montante Torre B",
        "floor": "Piano Terra (0,0 m)",
        "room": "Locale Contatori Principale",
        "mounting": "Quadro murale in resina isolante con porta trasparente incernierata a sinistra",
        "whereHowToFind": "Installato nel Locale Contatori Principale al Piano Terra immediatamente a valle del contatore trifase da 50 kW dedicato ai Servizi Comuni della Scala / Torre B; protegge la dorsale verso il quadro generale QESC-B al Piano -1."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB Serie Gemini 1SL0212A00 (cassa in resina termoindurente IP66 con porta trasparente)",
        "dimensionsMm": "550 × 460 × 260 mm",
        "heightMm": 550,
        "widthMm": 460,
        "depthMm": 260,
        "ipRating": "IP66",
        "ral": "RAL 7035",
        "doorType": "Porta trasparente a battente singolo (cerniere SX)",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "160 A",
        "shortCircuitIcc": "18 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Contatore POD Servizi Scala B (50 kW · 400V Trifase)",
        "detail": "Cavi unipolari FG16OM16 3×(1×70) + 1×70N mm² dal contatore del distributore nel Locale Contatori Principale.",
        "panelSlug": null,
        "mapNodeId": "POD-SCB",
        "mapPlantId": "IMP-INGRESSI"
      },
      "downstreamPanels": [
        {
          "code": "QESC-B",
          "label": "Quadro Generale Scala / Torre B (Piano -1)",
          "viaComp": "Q1",
          "panelSlug": "qesc-b"
        }
      ],
      "vvfBehavior": "Dotato di bobina di sgancio a lancio di corrente 230Vac sull'interruttore generale Q1: l'azionamento del pulsante di sgancio emergenza Energia Scala B o l'intervento del relè Tipo B RD1/DER1 seziona il montante di Torre B.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Fronte Modulare Interno (3 sezioni: 150 + 225 + 150 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 (150 mm) · Testata Ingresso Cavi da Contatore",
              "heightMm": 150,
              "isReserve": true,
              "note": "Attestazione corde 70 mm²",
              "slots": []
            },
            {
              "id": "R2",
              "title": "Pannello 2 (225 mm) · Fusibile Ausiliario, Relè Diff. Tipo B e MCCB Generale 160A",
              "heightMm": 225,
              "isReserve": false,
              "slots": [
                "F1",
                "RD1",
                "Q1"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (150 mm · Interno Fondo) · Coppia Toroidi Chiusi Ø80 mm",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "TAD1",
                "TAB1"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 2,
          "bayLabel": "Pannello 2 (225 mm)",
          "shortLabel": "Prot. Relè RD1 & Sgancio",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a monte di Q1 (sempre in tensione): protegge l'alimentazione ausiliaria del relè differenziale Tipo B RD1 e il circuito di sgancio dell'interruttore generale Q1.",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "RD1",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 2 (225 mm)",
          "shortLabel": "Relè Diff. Montante B",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D (RD1 / DER1) Relè differenziale elettronico Tipo B",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Monitora tramite TAD1 e TAB1 eventuali dispersioni verso terra AC/DC sul montante Torre B e comanda l'apertura immediata di Q1.",
          "cable": "Collegato a TAD1 + TAB1",
          "relatedIds": [
            "F1",
            "TAD1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 2 (225 mm)",
          "shortLabel": "Montante → QESC-B",
          "ratingBadge": "MCCB 4P 160A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD (112-160A) 4P + Bobina lancio SOR 230V + Contatto stato MAUX (1SDA066821R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale di partenza che alimenta e protegge il montante principale diretto al Quadro Generale Scala B (QESC-B, Piano -1).",
          "cable": "FG16OM16 3×(1×70) + 1×70N + 1×35PE mm²",
          "relatedIds": [
            "RD1",
            "F1",
            "TAD1",
            "TAB1"
          ],
          "targetPanelSlug": "qesc-b",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "TAD1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Pannello 3 (Fondo)",
          "shortLabel": "Toroide AC Ø80mm",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 (9D80) Toroide chiuso Ø80 mm",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Rileva le componenti alternate e pulsanti di dispersione verso terra sul montante Torre B per il relè RD1.",
          "cable": "Cavo WD1",
          "relatedIds": [
            "RD1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "TAB1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Pannello 3 (Fondo)",
          "shortLabel": "Toroide DC Ø80mm",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 (9B80) Toroide chiuso Ø80 mm",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Rileva le componenti continue lisce di guasto a terra (Tipo B) sul montante Torre B per il relè RD1.",
          "cable": "Cavo WB1",
          "relatedIds": [
            "RD1",
            "TAD1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        }
      ]
    },
    {
      "order": 13,
      "slug": "qesc-b",
      "code": "QESC-B",
      "title": "Quadro Generale Servizi Comuni Scala / Torre B",
      "nodeId": "QESCB",
      "plantId": "IMP-SCB",
      "plantLabel": "3 · Servizi Torre B",
      "swatch": "scb",
      "location": {
        "buildingZone": "Torre B — Servizi Generali di Edificio",
        "floor": "Piano Primo Interrato (-1 · -3,2 m)",
        "room": "Locale Contatori Scala B",
        "mounting": "Armadio metallico autoportante a pavimento ABB Energy-L (colonna apparecchi DX 24 mod. + risalita cavi SX)",
        "whereHowToFind": "Installato a pavimento nel Locale Contatori dedicato della Torre B al Piano -1. Riceve il montante da AVSC-B e distribuisce energia a tutti i servizi comuni verticali e orizzontali della Torre B (ascensori DX/SX, UTA, estrattore cappe, 16 quadri di piano QEP, cantine e sale condominiali)."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy L Q843B818 (metallo con porta in vetro IP43)",
        "dimensionsMm": "1949 × 816 × 250 mm",
        "heightMm": 1949,
        "widthMm": 816,
        "depthMm": 250,
        "ipRating": "IP43",
        "ral": "RAL 7035",
        "doorType": "Porta in vetro incernierata a destra + risalita cavi interna laterale sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "160 A (Sbarre 250 A)",
        "shortCircuitIcc": "15 kA (18 kA condiz.)",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Avanquadro Scala B AVSC-B (Interruttore Q1 · 160A)",
        "detail": "Montante in cavi unipolari FG16OM16 3×(1×70) + 1×70N + 1×35PE mm² dal Locale Contatori Principale al Piano Terra.",
        "panelSlug": "avsc-b",
        "panelComp": "Q1",
        "mapNodeId": "AVSCB",
        "mapPlantId": "IMP-SCB"
      },
      "downstreamPanels": [
        {
          "code": "QE.03POLIFUNZ",
          "label": "Quadro Spazio Polifunzionale & Lavanderia Torre B",
          "viaComp": "Q9",
          "panelSlug": "qe-03polifunz"
        },
        {
          "code": "QE.02RIUNIONI",
          "label": "Quadro Sala Riunioni Torre B",
          "viaComp": "Q22",
          "panelSlug": "qe-02riunioni"
        }
      ],
      "vvfBehavior": "Sottoposto allo sgancio di emergenza energia di Torre B (comando su AVSC-B / Q1).",
      "bays": {
        "leftBay": {
          "title": "Vano Risalita Cavi Interno SX",
          "subtitle": "4 TA 150/5A e Morsettiere verticali X1, X2",
          "slots": [
            "TA1",
            "TA2",
            "TA3",
            "TA4",
            "X1",
            "X2"
          ]
        },
        "mainBay": {
          "title": "Colonna Apparecchiature DX 24 Moduli (QESC-B)",
          "rows": [
            {
              "id": "R0",
              "title": "Fascia Superiore (50 mm) · Testata Armadio",
              "heightMm": 50,
              "isReserve": true,
              "note": "Chiusura superiore colonna DX",
              "slots": []
            },
            {
              "id": "R1",
              "title": "Pannello 1 (300 mm) · Sezionatore Generale, Multimetro, Relè Diff. Tipo B e UTA Copertura",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "Q1",
                "M1",
                "F3",
                "RD2",
                "Q2",
                "TAB2",
                "TAD2"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (200 mm) · Scaricatore SPD, Fusibile Multimetro, Rifasamento e Ascensore Destro",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "SC1",
                "F2",
                "Q3",
                "Q4",
                "Q5"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (200 mm) · Ascensore Sinistro, Estrattore Cappe Copertura e Quadro Sala Condominiale",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q6",
                "Q7",
                "Q8",
                "Q9"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Dorsale 16 Quadri di Piano, M-Bus, Prese/Luci Vano Scala e Cantine P.Terra",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q10",
                "Q11",
                "Q12",
                "Q13",
                "TS13",
                "K13",
                "F13",
                "Q14",
                "F14",
                "Q15"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Cantine P.-2, Locale Contatori Torre B e Locale Immondezzaio",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q18",
                "F18",
                "Q19",
                "Q20",
                "Q20.1",
                "Q20.2",
                "F20",
                "Q21",
                "Q21.1",
                "Q21.2",
                "F21",
                "Q22",
                "Q23"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 6 (200 mm) · QE.02RIUNIONI, FTTH/TV, Videocitofono, Locali Comuni e Luce Esterna",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q24",
                "Q25",
                "Q26",
                "Q27",
                "K27",
                "OR27",
                "Q28"
              ]
            },
            {
              "id": "R7",
              "title": "Pannello 7 (200 mm) · Guida DIN di Riserva",
              "heightMm": 200,
              "isReserve": true,
              "note": "Riserva modulare libera",
              "slots": []
            },
            {
              "id": "R8",
              "title": "Fascia Inferiore (150 mm) · Fondo Colonna",
              "heightMm": 150,
              "isReserve": true,
              "note": "Zoccolo / chiusura inferiore",
              "slots": []
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Sezionatore Generale",
          "ratingBadge": "4P 160A · Icc 18kA",
          "brandModel": "ABB SACE Tmax XT1D 160 4P Fisso + Bobina sgancio SOR 230Vac (1SDA068209R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale del quadro principale di Torre B: seziona il montante proveniente da AVSC-B e alimenta le sbarre verticali da 250A dell'edificio.",
          "cable": "Ingresso FG16OM16 3×(1×70)+1×70N+1×35PE mm²",
          "relatedIds": [
            "TA1",
            "TA2",
            "TA3",
            "TA4",
            "SC1",
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "M1",
          "kind": "meter",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Wattmetro Torre B",
          "ratingBadge": "V / A / kW / kWh",
          "brandModel": "Vemer EV3M-4DIN (VE333100) Wattmetro trifase multifunzione su guida DIN",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura tensioni, correnti delle tre fasi (tramite TA2, TA3, TA4 da 150/5A), potenza ed energia assorbita dai servizi comuni della Torre B.",
          "cable": "Protetto da F2 · Ingressi da TA2-TA4",
          "relatedIds": [
            "F2",
            "TA2",
            "TA3",
            "TA4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "F3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Prot. Relè Diff. RD2",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione ausiliaria 230Vac del relè differenziale Tipo B RD2 e il circuito di sgancio dell'interruttore Q2 (UTA Copertura Torre B).",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "RD2",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "Relè Diff. UTA Tetto",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale elettronico Tipo B per partenza Q2",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Rileva tramite i toroidi TAD2 e TAB2 eventuali dispersioni a terra in AC o DC degli inverter ventilatori dell'Unità Trattamento Aria (UTA) in copertura Torre B, aprendo Q2.",
          "cable": "Sensori TAD2 + TAB2 · Protetto da F3",
          "relatedIds": [
            "F3",
            "Q2",
            "TAD2",
            "TAB2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "mccb",
          "modules": 4,
          "bayLabel": "Pannello 1 (300 mm)",
          "shortLabel": "UTA in Copertura",
          "ratingBadge": "MCCB 4P 80/160A · 18kA",
          "brandModel": "ABB SACE Tmax XT1B 160 TMD 80-800 4P (1SDA066817R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il montante diretto in copertura (+48 m) che alimenta il quadro bordo macchina dell'Unità Trattamento Aria (UTA / VMC centralizzata) della Torre B.",
          "cable": "FG16OM16 5G25 mm²",
          "relatedIds": [
            "RD2",
            "F3",
            "TAD2",
            "TAB2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "TAB2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Sotto Q2)",
          "shortLabel": "Toroide DC UTA",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 (9B80) Toroide chiuso Ø80 mm su linea Q2",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale in corrente continua liscia abbinato al relè RD2 sulla partenza UTA Copertura.",
          "cable": "Cavo WB3",
          "relatedIds": [
            "RD2",
            "TAD2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAD2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Sotto Q2)",
          "shortLabel": "Toroide AC UTA",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 (9D80) Toroide chiuso Ø80 mm su linea Q2",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC/pulsante abbinato al relè RD2 sulla partenza UTA Copertura.",
          "cable": "Cavo WD3",
          "relatedIds": [
            "RD2",
            "TAB2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "SC1",
          "kind": "spd",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Scaricatore Fulmini",
          "ratingBadge": "SPD Tipo 1+2 · 50kA",
          "brandModel": "DEHN DEHNshield DSH TT 255 FM (941 315) Scaricatore combinato Tipo 1+2",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge le sbarre e le dorsali elettroniche/ascensori della Torre B dalle sovratensioni atmosferiche e di manovra.",
          "cable": "FS17 25 mm² verso barra PE 25×5 mm (nota: sui quadri QESC-A/B collegato direttamente alle sbarre in regime di autoprotezione ≤160A di Q1)",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DEHN-941315",
          "vvfState": "vital"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Prot. Multimetro M1",
          "ratingBadge": "3P+N 10×38 · 2A gG",
          "brandModel": "ABB M204743 Portafusibile sezionatore 3P+N 32A con cartucce 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge gli ingressi voltmetrici trifase e l'alimentazione ausiliaria 230Vac del multimetro digitale M1 di Torre B.",
          "cable": "FS17 2,5 / 1,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 3,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Rifasamento Autom.",
          "ratingBadge": "3P C32 · 300mA A · 10kA",
          "brandModel": "ABB S203M-C32 + Blocco diff. DDA203 A 40A 0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il Quadro di Rifasamento Automatico trifase a servizio della Torre B (asservito a TA1).",
          "cable": "FG16OM16 4G10 mm²",
          "relatedIds": [
            "TA1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Ascensore DX — F.M.",
          "ratingBadge": "4P K20 · 300mA Tipo B-APR",
          "brandModel": "ABB S204M-K20 + Blocco diff. DDA204 B APR-25/0,3A (curva K motori + Tipo B inverter)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea Forza Motrice 400V del quadro manovra Ascensore Destro della Torre B.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 2 (200 mm)",
          "shortLabel": "Ascensore DX — Luce",
          "ratingBadge": "1P+N C16 · 300mA A",
          "brandModel": "ABB DS201 C16 A300 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea separata Luce cabina, vano corsa, allarme e teleallarme dell'Ascensore Destro Torre B.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Ascensore SX — F.M.",
          "ratingBadge": "4P K20 · 300mA Tipo B-APR",
          "brandModel": "ABB S204M-K20 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea Forza Motrice 400V del quadro manovra Ascensore Sinistro della Torre B.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [
            "Q7"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Ascensore SX — Luce",
          "ratingBadge": "1P+N C16 · 300mA A",
          "brandModel": "ABB DS201 C16 A300 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea Luce cabina/vano e ausiliari dell'Ascensore Sinistro Torre B.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [
            "Q6"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q8",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Estrattore Cappe Tetto",
          "ratingBadge": "4P C20 · 300mA Tipo B-APR",
          "brandModel": "ABB S204M-C20 + Blocco diff. DDA204 B APR-25/0,3A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il torrino estrattore centralizzato cappe cucina installato in copertura della Torre B.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q9",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Linea → QE.03POLIFUNZ",
          "ratingBadge": "4P C32 · 10kA",
          "brandModel": "ABB S204M-C32 4P 10kA (S550789)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la dorsale trifase diretta al Piano Rialzato per alimentare il Quadro Spazio Polifunzionale & Lavanderia Torre B (QE.03POLIFUNZ).",
          "cable": "FG16OM16 5G10 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-03polifunz",
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q10",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "16× Quadri Piano (QEP)",
          "ratingBadge": "4P C25 · 10kA",
          "brandModel": "ABB S204M-C25 4P 10kA (S550772)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il montante verticale trifase nel cavedio impianti che alimenta i 16 Quadri Elettrici di Piano (QEP.01, QEP.02, 11×QEP.03, 2×QEP.04 al 7°/10°, QEP.05 al 14°) della Torre B.",
          "cable": "FG16OM16 5G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q11",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Amplif. Bus Contabilizz.",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + Blocco diff. DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i ripetitori/amplificatori del bus di contabilizzazione consumi lungo la colonna montante della Torre B.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q12",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prese Vano Scala",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la colonna prese di servizio pulizie/manutenzione nel vano scala della Torre B.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q13",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Gen. Luce Vano Scala",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge l'intero sistema di illuminazione del Vano Scala Torre B: ramo permanente, ramo temporizzato (tramite TS13 + K13) e lampade di emergenza (tramite F13).",
          "cable": "FG16OM16 5G4 + 3G4 mm²",
          "relatedIds": [
            "TS13",
            "K13",
            "F13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TS13",
          "kind": "timer",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Temp. Luce Scale",
          "ratingBadge": "Temporizzatore 230V",
          "brandModel": "ABB E232-230 Temporizzatore luce scale",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Riceve la pressione dei pulsanti luminosi ai piani del vano scala Torre B ed eccita a tempo il contattore K13.",
          "cable": "Alimentato da Q13",
          "relatedIds": [
            "Q13",
            "K13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K13",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Contatt. Luce Scale",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 / ESB20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il montante luci temporizzate del vano scala Torre B su impulso di TS13.",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "Q13",
            "TS13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F13",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Luce Emerg. Vano Scala",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q13: protegge la dorsale dedicata agli apparecchi autonomi di illuminazione di emergenza del vano scala Torre B.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q13"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q14",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Luce Cantine P.Terra",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione dei corridoi cantine al Piano Terra della Torre B (e alimenta F14).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "F14"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F14",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Emerg. Cantine P.Terra",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q14: protegge il circuito lampade di emergenza dei corridoi cantine al Piano Terra Torre B.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q14"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q15",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Prese Cantine P.Terra",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio comuni lungo i corridoi cantine al Piano Terra Torre B.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q18",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Cantine P.-2",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione dei corridoi cantine al Piano 2° Interrato (-2) della Torre B (e alimenta F18).",
          "cable": "FG16OM16 5G2,5 mm²",
          "relatedIds": [
            "F18"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F18",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Cantine P.-2",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q18: protegge la linea lampade di emergenza dei corridoi cantine al Piano -2 Torre B.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q18"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q19",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Cantine P.-2",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio comuni dei corridoi cantine al Piano -2 Torre B.",
          "cable": "FG16OM16 3G6 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q20",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Gen. Loc. Contatori B",
          "ratingBadge": "1P+N C25 · 30mA A",
          "brandModel": "ABB DS201 C25 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale dei servizi elettrici interni al Locale Contatori Scala B al Piano -1 (alimenta Q20.1, Q20.2 e F20).",
          "cable": "Interno gruppo Q20",
          "relatedIds": [
            "Q20.1",
            "Q20.2",
            "F20"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q20.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Loc. Contat. B",
          "ratingBadge": "1P+N C16 · 6kA",
          "brandModel": "ABB SN201 C16 Magnetotermico compatto 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese 230V del Locale Contatori Scala B (Piano -1).",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q20"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q20.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Loc. Contat. B",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la luce ordinaria del Locale Contatori Scala B (con contatto ausiliario verso l'emergenza F20).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q20",
            "F20"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F20",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Loc. Contat. B",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge la linea lampade di emergenza del Locale Contatori Scala B al Piano -1.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q20",
            "Q20.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q21",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Gen. Immondezzaio B",
          "ratingBadge": "1P+N C25 · 30mA A",
          "brandModel": "ABB DS201 C25 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale del Locale Rifiuti / Immondezzaio Torre B (alimenta Q21.1, Q21.2 e F21).",
          "cable": "Interno gruppo Q21",
          "relatedIds": [
            "Q21.1",
            "Q21.2",
            "F21"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q21.1",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Prese Immondezz. B",
          "ratingBadge": "1P+N C16 · 6kA",
          "brandModel": "ABB SN201 C16 Magnetotermico compatto 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese di servizio del Locale Immondezzaio Torre B.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "Q21"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q21.2",
          "kind": "mcb",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Luce Immondezz. B",
          "ratingBadge": "1P+N C10 · 6kA",
          "brandModel": "ABB SN201 C10 Magnetotermico 1P+N + contatto aux SN201-IH",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione del Locale Immondezzaio Torre B.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q21",
            "F21"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "F21",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Emerg. Immondezz. B",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge il circuito lampade di emergenza del Locale Immondezzaio Torre B.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q21",
            "Q21.2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-PERRY-EM",
          "vvfState": "tripped"
        },
        {
          "id": "Q22",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Linea → QE.02RIUNIONI",
          "ratingBadge": "1P+N C25 · 6kA",
          "brandModel": "ABB S201Na C25 Magnetotermico 1P+N 25A 6kA (S531795)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea monofase al Piano Rialzato che alimenta il Quadro Sala Riunioni Torre B (QE.02RIUNIONI).",
          "cable": "FG16OM16 3G6 / 3G10 mm²",
          "relatedIds": [],
          "targetPanelSlug": "qe-02riunioni",
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q23",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Impianto FTTH / TV B",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il centro stella ottico / centralini testa impianto TV-SAT e multiservizio FTTH della Torre B.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-VDP",
          "vvfState": "tripped"
        },
        {
          "id": "Q24",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Videocitofono Torre B",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge gli alimentatori/distributori di colonna dell'impianto videocitofonico digitale della Torre B.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-VDP",
          "vvfState": "tripped"
        },
        {
          "id": "Q25",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Scorta 16A",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "ABB DS201 C16 A30 Magnetotermico differenziale 1P+N",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 16A.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q26",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce/Prese Locali Comuni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge i servizi elettrici dei disimpegni/locali tecnici comuni della Torre B.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "Q27",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Luce Esterna Ingresso B",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Protegge l'illuminazione esterna dell'ingresso pedonale Torre B, gestita automaticamente dall'orologio astronomico OR27 e dal contattore K27.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "K27",
            "OR27"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "K27",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Contatt. Luce Esterna",
          "ratingBadge": "2P 20A · 230Vac",
          "brandModel": "ABB EN20-20N-06 / ESB20-20N-06 Contattore modulare 2P 20A",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commuta il circuito luci esterne ingresso Torre B su ordine dell'interruttore astronomico OR27.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "Q27",
            "OR27"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "OR27",
          "kind": "timer",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Astro Luce Esterna",
          "ratingBadge": "Astronomico 230V",
          "brandModel": "Vemer ASTline VE344800 Interruttore orario crepuscolare astronomico",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Accende al tramonto e spegne all'alba l'illuminazione esterna dell'ingresso Torre B tramite il contattore K27.",
          "cable": "Alimentato da Q27",
          "relatedIds": [
            "Q27",
            "K27"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "Q28",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Rivelazione Incendio / Scorta",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "ABB S201Na C10 + DDA202 A 25A 0,03A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Partenza monofase protetta 10A 30mA indicata a scorta nel fascicolo quadrista (prevista nell'unifilare di progetto per centrale rivelazione incendio Torre B).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "TA1",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Rifasamento 150/5A",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Invia tramite morsettiera X2 il segnale amperometrico al Quadro di Rifasamento Automatico di Torre B.",
          "cable": "FS17 2,5 mm² su X2",
          "relatedIds": [
            "Q3",
            "X2"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Fase L1 → M1",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura amperometrica fase L1 per il wattmetro M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA3",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Fase L2 → M1",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura amperometrica fase L2 per il wattmetro M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "TA Fase L3 → M1",
          "ratingBadge": "150 / 5 A",
          "brandModel": "IME TA32750C150 Trasformatore di corrente 150/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura amperometrica fase L3 per il wattmetro M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "Morsettiera Potenza X1",
          "ratingBadge": "Dorsali Torre B",
          "brandModel": "Morsettiera verticale di potenza su guida DIN",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta tutte le partenze verso UTA, ascensori DX/SX, 16 quadri di piano QEP, cantine, locale contatori, immondezzaio e quadri secondari di Torre B.",
          "cable": "Colonna cavi SX",
          "relatedIds": [
            "Q10",
            "Q9",
            "Q22"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X2",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Risalita Cavi SX",
          "shortLabel": "Morsettiera Ausiliari X2",
          "ratingBadge": "Pulsanti Scale & TA",
          "brandModel": "Morsettiera ausiliaria comandi pulsanti scale e TA rifasamento",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta il ritorno dei pulsanti luce vano scala per TS13 e i conduttori del TA1 rifasamento.",
          "cable": "Colonna cavi SX",
          "relatedIds": [
            "TS13",
            "TA1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 14,
      "slug": "qe-02riunioni",
      "code": "QE.02RIUNIONI",
      "title": "Quadro Elettrico Sala Riunioni Condominiale (Torre B)",
      "nodeId": "QESR",
      "plantId": "IMP-SCB",
      "plantLabel": "3 · Servizi Torre B",
      "swatch": "scb",
      "location": {
        "buildingZone": "Torre B — Spazi Comuni",
        "floor": "Piano Rialzato (+2,4 m)",
        "room": "Locale Sala Riunioni ad Uso Condominiale",
        "mounting": "Centralino da incasso a muro 36 moduli (2 file occupate + 1 fila libera) con portella cieca bianca",
        "whereHowToFind": "Incassato a parete nella Sala Riunioni condominiale al Piano Rialzato della Torre B."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "FAEG FG14636 Centralino da incasso 36 moduli con portella cieca",
        "dimensionsMm": "510 × 335 × 85 mm",
        "heightMm": 510,
        "widthMm": 335,
        "depthMm": 85,
        "ipRating": "IP40",
        "ral": "RAL 9016 (Bianco)",
        "doorType": "Portella cieca incernierata a sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "230 Vac · 50 Hz (1F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "25 A",
        "shortCircuitIcc": "4,5 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-3"
      },
      "upstream": {
        "label": "Quadro Generale Scala B QESC-B (Interruttore Q22 · 1P+N C25)",
        "detail": "Linea monofase FG16OM16 3G6/3G10 mm² proveniente da Q22 del quadro QESC-B (nota: sullo schema foglio 3.C compare il refuso testuale 'QUADRO SCALA A QESC-B', ma l'alimentazione reale è da QESC-B Torre B).",
        "panelSlug": "qesc-b",
        "panelComp": "Q22",
        "mapNodeId": "QESCB",
        "mapPlantId": "IMP-SCB"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Segue l'alimentazione del quadro generale QESC-B.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Telaio Incasso 36 Moduli (3 Guide DIN × 12 Moduli)",
          "rows": [
            {
              "id": "R1",
              "title": "Fila DIN 1 · Generale, Prese, Scaldasalviette, Chiamata SOS Disabili, Luce ed Emergenza",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q1",
                "Q2",
                "Q3",
                "Q4",
                "R4",
                "Q5",
                "F5"
              ]
            },
            {
              "id": "R2",
              "title": "Fila DIN 2 · Ventilconvettore Fan-Coil e Scorta",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q6",
                "Q7"
              ]
            },
            {
              "id": "R3",
              "title": "Fila DIN 3 · Riserva Modulare Libera",
              "heightMm": 150,
              "isReserve": true,
              "note": "Guida DIN vuota (12 moduli disponibili)",
              "slots": []
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Generale Sala Riunioni",
          "ratingBadge": "1P+N C25 · 4,5kA",
          "brandModel": "BTicino BTDIN45 FA81NC25 Magnetotermico 1P+N 25A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale manuale della Sala Riunioni Torre B: seziona tutti i circuiti interni.",
          "cable": "Ingresso da QESC-B (Q22)",
          "relatedIds": [
            "Q2",
            "Q3",
            "Q4",
            "Q5",
            "Q6",
            "Q7"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FN84",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese Sala Riunioni",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge il circuito prese a spina 10/16A/Schuko della Sala Riunioni.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Scaldasalviette Disabili",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge lo scaldasalviette elettrico del bagno accessibile annesso alla Sala Riunioni.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Alim. SOS Bagno Disabili",
          "ratingBadge": "1P+N C6 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A6 Magnetotermico differenziale 1P+N C6 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Alimenta e protegge il sistema di chiamata di soccorso bagno disabili (relè R4, tirante a soffitto, pulsante di reset e segnalatore fuoriporta).",
          "cable": "FG16OM16 5G1,5 + 3G1,5 mm²",
          "relatedIds": [
            "R4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "R4",
          "kind": "contactor",
          "modules": 1,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Relè Chiamata SOS",
          "ratingBadge": "Set/Reset · 230Vac",
          "brandModel": "Finder Serie 13.11 (13.11.8.230.0000) Relè di chiamata con comando di reset",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Attiva e mantiene memorizzato l'allarme ottico-acustico esterno alla porta del bagno disabili quando viene tirato il cordino di soccorso, fino al reset locale.",
          "cable": "Protetto da Q4",
          "relatedIds": [
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-FINDER-1311",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Luce + Automazioni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria e le automazioni della Sala Riunioni (e alimenta a valle F5).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "F5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Luce Emergenza",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "BTicino BTDIN F321N Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q5: protegge la linea dedicata agli apparecchi autonomi di illuminazione di emergenza della Sala Riunioni.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-F321N",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Fan-Coil Climatizz.",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge i ventilconvettori (fan-coil) di climatizzazione della Sala Riunioni.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 10A.",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 15,
      "slug": "qe-03polifunz",
      "code": "QE.03POLIFUNZ",
      "title": "Quadro Elettrico Spazio Polifunzionale & Locale Lavanderia (Torre B)",
      "nodeId": "QESP",
      "plantId": "IMP-SCB",
      "plantLabel": "3 · Servizi Torre B",
      "swatch": "scb",
      "location": {
        "buildingZone": "Torre B — Spazi Comuni",
        "floor": "Piano Rialzato (+2,4 m)",
        "room": "Locale Spazio Polifunzionale & Lavanderia Condominiale",
        "mounting": "Centralino da incasso a muro 36 moduli (3 file DIN) con portella cieca bianca",
        "whereHowToFind": "Incassato a parete nello Spazio Polifunzionale / Lavanderia condominiale al Piano Rialzato della Torre B."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "FAEG FG14636 Centralino da incasso 36 moduli con portella cieca",
        "dimensionsMm": "510 × 335 × 85 mm",
        "heightMm": 510,
        "widthMm": 335,
        "depthMm": 85,
        "ipRating": "IP40",
        "ral": "RAL 9016 (Bianco)",
        "doorType": "Portella cieca incernierata a sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "32 A",
        "shortCircuitIcc": "6 kA",
        "auxVoltage": "230 Vac",
        "standard": "CEI EN 61439-1 / CEI EN 61439-3"
      },
      "upstream": {
        "label": "Quadro Generale Scala B QESC-B (Interruttore Q9 · 4P C32)",
        "detail": "Linea trifase FG16OM16 5G10 mm² proveniente da Q9 del quadro QESC-B.",
        "panelSlug": "qesc-b",
        "panelComp": "Q9",
        "mapNodeId": "QESCB",
        "mapPlantId": "IMP-SCB"
      },
      "downstreamPanels": [],
      "vvfBehavior": "Segue l'alimentazione del quadro generale QESC-B.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Telaio Incasso 36 Moduli (3 Guide DIN × 12 Moduli)",
          "rows": [
            {
              "id": "R1",
              "title": "Fila DIN 1 · Generale Trifase C32, Prese Sala e Ripartitore 4P 125A",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q1",
                "Q2",
                "RP1"
              ]
            },
            {
              "id": "R2",
              "title": "Fila DIN 2 · Prese CEE Trifase Lavanderia, Scaldasalviette, Luce ed Emergenza",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q3",
                "Q4",
                "Q5",
                "F5"
              ]
            },
            {
              "id": "R3",
              "title": "Fila DIN 3 · Ventilconvettori Fan-Coil e Scorta",
              "heightMm": 150,
              "isReserve": false,
              "slots": [
                "Q6",
                "Q7"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Generale Polifunzionale",
          "ratingBadge": "4P C32 · 6kA",
          "brandModel": "BTicino BTDIN60 FN84C32 Magnetotermico 4P 32A 6kA",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale tetrapolare dello Spazio Polifunzionale e Lavanderia Torre B: seziona l'arrivo 5G10 mm² e alimenta il ripartitore RP1.",
          "cable": "Ingresso FG16OM16 5G10 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-FN84",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Prese 01 Polifunzionale",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese a spina 10/16A/Schuko dello Spazio Polifunzionale.",
          "cable": "FG16OM16 3G4 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "RP1",
          "kind": "busbar",
          "modules": 4,
          "bayLabel": "Fila DIN 1",
          "shortLabel": "Ripartitore 4P 125A",
          "ratingBadge": "Sbarra 4P · 125A",
          "brandModel": "Ripartitore modulare tetrapolare su guida DIN 125A (Icw 6kA)",
          "roleTitle": "COSA DISTRIBUISCE",
          "whatItDoes": "Distribuisce le tre fasi e il neutro tra le macchine trifase di lavanderia e i circuiti monofase del locale.",
          "cable": "FS17 6 mm²",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "rcbo",
          "modules": 4,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Prese CEE Lavanderia",
          "ratingBadge": "4P C16 · 30mA A · 6kA",
          "brandModel": "BTicino BTDIN60 GN8843A16 Magnetotermico differenziale 4P C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge le prese industriali CEE trifase/monofase per lavatrici ed essiccatoi professionali del Locale Lavanderia condominiale.",
          "cable": "FG16OM16 5G4 mm²",
          "relatedIds": [
            "RP1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Scaldasalviette Bagno",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge lo scaldasalviette elettrico del bagno annesso.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Luce + Automazioni",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge l'illuminazione ordinaria e le automazioni dello Spazio Polifunzionale e Lavanderia (e alimenta F5).",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [
            "F5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Fila DIN 2",
          "shortLabel": "Luce Emergenza",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "BTicino BTDIN F321N Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a valle di Q5: protegge la linea dedicata agli apparecchi autonomi di illuminazione di emergenza del locale.",
          "cable": "FG16OM16 3G1,5 mm²",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-F321N",
          "vvfState": "tripped"
        },
        {
          "id": "Q6",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Fan-Coil Climatizz.",
          "ratingBadge": "1P+N C16 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A16 Magnetotermico differenziale 1P+N C16 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge i ventilconvettori (fan-coil) dello Spazio Polifunzionale.",
          "cable": "FG16OM16 3G2,5 mm²",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        },
        {
          "id": "Q7",
          "kind": "rcbo",
          "modules": 2,
          "bayLabel": "Fila DIN 3",
          "shortLabel": "Scorta 10A",
          "ratingBadge": "1P+N C10 · 30mA A",
          "brandModel": "BTicino BTDIN GA8813A10 Magnetotermico differenziale 1P+N C10 30mA Tipo A",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore differenziale di riserva da 10A (es. lavatrice ausiliaria / ampliamento).",
          "cable": "Riserva",
          "relatedIds": [],
          "targetPanelSlug": null,
          "datasheetId": "DS-BTICINO-GA8813",
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 16,
      "slug": "avpc",
      "code": "AVPC",
      "title": "Avanquadro Generale Centrale Pompe di Calore (630 A)",
      "nodeId": "AVPC",
      "plantId": "IMP-PDC",
      "plantLabel": "4 · Pompe Calore & FV",
      "swatch": "pdc",
      "location": {
        "buildingZone": "Corpo Parti Comuni Generali → Montante Centrale Termofrigorifera",
        "floor": "Piano Terra (0,0 m)",
        "room": "Locale Contatori Principale",
        "mounting": "Quadro murale/autoportante in resina isolante grande formato IP66 con porta trasparente e piastra di fondo isolante",
        "whereHowToFind": "Installato nel Locale Contatori Principale al Piano Terra subito a valle del contatore dedicato da 160 kW delle Pompe di Calore; protegge il poderoso montante a doppia corda in parallelo per fase (2×185 mm²) diretto al quadro QE.PC al Piano -2."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB Serie Gemini 1SL0225A00 (cassa in resina IP66 con piastra di fondo isolante e porta trasparente)",
        "dimensionsMm": "855 × 585 × 360 mm",
        "heightMm": 855,
        "widthMm": 585,
        "depthMm": 360,
        "ipRating": "IP66",
        "ral": "RAL 7035",
        "doorType": "Porta trasparente incernierata a sinistra",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "630 A",
        "shortCircuitIcc": "36 kA",
        "auxVoltage": "230 Vac (bobina lancio SOR e relè Tipo B)",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Contatore POD Pompe di Calore (160 kW · Misura Semidiretta TA)",
        "detail": "Doppio cavo unipolare per fase FG16OM16 3×(2×1×185) + 1×185N mm² dal gruppo di misura 160 kW.",
        "panelSlug": null,
        "mapNodeId": "POD-PDC",
        "mapPlantId": "IMP-INGRESSI"
      },
      "downstreamPanels": [
        {
          "code": "QE.PC",
          "label": "Quadro Centrale Pompe di Calore & Parallelo Fotovoltaico (Piano -2)",
          "viaComp": "Q1",
          "panelSlug": "qe-pc"
        }
      ],
      "vvfBehavior": "Dotato di bobina a lancio di corrente 230Vac sull'interruttore scatolato Tmax T5N 630A (Q1) per lo sgancio di emergenza della potenza verso la Centrale Pompe di Calore e per l'apertura automatica su guasto differenziale AC/DC rilevato da DER1.",
      "bays": {
        "leftBay": null,
        "mainBay": {
          "title": "Fronte Operativo (Contropannello Isolante)",
          "rows": [
            {
              "id": "R1",
              "title": "Sezione Superiore · Comando Frontale Interruttore Scatolato 630A",
              "heightMm": 320,
              "isReserve": false,
              "slots": [
                "Q1"
              ]
            },
            {
              "id": "R2",
              "title": "Sezione Inferiore · Relè Differenziale Elettronico Tipo B a Vista",
              "heightMm": 220,
              "isReserve": false,
              "slots": [
                "DER1"
              ]
            }
          ]
        },
        "rightBay": {
          "title": "Piastra di Fondo Isolante Interna",
          "subtitle": "Fusibile F1 e Toroidi Gran Formato Ø160 mm",
          "slots": [
            "F1",
            "TAD1",
            "TAB1"
          ]
        }
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 8,
          "bayLabel": "Fronte / Piastra di Fondo",
          "shortLabel": "Generale Montante → QE.PC",
          "ratingBadge": "MCCB 4P 630A · 36kA",
          "brandModel": "ABB SACE Tmax T5N 630 4P (252-630A) + Bobina lancio 230Vac + Contatti AUX (1SDA054400R1 + 1SDA054873R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore automatico scatolato da 630A che comanda e protegge il montante principale a doppia corda per fase diretto al Quadro Pompe di Calore QE.PC (Piano -2).",
          "cable": "FG16OM16 3×(2×1×185) + 1×185N + 1×185PE mm²",
          "relatedIds": [
            "DER1",
            "F1",
            "TAD1",
            "TAB1"
          ],
          "targetPanelSlug": "qe-pc",
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "DER1",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Sezione Frontale Inferiore",
          "shortLabel": "Relè Diff. Montante 630A",
          "ratingBadge": "Tipo B · Dossena /21",
          "brandModel": "Dossena 9DER3BDUAL/21 Relè differenziale elettronico Tipo B per grandi portate",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Sorveglia tramite i due grandi toroidi Ø160 mm (TAD1 e TAB1) il fascio di cavi da 2×185 mm²/fase contro dispersioni a terra sia sinusoidali sia in corrente continua (inverter compressori PDC e inverter fotovoltaici su QE.PC), comandando lo sgancio di Q1.",
          "cable": "Sensori TAD1 + TAB1 · Protetto da F1",
          "relatedIds": [
            "F1",
            "TAD1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 2,
          "bayLabel": "Piastra di Fondo Isolante",
          "shortLabel": "Prot. Relè DER1 & Sgancio",
          "ratingBadge": "1P+N 10×38 · 4A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 4A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Derivato a monte di Q1 (sempre in tensione): protegge da cortocircuito l'alimentazione 230Vac del relè differenziale DER1 e il circuito della bobina di lancio corrente di Q1.",
          "cable": "FS17 2,5 / 1 mm²",
          "relatedIds": [
            "DER1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "vital"
        },
        {
          "id": "TAD1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Piastra di Fondo Isolante",
          "shortLabel": "Toroide AC Ø160mm",
          "ratingBadge": "Ø160 mm · AC/A",
          "brandModel": "Dossena D160 (9D160) Toroide chiuso Ø160 mm per fasci cavi paralleli",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Abbraccia tutte le 7 corde attive (6 di fase + 1 di neutro da 185 mm²) per misurare le correnti differenziali AC/pulsanti inviate a DER1.",
          "cable": "Cavo WD1",
          "relatedIds": [
            "DER1",
            "TAB1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        },
        {
          "id": "TAB1",
          "kind": "toroid_ct",
          "modules": 3,
          "bayLabel": "Piastra di Fondo Isolante",
          "shortLabel": "Toroide DC Ø160mm",
          "ratingBadge": "Ø160 mm · Tipo B",
          "brandModel": "Dossena B160 (9B160) Toroide chiuso Ø160 mm per correnti continue",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Abbraccia il fascio cavi da 185 mm² per rilevare eventuali correnti di dispersione in continua liscia (protezione Tipo B) provenienti da inverter PDC o fotovoltaico.",
          "cable": "Cavo WB1",
          "relatedIds": [
            "DER1",
            "TAD1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "vital"
        }
      ]
    },
    {
      "order": 17,
      "slug": "qe-pc",
      "code": "QE.PC",
      "title": "Quadro Centrale Pompe di Calore Acqua-Acqua & Parallelo Fotovoltaico",
      "nodeId": "QEPC",
      "plantId": "IMP-PDC",
      "plantLabel": "4 · Pompe Calore & FV",
      "swatch": "pdc",
      "location": {
        "buildingZone": "Sottocentrali Termofrigorifere Interrate",
        "floor": "Piano Secondo Interrato (-2 · -6,4 m)",
        "room": "Centrale Tecnologica",
        "mounting": "Grande armadio metallico a tripla colonna (400 + 600 + 400 mm · L=1406 mm) ABB Energy M IP55",
        "whereHowToFind": "Installato a pavimento nella Centrale Tecnologica al Piano -2. Costituisce il nodo energetico principale della climatizzazione: alimenta le 3 grandi Pompe di Calore geotermiche acqua-acqua (PC1, PC2A, PC2B) ed è l'UNICO punto di parallelo dell'impianto Fotovoltaico presente sulle coperture delle due torri (interruttore Q5)."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy M IP55 a 3 colonne (Q855B618 + Q855B418 + Q855B418)",
        "dimensionsMm": "1949 × 1406 × 250 mm",
        "heightMm": 1949,
        "widthMm": 1406,
        "depthMm": 250,
        "ipRating": "IP55",
        "ral": "RAL 7035",
        "doorType": "Triplo vano: colonna SX (400 mm) morsetti/toroidi + colonna centrale (600 mm) con porta vetro + colonna DX (400 mm) risalita cavi potenza",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "400 / 230 Vac · 50 Hz (3F+N+PE · Bidirezionale Rete + FV)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "630 A (Sistema di sbarre 800 A)",
        "shortCircuitIcc": "15 / 25 kA",
        "auxVoltage": "230 Vac · Morsettiera teleallarmi X4 verso BMS",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2 · CEI 0-21"
      },
      "upstream": {
        "label": "Avanquadro Pompe di Calore AVPC (Q1 · 630A) + Campi Fotovoltaici Coperture Torri A e B (Q5 · 50A)",
        "detail": "Doppia sorgente energetica: da rete pubblica tramite AVPC (2×185 mm²/fase) su Q1 e da generazione solare in copertura tramite Q5.",
        "panelSlug": "avpc",
        "panelComp": "Q1",
        "mapNodeId": "AVPC",
        "mapPlantId": "IMP-PDC"
      },
      "downstreamPanels": [],
      "vvfBehavior": "In emergenza VVF sia il montante da rete (AVPC) sia l'interruttore del generatore fotovoltaico Q5 (dotato di bobina a lancio di corrente 230Vac) e gli interruttori Q2, Q3, Q4 possono essere aperti per mettere in sicurezza le sbarre a 800A.",
      "bays": {
        "leftBay": {
          "title": "Colonna SX (400 mm) · Morsetti & 6 Toroidi Ø80mm",
          "subtitle": "Morsettiere X1, X4 e coppie TAD/TAB per PC2B, PC2A, PC1",
          "slots": [
            "X1",
            "X4",
            "TAB4",
            "TAD4",
            "TAB3",
            "TAD3",
            "TAB2",
            "TAD2"
          ]
        },
        "mainBay": {
          "title": "Colonna Centrale Apparecchiature (600 mm · 500 + 300 + 4×200 mm) + Vano Risalita DX (400 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 (500 mm) · Sezionatore Generale Rotativo 630A e 3 TA 600/5A",
              "heightMm": 500,
              "isReserve": false,
              "slots": [
                "Q1",
                "TA1",
                "TA2",
                "TA3"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (300 mm) · Multimetro, Parallelo Fotovoltaico Q5, Scaricatore SPD e Fusibili",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "F2",
                "M1",
                "Q5",
                "SC1",
                "F1"
              ]
            },
            {
              "id": "R3",
              "title": "Pannello 3 (200 mm) · 3 Relè Differenziali Tipo B Dossena + Fusibili dedicati",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "F5",
                "RD4",
                "F4",
                "RD3",
                "F3",
                "RD2"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Interruttore Scatolato Orizzontale Pompa di Calore PC2B",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q4"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Interruttore Scatolato Orizzontale Pompa di Calore PC2A",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q3"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 6 (200 mm) · Interruttore Scatolato Orizzontale Pompa di Calore Polivalente PC1",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q2"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mccb",
          "modules": 8,
          "bayLabel": "Pannello 1 (500 mm)",
          "shortLabel": "Sezionatore Generale 630A",
          "ratingBadge": "4P 630A · Sbarre 800A",
          "brandModel": "ABB OT630E04 Sezionatore di manovra 4P 630A con maniglia rotativa + contatti aux (EO 616 6)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Sezionatore generale sottocarico da 630A: connette il montante da AVPC al sistema di sbarre in rame da 800A del quadro QE.PC.",
          "cable": "Sbarra flessibile 32×5 mm (630A)",
          "relatedIds": [
            "TA1",
            "TA2",
            "TA3",
            "SC1",
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "TA1",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Lato DX)",
          "shortLabel": "TA Fase L1 (600/5A)",
          "ratingBadge": "600 / 5 A",
          "brandModel": "IME TA32750C600 Trasformatore di corrente su sbarra 600/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura la corrente sulla fase L1 delle sbarre principali per il wattmetro digitale M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Lato DX)",
          "shortLabel": "TA Fase L2 (600/5A)",
          "ratingBadge": "600 / 5 A",
          "brandModel": "IME TA32750C600 Trasformatore di corrente su sbarra 600/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura la corrente sulla fase L2 delle sbarre principali per il wattmetro digitale M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TA3",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Pannello 1 (Lato DX)",
          "shortLabel": "TA Fase L3 (600/5A)",
          "ratingBadge": "600 / 5 A",
          "brandModel": "IME TA32750C600 Trasformatore di corrente su sbarra 600/5A",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Misura la corrente sulla fase L3 delle sbarre principali per il wattmetro digitale M1.",
          "cable": "FS17 2,5 mm²",
          "relatedIds": [
            "M1",
            "Q1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "F2",
          "kind": "fuse",
          "modules": 4,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Prot. Multimetro M1",
          "ratingBadge": "3P+N 10×38 · 2A gG",
          "brandModel": "ABB M204743 Portafusibile sezionatore 3P+N 32A con cartucce 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge i circuiti voltmetrici trifase e l'alimentazione ausiliaria 230Vac dello strumento multifunzione M1.",
          "cable": "FS17 2,5 / 1,5 mm²",
          "relatedIds": [
            "M1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "M1",
          "kind": "meter",
          "modules": 4,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Wattmetro Centrale PDC",
          "ratingBadge": "V / A / kW / kWh",
          "brandModel": "Vemer EV3M-4DIN (VE333100) Wattmetro trifase digitale 4 moduli",
          "roleTitle": "COSA MISURA",
          "whatItDoes": "Monitora il bilancio elettrico trifase sulle sbarre da 800A della centrale termofrigorifera (assorbimento netto pompe di calore meno apporto fotovoltaico).",
          "cable": "Protetto da F2 · TA1-TA3",
          "relatedIds": [
            "F2",
            "TA1",
            "TA2",
            "TA3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-VEMER-AST",
          "vvfState": "tripped"
        },
        {
          "id": "Q5",
          "kind": "mcb",
          "modules": 4,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Parallelo Fotovoltaico",
          "ratingBadge": "4P C50 · 10kA + Sgancio",
          "brandModel": "ABB S204M-C50 4P + Bobina lancio corrente 230Vac + Contatto aux stato (S544030 + A571005)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore di parallelo dell'Impianto Fotovoltaico condominiale (generatori in copertura Torri A e B): immette l'energia solare prodotta direttamente sulle sbarre di QE.PC per massimizzare l'autoconsumo istantaneo delle 3 pompe di calore.",
          "cable": "FS17 16 mm² su morsettiera X1",
          "relatedIds": [
            "X1",
            "X4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "SC1",
          "kind": "spd",
          "modules": 4,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Scaricatore Fulmini",
          "ratingBadge": "SPD Tipo 1+2 · 50kA",
          "brandModel": "DEHN DEHNshield DSH TT 255 FM (941 315) Scaricatore combinato Tipo 1+2 con contatto teleallarme",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge gli inverter delle 3 pompe di calore e la linea dal tetto fotovoltaico dalle sovratensioni atmosferiche e di commutazione (contatto guasto su X4.3-4).",
          "cable": "FG16 / FS17 25 mm²",
          "relatedIds": [
            "F1",
            "X4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DEHN-941315",
          "vvfState": "vital"
        },
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 4,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Prot. Scaricatore SC1",
          "ratingBadge": "3P+N 22×58 · 125A gG",
          "brandModel": "Legrand 021605 Portafusibile sezionatore 3P+N per cartucce 22×58 da 125A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge da cortocircuito e consente il sezionamento dello scaricatore di sovratensione Tipo 1+2 SC1.",
          "cable": "25 mm² dalle sbarre 800A",
          "relatedIds": [
            "SC1"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Prot. Relè Diff. RD4",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione 230Vac del relè differenziale RD4 e la bobina di lancio corrente di Q4 (Pompa di Calore PC2B).",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD4",
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "RD4",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Relè Diff. PDC PC2B",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale Tipo B abbinato a Q4",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Monitora con i toroidi TAD4/TAB4 le dispersioni AC/DC dell'unità Pompa di Calore PC2B e comanda l'apertura di Q4.",
          "cable": "Sensori TAD4 + TAB4",
          "relatedIds": [
            "F5",
            "Q4",
            "TAD4",
            "TAB4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "F4",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Prot. Relè Diff. RD3",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione 230Vac del relè differenziale RD3 e la bobina di lancio corrente di Q3 (Pompa di Calore PC2A).",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD3",
            "Q3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "RD3",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Relè Diff. PDC PC2A",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale Tipo B abbinato a Q3",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Monitora con i toroidi TAD3/TAB3 le dispersioni AC/DC dell'unità Pompa di Calore PC2A e comanda l'apertura di Q3.",
          "cable": "Sensori TAD3 + TAB3",
          "relatedIds": [
            "F4",
            "Q3",
            "TAD3",
            "TAB3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "F3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Prot. Relè Diff. RD2",
          "ratingBadge": "1P+N 10×38 · 1A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge l'alimentazione 230Vac del relè differenziale RD2 e la bobina di lancio corrente di Q2 (Pompa di Calore Polivalente PC1).",
          "cable": "FS17 6 / 1 mm²",
          "relatedIds": [
            "RD2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "tripped"
        },
        {
          "id": "RD2",
          "kind": "diff_relay",
          "modules": 4,
          "bayLabel": "Pannello 3 (200 mm)",
          "shortLabel": "Relè Diff. PDC PC1",
          "ratingBadge": "Tipo B · Dossena",
          "brandModel": "Dossena DER3BDUAL/6D Relè differenziale Tipo B abbinato a Q2",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Monitora con i toroidi TAD2/TAB2 le dispersioni AC/DC della Pompa di Calore Polivalente PC1 e comanda l'apertura di Q2.",
          "cable": "Sensori TAD2 + TAB2",
          "relatedIds": [
            "F3",
            "Q2",
            "TAD2",
            "TAB2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "Q4",
          "kind": "mccb",
          "modules": 8,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Pompa di Calore PC2B",
          "ratingBadge": "MCCB 4P 200A · 25kA",
          "brandModel": "ABB SACE Tmax XT3N 200 TMD (140-200A) 4P orizzontale + Bobina SOR + MAUX (1SDA068069R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea trifase ad alta potenza del quadro bordo macchina della Pompa di Calore geotermica PC2B.",
          "cable": "FG16OM16 3×(1×95) + 1×95N + 1×50PE mm²",
          "relatedIds": [
            "RD4",
            "F5",
            "TAD4",
            "TAB4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "Q3",
          "kind": "mccb",
          "modules": 8,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Pompa di Calore PC2A",
          "ratingBadge": "MCCB 4P 200A · 25kA",
          "brandModel": "ABB SACE Tmax XT3N 200 TMD (140-200A) 4P orizzontale + Bobina SOR + MAUX (1SDA068069R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea trifase ad alta potenza del quadro bordo macchina della Pompa di Calore geotermica PC2A.",
          "cable": "FG16OM16 3×(1×95) + 1×95N + 1×50PE mm²",
          "relatedIds": [
            "RD3",
            "F4",
            "TAD3",
            "TAB3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "Q2",
          "kind": "mccb",
          "modules": 8,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Pompa di Calore PC1",
          "ratingBadge": "MCCB 4P 160A · 25kA",
          "brandModel": "ABB SACE Tmax XT1C 160 TMD (112-160A) 4P orizzontale + Bobina SOR + MAUX (1SDA067410R1)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Comanda e protegge la linea trifase della Pompa di Calore Polivalente acqua-acqua PC1 (produzione prioritaria ACS + climatizzazione).",
          "cable": "FG16OM16 3×(1×70) + 1×70N + 1×35PE mm²",
          "relatedIds": [
            "RD2",
            "F3",
            "TAD2",
            "TAB2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-XT",
          "vvfState": "tripped"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna SX (400 mm)",
          "shortLabel": "Morsettiera Fotovoltaico X1",
          "ratingBadge": "Arrivo Linea FV 16 mm²",
          "brandModel": "Morsettiera di potenza su guida DIN (Foglio 8)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta i conduttori trifase + neutro da 16 mm² provenienti dal quadro/inverter dell'Impianto Fotovoltaico verso l'interruttore Q5.",
          "cable": "Colonna SX",
          "relatedIds": [
            "Q5"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "X4",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Colonna SX (400 mm)",
          "shortLabel": "Morsettiera Allarmi X4",
          "ratingBadge": "12 Morsetti Teleallarme",
          "brandModel": "Morsettiera contatti ausiliari stato/guasto Q1, SC1, Q2, Q3, Q4, Q5 (Foglio 9)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Invia al sistema BMS (QE-REG) gli allarmi remoti di apertura/scatto di Q1, dello scaricatore SC1, delle 3 pompe di calore (Q2-Q4) e del parallelo fotovoltaico (Q5).",
          "cable": "Colonna SX",
          "relatedIds": [
            "Q1",
            "SC1",
            "Q5"
          ],
          "targetPanelSlug": "qe-reg",
          "datasheetId": null,
          "vvfState": "tripped"
        },
        {
          "id": "TAB4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Colonna SX (Allineato Q4)",
          "shortLabel": "Toroide DC PC2B",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 Toroide chiuso Ø80 mm su linea Q4 (PC2B)",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale DC per RD4 sulla partenza PC2B.",
          "cable": "Cavo WB4",
          "relatedIds": [
            "RD4",
            "TAD4",
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAD4",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Colonna SX (Allineato Q4)",
          "shortLabel": "Toroide AC PC2B",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 Toroide chiuso Ø80 mm su linea Q4 (PC2B)",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC per RD4 sulla partenza PC2B.",
          "cable": "Cavo WD4",
          "relatedIds": [
            "RD4",
            "TAB4",
            "Q4"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAB3",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Colonna SX (Allineato Q3)",
          "shortLabel": "Toroide DC PC2A",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 Toroide chiuso Ø80 mm su linea Q3 (PC2A)",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale DC per RD3 sulla partenza PC2A.",
          "cable": "Cavo WB3",
          "relatedIds": [
            "RD3",
            "TAD3",
            "Q3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAD3",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Colonna SX (Allineato Q3)",
          "shortLabel": "Toroide AC PC2A",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 Toroide chiuso Ø80 mm su linea Q3 (PC2A)",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC per RD3 sulla partenza PC2A.",
          "cable": "Cavo WD3",
          "relatedIds": [
            "RD3",
            "TAB3",
            "Q3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAB2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Colonna SX (Allineato Q2)",
          "shortLabel": "Toroide DC PC1",
          "ratingBadge": "Ø80 mm · Tipo B",
          "brandModel": "Dossena B80 Toroide chiuso Ø80 mm su linea Q2 (PC1)",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale DC per RD2 sulla partenza PC1.",
          "cable": "Cavo WB2",
          "relatedIds": [
            "RD2",
            "TAD2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        },
        {
          "id": "TAD2",
          "kind": "toroid_ct",
          "modules": 2,
          "bayLabel": "Colonna SX (Allineato Q2)",
          "shortLabel": "Toroide AC PC1",
          "ratingBadge": "Ø80 mm · AC/A",
          "brandModel": "Dossena D80 Toroide chiuso Ø80 mm su linea Q2 (PC1)",
          "roleTitle": "COSA MISURA / PROTEGGE",
          "whatItDoes": "Sensore differenziale AC per RD2 sulla partenza PC1.",
          "cable": "Cavo WD2",
          "relatedIds": [
            "RD2",
            "TAB2",
            "Q2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-DOSSENA-DER3B",
          "vvfState": "tripped"
        }
      ]
    },
    {
      "order": 18,
      "slug": "qe-reg",
      "code": "QE-REG",
      "title": "Quadro di Regolazione Termofrigorifera & Supervisione BMS (ABB Cylon)",
      "nodeId": "QEREG",
      "plantId": "IMP-BMS",
      "plantLabel": "6 · Regolazione BMS",
      "swatch": "bms",
      "location": {
        "buildingZone": "Sottocentrali Termofrigorifere Interrate — Cervello BMS",
        "floor": "Piano Secondo Interrato (-2 · -6,4 m)",
        "room": "Centrale Tecnologica",
        "mounting": "Armadio metallico a pavimento ABB System pro E energy IP55 con pannello operatore Touch Screen 7\" sul fronte e web-controller in controporta",
        "whereHowToFind": "Installato a pavimento nella Centrale Tecnologica al Piano -2, alimentato dall'interruttore Q20 del quadro QE.CT. Coordina e supervisiona l'intera centrale termofrigorifera, le pompe di calore, le valvole miscelatrici, i 19 sensori di temperatura ST01–ST19 e dialoga via bus RS-485 BACnet/Modbus con il quadro pozzi QE.LP."
      },
      "enclosure": {
        "tag": "A1",
        "brandModel": "ABB System pro E energy M Q855B618 IP55",
        "dimensionsMm": "1949 × 612 × 250 mm",
        "heightMm": 1949,
        "widthMm": 612,
        "depthMm": 250,
        "ipRating": "IP55",
        "ral": "RAL 7035",
        "doorType": "Porta con dispositivi interni in controporta (MTX1 + PR1 + Router 4G) e pannello frontale con Touch Screen EXP1",
        "specialWarningPlate": ""
      },
      "electricalSpecs": {
        "voltage": "230 Vac · 50 Hz (1F+N+PE)",
        "earthingSystem": "TT",
        "ratedCurrentIn": "16 A",
        "shortCircuitIcc": "6 kA",
        "auxVoltage": "24 Vac SELV (trasformatore T1 100VA) · Segnali 0-10Vdc / NTC / RS-485",
        "standard": "CEI EN 61439-1 / CEI EN 61439-2"
      },
      "upstream": {
        "label": "Quadro Centrale Tecnologica QE.CT (Interruttore Q20 · 1P+N C10 30mA)",
        "detail": "Linea monofase 230Vac protetta da Q20 di QE.CT attestata sulla morsettiera X1.",
        "panelSlug": "qe-ct",
        "panelComp": "Q20",
        "mapNodeId": "QECT",
        "mapPlantId": "IMP-SSC"
      },
      "downstreamPanels": [
        {
          "code": "QE.LP (Modulo CBX1)",
          "label": "Dorsale BACnet MS/TP RS-485 verso Periferica Pozzi CBX1",
          "viaComp": "CBX2",
          "panelSlug": "qe-lp"
        }
      ],
      "vvfBehavior": "Quadro a bassissima potenza in Centrale Tecnologica; grazie ai 13 selettori manuali frontali AUT-0-MAN (SA1.1 ÷ SA2.6) consente agli operatori la conduzione manuale di emergenza delle pompe e della stagione Estate/Inverno anche in caso di manutenzione del PLC.",
      "bays": {
        "leftBay": {
          "title": "Controporta / Anta SX",
          "subtitle": "Supervisore Web Matrix-216, Router 4G e Presa PR1",
          "slots": [
            "PR1",
            "MTX1"
          ]
        },
        "mainBay": {
          "title": "Colonna Principale 24 Moduli (7 sezioni: 200+300+200+200+200+200+300 mm)",
          "rows": [
            {
              "id": "R1",
              "title": "Pannello 1 (200 mm) · Generale, 4 Portafusibili 230V/24V, Presa Servizio e Spia 24V",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "Q1",
                "F1",
                "F3",
                "PR3",
                "F4",
                "F5",
                "H24"
              ]
            },
            {
              "id": "R2",
              "title": "Pannello 2 (300 mm) · Pannello Operatore Touch Screen 7\" a Colori",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "EXP1"
              ]
            },
            {
              "id": "R3A",
              "title": "Pannello 3 Sup. (100 mm) · Schiera Selettori Manuale/Auto (Fila Superiore)",
              "heightMm": 100,
              "isReserve": false,
              "slots": [
                "SA1.1",
                "SA1.3",
                "SA1.5",
                "SA1.7",
                "SA2.2",
                "SA2.4",
                "SA2.6"
              ]
            },
            {
              "id": "R3B",
              "title": "Pannello 3 Inf. (100 mm) · Schiera Selettori Manuale/Auto (Fila Inferiore)",
              "heightMm": 100,
              "isReserve": false,
              "slots": [
                "SA1.2",
                "SA1.4",
                "SA1.6",
                "SA2.1",
                "SA2.3",
                "SA2.5"
              ]
            },
            {
              "id": "R4",
              "title": "Pannello 4 (200 mm) · Controllore BACnet CBX2 + Moduli Espansione I/O FLX1 e FLX2",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "CBX2",
                "FLX1",
                "FLX2"
              ]
            },
            {
              "id": "R5",
              "title": "Pannello 5 (200 mm) · Modulo Espansione 16 Ingressi Digitali Stati/Allarmi FLX3",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "FLX3"
              ]
            },
            {
              "id": "R6",
              "title": "Pannello 6 (200 mm) · Schede Interfaccia a 8 Relè (SCH1/K1., SCH2/K2.) e Trasformatore T1",
              "heightMm": 200,
              "isReserve": false,
              "slots": [
                "SCH1",
                "SCH2",
                "T1"
              ]
            },
            {
              "id": "R7",
              "title": "Pannello 7 (300 mm) · Morsettiere Alimentazione X1 e Campo/Sonde/Bus X2 (127 morsetti)",
              "heightMm": 300,
              "isReserve": false,
              "slots": [
                "X1",
                "X2"
              ]
            }
          ]
        },
        "rightBay": null
      },
      "components": [
        {
          "id": "Q1",
          "kind": "mcb",
          "modules": 2,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Generale Quadro BMS",
          "ratingBadge": "1P+N C16 · 6kA",
          "brandModel": "ABB S201Na C16 Interruttore magnetotermico 1P+N 16A (S531771)",
          "roleTitle": "COSA COMANDA E ALIMENTA",
          "whatItDoes": "Interruttore generale del quadro di regolazione QE-REG: seziona l'arrivo 230Vac da QE.CT-Q20 e alimenta i portafusibili F1, F3 e F4.",
          "cable": "Ingresso da X1 (6 mm²)",
          "relatedIds": [
            "F1",
            "F3",
            "F4",
            "X1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "F1",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Prot. Presa HMI PR1",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge fino a 2A la presa dedicata PR1 che alimenta il pannello Touch Screen EXP1 / apparati Ethernet e router 4G in controporta.",
          "cable": "FS17 2,5 mm² verso PR1",
          "relatedIds": [
            "PR1",
            "EXP1",
            "MTX1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "F3",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Prot. Presa Servizio PR3",
          "ratingBadge": "1P+N 10×38 · 2A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 2A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge a max 2A la presa Schuko di servizio PR3 sulla prima guida DIN per il PC di assistenza.",
          "cable": "Alimenta PR3",
          "relatedIds": [
            "PR3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "PR3",
          "kind": "socket_lamp",
          "modules": 3,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Presa Servizio PC",
          "ratingBadge": "Schuko/IT · Max 2A",
          "brandModel": "ABB M1173 Presa bivalente Schuko/Italia su guida DIN",
          "roleTitle": "COSA ALIMENTA",
          "whatItDoes": "Presa ausiliaria 230Vac protetta da F3 per alimentazione notebook tecnico in fase di commissioning/diagnostica.",
          "cable": "Protetta da F3",
          "relatedIds": [
            "F3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "F4",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Prot. Primario Trasf. T1",
          "ratingBadge": "1P+N 10×38 · 1A aM",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 1A aM",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge contro i cortocircuiti l'avvolgimento primario a 230Vac del trasformatore di sicurezza T1 (100VA).",
          "cable": "Alimenta primario T1",
          "relatedIds": [
            "T1",
            "F5"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "F5",
          "kind": "fuse",
          "modules": 1,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Prot. Secondario 24Vac",
          "ratingBadge": "1P+N 10×38 · 4A gG",
          "brandModel": "ABB M200913 Portafusibile sezionatore 1P+N 32A con cartuccia 10×38 4A gG",
          "roleTitle": "COSA PROTEGGE",
          "whatItDoes": "Protegge la linea secondaria a 24Vac del trasformatore T1 che alimenta il supervisore MTX1, tutti i moduli I/O (CBX2, FLX1, FLX2, FLX3), le schede relè SCH1/SCH2, i servomotori delle 5 valvole miscelatrici e la spia H24.",
          "cable": "Distribuzione 24Vac SELV",
          "relatedIds": [
            "T1",
            "H24",
            "MTX1",
            "CBX2",
            "FLX1",
            "FLX2",
            "FLX3"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "H24",
          "kind": "socket_lamp",
          "modules": 1,
          "bayLabel": "Pannello 1 (200 mm)",
          "shortLabel": "Spia Presenza 24Vac",
          "ratingBadge": "LED Bianco 24V",
          "brandModel": "ABB E219-B48 Spia luminosa modulare a LED bianca",
          "roleTitle": "COSA SEGNALA",
          "whatItDoes": "Conferma visivamente la presenza della tensione ausiliaria 24Vac a valle del fusibile secondario F5.",
          "cable": "24Vac da F5",
          "relatedIds": [
            "F5",
            "T1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "PR1",
          "kind": "socket_lamp",
          "modules": 3,
          "bayLabel": "Controporta SX",
          "shortLabel": "Presa Alim. HMI/Router",
          "ratingBadge": "Schuko/IT · Prot. F1",
          "brandModel": "ABB M1173 Presa su guida DIN interna porta",
          "roleTitle": "COSA ALIMENTA",
          "whatItDoes": "Alimenta l'alimentatore del Touch Screen EXP1 / router di teleassistenza 4G (protetta da F1).",
          "cable": "Protetta da F1",
          "relatedIds": [
            "F1",
            "EXP1",
            "MTX1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "MTX1",
          "kind": "plc_hmi",
          "modules": 5,
          "bayLabel": "Controporta SX",
          "shortLabel": "Supervisore Web BMS",
          "ratingBadge": "ABB Cylon MATRIX-216",
          "brandModel": "ABB Cylon ASPECT-Matrix 216 Web Supervisory Control Engine + Connessione Ethernet / Router 4G",
          "roleTitle": "COSA SUPERVISIONA E COMANDA",
          "whatItDoes": "Unità centrale di supervisione web dell'intero impianto termomeccanico: coordina su bus RS-485 BACnet MS/TP sia i moduli locali CBX2/FLX1-3 sia il controllore remoto CBX1 nel quadro pozzi QE.LP, esponendo le pagine grafiche su EXP1 e in telegestione.",
          "cable": "24Vac da F5 · Porte EIA-485 & Ethernet",
          "relatedIds": [
            "EXP1",
            "CBX2",
            "F5"
          ],
          "targetPanelSlug": "qe-lp",
          "datasheetId": "DS-CYLON-MATRIX",
          "vvfState": "normal"
        },
        {
          "id": "EXP1",
          "kind": "plc_hmi",
          "modules": 10,
          "bayLabel": "Pannello 2 (300 mm)",
          "shortLabel": "Touch Screen Operatore 7\"",
          "ratingBadge": "HMI Touch Colori · Ethernet",
          "brandModel": "ABB Explore C7 / 10 Tastiera operatore grafica Touch Screen 7\" incassata su pannello frontale",
          "roleTitle": "COSA SUPERVISIONA E COMANDA",
          "whatItDoes": "Interfaccia grafica locale per la visualizzazione sinottica di temperature (ST01–ST19), setpoint climatici, stati pompe, allarmi storici e comandi della Centrale Tecnologica.",
          "cable": "Ethernet verso MTX1 · Alim. da PR1/F1",
          "relatedIds": [
            "MTX1",
            "F1",
            "PR1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-CYLON-MATRIX",
          "vvfState": "normal"
        },
        {
          "id": "SA1.1",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. PDC1 Clima",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando abilitazione cumulativa Pompa di Calore PDC1 in assetto Climatizzazione (Automatico da CBX2/K1.1, Spento 0, Manuale).",
          "cable": "Morsetti X2.23-24",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA1.2",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Inf.",
          "shortLabel": "Sel. PDC1 ACS",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando richiesta produzione Acqua Calda Sanitaria (ACS) su Pompa di Calore PDC1 (Automatico da K1.2, 0, Manuale).",
          "cable": "Morsetti X2.26-27",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA1.3",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. Pompa P06A",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa P06A circuito Spazi Condominiali (Automatico da K1.3, 0, Manuale).",
          "cable": "Morsetti X2.29-30",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA1.4",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Inf.",
          "shortLabel": "Sel. Pompa P06B",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa gemella P06B circuito Spazi Condominiali (Automatico da K1.4, 0, Manuale).",
          "cable": "Morsetti X2.32-33",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA1.5",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. Pompa P07A B.P.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa P07A circuito Climatizzazione Bassa Pressione (Automatico da K1.5, 0, Manuale).",
          "cable": "Morsetti X2.35-36",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA1.6",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Inf.",
          "shortLabel": "Sel. Pompa P07B B.P.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa gemella P07B circuito Climatizzazione Bassa Pressione (Automatico da K1.6, 0, Manuale).",
          "cable": "Morsetti X2.38-39",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA1.7",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. Estate / Inverno",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Commutazione stagionale generale impianto Estate / Inverno (ON = Estate; Automatico da BMS K1.7, Inverno 0, Manuale Estate).",
          "cable": "Morsetti X2.41-42",
          "relatedIds": [
            "CBX2",
            "SCH1"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA2.1",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Inf.",
          "shortLabel": "Sel. Pompa P08A Prim.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa P08A circuito Primario Alta Pressione (Automatico da FLX1/K2.1, 0, Manuale).",
          "cable": "Morsetti X2.65-66",
          "relatedIds": [
            "FLX1",
            "SCH2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA2.2",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. Pompa P08B Prim.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa gemella P08B circuito Primario Alta Pressione (Automatico da FLX1/K2.2, 0, Manuale).",
          "cable": "Morsetti X2.68-69",
          "relatedIds": [
            "FLX1",
            "SCH2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA2.3",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Inf.",
          "shortLabel": "Sel. Pompa P09A Sec. A.P.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa P09A circuito Secondario Alta Pressione (Automatico da FLX1/K2.3, 0, Manuale).",
          "cable": "Morsetti X2.71-72",
          "relatedIds": [
            "FLX1",
            "SCH2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA2.4",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. Pompa P09B Sec. A.P.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa gemella P09B circuito Secondario Alta Pressione (Automatico da FLX1/K2.4, 0, Manuale).",
          "cable": "Morsetti X2.74-75",
          "relatedIds": [
            "FLX1",
            "SCH2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA2.5",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Inf.",
          "shortLabel": "Sel. P02 Ricirc. ACS A.P.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa P02 Ricircolo ACS Alta Pressione (Automatico da FLX2/K2.5, 0, Manuale).",
          "cable": "Morsetti X2.99-100",
          "relatedIds": [
            "FLX2",
            "SCH2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "SA2.6",
          "kind": "selector",
          "modules": 1,
          "bayLabel": "Pannello 3 Sup.",
          "shortLabel": "Sel. P03 Ricirc. ACS B.P.",
          "ratingBadge": "AUT - 0 - MAN",
          "brandModel": "ABB E214-16-101 Commutatore 16A I-0-II",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Comando marcia Pompa P03 Ricircolo ACS Bassa Pressione (Automatico da FLX2/K2.6, 0, Manuale).",
          "cable": "Morsetti X2.102-103",
          "relatedIds": [
            "FLX2",
            "SCH2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-ABB-S200",
          "vvfState": "normal"
        },
        {
          "id": "CBX2",
          "kind": "plc_hmi",
          "modules": 6,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Controllore CBX2 (Addr.2)",
          "ratingBadge": "BACnet · Sonde ST01–ST08",
          "brandModel": "ABB Cylon CBX-8R8 (Indirizzo 2) Controllore principale di campo 16 punti con bus locale FLX",
          "roleTitle": "COSA SUPERVISIONA E COMANDA",
          "whatItDoes": "Legge le 8 sonde di temperatura principali ST01 (Esterna Nord), ST02 (Mandata Puffer), ST03/ST04 (Mandata/Ritorno Spazi Comuni), ST05/ST06 (Mandata/Ritorno Bassa Pressione), ST07/ST08 (Mandata/Ritorno Alta Pressione) e pilota tramite SCH1 i comandi PDC1, P06A/B, P07A/B ed Estate/Inverno.",
          "cable": "Bus RS-485 da MTX1 e verso QE.LP",
          "relatedIds": [
            "MTX1",
            "FLX1",
            "FLX2",
            "FLX3",
            "SCH1"
          ],
          "targetPanelSlug": "qe-lp",
          "datasheetId": "DS-CYLON-CBX-FLX",
          "vvfState": "normal"
        },
        {
          "id": "FLX1",
          "kind": "plc_hmi",
          "modules": 5,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Espansione FLX1 (Addr.1)",
          "ratingBadge": "Sonde ST09–16 & Valvole Mix",
          "brandModel": "ABB Cylon FLX-8R8 (Indirizzo 1) Modulo espansione 8 ingressi + 8 uscite",
          "roleTitle": "COSA SUPERVISIONA E COMANDA",
          "whatItDoes": "Acquisisce le 8 sonde ST09–ST16 (Secondario A.P., Circuito Pozzi, Mandata/Ritorno PDC ACS, Puffer ACS) e comanda le pompe P08A/B, P09A/B (tramite SCH2) e in modulazione 0-10V le 3 valvole miscelatrici clima B.P., clima A.P. e scarico 18°C.",
          "cable": "Bus FLX da CBX2 · Uscite su X2",
          "relatedIds": [
            "CBX2",
            "SCH2",
            "X2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-CYLON-CBX-FLX",
          "vvfState": "normal"
        },
        {
          "id": "FLX2",
          "kind": "plc_hmi",
          "modules": 5,
          "bayLabel": "Pannello 4 (200 mm)",
          "shortLabel": "Espansione FLX2 (Addr.2)",
          "ratingBadge": "Sonde ST17–19 & Mix ACS",
          "brandModel": "ABB Cylon FLX-8R8 (Indirizzo 2) Modulo espansione 8 ingressi + 8 uscite",
          "roleTitle": "COSA SUPERVISIONA E COMANDA",
          "whatItDoes": "Acquisisce le sonde ST17–ST19 (Puffer e Mandate ACS B.P./A.P.), gli stati pompe ricircolo LFS1/LFS2 e i 2 allarmi cumulativi dalla Centrale Idrica (ALL4/ALL5), e comanda P02/P03 e le 2 valvole miscelatrici ricircolo ACS B.P. e A.P.",
          "cable": "Bus FLX da CBX2 · Uscite su X2",
          "relatedIds": [
            "CBX2",
            "SCH2",
            "X2"
          ],
          "targetPanelSlug": "qe-ci",
          "datasheetId": "DS-CYLON-CBX-FLX",
          "vvfState": "normal"
        },
        {
          "id": "FLX3",
          "kind": "plc_hmi",
          "modules": 5,
          "bayLabel": "Pannello 5 (200 mm)",
          "shortLabel": "Espansione FLX3 (Addr.3)",
          "ratingBadge": "16 Ingressi Digitali Stati/Allarmi",
          "brandModel": "ABB Cylon FLX-16DI (Indirizzo 3) Modulo espansione 16 ingressi digitali",
          "roleTitle": "COSA SUPERVISIONA",
          "whatItDoes": "Acquisisce 16 ingressi digitali da campo su X2 (morsetti 104÷127): allarmi PDC1/PDC2 Clima e ACS, allarmi pompe P01/P04/P05, stati di marcia/flussostati pompe P06A/B, P07A/B, P08A/B, P09A/B e richiesta avviamento circuito pozzi.",
          "cable": "Morsettiera X2.104-127",
          "relatedIds": [
            "CBX2",
            "X2"
          ],
          "targetPanelSlug": null,
          "datasheetId": "DS-CYLON-CBX-FLX",
          "vvfState": "normal"
        },
        {
          "id": "SCH1",
          "kind": "contactor",
          "modules": 5,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Scheda 8 Relè SCH1 (K1.)",
          "ratingBadge": "8× Relè 24Vac · Cabur",
          "brandModel": "Cabur XR081E24 (siglata SCH1 sul fronte quadro e K1. nello schema) Modulo interfaccia a 8 relè 24Vac",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Disaccoppia le uscite digitali del modulo CBX2 per comandare attraverso i selettori SA1.1–SA1.7 l'abilitazione PDC1 Clima/ACS, le pompe P06A/B, P07A/B e la commutazione Estate/Inverno.",
          "cable": "Pilotata da CBX2",
          "relatedIds": [
            "CBX2",
            "SA1.1",
            "SA1.2",
            "SA1.3",
            "SA1.4",
            "SA1.5",
            "SA1.6",
            "SA1.7"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "SCH2",
          "kind": "contactor",
          "modules": 5,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Scheda 8 Relè SCH2 (K2.)",
          "ratingBadge": "8× Relè 24Vac · Cabur",
          "brandModel": "Cabur XR081E24 (siglata SCH2 sul fronte quadro e K2. nello schema) Modulo interfaccia a 8 relè 24Vac",
          "roleTitle": "COSA COMANDA",
          "whatItDoes": "Disaccoppia le uscite dei moduli FLX1 e FLX2 per comandare attraverso i selettori SA2.1–SA2.6 le pompe P08A/B, P09A/B e le pompe di ricircolo sanitario P02/P03.",
          "cable": "Pilotata da FLX1 / FLX2",
          "relatedIds": [
            "FLX1",
            "FLX2",
            "SA2.1",
            "SA2.2",
            "SA2.3",
            "SA2.4",
            "SA2.5",
            "SA2.6"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "T1",
          "kind": "transformer",
          "modules": 4,
          "bayLabel": "Pannello 6 (200 mm)",
          "shortLabel": "Trasformatore BMS T1",
          "ratingBadge": "100VA · 230 / 24Vac SELV",
          "brandModel": "Italweber CFM00400CC04-I Trasformatore monofase di sicurezza 100VA 230-400V / 12-0-12V (24Vac)",
          "roleTitle": "COSA ALIMENTA",
          "whatItDoes": "Fornisce l'alimentazione 24Vac SELV a tutti i controllori ABB Cylon (MTX1, CBX2, FLX1-3), alle schede relè SCH1/SCH2 e ai servocomandi 24Vac delle valvole miscelatrici.",
          "cable": "Primario F4 · Secondario F5",
          "relatedIds": [
            "F4",
            "F5",
            "H24"
          ],
          "targetPanelSlug": null,
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "X1",
          "kind": "terminal",
          "modules": 3,
          "bayLabel": "Pannello 7 (300 mm)",
          "shortLabel": "Morsettiera Rete X1",
          "ratingBadge": "Arrivo 230Vac da QE.CT",
          "brandModel": "Morsettiera alimentazione 230Vac + PE (Foglio 14)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta il cavo di alimentazione 230Vac proveniente dall'interruttore Q20 del quadro QE.CT.",
          "cable": "Fondo quadro SX",
          "relatedIds": [
            "Q1"
          ],
          "targetPanelSlug": "qe-ct",
          "datasheetId": null,
          "vvfState": "normal"
        },
        {
          "id": "X2",
          "kind": "terminal",
          "modules": 7,
          "bayLabel": "Pannello 7 (300 mm)",
          "shortLabel": "Morsettiera Campo BMS X2",
          "ratingBadge": "127 Morsetti Sonde/Valvole/Bus",
          "brandModel": "Morsettiera multipolare segnali analogici, digitali, comandi pompe e bus RS-485 (Fogli 15–19)",
          "roleTitle": "COSA ATTESTA",
          "whatItDoes": "Attesta tutte le 19 sonde di temperatura NTC (ST01–ST19), le 5 valvole miscelatrici modulanti 0-10V, tutti i comandi/stati pompe, gli allarmi da QE.CT / QE.CI / QE.PC e la linea seriale RS-485 BACnet/Modbus verso QE.LP.",
          "cable": "Fondo quadro centrale/DX",
          "relatedIds": [
            "CBX2",
            "FLX1",
            "FLX2",
            "FLX3"
          ],
          "targetPanelSlug": "qe-lp",
          "datasheetId": null,
          "vvfState": "normal"
        }
      ]
    }
  ]
};
