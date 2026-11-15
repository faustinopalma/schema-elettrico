window.IMPIANTO_DATA = {
  "meta": {
    "complexName": "Complesso Residenziale Complesso Residenziale, ambito urbano (Lotto II)",
    "buildings": "Torre A (>32 m, 14 piani) · Torre B (>32 m, 14 piani) · Autorimessa 2 livelli (152 box)",
    "suppliesSummary": "4 Forniture BT (80 + 50 + 50 + 160 = 340 kW) + Generatore Fotovoltaico · Sistema TT",
    "privacyNote": "Contenuto tecnico, grafi e schemi unifilari SVG interamente rigenerati da zero. Il documento originale firmato è custodito esclusivamente in locale nella cartella ignorata da Git (private/)."
  },
  "plants": [
    {
      "id": "IMP-SSC",
      "code": "SSC",
      "name": "1. Servizi Supercondominiali & Centrali",
      "shortName": "Supercondominio (80 kW)",
      "power": "80 kW · 400/230V 3F+N TT",
      "swatch": "ssc",
      "shape": "round-hexagon",
      "edgeStyle": "solid",
      "icon": "grid",
      "summary": "Fornitura BT principale da 80 kW (Icc 15 kA trifase) attestata nel Locale Contatori generale al Piano Terra. Tramite il Ripartitore da 250A e l'avanquadro AVSSC alimenta la Portineria (QE-POR), il quadro generale QE.SSC (autorimessa 152 box su 2 interrati, corselli, rampa, luci esterne) e le tre centrali tecnologiche interrate: Centrale Idrica al Piano -1 (QE.CI) e Centrale Tecnologica + Locale Pompe Falda al Piano -2 (QE.CT, QE.LP).",
      "metrics": {
        "Potenza Contrattuale": "80 kW",
        "Taglia Generale": "250 A (ABB XT3N)",
        "Quadri Inclusi": "6 quadri",
        "Piani Serviti": "Esterni, P.T, -1, -2"
      },
      "flowGuide": {
        "in": "Contatore da 80 kW al Piano Terra (Locale Contatori Principale al Piano Terra)",
        "process": "Il Ripartitore da 250A separa subito la linea antincendio; poi AVSSC e il grande quadro QE.SSC smistano e proteggono le dorsali",
        "out": "Alimenta Portineria, 152 Box e corselli (-1/-2), Luci Esterne, i 2 UPS e le 3 Centrali interrate (Idrica al -1, Termica e Pozzi al -2)"
      }
    },
    {
      "id": "IMP-SCA",
      "code": "SC-A",
      "name": "2. Distribuzione Edificio Torre A",
      "shortName": "Torre A (50 kW · 14 Piani)",
      "power": "50 kW · 400/230V 3F+N TT",
      "swatch": "sca",
      "shape": "cut-rectangle",
      "edgeStyle": "solid",
      "icon": "towerA",
      "summary": "Impianto elettrico dedicato alla Torre A (altezza antincendio >32 m, DPR 151/11 att. 77): dal punto di consegna e avanquadro AVSC-A (160A) scende al quadro generale QESC-A per alimentare 2 ascensori, UTA ed estrattore cappe in copertura, vano scala, cantine (P.T, -1, -2), Palestra condominiale (QE.PL), Deposito Biciclette (QE.01) e la dorsale verticale dei 16 quadri di piano (QEP.01–QEP.05).",
      "metrics": {
        "Potenza Contrattuale": "50 kW",
        "Taglia Generale": "160 A (ABB XT1B)",
        "Quadri Inclusi": "4 + 16 QEP di piano",
        "Piani Serviti": "-2 → Copertura (+48m)"
      },
      "flowGuide": {
        "in": "Contatore dedicato da 50 kW al Piano Terra per la Torre A",
        "process": "L'avanquadro AVSC-A protegge il montante fino al quadro generale QESC-A al Piano -1 (dotato di sgancio VVF dedicato)",
        "out": "Alimenta i 2 Ascensori, UTA ed Estrattore cappe sul tetto, Palestra, Deposito Bici, Cantine e la colonna dei 16 Quadri di Piano (P.T → 14°)"
      }
    },
    {
      "id": "IMP-SCB",
      "code": "SC-B",
      "name": "3. Distribuzione Edificio Torre B",
      "shortName": "Torre B (50 kW · 14 Piani)",
      "power": "50 kW · 400/230V 3F+N TT",
      "swatch": "scb",
      "shape": "barrel",
      "edgeStyle": "dashed-long",
      "icon": "towerB",
      "summary": "Impianto elettrico dedicato alla Torre B (altezza antincendio >32 m, DPR 151/11 att. 77): dall'avanquadro AVSC-B (160A) alimenta il quadro generale QESC-B, i 2 ascensori, UTA ed estrattore cappe in copertura, vano scala, cantine (P.T e -2), Sala Riunioni (QE.02), Spazio Polifunzionale/Lavanderia (QE.03) e la dorsale verticale dei 16 quadri di piano (QEP.01–QEP.05).",
      "metrics": {
        "Potenza Contrattuale": "50 kW",
        "Taglia Generale": "160 A (ABB XT1B)",
        "Quadri Inclusi": "4 + 16 QEP di piano",
        "Piani Serviti": "-2 → Copertura (+48m)"
      },
      "flowGuide": {
        "in": "Contatore dedicato da 50 kW al Piano Terra per la Torre B",
        "process": "Architettura gemella alla Torre A: AVSC-B protegge il montante verso il quadro generale QESC-B al Piano -1",
        "out": "Alimenta i 2 Ascensori, UTA ed Estrattore cappe sul tetto, Sala Riunioni, Spazio Polifunzionale/Lavanderia, Cantine e 16 Quadri di Piano"
      }
    },
    {
      "id": "IMP-PDC",
      "code": "PDC+FV",
      "name": "4. Centrale Pompe di Calore & Fotovoltaico",
      "shortName": "Termico PDC + FV (160 kW)",
      "power": "160 kW · 630A (Sbarre 800A)",
      "swatch": "pdc",
      "shape": "octagon",
      "edgeStyle": "solid-heavy",
      "icon": "solar",
      "summary": "Fornitura BT di alta potenza da 160 kW (doppio cavo 185 mm² per fase, In 630A) dedicata alla generazione climatizzazione/ACS geotermica centralizzata in Centrale Tecnologica (-2). Sul sistema di sbarre da 800A del quadro QE.PC sono attestati i 3 gruppi polivalenti/pompe di calore ad acqua di falda (PC1 da 48 kW, PC2A da 91 kW, PC2B da 91 kW) e il parallelo del Generatore Fotovoltaico in copertura (Q5 4P 50A).",
      "metrics": {
        "Potenza Contrattuale": "160 kW (+ FV)",
        "Taglia Generale": "630 A (ABB T5N / OT630)",
        "Carico Macchine": "48 + 91 + 91 kW elettr.",
        "Piani Serviti": "P.T → -2 ← Copertura"
      },
      "flowGuide": {
        "in": "Doppia sorgente: Contatore di potenza da 160 kW a terra + Pannelli Fotovoltaici sul tetto",
        "process": "AVPC (630A) porta energia fino alla sbarra da 800A del quadro QE.PC al Piano -2, dove confluisce anche l'energia solare per l'autoconsumo",
        "out": "Alimenta le 3 grandi Pompe di Calore geotermiche ad acqua di falda (PC1 da 48 kW + PC2A da 91 kW + PC2B da 91 kW) per caldo, freddo e acqua calda"
      }
    },
    {
      "id": "IMP-FIRE",
      "code": "VVF/UPS",
      "name": "5. Sicurezza Antincendio, Sganci VVF & UPS",
      "shortName": "Antincendio, Sganci & 2 UPS",
      "power": "FTG18OM16 · UPS 1kVA + 2kVA",
      "swatch": "fire",
      "shape": "diamond",
      "edgeStyle": "dashed-fire",
      "icon": "fire",
      "summary": "Sistema trasversale di sicurezza per le attività soggette VVF (Autorimessa 152 box att. 75; Torri A e B >32m att. 77): alimentazione preferenziale a monte sgancio della motopompa antincendio da 15 kW (QE.PA solo magnetico), 2 UPS online doppia conversione (1000VA per portoni tagliafuoco e 2000VA per l'anello fail-safe 24Vac di sgancio autorimessa su Q5/Q6/Q7), pulsanti di sgancio VVF e centrali rivelazione incendi.",
      "metrics": {
        "Alimentazione VVF": "A monte AVSSC (RIP-250A)",
        "Continuità UPS": "1000 VA + 2000 VA Online",
        "Logica Sgancio Box": "Minima tensione 24Vac (U<)",
        "Normativa": "DPR 151/11 · CEI 64-8/751"
      },
      "flowGuide": {
        "in": "Derivazione privilegiata a monte dello sgancio generale (RIP-250A) + 2 batterie UPS online",
        "process": "Garantisce che la pompa antincendio resti sempre alimentata mentre i pulsanti VVF tolgono tensione selettivamente alle zone in emergenza",
        "out": "Alimenta la Motopompa VVF 15 kW (cavo resistente al fuoco), chiude i Portoni Tagliafuoco, sgancia Box/Scale e presidia gli allarmi IRA"
      }
    },
    {
      "id": "IMP-BMS",
      "code": "BMS/REG",
      "name": "6. Regolazione Termica, BMS & M-Bus",
      "shortName": "Automazione BMS Cylon/M-Bus",
      "power": "230/24Vac · BACnet & Modbus",
      "swatch": "bms",
      "shape": "hexagon",
      "edgeStyle": "dotted",
      "icon": "cpu",
      "summary": "Sistema digitale di automazione, telegestione 4G e contabilizzazione (M-Bus BMS-CT): il quadro QE-REG in Centrale Tecnologica (-2) ospita il supervisore ABB Cylon MATRIX-216 e i moduli I/O CBX/FLX collegati in rete RS-485 BACnet/Modbus al modulo remoto CBX1 in QE.LP, alle pompe/sonde di QE.CT (ST01–ST19), agli allarmi di QE.PC e QE.CI, e agli amplificatori M-Bus / controlli cappe nelle Torri A e B (piani Terra, 7° e 10°).",
      "metrics": {
        "PLC Supervisore": "ABB Cylon MATRIX-216",
        "Punti I/O & Sonde": "19 sonde + 5 moduli CBX/FLX",
        "Connettività": "BACnet MS/TP · Modbus · 4G",
        "Nodi Piani": "P.Terra, 7° e 10° (A/B)"
      },
      "flowGuide": {
        "in": "19 sonde di temperatura, pressostati pozzi e contatti di stato/blocco da tutti i quadri delle centrali",
        "process": "Il PLC centrale ABB Cylon (QE-REG, connesso in 4G) elabora il fabbisogno termico e dialoga via cavo seriale BACnet/Modbus",
        "out": "Accende in cascata Pompe di Calore, Pozzi di falda (tramite modulo CBX1), 16 pompe di rilancio, 5 valvole miscelatrici e sistema cappe/contabilizzazione"
      }
    },
    {
      "id": "IMP-TLC",
      "code": "TLC/FTTH",
      "name": "7. Multiservizio FTTH/TV & Videocitofonia",
      "shortName": "Fibra FTTH, TV/SAT & Citofoni",
      "power": "Legge 164/14 · CEI 306-2",
      "swatch": "tlc",
      "shape": "round-tag",
      "edgeStyle": "dash-dot",
      "icon": "signal",
      "summary": "Infrastruttura passiva e attiva di comunicazione elettronica e sicurezza accessi: centro servizi ottico d'edificio (CSOE) e ROE multi-operatore collegati in fibra monomodale ai montanti verticali, alla centrale di testa TV/SAT con conversione ottica STOM in copertura e alle STOA/QDSA d'appartamento, affiancati dall'armadio dati in Portineria, 3 varchi videocitofonici e chiamate di soccorso disabili (Finder 13.11).",
      "metrics": {
        "Standard Edificio": "Banda Ultra Larga (art.135-bis)",
        "Varchi Videocitof.": "3 (Portineria, Torre A, Torre B)",
        "Soccorso Disabili": "Palestra (WC+Doccia) e Riunioni",
        "Separazione Pose": "Montanti e cavidotti dedicati"
      },
      "flowGuide": {
        "in": "Fibre ottiche degli operatori telefonici da strada + Antenne TV terrestre/satellitare in copertura",
        "process": "Il Centro Servizi Ottico (CSOE/ROE) e il convertitore ottico TV (STOM) unificano i segnali su dorsali in fibra separate dai cavi elettrici",
        "out": "Porta fibra FTTH e TV nelle scatole STOA/QDSA di ogni appartamento, gestisce i 3 varchi Videocitofonici e gli allarmi tirante bagni disabili"
      }
    },
    {
      "id": "IMP-GND",
      "code": "TERRA/SPD",
      "name": "8. Rete di Terra, Equipotenziali & SPD",
      "shortName": "Anello Cu 50mm² & 4 SPD",
      "power": "Sistema TT · 14 Dispersori",
      "swatch": "gnd",
      "shape": "trapezoid",
      "edgeStyle": "earth-dash",
      "icon": "ground",
      "summary": "Impianto di dispersione ed equipotenzialità unico dell'insediamento: anello interrato in corda di rame nudo da 50 mm² interconnesso a 14 pozzetti ispezionabili con dispersori a croce in acciaio zincato (L=1,5 m), collettori principali nei locali contatori, collegamenti equipotenziali 6 mm² e 4 scaricatori combinati spinterometrici Tipo 1+2 DEHNshield DSH TT 255 FM (50 kA 10/350 µs) nei quadri generali.",
      "metrics": {
        "Conduttore Terra": "Corda Cu nuda 50 mm²",
        "Pozzetti Picchetti": "14 pozzetti ispezionabili",
        "Scaricatori SPD": "4× DEHN 941315 Tipo 1+2",
        "Obbligo Legge": "Verifica biennale DPR 462/01"
      },
      "flowGuide": {
        "in": "Eventuali correnti di guasto verso massa delle apparecchiature o scariche atmosferiche/sovratensioni sulla rete",
        "process": "I 4 scaricatori Tipo 1+2 (DEHN) nei quadri principali e i conduttori giallo/verdi convogliano le correnti sui collettori di terra",
        "out": "Disperde in sicurezza nel terreno tramite la corda interrata in rame nudo da 50 mm² e i 14 pozzetti con picchetti verticali"
      }
    }
  ],
  "floors": [
    {
      "id": "F_ROOF",
      "order": 0,
      "name": "Copertura Torri (+48 m)",
      "short": "Copertura",
      "elev": "+48,0 m",
      "desc": "Generatore Fotovoltaico, 2 UTA in copertura, 2 Estrattori cappe cucina, Antenne TV/SAT + conversione ottica STOM"
    },
    {
      "id": "F_01_14",
      "order": 1,
      "name": "Piani Residenziali 1° – 14° (Torri A e B)",
      "short": "Piani 1°–14°",
      "elev": "+4 → +45 m",
      "desc": "Montanti verticali separati (CF, CD, IRA), 28 Quadri di Piano (22× QEP.03, 4× QEP.04 ai piani 7°/10° cappe, 2× QEP.05 al 14°), Filtri aerati"
    },
    {
      "id": "F_RIALZ",
      "order": 2,
      "name": "Piano Rialzato — Servizi Condominiali",
      "short": "P. Rialzato",
      "elev": "+2,4 m",
      "desc": "Torre A: Palestra (QE.PL) e Deposito Bici (QE.01) · Torre B: Sala Riunioni (QE.02) e Spazio Polifunzionale/Lavanderia (QE.03)"
    },
    {
      "id": "F_TERRA",
      "order": 3,
      "name": "Piano Terra & Aree Esterne",
      "short": "Piano Terra",
      "elev": "0,0 m",
      "desc": "Locale Contatori Generale (4 POD, RIP-250A, AVSSC, AVSC-A, AVSC-B, AVPC, QE.PA, QE.SSC), Portineria (QE-POR, Armadio Dati, Allarmi PA), Ingressi A/B (QEP.01/02, CSOE), Cancello, Anello Terra"
    },
    {
      "id": "F_M1",
      "order": 4,
      "name": "Piano Primo Interrato (-1)",
      "short": "Interrato -1",
      "elev": "-3,2 m",
      "desc": "Centrale Idrica (QE.CI, GP1/GP2), Locali Contatori Scala A e B (QESC-A, QESC-B, UPS 1 e UPS 2), Autorimessa -1 (Box 1.1–72.1, Rampa, Portoni EI), Cantine Torre A, Immondezzai A/B"
    },
    {
      "id": "F_M2",
      "order": 5,
      "name": "Piano Secondo Interrato (-2)",
      "short": "Interrato -2",
      "elev": "-6,4 m",
      "desc": "Centrale Tecnologica (QE.CT, QE.PC, QE-REG, PC1/PC2A/PC2B, 16 Pompe P.01–P.09, PS3), Locale Pompe (QE.LP + Cylon CBX1, Pozzi Falda P.10/P.11, Motopompa VVF 15 kW, PS4), Autorimessa -2 (Box 1.2–75.2), Cantine A/B"
    },
    {
      "id": "F_DOC",
      "order": 6,
      "name": "Architettura Documentale As-Built",
      "short": "Documentazione",
      "elev": "4 Sezioni",
      "desc": "Riferimenti strutturati rigenerati: Relazione Tecnica · Unifilari di Progetto · Planimetrie As-Built · Fascicoli Costruttivi Quadrista IEC 61439"
    }
  ],
  "nodes": [
    {
      "id": "POD-SSC",
      "code": "POD-SSC",
      "label": "Fornitura BT Servizi Supercondominiali (80 kW)",
      "plant": "IMP-SSC",
      "nodeClass": "supply_pod",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 2,
      "specs": {
        "Potenza disponibile": "80 kW",
        "Tensione": "400/230V 3F+N 50Hz",
        "Sistema neutro": "TT",
        "Icc presunta CEI 0-21": "15 kA (3F) / 6 kA (F-N)",
        "Locale": "Locale Contatori Generale (Piano Terra)"
      },
      "desc": "Punto di consegna principale dell'ente distributore per le utenze comuni generali dell'insediamento, le centrali tecnologiche/idriche/pozzi, l'autorimessa interrata e la motopompa antincendio.",
      "sld": null,
      "circuits": [
        {
          "code": "MONT-SSC",
          "desc": "Cavo FG16OM16 3×(1×150)+1×150N mm² verso Ripartitore 250A",
          "breaker": "DG Ente Distributore",
          "cable": "3×150 + 1×150N mm²"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "Cap. 1 — Dati di Progetto",
          "scope": "Parametri fornitura 80 kW, sistema TT e correnti di cortocircuito CEI 0-21"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.11 e PL.12.1",
          "scope": "Ubicazione Locale Contatori Principale al Piano Terra e cavidotti Correnti Forti (CF)"
        },
        {
          "suite": "Schema Generale",
          "ref": "Tavola PL.13",
          "scope": "Vertice albero distribuzione servizi supercondominiali"
        }
      ],
      "roleType": "source",
      "roleLabel": "⚡ INGRESSO RETE 80 kW",
      "shortFunc": "Consegna energia dalla rete pubblica per autorimessa, portineria, luci esterne, centrali e antincendio.",
      "emergencyNote": "Resta sempre in tensione dalla rete pubblica; è l'origine primaria da cui dipende anche la pompa antincendio."
    },
    {
      "id": "RIP-250",
      "code": "RIP-250A",
      "label": "Ripartitore Generale di Potenza (4P 250A)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 2,
      "specs": {
        "Portata sbarre": "4P In 250A",
        "Tenuta Icc": "15 kA",
        "Isolamento": "Cassetta parete IP55 doppio isolamento (Classe II)",
        "Funzione chiave": "Derivazione antincendio QEPA a monte dello sgancio generale",
        "Locale": "Locale Contatori Generale (P.Terra)"
      },
      "desc": "Morsettiera/sbarra tetrapolare in involucro isolante trasparente posta immediatamente a valle del contatore da 80 kW per sdoppiare l'alimentazione ordinaria (AVSSC) dall'alimentazione preferenziale resistente al fuoco della pompa antincendio (QE.PA).",
      "sld": {
        "incomer": "Da POD-SSC (80 kW) · FG16OM16 3×150+150N",
        "mainDevice": "Sbarre Rame 4P 250A · Icw 15 kA · IP55 Classe II",
        "busbar": "400/230V 3F+N 50Hz (Nodo a monte sgancio VVF)"
      },
      "circuits": [
        {
          "code": "USC-VVF",
          "desc": "Derivazione preferenziale Quadro Pompa Antincendio (QE.PA)",
          "breaker": "Diretta su sbarre (protetta a valle da QE.PA)",
          "cable": "FTG18OM16 3×16 mm²"
        },
        {
          "code": "USC-SSC",
          "desc": "Alimentazione Avanquadro Servizi Supercondominiali (AVSSC)",
          "breaker": "Diretta su sbarre (protetta a valle da AVSSC Q1)",
          "cable": "FG16OM16 3×150+150N mm²"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FTG18",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.29 — Pompe Antincendio",
          "scope": "Prescrizione ripartitore 4P 250A 15kA IP55 a doppio isolamento"
        },
        {
          "suite": "Schemi Unifilari",
          "ref": "Schema QEPA Foglio 2",
          "scope": "Schema di principio inserzione a monte dell'interruttore generale"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🔀 SNODO A MONTE SGANCIO",
      "shortFunc": "Sdoppia i 80 kW subito dopo il contatore: separa la linea antincendio prima dell'interruttore generale.",
      "emergencyNote": "Punto vitale: permette di togliere corrente a tutto il supercondominio lasciando viva la pompa antincendio."
    },
    {
      "id": "AVSSC",
      "code": "AVSSC",
      "label": "Avanquadro Servizi Supercondominiali (AVSSC)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 2,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "250 A",
        "Icc quadro": "15 kA (Icu Q1/Q2 = 36 kA)",
        "Grado IP": "IP66 Classe II (ABB Gemini 1005×840×360)",
        "Protezione Diff. Generale": "Dossena DER3BDUAL/6D Tipo B + Toroidi Ø80mm",
        "Sgancio": "Bobina lancio corrente SOR 230Vac su Q1"
      },
      "desc": "Avanquadro generale in cassa isolante ABB Gemini nel Locale Contatori P.Terra. Monta un interruttore generale Q1 (ABB XT3N 250) con protezione differenziale Tipo B Dossena, un secondo scatolato Q2 (XT3N 250) dedicato al montante verso QE.SSC e 7 partenze ausiliarie per locale contatori, cancello, irrigazione, Portineria (QE-POR) e servizi ausiliari pompe antincendio.",
      "sld": {
        "incomer": "Da RIP-250A · FG16OM16 3×150+150N mm²",
        "mainDevice": "Q1: ABB XT3N 250 TMD (175÷250A, 36kA) + Diff. Dossena Tipo B + Bobina SOR",
        "busbar": "Cablaggio unipolare FS17 95 mm² · In 250A"
      },
      "circuits": [
        {
          "code": "Q2",
          "desc": "Montante Quadro Servizi Supercondominiali (QE.SSC)",
          "breaker": "ABB XT3N 250 4P TMD (36 kA)",
          "cable": "FG16OM16 3×150+150N+75PE (185 su QE.SSC)"
        },
        {
          "code": "Q3 + F3",
          "desc": "Luce ordinaria + Luce emergenza Locale Contatori",
          "breaker": "ABB DS201 C10A 30mA Tipo A + Fus. 2A gG",
          "cable": "FG16OM16 3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q4",
          "desc": "Prese di servizio Locale Contatori",
          "breaker": "ABB DS201 C16A 30mA Tipo A (6 kA)",
          "cable": "FG16OM16 3G4 mm²"
        },
        {
          "code": "Q5",
          "desc": "Quadro bordo macchina Cancello Carraio Motorizzato",
          "breaker": "ABB DS201 C10A 30mA Tipo A",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q6",
          "desc": "Alimentazione Impianto Irrigazione aree verdi",
          "breaker": "ABB DS201 C10A 30mA Tipo A",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q7",
          "desc": "Linea Sottoquadro Portineria (QE-POR)",
          "breaker": "ABB S202 C40A 2P (6 kA)",
          "cable": "FG16OM16 3G10 mm²"
        },
        {
          "code": "Q8",
          "desc": "Partenza di Scorta",
          "breaker": "ABB DS201 C10A 30mA Tipo A",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q9",
          "desc": "Quadro Servizi Ausiliari Pompe Antincendio",
          "breaker": "ABB S204P C32A (15 kA) + Diff. DDA204 A 0,3A",
          "cable": "FG16OM16 5G10 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Gemini 1SL0226A00",
          "desc": "Cassa in resina IP66 porta trasparente 1005×840×360 mm"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT3N 250 TMD (1SDA068070R1)",
          "desc": "Interruttore scatolato 4P 175–250A 36kA + Bobina SOR 230Vac"
        },
        {
          "tag": "DER1",
          "brand": "DOSSENA",
          "model": "9DER3BDUAL/6D + 9B80/9D80",
          "desc": "Relè differenziale modulare Tipo B con doppio toroide Ø80mm"
        },
        {
          "tag": "Q2",
          "brand": "ABB",
          "model": "XT3N 250 TMD N50% (1SDA068066R1)",
          "desc": "Interruttore partenza montante verso QE.SSC"
        },
        {
          "tag": "Q3–Q6, Q8",
          "brand": "ABB",
          "model": "DS201 C10A30 / C16A30",
          "desc": "5× Magnetotermici differenziali 1P+N Tipo A 30mA 6kA"
        },
        {
          "tag": "Q7",
          "brand": "ABB",
          "model": "S466301 (C40 2P)",
          "desc": "Interruttore protezione montante monofase Portineria"
        },
        {
          "tag": "Q9",
          "brand": "ABB",
          "model": "S204P-C32 + DDA204 A-40/0,3",
          "desc": "Magnetotermico differenziale 4P 32A 15kA per ausiliari pompe VVF"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B",
        "DS-ABB-S200",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 37-06-23_AVSSC (7 fogli)",
          "scope": "Foglio dati IEC 61439, schemi multifilari Q1–Q9, layout fronte quadro e distinta materiali"
        },
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola AVSSC (3 fogli)",
          "scope": "Schema unifilare di progetto e coordinamento con ripartitore"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🛡️ PROTEZIONE GENERALE",
      "shortFunc": "Protegge il montante da 250A verso QE.SSC e alimenta direttamente Portineria, Cancello, Irrigazione e Ausiliari VVF.",
      "emergencyNote": "Dotato di bobina di sgancio (SOR): se comandato in emergenza apre tutto a valle (inclusi Portineria e Ausiliari PA)."
    },
    {
      "id": "QEPOR",
      "code": "QE-POR",
      "label": "Quadro Locale Portineria (QE-POR)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 2,
      "specs": {
        "Tensione": "230Vac 1F+N",
        "Corrente In": "40 A",
        "Icc quadro": "4,5 kA",
        "Grado IP": "IP40 incasso (FAEG 36 mod. RAL 9016)",
        "Componentistica": "Serie modulare BTicino BTDIN + Vemer ASTLINE",
        "Locale": "Portineria (Piano Terra)"
      },
      "desc": "Centralino incassato nel locale Portineria al Piano Terra: alimenta postazione custode, boiler e scaldasalviette bagno, climatizzatore monosplit, armadio dati condominiale, pompa recupero acque piovane (con differenziale Tipo F), pannello ripetizione allarmi pompe antincendio e illuminazione esterna astronomica.",
      "sld": {
        "incomer": "Da AVSSC (Q7) · FG16OM16 3G10 mm²",
        "mainDevice": "Q1: BTicino FA81NC40 (MT 1P+N C40A 4,5 kA) + Ripartitore RP1 125A",
        "busbar": "Distribuzione monofase 230Vac 50Hz"
      },
      "circuits": [
        {
          "code": "Q2",
          "desc": "Prese 01 locale Portineria",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "FG16OM16 3G4 mm²"
        },
        {
          "code": "Q3",
          "desc": "Scaldasalviette elettrico servizio igienico",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q4",
          "desc": "Boiler elettrico produzione ACS (con sez. locale 2P 16A)",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q5 + F5",
          "desc": "Luce ordinaria + Emergenza Portineria e locali annessi",
          "breaker": "BTicino GA8813A10 + Portafus. F321N 2A gG",
          "cable": "FG16OM16 3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q6",
          "desc": "Unità esterna climatizzazione Portineria (sez. 2P 16A IP65)",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "FG16OM16 3G4 mm²"
        },
        {
          "code": "Q7",
          "desc": "Quadro Ripetizione Allarmi Pompe Antincendio",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q8",
          "desc": "Quadro Pompa Vasca Raccolta Recupero Acque Piovane",
          "breaker": "BTicino GN8813F16 (C16 30mA Tipo F 6kA)",
          "cable": "FG16OM16 3G4 mm²"
        },
        {
          "code": "Q9",
          "desc": "Alimentazione Armadio Dati / Rack TLC",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q10",
          "desc": "Predisposizione Cancello Motorizzato",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q11 + OR11",
          "desc": "Luci Esterne Portineria (Orologio astronomico Vemer + Contattore K11)",
          "breaker": "BTicino GA8813A10 + FT1A1N230M 25A",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q12–Q13",
          "desc": "2× Circuiti di Scorta (10A e 16A)",
          "breaker": "BTicino GA8813A10 + GA8813A16",
          "cable": "Morsetti interni"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "FAEG",
          "model": "FG14636",
          "desc": "Centralino da incasso 36 moduli bianco RAL 9016 IP40"
        },
        {
          "tag": "Q1",
          "brand": "BTicino",
          "model": "FA81NC40",
          "desc": "Interruttore generale magnetotermico 1P+N C40A 4,5kA"
        },
        {
          "tag": "Q2–Q7, Q9–Q13",
          "brand": "BTicino",
          "model": "GA8813A16 / GA8813A10",
          "desc": "Magnetotermici differenziali 1P+N Tipo A 30mA"
        },
        {
          "tag": "Q8",
          "brand": "BTicino",
          "model": "GN8813F16",
          "desc": "Magnetotermico differenziale Tipo F 16A 30mA 6kA per pompa acque piovane"
        },
        {
          "tag": "OR11 + K11",
          "brand": "Vemer / BTicino",
          "model": "VE344800 + FT1A1N230M",
          "desc": "Interruttore astronomico ASTLINE + Contattore 25A luci esterne"
        },
        {
          "tag": "F5",
          "brand": "BTicino",
          "model": "F321N",
          "desc": "Sezionatore portafusibile 1P+N 10×38 per spia/emergenza"
        }
      ],
      "datasheetIds": [
        "DS-BTICINO-FN84",
        "DS-BTICINO-GA8813",
        "DS-BTICINO-F321N",
        "DS-BTICINO-FT1A",
        "DS-VEMER-AST"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.23 – 4.25",
          "scope": "Dotazioni elettriche Portineria, luci esterne e recupero acque piovane"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.11",
          "scope": "Pianta locale Portineria e posizionamento centralino"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 43-06-23_QE-POR (8 fogli)",
          "scope": "Schema esecutivo, circuito astronomico OR11/K11 e distinta materiali"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ SOTTOQUADRO LOCALE",
      "shortFunc": "Alimenta la Portineria, il rack dati, la pompa acque piovane, le luci esterne e il pannello allarmi antincendio.",
      "emergencyNote": "In caso di blackout si accendono le lampade di emergenza autonome; il pannello allarmi PA passa su batteria interna."
    },
    {
      "id": "QESSC",
      "code": "QE.SSC",
      "label": "Quadro Generale Servizi Supercondominiali (QE.SSC)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 2,
      "specs": {
        "Tensione": "400/230Vac (aus. 24Vac)",
        "Corrente In": "250 A (Sez. 400A)",
        "Icc quadro": "15 kA (condiz. 36 kA)",
        "Grado IP": "IP65 (Armadio ABB E-Power H1900mm)",
        "SPD & Misura": "DEHN 941315 Tipo 1+2 + Multimetro Vemer EV3M (TA 250/5A)",
        "Morsettiere": "X1 (Potenza), X2 (Comandi), XUPS (Sicurezza)"
      },
      "desc": "Nodo nevralgico della distribuzione supercondominiale (26 fogli di schema costruttivo): alimenta il rifasamento automatico, le 3 centrali tecnologiche interrate (QE.CT, QE.CI, QE.LP), la sezione Generale Autorimessa Q6 (152 box, corselli -1/-2, rampa, pompe meteo PS1/PS2), i 2 UPS di sicurezza, l'illuminazione pedonale/esterna biregime e il videocitofono. Integra la logica di sgancio emergenza autorimessa a minima tensione 24Vac (relè K1 su Q5, Q6 e Q7).",
      "sld": {
        "incomer": "Da AVSSC (Q2) · FG16OM16 3×185+185N+95PE mm²",
        "mainDevice": "Q1: Sez. ABB XT3D 400A 4P + SPD DEHN Tipo 1+2 (Fus. 125A) + Vemer EV3M",
        "busbar": "Sbarra Rame 25×5 mm + Flexibar · In 250A · Icw 15 kA"
      },
      "circuits": [
        {
          "code": "SC1 + M1",
          "desc": "Scaricatore DEHN DSH TT 255 FM Tipo 1+2 (Fus. Legrand 125A) + Multimetro EV3M",
          "breaker": "Fusibili 22×58 125A gG + 10×38 2A",
          "cable": "FS17 25 mm²"
        },
        {
          "code": "Q2",
          "desc": "Batteria di Rifasamento Automatico",
          "breaker": "ABB XT1B 160 3P TMD (70–100A, 18kA)",
          "cable": "FG16OM16 4G35 mm²"
        },
        {
          "code": "Q3",
          "desc": "Montante Sottoquadro Centrale Tecnologica (QE.CT — Piano -2)",
          "breaker": "ABB XT1B 160 4P TMD (56–80A, 18kA)",
          "cable": "FG16OM16 5G16 mm²"
        },
        {
          "code": "Q4",
          "desc": "Montante Sottoquadro Centrale Idrica (QE.CI — Piano -1)",
          "breaker": "ABB XT1B 160 4P TMD (56–80A, 18kA)",
          "cable": "FG16OM16 5G16 mm²"
        },
        {
          "code": "Q5 [UVR]",
          "desc": "Montante Sottoquadro Locale Pompe (QE.LP — Piano -2) · Sotto sgancio K1 24Vac",
          "breaker": "ABB XT3N 250 4P TMD (112–160A, 36kA) + UVR 24V",
          "cable": "FG16OM16 3×120+120N+70PE"
        },
        {
          "code": "Q6 [UVR]",
          "desc": "Generale Sezione Autorimessa (alimenta ripartitore RP1 125A) · Sotto sgancio K1 24Vac",
          "breaker": "ABB S204P-C63 4P (15 kA) + UVR S2C-UA 24Vac",
          "cable": "FS17 16 mm² interno"
        },
        {
          "code": "Q6.1 / Q6.2",
          "desc": "2× Elettropompe Acque Meteoriche Autorimessa PS1 e PS2",
          "breaker": "2× ABB S204P-D20 (25 kA) + Diff. 0,3A Tipo A",
          "cable": "2× FG16OM16 5G6 mm²"
        },
        {
          "code": "Q6.3 – Q6.6",
          "desc": "4× Dorsali Prese/Luce Interno 152 Box (2 circuiti Piano -1 + 2 circuiti Piano -2)",
          "breaker": "4× ABB S204P-C16 (25 kA) + Diff. 30mA Tipo A",
          "cable": "4× FG16OM16 5G4 mm²"
        },
        {
          "code": "Q6.7",
          "desc": "Prese di servizio parti comuni Autorimessa",
          "breaker": "ABB DS201 C16A 30mA Tipo A",
          "cable": "FG16OM16 3G6 mm²"
        },
        {
          "code": "Q6.8 (.1/.2)",
          "desc": "Illuminazione Rampa Box (Notturna astronomica, Biregime sett., Emergenza)",
          "breaker": "ABB DS201 C16A + 2× SN201 C10 + Contattori EN20",
          "cable": "FG16OM16 3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q6.9 / Q6.10",
          "desc": "Illuminazione Corselli Box Piano -1 e Piano -2 (Temporizzata sensori, Notturna, EM)",
          "breaker": "2× ABB DS201 C16A + 4× SN201 C10 + Timer E232",
          "cable": "FG16OM16 3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q6.11 → Q7 [UVR]",
          "desc": "Ingresso/Uscita UPS 1 (1000VA) Alimentazione Portoni Tagliafuoco (mors. XUPS)",
          "breaker": "Q6.11 DS201 C10A → UPS1 → Q7 S202 C10A + UVR 24V",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q8 / Q9 / Q10",
          "desc": "Luce Notturna e Biregime Percorsi Pedonali P.Terra ed Area Esterna (OR8/OR9)",
          "breaker": "3× ABB S201Na C10 + Diff. 30mA + Contattori EN20/ESB20",
          "cable": "FG16OM16 3G4 / 3G2,5 mm²"
        },
        {
          "code": "Q11",
          "desc": "Alimentazione generale Impianto Videocitofono",
          "breaker": "ABB S201Na C10 + Diff. 30mA",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q14 + T14 + K1",
          "desc": "Ingresso/Uscita UPS 2 (2000VA) + Trasf. 230/24Vac 63VA Circuito Sgancio Autorimessa",
          "breaker": "ABB S201Na C10 30mA + Fus. F14/F3 4A gG",
          "cable": "FG16OM16 3G2,5 / 2×1,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Armadio E-Power H1900",
          "desc": "Carpenteria metallica IP65 36 moduli + vano risalita cavi"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT3D 400 4P (1SDA054600R1)",
          "desc": "Sezionatore generale sottocarico 400A"
        },
        {
          "tag": "SC1 + F1",
          "brand": "DEHN / Legrand",
          "model": "941 315 + 021605",
          "desc": "Scaricatore Tipo 1+2 DSH TT 255 FM + Sez. fusibili 22×58 125A"
        },
        {
          "tag": "M1 + TA",
          "brand": "Vemer / IME",
          "model": "EV3M-4DIN (VE333100) + TA327 250/5A",
          "desc": "Multimetro digitale trifase con 3 TA di misura"
        },
        {
          "tag": "Q2–Q5",
          "brand": "ABB",
          "model": "3× XT1B 160 + 1× XT3N 250",
          "desc": "Interruttori scatolati partenze Rifasamento, QE.CT, QE.CI e QE.LP"
        },
        {
          "tag": "UVR",
          "brand": "ABB",
          "model": "1SDA066322R1 + 2× A428398",
          "desc": "Bobine di minima tensione 24Vac su Q5, Q6 e Q7 comandate da K1"
        },
        {
          "tag": "OR6/8/9",
          "brand": "Vemer",
          "model": "2× VE344800 + 2× VE513800",
          "desc": "Interruttori astronomici ASTLINE e orologi digitali settimanali biregime"
        },
        {
          "tag": "T14",
          "brand": "ABB",
          "model": "TM 63/12-24 (M429287)",
          "desc": "Trasformatore di sicurezza 63VA 230/24Vac alimentato da UPS 2"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DEHN-941315",
        "DS-ABB-S200",
        "DS-VEMER-AST",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.6, § 4.24, § 4.35, § 4.38",
          "scope": "Autorimessa, illuminazione esterna, protezioni SPD e gruppi statici UPS"
        },
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola QESSC (12 fogli)",
          "scope": "Schema unifilare di progetto completo delle partenze"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 26-04-23_QE.SSC (26 fogli)",
          "scope": "Schemi potenza, ausiliari temporizzati/astronomici, logica sgancio 24Vac (fg.16) e morsettiera XUPS"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO PRINCIPALE",
      "shortFunc": "Cuore distributivo: alimenta i 152 Box, corselli, rampa, luci vialetti, i 2 UPS e le 3 Centrali (-1 e -2).",
      "emergencyNote": "Se si preme lo sgancio VVF Box, il relè K1 (24V) apre solo Q5 (Locale Pompe), Q6 (Box) e Q7 (Portoni EI); Centrali Termica e Idrica restano attive."
    },
    {
      "id": "QECT",
      "code": "QE.CT",
      "label": "Quadro Centrale Tecnologica (QE.CT)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M2",
      "colHint": 2,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "100 A (Sez. Q1 160A)",
        "Icc quadro": "10 kA",
        "Grado IP": "IP55 (ABB Energy M 2 colonne)",
        "Differenziali Pompe": "Tipo B APR 0,3A (ABB DDA204 B / F204 B)",
        "Locale": "Centrale Tecnologica (Piano -2)"
      },
      "desc": "Quadro a doppia colonna installato nella Centrale Tecnologica al Piano -2: alimenta e protegge le 16 elettropompe elettroniche dei circuiti termici, frigoriferi e ricircolo ACS (con differenziali Tipo B immuni ai disturbi degli inverter), la pompa meteo PS3, i sistemi di trattamento acqua/antilegionella, la contabilizzazione e il quadro di supervisione BMS QE-REG. Riporta 23 contatti di guasto interruttori sulla morsettiera X4.",
      "sld": {
        "incomer": "Da QE.SSC (Q3) · FG16OM16 5G16 mm²",
        "mainDevice": "Q1: Sez. ABB XT1D 160A 4P + Ripartitore RP1 160A",
        "busbar": "Sbarra Rame 20×5 mm · In 100A · Icw 10 kA"
      },
      "circuits": [
        {
          "code": "Q2 + F2",
          "desc": "Luce ordinaria + Luce emergenza Centrale Tecnologica",
          "breaker": "ABB DS201 C10A 30mA + Fus. 2A gG",
          "cable": "FG16OM16 3G2,5 / 3G1,5"
        },
        {
          "code": "Q3",
          "desc": "Gruppo Prese di Servizio CEE interbloccate 400V/230V 16A IP66",
          "breaker": "ABB S204M C16 + Diff. 30mA Tipo A (10 kA)",
          "cable": "FG16OM16 5G4"
        },
        {
          "code": "Q4 (.1/.2)",
          "desc": "Gruppo Pompe gemellari P.01A/1 e P.01B/1 — Accumulatore/Scambiatore 1",
          "breaker": "DS201 C16 0,3A + 2× SN201 C10A",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q5 (.1/.2)",
          "desc": "Gruppo Pompe gemellari P.01A/2 e P.01B/2 — Accumulatore/Scambiatore 2",
          "breaker": "DS201 C16 0,3A + 2× SN201 C10A",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q6 / Q7",
          "desc": "Pompe P.02 e P.03 — Ricircolo ACS Alta e Bassa Pressione",
          "breaker": "2× ABB DS201 C10A 0,3A Tipo A",
          "cable": "2× 3G2,5 mm²"
        },
        {
          "code": "Q8 (.1/.2)",
          "desc": "Gruppo Pompe trifase P.04A e P.04B — Circuito primario PC1-SC1",
          "breaker": "S204M C16 + DDA204 Tipo B 0,3A + 2× S204M C10",
          "cable": "5G2,5 mm²"
        },
        {
          "code": "Q9 (.1/.2)",
          "desc": "Gruppo Pompe trifase P.05A e P.05B — Circuito PC1 - Volano Termico",
          "breaker": "S204M C16 + DDA204 Tipo B 0,3A + 2× S204M C10",
          "cable": "5G2,5 mm²"
        },
        {
          "code": "Q10 (.1/.2)",
          "desc": "Gruppo Pompe trifase P.06A e P.06B — Climatizzazione Locali Condom. Torre B",
          "breaker": "S204M C16 + DDA204 Tipo B 0,3A + 2× S204M C10",
          "cable": "5G2,5 mm²"
        },
        {
          "code": "Q11 (.2/.3)",
          "desc": "Gruppo Pompe trifase P.07A e P.07B — Climatizzazione Bassa Pressione",
          "breaker": "S204M D32 + F204B 40A Tipo B 0,3A + 2× S204M D25",
          "cable": "5G4 mm²"
        },
        {
          "code": "Q12 (.1/.2)",
          "desc": "Gruppo Pompe trifase P.08A e P.08B — Circuito primario Alta Pressione",
          "breaker": "S204M C16 + DDA204 Tipo B 0,3A + 2× S204M C10",
          "cable": "5G2,5 mm²"
        },
        {
          "code": "Q13 (.2/.3)",
          "desc": "Gruppo Pompe trifase P.09A e P.09B — Climatizzazione Media/Alta Pressione",
          "breaker": "S204M D32 + F204B 40A Tipo B 0,3A + 2× S204M D25",
          "cable": "5G4 mm²"
        },
        {
          "code": "Q14",
          "desc": "Quadro bordo macchina Elettropompa Meteo PS3",
          "breaker": "ABB DS201 C16A 30mA Tipo A",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q15 / Q16",
          "desc": "Trattamento Acque T3–T4, Antilegionella e Addolcitore",
          "breaker": "2× ABB DS201 C10A 30mA Tipo A",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q17–Q20",
          "desc": "Contabilizzazione M-Bus, Regolatori 230Vac, Regolatore Cascata e Supervisione (QE-REG)",
          "breaker": "4× ABB DS201 C10A 30mA Tipo A",
          "cable": "3G2,5 / 3G4 mm²"
        },
        {
          "code": "Q21–Q23",
          "desc": "2× Scorte (16A, 10A) + Circuito Ausiliari Quadro 230Vac",
          "breaker": "ABB DS201 C16A / C10A 30mA",
          "cable": "Interno"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "System pro E energy M (Q855B620+Q855B420)",
          "desc": "Armadio componibile IP55 a 2 affiancamenti (600+400 mm)"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT1D 160 4P (1SDA068209R1)",
          "desc": "Sezionatore generale sottocarico 160A con contatto ausiliario"
        },
        {
          "tag": "Q8–Q13 Diff.",
          "brand": "ABB",
          "model": "4× DDA204 B APR + 2× F204B 40/0,3",
          "desc": "6 protezioni differenziali Tipo B 300mA per pompe inverter trifase"
        },
        {
          "tag": "AUX X4",
          "brand": "ABB",
          "model": "28× S2C-S/H6R (A563819)",
          "desc": "Contatti ausiliari/guasto remotati su morsettiera X4 per BMS"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-ABB-S200",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.13 — Centrale Tecnologica",
          "scope": "Elenco pompe P.01–P.09, PS3 e prese interbloccate IP66"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.03 (Piano -2)",
          "scope": "Layout Centrale Tecnologica al secondo interrato"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 12-03-23_QE.CT (23 fogli)",
          "scope": "Schemi multifilari gruppi pompe, allarmi remoti X4 (fg.10–11) e distinta"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO CENTRALE (-2)",
      "shortFunc": "Alimenta e protegge le 16 pompe di circolazione caldo/freddo/ACS, il trattamento acqua e il quadro BMS QE-REG.",
      "emergencyNote": "Non viene disalimentato dallo sgancio selettivo dell'autorimessa; invia 23 segnali di blocco interruttori al BMS."
    },
    {
      "id": "QECI",
      "code": "QE.CI",
      "label": "Quadro Centrale Idrica Sanitaria (QE.CI)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M1",
      "colHint": 2,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "100 A (Sez. Q1 160A)",
        "Icc quadro": "10 kA",
        "Grado IP": "IP55 (ABB Energy M Q855B612)",
        "Protezioni Inverter": "2× Differenziali puri Tipo B ABB F204B 40A 0,3A",
        "Locale": "Centrale Idrica (Piano -1, verificato su PL.02/PL.04)"
      },
      "desc": "Quadro della Centrale Idrica collocata al Piano Primo Interrato (-1): alimenta i due gruppi di pressurizzazione idrica sanitaria ad inverter GP1 e GP2 delle Torri A e B, le due pre-autoclavi con compressore, il trattamento antilegionella/addolcitore e i regolatori. Invia stati/allarmi sulla morsettiera X4 verso QE-REG.",
      "sld": {
        "incomer": "Da QE.SSC (Q4) · FG16OM16 5G16 mm²",
        "mainDevice": "Q1: Sez. ABB XT1D 160A 4P + Ripartitore RP1 160A",
        "busbar": "Sbarra Rame 12×4 mm · In 100A · Icw 10 kA"
      },
      "circuits": [
        {
          "code": "Q2 + F2",
          "desc": "Luce ordinaria + Luce emergenza Centrale Idrica",
          "breaker": "ABB DS201 C10A 30mA + Fus. 2A gG",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q3",
          "desc": "Prese di servizio CEE 400V/230V IP66 + prese civili IP55",
          "breaker": "ABB S204M C16 + Diff. 30mA Tipo A",
          "cable": "5G4 mm²"
        },
        {
          "code": "Q4 / Q4.1",
          "desc": "Quadro bordo macchina Gruppo Pressurizzazione Idrica GP1",
          "breaker": "ABB S204M D40 (10 kA) + Diff. F204B 40A Tipo B 0,3A",
          "cable": "5G10 mm²"
        },
        {
          "code": "Q5 / Q5.1",
          "desc": "Quadro bordo macchina Gruppo Pressurizzazione Idrica GP2",
          "breaker": "ABB S204M D40 (10 kA) + Diff. F204B 40A Tipo B 0,3A",
          "cable": "5G10 mm²"
        },
        {
          "code": "Q6 / Q7",
          "desc": "2× Quadri Pre-Autoclave con compressore e valvola ritegno 01 e 02",
          "breaker": "2× ABB S204M C16 + Diff. DDA204 A 0,3A",
          "cable": "2× 5G4 mm²"
        },
        {
          "code": "Q8",
          "desc": "Antilegionella, trattamento acque e addolcitore (T2–T5)",
          "breaker": "ABB DS201 C10A 30mA Tipo A",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q9",
          "desc": "Regolatori 230Vac Sistema M-Bus Termico",
          "breaker": "ABB DS201 C10A 30mA Tipo A",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q10–Q12",
          "desc": "2× Scorte (16A, 10A — dispon. inverter irrigazione) + Ausiliari 230Vac",
          "breaker": "ABB DS201 C16A / C10A 30mA",
          "cable": "Interno"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "System pro E energy M Q855B612",
          "desc": "Cassa metallica IP55 600×1200 mm RAL 7035"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT1D 160 4P (1SDA068209R1)",
          "desc": "Sezionatore generale 160A"
        },
        {
          "tag": "Q4–Q5",
          "brand": "ABB",
          "model": "2× S204M D40 + 2× F204B40300",
          "desc": "Protezioni curva D 40A + Differenziale Tipo B per gruppi spinta inverter GP1/GP2"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.14 — Centrale Idrica",
          "scope": "Utenze idriche GP1/GP2, pre-autoclavi e pompaggio irrigazione"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.02 e PL.04 (Piano -1)",
          "scope": "Ubicazione reale della Centrale Idrica al Primo Interrato"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 11-03-23_QE.CI (12 fogli)",
          "scope": "Schemi potenza, morsettiera allarmi X4 e distinta"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO IDRICO (-1)",
      "shortFunc": "Alimenta le pompe autoclave GP1 e GP2 che spingono l'acqua potabile fino al 14° piano delle due torri.",
      "emergencyNote": "Resta attivo in caso di sgancio autorimessa; invia allarmi cumulativi di anomalia idrica al supervisore BMS."
    },
    {
      "id": "QELP",
      "code": "QE.LP",
      "label": "Quadro Locale Pompe Falda & Modulo BMS CBX1 (QE.LP)",
      "plant": "IMP-SSC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M2",
      "colHint": 2,
      "specs": {
        "Tensione": "400/230Vac (aus. 24Vac)",
        "Corrente In": "250 A",
        "Icc quadro": "10 kA (condiz. 36 kA)",
        "Grado IP": "IP55 (ABB Energy M 2 colonne)",
        "Automazione Integrata": "Modulo remoto ABB Cylon CBX-8R8 (Addr. 1) collegato a QE-REG",
        "Locale": "Locale Pompe (Piano -2)"
      },
      "desc": "Quadro di potenza e automazione nel Locale Pompe al Piano -2: alimenta le pompe sommerse di prelievo acqua di falda (Pozzo 2 P.10 e Pozzo 1 P.11/1–P.11/2, protette con scatolati XT1B 125A e relè Dossena Tipo B), i filtri autopulenti e la pompa meteo PS4. Ospita al suo interno anche la periferica BACnet ABB Cylon CBX-8R8 (CBX1) che gestisce sonde pressione/livello pozzi e segnali 0-10V agli inverter pozzi su comando di QE-REG.",
      "sld": {
        "incomer": "Da QE.SSC (Q5 sotto UVR) · FG16OM16 3×120+120N+70PE mm²",
        "mainDevice": "Q1: Sez. ABB XT3D 250A 4P + Ripartitore 250A",
        "busbar": "Sbarra Rame 20×5 mm · In 250A · Icw 10 kA + Sezione Cylon CBX1"
      },
      "circuits": [
        {
          "code": "Q2 + F2 / Q3",
          "desc": "Luce + Emergenza e Gruppo Prese CEE 400V/230V Locale Pompe",
          "breaker": "DS201 C10 30mA + S204M C16 30mA",
          "cable": "3G2,5 / 5G4 mm²"
        },
        {
          "code": "Q4 + RD4",
          "desc": "Pompa Pozzo 2 Prelievo Acqua di Falda (P.10)",
          "breaker": "ABB XT1B 125 TMD (87,5–125A, 18kA) + Dossena DER3BDUAL/6D Tipo B",
          "cable": "FG16OM16 35 mm²"
        },
        {
          "code": "Q5 + RD5",
          "desc": "Pompe Pozzo 1 Prelievo Acqua di Falda (P.11/1 – P.11/2)",
          "breaker": "ABB XT1B 125 TMD (87,5–125A, 18kA) + Dossena DER3BDUAL/6D Tipo B",
          "cable": "FG16OM16 35 mm²"
        },
        {
          "code": "Q6",
          "desc": "Quadro bordo macchina Elettropompa Meteo PS4",
          "breaker": "ABB S204M C16 + Diff. 0,3A",
          "cable": "4 mm²"
        },
        {
          "code": "Q7",
          "desc": "Trattamento acque, filtri a calza 01-02 e filtro ciclonico",
          "breaker": "ABB DS201 C10A 0,3A",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q8 + T8 + CBX1",
          "desc": "Trasf. 230/24Vac 100VA + Periferica ABB Cylon CBX-8R8 (sonde pozzi + 0-10V inverter)",
          "breaker": "ABB DS201 C10A 0,3A + Fus. 1A/4A",
          "cable": "Bus RS-485 da QE-REG"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "System pro E energy M (Q855B616+Q855B416)",
          "desc": "Armadio IP55 doppia colonna H1600 mm"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT3D 250 4P (1SDA068211R1)",
          "desc": "Sezionatore generale sottocarico 250A"
        },
        {
          "tag": "Q4–Q5 + RD4–5",
          "brand": "ABB / Dossena",
          "model": "2× XT1B 125 + 2× 9DER3BDUAL/6D",
          "desc": "Partenze pozzi geotermici falda con protezione differenziale Tipo B"
        },
        {
          "tag": "CBX1 + K1",
          "brand": "ABB Cylon / Cabur",
          "model": "CBX-8R8 + XR041E24",
          "desc": "Controllore BACnet remoto 16 punti per gestione pozzi falda e inverter 0–10V"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B",
        "DS-CYLON-CBX-FLX",
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.15 — Locale Pompe",
          "scope": "Prelievo acqua di falda, filtrazione e pompa meteo PS4"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.03 (Piano -2)",
          "scope": "Posizionamento Locale Pompe al secondo interrato"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 13-03-23_QE.LP (17 fogli)",
          "scope": "Schemi potenza pozzi (fg.4) e schemi I/O Cylon CBX-8R8 (fg.7–9)"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO POZZI (-2)",
      "shortFunc": "Alimenta le pompe sommerse che prelevano acqua di falda per le pompe di calore; ospita il modulo BMS CBX1.",
      "emergencyNote": "Soggetto allo sgancio VVF autorimessa (bobina minima tensione su Q5 in QE.SSC) poiché ubicato nel compartimento -2."
    },
    {
      "id": "POD-SCA",
      "code": "POD-SC.A",
      "label": "Fornitura BT Scala / Torre A (50 kW)",
      "plant": "IMP-SCA",
      "nodeClass": "supply_pod",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 0,
      "specs": {
        "Potenza disponibile": "50 kW",
        "Tensione": "400/230V 3F+N 50Hz",
        "Sistema neutro": "TT",
        "Icc presunta": "15 kA (3F) / 6 kA (F-N)",
        "Locale": "Locale Contatori Generale (Piano Terra)"
      },
      "desc": "Punto di consegna BT dedicato ai servizi comuni verticali e ai locali condominiali dell'edificio Torre A (14 piani fuori terra, h > 32 m).",
      "sld": null,
      "circuits": [
        {
          "code": "MONT-AVSCA",
          "desc": "Collegamento verso Avanquadro AVSC-A",
          "breaker": "DG Distributore",
          "cable": "FG16OM16 3×(1×70)+1×70N mm²"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "Cap. 1 — Torre A e Forniture",
          "scope": "Caratteristiche antincendio Torre A (>32m, att. 77) e potenza 50 kW"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.12.1",
          "scope": "Posizione AVSC-A nel Locale Contatori Generale"
        }
      ],
      "roleType": "source",
      "roleLabel": "⚡ INGRESSO RETE 50 kW",
      "shortFunc": "Consegna energia dalla rete pubblica per tutti gli impianti comuni e gli ascensori della Torre A.",
      "emergencyNote": "Origine elettrica dedicata alla sola Torre A (indipendente da Torre B e Supercondominio)."
    },
    {
      "id": "AVSCA",
      "code": "AVSC-A",
      "label": "Avanquadro Scala A (AVSC-A)",
      "plant": "IMP-SCA",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 0,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "160 A",
        "Icc quadro": "15 kA (Icu 18 kA)",
        "Grado IP": "IP66 Classe II (ABB Gemini 550×460×260)",
        "Protezione": "ABB XT1B 160 TMD + Dossena DER3BDUAL/6D Tipo B",
        "Sgancio VVF": "Bobina a lancio di corrente SOR 230Vac + spia circuito"
      },
      "desc": "Avanquadro di protezione del montante principale della Torre A, installato nel Locale Contatori Generale P.Terra e asservito al Pulsante di Sgancio Emergenza Energia Scala A.",
      "sld": {
        "incomer": "Da POD-SC.A (50 kW) · FG16OM16 3×70+70N mm²",
        "mainDevice": "Q1: ABB XT1B 160 TMD (112–160A, 18kA) + Diff. Dossena Tipo B + Bobina SOR",
        "busbar": "Uscita diretta protetta verso QESC-A"
      },
      "circuits": [
        {
          "code": "Q1",
          "desc": "Montante alimentazione Quadro Generale Scala A (QESC-A)",
          "breaker": "ABB XT1B 160 4P TMD + Diff. Tipo B",
          "cable": "FG16OM16 3×(1×70)+1×70N+1×35PE"
        },
        {
          "code": "F1",
          "desc": "Circuito al Pulsante di Sgancio Emergenza Energia Scala A",
          "breaker": "Portafusibile ABB E90 1P+N 10×38 1A gG",
          "cable": "FG16OM16 2×1,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Gemini 1SL0212A00",
          "desc": "Cassa in resina IP66 porta trasparente 550×460×260 mm"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT1B 160 TMD (1SDA066821R1)",
          "desc": "Interruttore scatolato 4P 112–160A + SOR 230Vac + AUX-C"
        },
        {
          "tag": "DER1",
          "brand": "DOSSENA",
          "model": "9DER3BDUAL/6D + 9B80/9D80",
          "desc": "Relè differenziale Tipo B + toroidi Ø80 mm"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 35-06-23_AVSC-A (6 fogli)",
          "scope": "Schema esecutivo, circuito sgancio e distinta componenti"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🛡️ PROTEZIONE & SGANCIO A",
      "shortFunc": "Protegge a monte il cavo montante da 160A della Torre A e riceve il comando del pulsante VVF di scala.",
      "emergencyNote": "Premendo il pulsante VVF all'ingresso della Torre A, questo interruttore toglie tensione all'intero edificio A."
    },
    {
      "id": "QESCA",
      "code": "QESC-A",
      "label": "Quadro Generale Scala / Torre A (QESC-A)",
      "plant": "IMP-SCA",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M1",
      "colHint": 0,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "160 A",
        "Icc quadro": "10 kA (condiz. 18 kA)",
        "Grado IP": "IP43 (Armadio ABB Energy-L 1800×800×250)",
        "SPD & Misura": "DEHN 941315 Tipo 1+2 + Multimetro Vemer EV3M (TA 150/5A)",
        "Locale": "Locale Contatori / Tecnico Scala A (Piano -1)"
      },
      "desc": "Quadro generale di edificio della Torre A: distribuisce energia a UTA ed estrattore cappe in copertura, rifasamento, 2 ascensori (con differenziali Tipo B APR), Palestra (QE.PL), Deposito Bici (QE.01), dorsale dei 16 quadri di piano, vano scala, cantine (P.T, -1, -2), locale contatori/immondezzaio A, FTTH, videocitofono e luci esterne.",
      "sld": {
        "incomer": "Da AVSC-A (Q1) · FG16OM16 3×70+70N+35PE mm²",
        "mainDevice": "Q1: Sez. ABB XT1D 160A 4P + SPD DEHN Tipo 1+2 + Vemer EV3M",
        "busbar": "Sbarra Rame 25×5 mm · In 160A · Icw 10 kA"
      },
      "circuits": [
        {
          "code": "SC1 + M1",
          "desc": "Scaricatore DEHN DSH TT 255 FM Tipo 1+2 + Multimetro Vemer EV3M (TA 150/5A)",
          "breaker": "Diretta + Fus. 3P+N 2A",
          "cable": "FS17 25 mm²"
        },
        {
          "code": "Q2 + RD2",
          "desc": "Quadro bordo macchina UTA in Copertura Torre A",
          "breaker": "ABB XT1B 160 TMD (56–80A) + Diff. Dossena Tipo B",
          "cable": "FG16OM16 5G25 mm²"
        },
        {
          "code": "Q3",
          "desc": "Quadro Rifasamento Automatico Torre A",
          "breaker": "ABB S203M C32 + Diff. DDA203 A 0,3A",
          "cable": "FG16OM16 4G10 mm²"
        },
        {
          "code": "Q4 / Q5",
          "desc": "Ascensore Destro Torre A — Linea Forza Motrice e Linea Luce",
          "breaker": "S204M K20 + DDA204 Tipo B APR 0,3A / DS201 C16 0,3A",
          "cable": "5G6 / 3G6 mm²"
        },
        {
          "code": "Q6 / Q7",
          "desc": "Ascensore Sinistro Torre A — Linea Forza Motrice e Linea Luce",
          "breaker": "S204M K20 + DDA204 Tipo B APR 0,3A / DS201 C16 0,3A",
          "cable": "5G6 / 3G6 mm²"
        },
        {
          "code": "Q8",
          "desc": "Estrattore Cappe Cucina in Copertura Torre A",
          "breaker": "ABB S204M C20 + DDA204 Tipo B APR 0,3A",
          "cable": "FG16OM16 5G6 mm²"
        },
        {
          "code": "Q9",
          "desc": "Linea Sottoquadro Palestra Condominiale (QE.PL)",
          "breaker": "ABB S204M C50 4P (10 kA)",
          "cable": "FG16OM16 5G16 mm²"
        },
        {
          "code": "Q10",
          "desc": "Dorsale Montante 16 Quadri di Piano Torre A (QEP.01–QEP.05)",
          "breaker": "ABB S204M C25 4P (10 kA)",
          "cable": "FG16OM16 5G6 mm²"
        },
        {
          "code": "Q11",
          "desc": "Amplificatore Bus Contabilizzazione Sistema M-Bus Termico",
          "breaker": "ABB S201Na C10 + Diff. 30mA",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q12 / Q13",
          "desc": "Prese e Luce Vano Scala A (Temporizzata E232, Permanente, Emergenza)",
          "breaker": "2× ABB DS201 C16A 30mA + Contatt. ESB20 + Fus. 2A",
          "cable": "3G6 / 5G4 / 3G1,5"
        },
        {
          "code": "Q14–Q19",
          "desc": "Luce, Emergenza e Prese Corridoi Cantine Torre A (P.Terra, P.-1, P.-2)",
          "breaker": "3× C10 30mA + 3× DS201 C16 30mA + 3× Fus. 2A",
          "cable": "5G2,5 / 3G6 / 3G1,5"
        },
        {
          "code": "Q20 / Q21",
          "desc": "Sezioni Locale Contatori A e Locale Immondezzaio A (Prese, Luce, EM)",
          "breaker": "2× DS201 C25A 30mA + SN201 C16/C10",
          "cable": "3G4 / 3G2,5 / 3G1,5"
        },
        {
          "code": "Q22",
          "desc": "Linea Sottoquadro Deposito Biciclette (QE.01BICI)",
          "breaker": "ABB S201Na C25 1P+N (6 kA)",
          "cable": "FG16OM16 3G6 (3G10 lato QE.01)"
        },
        {
          "code": "Q23 / Q24",
          "desc": "Alimentazione Apparati FTTH/TV e Impianto Videocitofono Torre A",
          "breaker": "2× ABB S201Na C10 + Diff. 30mA",
          "cable": "2× FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q26 / Q27 / Q28",
          "desc": "Locali Comuni, Luce Esterna Ingresso A (Astro OR27) e Q28 Scorta / IRA",
          "breaker": "3× ABB S201Na C10 + Diff. 30mA + Contatt. ESB20",
          "cable": "FG16OM16 3G2,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Energy-L Q843B818",
          "desc": "Armadio monoblocco IP43 1800×800×250 mm RAL 7035"
        },
        {
          "tag": "Q1 + SC1",
          "brand": "ABB / DEHN",
          "model": "XT1D 160 + DSH TT 255 FM (941315)",
          "desc": "Sezionatore generale 160A e scaricatore Tipo 1+2"
        },
        {
          "tag": "Q2 + RD2",
          "brand": "ABB / Dossena",
          "model": "XT1B 80 TMD + 9DER3BDUAL/6D",
          "desc": "Partenza UTA copertura con differenziale Tipo B"
        },
        {
          "tag": "Q4, Q6, Q8",
          "brand": "ABB",
          "model": "3× DDA204 B APR-25/0,3A",
          "desc": "Blocchi differenziali Tipo B per ascensori Dx/Sx ed estrattore cappe"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DEHN-941315",
        "DS-DOSSENA-DER3B",
        "DS-ABB-S200",
        "DS-VEMER-AST"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola QESCA (7 fogli)",
          "scope": "Schema unifilare di progetto Scala A"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 30-05-23_QESC-A (19 fogli)",
          "scope": "Schemi multifilari, morsettiere X1/X2, fronte armadio e distinta"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO EDIFICIO A",
      "shortFunc": "Distribuisce corrente a 2 ascensori, UTA/cappe sul tetto, Palestra, Bici, cantine, scale e 16 quadri di piano.",
      "emergencyNote": "Se disalimentato, entrano in funzione le luci di emergenza autonome (1h) lungo scale, filtri fumo e cantine."
    },
    {
      "id": "QEPL",
      "code": "QE.PL",
      "label": "Quadro Palestra Condominiale Torre A (QE.PL)",
      "plant": "IMP-SCA",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_RIALZ",
      "colHint": 0,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "50 A",
        "Icc quadro": "6 kA",
        "Grado IP": "IP40 incasso (FAEG 36 mod.)",
        "Sicurezza": "Relè chiamata disabili Finder 13.11 + Diff. Tipo B Clima",
        "Locale": "Palestra Condominiale Torre A (P.Terra / Rialzato)"
      },
      "desc": "Sottoquadro trifase della Palestra condominiale e relativi spogliatoi/bagni nella Torre A: alimenta prese sala attrezzi, unità interne ed esterna climatizzazione (con differenziale Tipo B), recuperatore di calore VMC, serramenti motorizzati e il sistema di chiamata di soccorso a tirante per WC e doccia disabili.",
      "sld": {
        "incomer": "Da QESC-A (Q9) · FG16OM16 5G16 mm²",
        "mainDevice": "Q1: BTicino FN84C50 (MT 4P C50A 6 kA) + Ripartitore RP1 125A",
        "busbar": "Distribuzione 400/230V 3F+N"
      },
      "circuits": [
        {
          "code": "Q2 / Q3",
          "desc": "Circuiti Prese 01 e Prese 02 sala palestra",
          "breaker": "2× BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "2× 3G4 mm²"
        },
        {
          "code": "Q4",
          "desc": "Unità interne canalizzate e a parete climatizzazione",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q5 + F5",
          "desc": "Luce + Automazioni serramenti + Luce di emergenza",
          "breaker": "BTicino GA8813A10 + Portafus. F321N 2A",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q6 + R6",
          "desc": "Chiamata di Soccorso WC e Doccia Disabili (Relè Finder 13.11 con reset)",
          "breaker": "BTicino GA8813A6 (C6 30mA Tipo A)",
          "cable": "5G1,5 + 3G1,5 mm²"
        },
        {
          "code": "Q7",
          "desc": "Scaldasalviette elettrico bagno palestra",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q8",
          "desc": "Recuperatore di calore VMC palestra",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q9 / Q9.1",
          "desc": "Unità esterna climatizzazione (sez. locale 4P 32A IP65)",
          "breaker": "BTicino FN84D20 (4P D20 6kA) + Diff. G744B40 Tipo B 0,3A",
          "cable": "5G6 mm²"
        }
      ],
      "bom": [
        {
          "tag": "Q1",
          "brand": "BTicino",
          "model": "FN84C50",
          "desc": "Interruttore generale magnetotermico 4P C50A 6kA"
        },
        {
          "tag": "Q9 + Q9.1",
          "brand": "BTicino",
          "model": "FN84D20 + G744B40",
          "desc": "Magnetotermico 4P D20A + Blocco differenziale Tipo B 40A 0,3A per clima"
        },
        {
          "tag": "R6",
          "brand": "Finder",
          "model": "13.11.8.230.0000",
          "desc": "Relè bistabile chiamata soccorso disabili con reset"
        }
      ],
      "datasheetIds": [
        "DS-BTICINO-FN84",
        "DS-BTICINO-GA8813",
        "DS-FINDER-1311"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.21 — Locale Palestra",
          "scope": "Dotazioni palestra, clima e chiamata soccorso WC/doccia disabili"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.05 e PL.06",
          "scope": "Pianta Palestra, spogliatoi uomo/donna e rampa interna"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 44-06-23_QE.PL (7 fogli)",
          "scope": "Schema esecutivo e distinta materiali"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ SOTTOQUADRO LOCALE",
      "shortFunc": "Alimenta prese attrezzi, climatizzazione, VMC e chiamata soccorso disabili della Palestra condominiale.",
      "emergencyNote": "Il relè bistabile Finder mantiene attivo l'allarme ottico/acustico del bagno/doccia disabili fino al reset manuale."
    },
    {
      "id": "QEDB",
      "code": "QE.01BICI",
      "label": "Quadro Deposito Biciclette Torre A (QE.01 / QEDB)",
      "plant": "IMP-SCA",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_RIALZ",
      "colHint": 0,
      "specs": {
        "Tensione": "230Vac 1F+N",
        "Corrente In": "25 A",
        "Icc quadro": "4,5 kA",
        "Grado IP": "IP40 incasso (FAEG 36 mod.)",
        "Componentistica": "BTicino BTDIN45",
        "Locale": "Deposito Biciclette e Spogliatoio Personale Torre A"
      },
      "desc": "Centralino monofase a servizio del locale Deposito Biciclette e dei locali spogliatoio/bagno del personale di servizio nella Torre A.",
      "sld": {
        "incomer": "Da QESC-A (Q22) · FG16OM16 3G6/3G10 mm²",
        "mainDevice": "Q1: BTicino FA81NC25 (MT 1P+N C25A 4,5 kA)",
        "busbar": "Pettine monofase FS17 6 mm²"
      },
      "circuits": [
        {
          "code": "Q2",
          "desc": "Prese Deposito Biciclette",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q3",
          "desc": "Prese locali di servizio + Boiler ACS",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q4",
          "desc": "Scaldasalviette elettrici locali di servizio",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q5 + F5",
          "desc": "Luce + Aspiratore + Automazioni + Luce emergenza",
          "breaker": "BTicino GA8813A10 + Portafus. F321N 2A",
          "cable": "3G2,5 / 3G1,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "Q1",
          "brand": "BTicino",
          "model": "FA81NC25",
          "desc": "Interruttore generale 1P+N C25A 4,5kA"
        },
        {
          "tag": "Q2–Q5",
          "brand": "BTicino",
          "model": "3× GA8813A16 + 1× GA8813A10",
          "desc": "Magnetotermici differenziali 30mA Tipo A"
        }
      ],
      "datasheetIds": [
        "DS-BTICINO-FN84",
        "DS-BTICINO-GA8813",
        "DS-BTICINO-F321N"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.20 — Deposito Biciclette",
          "scope": "Dotazioni elettriche deposito bici e servizi"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 40-06-23_QE.01BICI (6 fogli)",
          "scope": "Schema esecutivo e distinta (sigla quadro QE.01, progetto QEDB)"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ SOTTOQUADRO LOCALE",
      "shortFunc": "Alimenta illuminazione, prese, boiler e spogliatoio di servizio del Deposito Biciclette nella Torre A.",
      "emergencyNote": "Dotato di circuito dedicato per ricarica e test delle lampade di emergenza."
    },
    {
      "id": "QEP-TORRE-A",
      "code": "16× QEP (A)",
      "label": "Dorsale 16 Quadri di Piano Torre A (P.T → 14°)",
      "plant": "IMP-SCA",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_01_14",
      "colHint": 0,
      "specs": {
        "Numero centralini": "16 quadri (IP40 ai piani, IP65 sottoscala)",
        "Dorsale da QESC-A": "Q10 4P C25A · Cavo FG16OM16 5G6 mm²",
        "DG singolo quadro": "MT 1P+N C25A 4,5 kA",
        "Schemi tipo": "QEP.01 (P.T), QEP.02 (Ingr. A), 11× QEP.03, 2× QEP.04 (7°-10°), QEP.05 (14°)"
      },
      "desc": "Colonna montante di distribuzione ai 16 centralini di piano della Torre A: alimenta prese di servizio pianerottolo/cavedio, illuminazione su sensori di movimento (contattore 2P 25A) ed emergenza di filtri aerati/pianerottoli, oltre alle apparecchiature M-Bus per il sistema cappe centralizzato ai piani Terra, 7° e 10°.",
      "sld": {
        "incomer": "Da QESC-A (Q10) · Montante trifase FG16OM16 5G6 mm²",
        "mainDevice": "16× DG 1P+N C25A (4,5 kA) derivati sulle 3 fasi lungo il cavedio",
        "busbar": "5 configurazioni standardizzate QEP.01 – QEP.05"
      },
      "circuits": [
        {
          "code": "QEP.01 (×1 · P.Terra)",
          "desc": "Prese cavedio/pianerottolo (-2,-1,T) + Luce/EM filtro aerato + M-Bus cappe",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + MTD C10 M-Bus",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "QEP.02 (×1 · Ingr. A)",
          "desc": "Quadro IP65 Sottoscala A: Prese + Luce sensori/EM Ingresso Torre A",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A)",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "QEP.03 (×11 · Piani Tipo)",
          "desc": "Piani 1°–6°, 8°–9°, 11°–13°: Prese servizio + Luce sensori/EM filtro aerato + Scorta",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + Scorta C10",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "QEP.04 (×2 · Piani 7°/10°)",
          "desc": "Piani 7° e 10°: Prese + Luce sensori/EM filtro + Apparecchiature M-Bus Cappe",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + MTD C10 M-Bus",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "QEP.05 (×1 · Piano 14°)",
          "desc": "Piano 14° e Locale Tecnico: Prese + Luce/EM filtro + Automazioni",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + MTD C10",
          "cable": "3G2,5 / 3G1,5 mm²"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-FOSNOVA-LED",
        "DS-PERRY-EM",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.17 – 4.18",
          "scope": "Pianerottoli, filtri fumo aerati, locale tecnico 14° e ingressi"
        },
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavole QEP.01, QEP.02(A), QEP.03, QEP.04, QEP.05",
          "scope": "Schemi unifilari dei 5 archetipi di centralino di piano"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.09",
          "scope": "Pianta tipo piani 1°–14° Torre A (vano scala, filtro aerato, cavedi VMC/impianti)"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🏢 COLONNA 16 PIANI (A)",
      "shortFunc": "16 centralini dal P.Terra al 14°: alimentano luci con sensori nei filtri fumo/pianerottoli e controlli cappe (7°/10°).",
      "emergencyNote": "Garantisce l'illuminazione automatica di sicurezza nei filtri a prova di fumo e sui pianerottoli ad ogni piano."
    },
    {
      "id": "POD-SCB",
      "code": "POD-SC.B",
      "label": "Fornitura BT Scala / Torre B (50 kW)",
      "plant": "IMP-SCB",
      "nodeClass": "supply_pod",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 5,
      "specs": {
        "Potenza disponibile": "50 kW",
        "Tensione": "400/230V 3F+N 50Hz",
        "Sistema neutro": "TT",
        "Icc presunta": "15 kA (3F) / 6 kA (F-N)",
        "Locale": "Locale Contatori Generale (Piano Terra)"
      },
      "desc": "Punto di consegna BT dedicato ai servizi comuni verticali e ai locali condominiali dell'edificio Torre B (14 piani fuori terra, h > 32 m).",
      "sld": null,
      "circuits": [
        {
          "code": "MONT-AVSCB",
          "desc": "Collegamento verso Avanquadro AVSC-B",
          "breaker": "DG Distributore",
          "cable": "FG16OM16 3×(1×70)+1×70N mm²"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "Cap. 1 — Torre B e Forniture",
          "scope": "Caratteristiche antincendio Torre B (>32m, att. 77) e potenza 50 kW"
        }
      ],
      "roleType": "source",
      "roleLabel": "⚡ INGRESSO RETE 50 kW",
      "shortFunc": "Consegna energia dalla rete pubblica per tutti gli impianti comuni e gli ascensori della Torre B.",
      "emergencyNote": "Origine elettrica dedicata alla sola Torre B."
    },
    {
      "id": "AVSCB",
      "code": "AVSC-B",
      "label": "Avanquadro Scala B (AVSC-B)",
      "plant": "IMP-SCB",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 5,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "160 A",
        "Icc quadro": "15 kA (Icu 18 kA)",
        "Grado IP": "IP66 Classe II (ABB Gemini 550×460×260)",
        "Protezione": "ABB XT1B 160 TMD + Dossena DER3BDUAL/6D Tipo B",
        "Sgancio VVF": "Bobina a lancio di corrente SOR 230Vac + spia circuito"
      },
      "desc": "Avanquadro generale della Torre B nel Locale Contatori P.Terra, equipaggiato con sgancio di emergenza comandato dal Pulsante VVF Scala B.",
      "sld": {
        "incomer": "Da POD-SC.B (50 kW) · FG16OM16 3×70+70N mm²",
        "mainDevice": "Q1: ABB XT1B 160 TMD (112–160A, 18kA) + Diff. Dossena Tipo B + Bobina SOR",
        "busbar": "Uscita diretta protetta verso QESC-B"
      },
      "circuits": [
        {
          "code": "Q1",
          "desc": "Montante alimentazione Quadro Generale Scala B (QESC-B)",
          "breaker": "ABB XT1B 160 4P TMD + Diff. Tipo B",
          "cable": "FG16OM16 3×(1×70)+1×70N+1×35PE"
        },
        {
          "code": "F1",
          "desc": "Circuito al Pulsante di Sgancio Emergenza Energia Scala B",
          "breaker": "Portafusibile ABB E90 1P+N 10×38 1A gG",
          "cable": "FG16OM16 2×1,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Gemini 1SL0212A00",
          "desc": "Cassa in resina IP66 porta trasparente 550×460×260 mm"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "XT1B 160 TMD (1SDA066821R1)",
          "desc": "Interruttore scatolato 4P 112–160A + SOR 230Vac"
        },
        {
          "tag": "DER1",
          "brand": "DOSSENA",
          "model": "9DER3BDUAL/6D + 9B80/9D80",
          "desc": "Relè differenziale Tipo B + toroidi Ø80 mm"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 36-06-23_AVSC-B (6 fogli)",
          "scope": "Schema esecutivo, circuito sgancio e distinta componenti"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🛡️ PROTEZIONE & SGANCIO B",
      "shortFunc": "Protegge a monte il cavo montante da 160A della Torre B e riceve il comando del pulsante VVF di scala.",
      "emergencyNote": "Premendo il pulsante VVF all'ingresso della Torre B, toglie tensione a tutte le parti comuni dell'edificio B."
    },
    {
      "id": "QESCB",
      "code": "QESC-B",
      "label": "Quadro Generale Scala / Torre B (QESC-B)",
      "plant": "IMP-SCB",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M1",
      "colHint": 5,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "160 A",
        "Icc quadro": "10 kA (condiz. 18 kA)",
        "Grado IP": "IP43 (Armadio ABB Energy-L 1800×800×250)",
        "SPD & Misura": "DEHN 941315 Tipo 1+2 + Multimetro Vemer EV3M (TA 150/5A)",
        "Locale": "Locale Contatori / Tecnico Scala B (Piano -1)"
      },
      "desc": "Quadro generale di edificio della Torre B: alimenta UTA ed estrattore cappe in copertura, rifasamento, 2 ascensori (Tipo B APR), Spazio Polifunzionale/Lavanderia (QE.03), Sala Riunioni (QE.02), dorsale dei 16 quadri di piano, vano scala, cantine (P.Terra e P.-2; assenti al P.-1), contatori/immondezzaio B, FTTH, videocitofono e luci esterne.",
      "sld": {
        "incomer": "Da AVSC-B (Q1) · FG16OM16 3×70+70N+35PE mm²",
        "mainDevice": "Q1: Sez. ABB XT1D 160A 4P + SPD DEHN Tipo 1+2 + Vemer EV3M",
        "busbar": "Sbarra Rame 25×5 mm · In 160A · Icw 10 kA"
      },
      "circuits": [
        {
          "code": "SC1 + M1",
          "desc": "Scaricatore DEHN DSH TT 255 FM Tipo 1+2 + Multimetro Vemer EV3M (TA 150/5A)",
          "breaker": "Diretta + Fus. 3P+N 2A",
          "cable": "FS17 25 mm²"
        },
        {
          "code": "Q2 + RD2",
          "desc": "Quadro bordo macchina UTA in Copertura Torre B",
          "breaker": "ABB XT1B 160 TMD (56–80A) + Diff. Dossena Tipo B",
          "cable": "FG16OM16 5G25 mm²"
        },
        {
          "code": "Q3",
          "desc": "Quadro Rifasamento Automatico Torre B",
          "breaker": "ABB S203M C32 + Diff. DDA203 A 0,3A",
          "cable": "FG16OM16 4G10 mm²"
        },
        {
          "code": "Q4–Q7",
          "desc": "Ascensori Destro e Sinistro Torre B — Linee F.M. e Linee Luce",
          "breaker": "2× (S204M K20 + DDA204 Tipo B APR) + 2× DS201 C16",
          "cable": "5G6 / 3G6 mm²"
        },
        {
          "code": "Q8",
          "desc": "Estrattore Cappe Cucina in Copertura Torre B",
          "breaker": "ABB S204M C20 + DDA204 Tipo B APR 0,3A",
          "cable": "FG16OM16 5G6 mm²"
        },
        {
          "code": "Q9",
          "desc": "Linea Sottoquadro Spazio Polifunzionale / Lavanderia (QE.03)",
          "breaker": "ABB S204M C32 4P (10 kA)",
          "cable": "FG16OM16 5G10 mm²"
        },
        {
          "code": "Q10",
          "desc": "Dorsale Montante 16 Quadri di Piano Torre B (QEP.01–QEP.05)",
          "breaker": "ABB S204M C25 4P (10 kA)",
          "cable": "FG16OM16 5G6 mm²"
        },
        {
          "code": "Q11",
          "desc": "Amplificatore Bus Contabilizzazione Sistema M-Bus Termico",
          "breaker": "ABB S201Na C10 + Diff. 30mA",
          "cable": "FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q12 / Q13",
          "desc": "Prese e Luce Vano Scala B (Temporizzata E232, Permanente, Emergenza)",
          "breaker": "2× ABB DS201 C16A 30mA + Contatt. ESB20",
          "cable": "3G6 / 5G4 / 3G1,5"
        },
        {
          "code": "Q14–Q15 / Q18–Q19",
          "desc": "Luce, Emergenza e Prese Corridoi Cantine Torre B (P.Terra e P.-2; Q16–17 non usati)",
          "breaker": "2× C10 30mA + 2× DS201 C16 30mA + Fus. 2A",
          "cable": "5G2,5 / 3G6 / 3G1,5"
        },
        {
          "code": "Q20 / Q21",
          "desc": "Sezioni Locale Contatori B e Locale Immondezzaio B",
          "breaker": "2× DS201 C25A 30mA + SN201 C16/C10",
          "cable": "3G4 / 3G2,5 / 3G1,5"
        },
        {
          "code": "Q22",
          "desc": "Linea Sottoquadro Sala Riunioni (QE.02)",
          "breaker": "ABB S201Na C25 1P+N (6 kA)",
          "cable": "FG16OM16 3G6 (3G10 lato QE.02)"
        },
        {
          "code": "Q23 / Q24",
          "desc": "Alimentazione Apparati FTTH e Impianto Videocitofono Torre B",
          "breaker": "2× ABB S201Na C10 + Diff. 30mA",
          "cable": "2× FG16OM16 3G2,5 mm²"
        },
        {
          "code": "Q25–Q28",
          "desc": "Locali Comuni, Luce Esterna Ingresso B (Astro OR27) e Scorta / IRA",
          "breaker": "DS201 C16 + 3× S201Na C10 30mA + ESB20",
          "cable": "FG16OM16 3G2,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Energy-L Q843B818",
          "desc": "Armadio monoblocco IP43 1800×800×250 mm RAL 7035"
        },
        {
          "tag": "Q1 + SC1",
          "brand": "ABB / DEHN",
          "model": "XT1D 160 + DSH TT 255 FM (941315)",
          "desc": "Sezionatore generale 160A e scaricatore Tipo 1+2"
        },
        {
          "tag": "Q2 + RD2",
          "brand": "ABB / Dossena",
          "model": "XT1B 80 TMD + 9DER3BDUAL/6D",
          "desc": "Partenza UTA copertura con differenziale Tipo B"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DEHN-941315",
        "DS-DOSSENA-DER3B",
        "DS-ABB-S200",
        "DS-VEMER-AST"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola QESCB (6 fogli)",
          "scope": "Schema unifilare di progetto Scala B"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 31-05-23_QESC-B (18 fogli)",
          "scope": "Schemi multifilari, morsettiere X1/X2, fronte armadio e distinta"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO EDIFICIO B",
      "shortFunc": "Distribuisce corrente a 2 ascensori, UTA/cappe sul tetto, Sala Riunioni, Lavanderia, cantine e 16 quadri di piano.",
      "emergencyNote": "Se disalimentato, si attivano le lampade autonome di emergenza lungo l'intero vano scala B."
    },
    {
      "id": "QESR",
      "code": "QE.02RIUN",
      "label": "Quadro Sala Riunioni Torre B (QE.02 / QESR)",
      "plant": "IMP-SCB",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_RIALZ",
      "colHint": 5,
      "specs": {
        "Tensione": "230Vac 1F+N",
        "Corrente In": "25 A",
        "Icc quadro": "4,5 kA",
        "Grado IP": "IP40 incasso (FAEG 36 mod.)",
        "Sicurezza": "Relè chiamata bagno disabili Finder 13.11.8.230",
        "Locale": "Sala Riunioni Torre B (P.Terra / Rialzato)"
      },
      "desc": "Centralino monofase della Sala Riunioni condominiale nella Torre B: alimenta prese, fan-coil, scaldasalviette, serramenti motorizzati e l'impianto di chiamata di soccorso con reset del bagno disabili.",
      "sld": {
        "incomer": "Da QESC-B (Q22) · FG16OM16 3G6/3G10 mm²",
        "mainDevice": "Q1: BTicino FA81NC25 (MT 1P+N C25A 4,5 kA)",
        "busbar": "Distribuzione monofase 230Vac"
      },
      "circuits": [
        {
          "code": "Q2",
          "desc": "Prese Sala Riunioni",
          "breaker": "BTicino GA8813A16 (C16 30mA Tipo A)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q3",
          "desc": "Scaldasalviette elettrico bagno disabili",
          "breaker": "BTicino GA8813A10 (C10 30mA Tipo A)",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q4 + R4",
          "desc": "Chiamata di Soccorso Bagno Disabili (Relè Finder 13.11 con reset)",
          "breaker": "BTicino GA8813A6 (C6 30mA Tipo A)",
          "cable": "5G1,5 + 3G1,5 mm²"
        },
        {
          "code": "Q5 + F5",
          "desc": "Luce + Automazioni + Chiamata ingresso + Luce emergenza",
          "breaker": "BTicino GA8813A10 + Portafus. F321N 2A",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q6 / Q7",
          "desc": "Fan-Coil climatizzazione + Circuito di Scorta (10A)",
          "breaker": "BTicino GA8813A16 + GA8813A10",
          "cable": "3G2,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "Q1",
          "brand": "BTicino",
          "model": "FA81NC25",
          "desc": "Interruttore generale 1P+N C25A 4,5kA"
        },
        {
          "tag": "R4",
          "brand": "Finder",
          "model": "13.11.8.230.0000",
          "desc": "Relè chiamata soccorso disabili con comando di reset"
        }
      ],
      "datasheetIds": [
        "DS-BTICINO-FN84",
        "DS-BTICINO-GA8813",
        "DS-FINDER-1311"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.19 — Sala Riunioni",
          "scope": "Dotazioni sala riunioni e chiamata soccorso bagno accessibile"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.07 e PL.08",
          "scope": "Pianta Sala Riunioni e bagno disabili"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 41-06-23_QE.02RIUNIONI (7 fogli)",
          "scope": "Schema esecutivo e distinta materiali"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ SOTTOQUADRO LOCALE",
      "shortFunc": "Alimenta prese, fan-coil, serramenti motorizzati e allarme bagno disabili della Sala Riunioni (Torre B).",
      "emergencyNote": "Memorizza le chiamate a tirante dal bagno accessibile con segnalazione fuori porta."
    },
    {
      "id": "QESP",
      "code": "QE.03POLI",
      "label": "Quadro Spazio Polifunzionale & Lavanderia Torre B (QE.03 / QESP)",
      "plant": "IMP-SCB",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_RIALZ",
      "colHint": 5,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "32 A",
        "Icc quadro": "6 kA",
        "Grado IP": "IP40 incasso (FAEG 36 mod.)",
        "Componentistica": "BTicino BTDIN60 / BTDIN45",
        "Locale": "Spazio Polifunzionale e Locale Lavanderia Torre B"
      },
      "desc": "Centralino trifase dello Spazio Polifunzionale ricreativo e annessa Lavanderia condominiale nella Torre B (include partenza tetrapolare CEE per macchinari lavanderia).",
      "sld": {
        "incomer": "Da QESC-B (Q9) · FG16OM16 5G10 mm²",
        "mainDevice": "Q1: BTicino FN84C32 (MT 4P C32A 6 kA) + Ripartitore RP1 125A",
        "busbar": "Distribuzione 400/230V 3F+N"
      },
      "circuits": [
        {
          "code": "Q2",
          "desc": "Prese 01 Spazio Polifunzionale",
          "breaker": "BTicino GA8813A16 (1P+N C16 30mA)",
          "cable": "3G4 mm²"
        },
        {
          "code": "Q3",
          "desc": "Prese CEE Trifase Locale Lavanderia",
          "breaker": "BTicino GN8843A16 (4P C16 30mA Tipo A 6kA)",
          "cable": "5G4 mm²"
        },
        {
          "code": "Q4",
          "desc": "Scaldasalviette elettrico bagno",
          "breaker": "BTicino GA8813A10 (1P+N C10 30mA)",
          "cable": "3G2,5 mm²"
        },
        {
          "code": "Q5 + F5",
          "desc": "Luce + Automazioni + Luce emergenza",
          "breaker": "BTicino GA8813A10 + Portafus. F321N 2A",
          "cable": "3G2,5 / 3G1,5 mm²"
        },
        {
          "code": "Q6 / Q7",
          "desc": "Fan-Coil climatizzazione + Q7 Scorta C10A (nota: linea Lavatrice in PL.13)",
          "breaker": "BTicino GA8813A16 + GA8813A10",
          "cable": "3G2,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "Q1",
          "brand": "BTicino",
          "model": "FN84C32",
          "desc": "Interruttore generale 4P C32A 6kA"
        },
        {
          "tag": "Q3",
          "brand": "BTicino",
          "model": "GN8843A16",
          "desc": "Magnetotermico differenziale 4P C16A 30mA Tipo A 6kA per prese CEE lavanderia"
        }
      ],
      "datasheetIds": [
        "DS-BTICINO-FN84",
        "DS-BTICINO-GA8813",
        "DS-BTICINO-F321N"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.22 — Spazio Polifunzionale",
          "scope": "Dotazioni spazio ricreativo e locale lavanderia"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 42-06-23_QE.03POLIFUNZ (7 fogli)",
          "scope": "Schema esecutivo e distinta materiali"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ SOTTOQUADRO LOCALE",
      "shortFunc": "Alimenta lo Spazio Polifunzionale ricreativo e le prese industriali trifase della Lavanderia condominiale.",
      "emergencyNote": "Protezioni differenziali separate da 30 mA per ciascun circuito utente."
    },
    {
      "id": "QEP-TORRE-B",
      "code": "16× QEP (B)",
      "label": "Dorsale 16 Quadri di Piano Torre B (P.T → 14°)",
      "plant": "IMP-SCB",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_01_14",
      "colHint": 5,
      "specs": {
        "Numero centralini": "16 quadri (IP40 ai piani, IP65 sottoscala)",
        "Dorsale da QESC-B": "Q10 4P C25A · Cavo FG16OM16 5G6 mm²",
        "DG singolo quadro": "MT 1P+N C25A 4,5 kA",
        "Schemi tipo": "QEP.01 (P.T), QEP.02 (Ingr. B), 11× QEP.03, 2× QEP.04 (7°-10°), QEP.05 (14°)"
      },
      "desc": "Colonna montante gemella dei 16 centralini di piano della Torre B per prese pianerottolo/cavedio, illuminazione su sensori/emergenza dei filtri aerati e apparecchiature M-Bus cappe centralizzate ai piani Terra, 7° e 10°.",
      "sld": {
        "incomer": "Da QESC-B (Q10) · Montante trifase FG16OM16 5G6 mm²",
        "mainDevice": "16× DG 1P+N C25A (4,5 kA) derivati lungo il cavedio",
        "busbar": "5 configurazioni standardizzate QEP.01 – QEP.05"
      },
      "circuits": [
        {
          "code": "QEP.01 (×1 · P.Terra B)",
          "desc": "Prese cavedio/pianerottolo + Luce/EM filtro aerato + M-Bus cappe",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + MTD C10 M-Bus",
          "cable": "3G2,5 / 3G1,5"
        },
        {
          "code": "QEP.02 (×1 · Ingr. B)",
          "desc": "Quadro IP65 Sottoscala B: Prese + Luce sensori/EM Ingresso Torre B",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A)",
          "cable": "3G2,5 / 3G1,5"
        },
        {
          "code": "QEP.03 (×11 · Piani Tipo)",
          "desc": "Piani 1°–6°, 8°–9°, 11°–13°: Prese servizio + Luce sensori/EM filtro aerato",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + Scorta C10",
          "cable": "3G2,5 / 3G1,5"
        },
        {
          "code": "QEP.04 (×2 · Piani 7°/10°)",
          "desc": "Piani 7° e 10°: Prese + Luce sensori/EM filtro + Apparecchiature M-Bus Cappe",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + MTD C10 M-Bus",
          "cable": "3G2,5 / 3G1,5"
        },
        {
          "code": "QEP.05 (×1 · Piano 14°)",
          "desc": "Piano 14° e Locale Tecnico: Prese + Luce/EM filtro + Automazioni",
          "breaker": "DG C25 + MTD C16 + MTD C10 (K1 25A) + MTD C10",
          "cable": "3G2,5 / 3G1,5"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-FOSNOVA-LED",
        "DS-PERRY-EM",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavole QEP.01, QEP.02(B), QEP.03, QEP.04, QEP.05",
          "scope": "Schemi unifilari centralini di piano Torre B"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.10",
          "scope": "Pianta tipo piani 1°–14° Torre B"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🏢 COLONNA 16 PIANI (B)",
      "shortFunc": "16 centralini dal P.Terra al 14° della Torre B per luci sensori pianerottoli/filtri aerati e moduli cappe (7°/10°).",
      "emergencyNote": "Mantiene illuminati i percorsi orizzontali di esodo di tutti i 14 piani in caso di mancanza rete."
    },
    {
      "id": "POD-PDC",
      "code": "POD-PDC",
      "label": "Fornitura BT Pompe di Calore (160 kW)",
      "plant": "IMP-PDC",
      "nodeClass": "supply_pod",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 3,
      "specs": {
        "Potenza disponibile": "160 kW",
        "Tensione": "400/230V 3F+N 50Hz",
        "Sistema neutro": "TT",
        "Icc presunta": "15 kA (3F) / 6 kA (F-N)",
        "Locale": "Locale Contatori Generale (Piano Terra)"
      },
      "desc": "Fornitura BT dedicata di grande potenza (160 kW) per la centrale di climatizzazione e produzione ACS geotermica ad acqua di falda.",
      "sld": null,
      "circuits": [
        {
          "code": "MONT-AVPC",
          "desc": "Doppia terna unipolare FG16OM16 3×(2×185)+1×185N verso AVPC",
          "breaker": "DG Distributore",
          "cable": "6×185 + 1×185N mm²"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "Cap. 1 — Fornitura Pompe di Calore 160 kW",
          "scope": "Dimensionamento punto di consegna termico"
        }
      ],
      "roleType": "source",
      "roleLabel": "⚡ INGRESSO RETE 160 kW",
      "shortFunc": "Fornitura di alta potenza dedicata esclusivamente alla centrale di climatizzazione e acqua calda geotermica.",
      "emergencyNote": "Separata dalle altre forniture per non disturbare ascensori e servizi civili allo spunto dei compressori."
    },
    {
      "id": "AVPC",
      "code": "AVPC",
      "label": "Avanquadro Pompe di Calore (AVPC — 630A)",
      "plant": "IMP-PDC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 3,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Corrente In": "630 A (taratura 504A)",
        "Icc quadro": "15 kA (Icu T5N = 36 kA)",
        "Grado IP": "IP66 Classe II (ABB Gemini 855×590×360)",
        "Protezione Diff.": "Dossena 9DER3BDUAL/21 Tipo B (Idn 1A, t=1s) + Toroidi Ø160mm",
        "Sgancio": "Bobina SOR 230Vac (1SDA054873R1)"
      },
      "desc": "Avanquadro di grande potenza nel Locale Contatori P.Terra: protegge con interruttore scatolato elettronico ABB Tmax T5N 630 e relè differenziale Tipo B selettivo il montante a doppia corda da 185 mm² diretto al quadro QE.PC in Centrale Tecnologica (-2).",
      "sld": {
        "incomer": "Da POD-PDC (160 kW) · FG16OM16 3×(2×185)+1×185N mm²",
        "mainDevice": "Q1: ABB Tmax T5N 630 PR221DS (252–630A, 36kA) + Dossena Tipo B + Bobina SOR",
        "busbar": "Uscita diretta su doppia corda per fase verso QE.PC"
      },
      "circuits": [
        {
          "code": "Q1",
          "desc": "Montante di potenza verso Quadro Pompe di Calore (QE.PC)",
          "breaker": "ABB T5N 630A + Diff. Tipo B (1A / 1s)",
          "cable": "FG16OM16 3×(2×185)+1×185N+1×185PE"
        },
        {
          "code": "F1",
          "desc": "Protezione relè Dossena e circuito sgancio emergenza Q1",
          "breaker": "Portafusibile ABB E90 1P+N 10×38 4A gG",
          "cable": "FS17 2,5 / 1,5 mm²"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Gemini 1SL0225A00",
          "desc": "Cassa in resina IP66 porta trasparente 855×590×360 mm"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "Tmax T5N 630 (1SDA054400R1)",
          "desc": "Interruttore scatolato 4P 630A 36kA + SOR 230Vac + AUX-C"
        },
        {
          "tag": "DER1",
          "brand": "DOSSENA",
          "model": "9DER3BDUAL/21 + 9B160/9D160",
          "desc": "Relè differenziale Tipo B incasso 96×96 + coppia toroidi chiusi Ø160 mm"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola AVPC",
          "scope": "Taratura sganciatore (504A) e selettività differenziale Tipo B (1A, 1s)"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 38-06-23_AVPC (6 fogli)",
          "scope": "Schema esecutivo, fronte cassa e distinta materiali"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🛡️ PROTEZIONE 630A",
      "shortFunc": "Protegge con interruttore da 630A e differenziale selettivo Tipo B i grossi cavi diretti in Centrale Tecnologica.",
      "emergencyNote": "Dotato di bobina di apertura per sezionare da Piano Terra la potenza elettrica diretta alle pompe di calore."
    },
    {
      "id": "QEPC",
      "code": "QE.PC",
      "label": "Quadro Centrale Pompe di Calore & Parallelo FV (QE.PC)",
      "plant": "IMP-PDC",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M2",
      "colHint": 3,
      "specs": {
        "Tensione": "400/230Vac 3F+N",
        "Sbarre / In": "Sbarre 800A (Flexibar 32×5) · Sez. Q1 630A",
        "Icc quadro": "10 kA (Icu interr. PDC = 25 kA)",
        "Grado IP": "IP55 (ABB Energy M 3 colonne: 600+400+400 mm)",
        "SPD & Misura": "DEHN 941315 Tipo 1+2 + Multimetro Vemer EV3M (TA 600/5A)",
        "Locale": "Centrale Tecnologica (Piano -2)"
      },
      "desc": "Quadro di potenza a 3 colonne in Centrale Tecnologica (-2): alimenta i 3 gruppi frigoriferi/pompe di calore ad acqua di falda (PC1 da 48 kW, PC2A da 91 kW e PC2B da 91 kW, ciascuno con proprio relè differenziale Dossena Tipo B e toroidi Ø110mm) e accoglie l'interruttore Q5 dell'Impianto Fotovoltaico. Esporta su morsettiera X4 i contatti di guasto di Q1, SC1, PC1, PC2A, PC2B e FV.",
      "sld": {
        "incomer": "Da AVPC (Q1) · FG16OM16 3×(2×185)+185N+185PE mm²",
        "mainDevice": "Q1: Sez. ABB OT630E04 4P 630A + SPD DEHN Tipo 1+2 + Vemer EV3M (TA 600/5A)",
        "busbar": "Sistema Sbarre Rame / Flexibar In = 800A · Icw = 15–20 kA"
      },
      "circuits": [
        {
          "code": "SC1 + M1",
          "desc": "Scaricatore DEHN DSH TT 255 FM Tipo 1+2 (Fus. 125A) + Multimetro EV3M (TA 600/5A)",
          "breaker": "Legrand 021605 22×58 125A + Fus. 2A",
          "cable": "FG16 25 mm²"
        },
        {
          "code": "Q2 + RD2",
          "desc": "Pompa di Calore PC1 (48 kW elettr., FLA 80A)",
          "breaker": "ABB XT1C 160 TMD (tar. 112A, 25kA) + Dossena Tipo B (Ø110mm)",
          "cable": "FG16OM16 3×70+70N+35PE"
        },
        {
          "code": "Q3 + RD3",
          "desc": "Pompa di Calore PC2A (91 kW elettr., FLA 151A)",
          "breaker": "ABB XT3N 200 TMD (140–200A, 25kA) + Dossena Tipo B (Ø110mm)",
          "cable": "FG16OM16 3×95+95N+50PE"
        },
        {
          "code": "Q4 + RD4",
          "desc": "Pompa di Calore PC2B (91 kW elettr., FLA 151A)",
          "breaker": "ABB XT3N 200 TMD (140–200A, 25kA) + Dossena Tipo B (Ø110mm)",
          "cable": "FG16OM16 3×95+95N+50PE"
        },
        {
          "code": "Q5",
          "desc": "Interfaccia Parallelo Impianto Fotovoltaico Condominiale",
          "breaker": "ABB S204M C50 4P (10 kA — nota: senza BA nello schema quadrista)",
          "cable": "FS17 16 mm² a morsettiera X1"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "Energy M (Q855B618 + 2× Q855B418)",
          "desc": "Armadio industriale IP55 a 3 colonne (larghezza tot. 1400 mm, H 1800 mm)"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "OT630E04 (EO 616 6)",
          "desc": "Sezionatore di manovra sottocarico 4P 630A con maniglia esterna"
        },
        {
          "tag": "SC1",
          "brand": "DEHN",
          "model": "DSH TT 255 FM (941 315)",
          "desc": "Scaricatore combinato Tipo 1+2 spinterometrico 50kA con contatto guasto"
        },
        {
          "tag": "Q2, Q3, Q4",
          "brand": "ABB",
          "model": "1× XT1C 160 + 2× XT3N 200 (25kA)",
          "desc": "Interruttori scatolati alimentazione gruppi PC1, PC2A e PC2B"
        },
        {
          "tag": "RD2–RD4",
          "brand": "DOSSENA",
          "model": "3× 9DER3BDUAL/6D + Toroidi Ø110mm",
          "desc": "3 protezioni differenziali Tipo B indipendenti per inverter compressori PDC"
        },
        {
          "tag": "Q5",
          "brand": "ABB",
          "model": "S204M-C50 (S544030)",
          "desc": "Interruttore automatico 4P C50A 10kA per parallelo impianto fotovoltaico"
        }
      ],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B",
        "DS-DEHN-941315",
        "DS-VEMER-AST",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola QEPC (2 fogli)",
          "scope": "Dati assorbimento PC1/PC2A/PC2B, sezioni cavi e nota interfaccia FV"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 14-03-23_QE.PC (13 fogli)",
          "scope": "Schemi potenza 800A, contatti remoti guasto X4 (fg.7) e distinta"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🎛️ QUADRO POTENZA CLIMA",
      "shortFunc": "Sbarra da 800A dove l'energia dalla rete e quella dal Fotovoltaico alimentano insieme le 3 Pompe di Calore.",
      "emergencyNote": "Invia contatti di allarme immediato al BMS se scatta una pompa di calore, il fotovoltaico o lo scaricatore SPD."
    },
    {
      "id": "GEN-FV-ROOF",
      "code": "GEN-FV",
      "label": "Generatore Fotovoltaico in Copertura",
      "plant": "IMP-PDC",
      "nodeClass": "supply_pod",
      "tier": 1,
      "floor": "F_ROOF",
      "colHint": 3,
      "specs": {
        "Punto di parallelo": "Sbarre QE.PC (Interruttore Q5 4P C50A)",
        "Potenza max linea": "~34 kW trifase @ 400V",
        "Supervisione": "Contatto ausiliario stato/guasto Q5 su morsettiera X4 di QE.PC",
        "Ubicazione": "Copertura Edificio"
      },
      "desc": "Impianto fotovoltaico condominiale connesso in parallelo sul quadro QE.PC per alimentare direttamente il fabbisogno elettrico delle pompe di calore geotermiche.",
      "sld": null,
      "circuits": [
        {
          "code": "LIN-FV",
          "desc": "Montante AC trifase da sezione inverter FV a QE.PC (Q5)",
          "breaker": "ABB S204M 4P C50A",
          "cable": "Morsettiera X1 QE.PC (16 mm²)"
        }
      ],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola QEPC Foglio 2",
          "scope": "Inserzione impianto fotovoltaico e prescrizioni protezione differenziale/sgancio"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "QE.PC Foglio 6 e Foglio 7",
          "scope": "Interruttore Q5 e contatto remoto di stato/allarme"
        }
      ],
      "roleType": "source",
      "roleLabel": "☀️ SORGENTE SOLARE FV",
      "shortFunc": "Pannelli fotovoltaici sul tetto: immettono energia pulita direttamente nel quadro Pompe di Calore per abbattere i consumi.",
      "emergencyNote": "Se manca la rete elettrica, l'inverter si spegne automaticamente in <0,2s (protezione anti-isola CEI 0-21)."
    },
    {
      "id": "QEPA",
      "code": "QE.PA",
      "label": "Quadro Pompa Principale Antincendio (QE.PA)",
      "plant": "IMP-FIRE",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 1,
      "specs": {
        "Tensione": "400Vac 3F senza neutro",
        "Corrente In": "40 A (Im = 480A)",
        "Icc quadro": "15 kA",
        "Grado IP": "IP66 doppio isolamento (Cassa resina 65P12X12)",
        "Caratteristica VVF": "SOLO MAGNETICO (privo di sganciatore termico di sovraccarico!)",
        "Locale": "Locale Contatori Generale (Piano Terra, verificato su PL.12.1)"
      },
      "desc": "Quadro dedicato di sicurezza antincendio installato nel Locale Contatori Generale subito a valle del Ripartitore da 250A (a monte di AVSSC, così da restare in tensione anche durante lo sgancio generale VVF). Protegge il cavo resistente al fuoco FTG18OM16 verso la motopompa da 15 kW solo contro il cortocircuito e i contatti indiretti (Idn = 0,5A), omettendo intenzionalmente la protezione termica affinché la pompa non si arresti mai per sovraccarico durante un incendio.",
      "sld": {
        "incomer": "Da RIP-250A (a monte sgancio) · FTG18OM16 3×16 mm²",
        "mainDevice": "Q1: ABB S203M K40 SOLO MAGNETICO (15kA) + Blocco Diff. DDA203 A 0,5A",
        "busbar": "Uscita diretta protetta con contatto stato ausiliario S2C-H6R"
      },
      "circuits": [
        {
          "code": "Q1",
          "desc": "Linea Motopompa Principale Antincendio (15 kW, Locale Pompe -2)",
          "breaker": "ABB S615099 Solo Magnetico 3P 40A + Diff. 0,5A",
          "cable": "FTG18OM16 4G16 mm² (refuso FG16 su tab. quadrista)"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "65P12X12",
          "desc": "Centralino in resina IP66 porta trasparente + targa rossa UNI EN 12845"
        },
        {
          "tag": "Q1",
          "brand": "ABB",
          "model": "S203M Solo Magnetico (S615099)",
          "desc": "Interruttore automatico 3P solo magnetico In 40A (Im 480A) Icu 15kA"
        },
        {
          "tag": "Q1 Diff.",
          "brand": "ABB",
          "model": "DDA203 A 40A 0,5A (B427977)",
          "desc": "Blocco differenziale trifase 500mA immune a scatti intempestivi"
        },
        {
          "tag": "Q1 Aux",
          "brand": "ABB",
          "model": "S2C-H6R (A563826)",
          "desc": "Contatto ausiliario segnalazione stato interruttore"
        }
      ],
      "datasheetIds": [
        "DS-ABB-S200",
        "DS-CAVO-FTG18"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.29 e § 10.1–10.2",
          "scope": "Dimensionamento al 150% Ib, omissione protezione sovraccarico e targa ammonitrice"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavola PL.12.1",
          "scope": "Ubicazione fisica di QEPA nel Locale Contatori Generale"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 39-06-23_QE.PA (6 fogli)",
          "scope": "Schema esecutivo (dove è stato rilevato il refuso cavo FG16) e distinta"
        }
      ],
      "roleType": "hub",
      "roleLabel": "🚒 QUADRO VITALE VVF",
      "shortFunc": "Alimenta la motopompa antincendio con interruttore SOLO magnetico: non scatta mai per sovraccarico durante un rogo.",
      "emergencyNote": "Collegato PRIMA di AVSSC: continua a dare corrente alla pompa idranti anche quando i VVF staccano tutto il resto!"
    },
    {
      "id": "UPS-1-EI",
      "code": "UPS-1 (1kVA)",
      "label": "UPS 1 Online (1000 VA) — Portoni Tagliafuoco",
      "plant": "IMP-FIRE",
      "nodeClass": "safety_ups_node",
      "tier": 1,
      "floor": "F_M1",
      "colHint": 1,
      "specs": {
        "Potenza nominale": "1000 VA / 800 W",
        "Topologia": "Doppia conversione online onda sinusoidale (t = 0 ms)",
        "Autonomia": "11 min (50% carico) / 4 min (100%)",
        "Interfaccia QE.SSC": "Ingresso da Q6.11 → Morsettiera XUPS → Uscita Q7 (sotto UVR K1)"
      },
      "desc": "Gruppo statico di continuità dedicato all'alimentazione dei quadri bordo macchina dei Portoni Tagliafuoco dell'autorimessa (-1 e -2). In caso di azionamento dello sgancio VVF autorimessa, la bobina di minima tensione su Q7 seziona l'uscita per comandare la chiusura di compartimentazione.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.31 e § 4.38",
          "scope": "Caratteristiche UPS 1000VA/800W e alimentazione portoni tagliafuoco"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "QE.SSC Foglio 9 e Foglio 21 (XUPS)",
          "scope": "Collegamento ingresso/uscita UPS 1 e sgancio su Q7"
        }
      ],
      "roleType": "ups",
      "roleLabel": "🔋 BATTERIA PORTONI EI",
      "shortFunc": "UPS online 1000VA: mantiene alimentati i portoni tagliafuoco dei box; al comando VVF viene staccato per farli chiudere.",
      "emergencyNote": "Autonomia ~11 min a metà carico; in caso di sgancio incendio l'interruttore d'uscita Q7 si apre e compartimenta i box."
    },
    {
      "id": "UPS-2-SGANCIO",
      "code": "UPS-2 (2kVA)",
      "label": "UPS 2 Online (2000 VA) — Circuito Sgancio 24Vac Box",
      "plant": "IMP-FIRE",
      "nodeClass": "safety_ups_node",
      "tier": 1,
      "floor": "F_M1",
      "colHint": 1,
      "specs": {
        "Potenza nominale": "2000 VA / 1600 W",
        "Topologia": "Doppia conversione online onda sinusoidale (t = 0 ms)",
        "Autonomia": "12 min (50% carico) / 4 min (100%)",
        "Circuito alimentato": "Trasformatore T14 (230/24Vac 63VA) in QE.SSC → Anello K1"
      },
      "desc": "Gruppo statico di continuità dedicato a mantenere attivo il circuito ausiliario a 24Vac di sgancio emergenza dell'autorimessa durante brevi buchi di rete, evitando aperture intempestive delle bobine di minima tensione (Q5, Q6, Q7) pur garantendo lo sgancio immediato alla pressione del pulsante VVF.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.38 — UPS Circuito Sgancio",
          "scope": "Specifiche tecniche UPS 2000VA/1600W doppia conversione"
        },
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "QE.SSC Foglio 11 e Foglio 16",
          "scope": "Schema trasformatore 24Vac T14 e relè K1"
        }
      ],
      "roleType": "ups",
      "roleLabel": "🔋 BATTERIA SGANCIO 24V",
      "shortFunc": "UPS online 2000VA: tiene vivo l'anello a 24V dello sgancio box per evitare che un calo di rete apra i quadri per errore.",
      "emergencyNote": "Attenzione: se questo UPS si guasta o si scarica del tutto, per sicurezza apre automaticamente Box, Pozzi e Portoni EI!"
    },
    {
      "id": "SGANCI-VVF",
      "code": "3× PULSANTI VVF",
      "label": "Pulsanti di Sgancio Emergenza VVF (Autorimessa, Scala A, Scala B)",
      "plant": "IMP-FIRE",
      "nodeClass": "safety_ups_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 1,
      "specs": {
        "Sgancio Autorimessa": "Pulsante NC 10A vetro frangibile IP55 (apre anello 24Vac K1 + SOR)",
        "Sgancio Scala A": "Pulsante NA 10A con spia continuità IP55 (apre AVSC-A Q1)",
        "Sgancio Scala B": "Pulsante NA 10A con spia continuità IP55 (apre AVSC-B Q1)"
      },
      "desc": "Postazioni esterne/presidiate di comando d'emergenza per i Vigili del Fuoco che permettono il sezionamento selettivo di ciascun compartimento antincendio mantenendo alimentata la stazione di pompaggio idranti.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-XT"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.5 e Cap. 8 (CEI 64-8 Sez. 751)",
          "scope": "Tipologia contatti NC/NA, spie di sorveglianza e prescrizioni ambienti a maggior rischio"
        }
      ],
      "roleType": "control",
      "roleLabel": "🚨 COMANDI EMERGENZA VVF",
      "shortFunc": "3 pulsanti sotto vetro (Box, Scala A, Scala B) per permettere ai Vigili del Fuoco di togliere tensione in sicurezza.",
      "emergencyNote": "Azione selettiva: ciascun pulsante spegne solo il proprio compartimento lasciando operativa la pompa antincendio."
    },
    {
      "id": "IRA-CENTRALI",
      "code": "IRA A/B + ALL.PA",
      "label": "Centrali Rivelazione Incendi (Torri A/B) & Ripetizione Allarmi PA",
      "plant": "IMP-FIRE",
      "nodeClass": "safety_ups_node",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 1,
      "specs": {
        "Centrali IRA": "2 centrali per Torri A e B (>32m) con passerelle dedicate 200×100 mm",
        "Pannello Allarmi PA": "Installato in Portineria (alimentato da QE-POR Q7 e collegato al Locale Pompe)"
      },
      "desc": "Sistemi di sorveglianza attiva antincendio delle due torri residenziali e supervisione remota in luogo presidiato (Portineria) dello stato del gruppo pompe antincendio.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FTG18"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.3, § 4.29 e § 4.30",
          "scope": "Montanti dedicati IRA 200×100mm, centrali rivelazione e pannello ripetizione allarmi"
        }
      ],
      "roleType": "control",
      "roleLabel": "🔔 RIVELAZIONE & ALLARMI",
      "shortFunc": "Centrali rivelazione fumi delle Torri A/B (>32m) e pannello in Portineria che segnala anomalie alla pompa VVF.",
      "emergencyNote": "Dotate di proprie batterie tampone interne per sorvegliare l'edificio anche a rete elettrica staccata."
    },
    {
      "id": "QEREG",
      "code": "QE-REG",
      "label": "Quadro Regolazione & Supervisione BMS (QE-REG)",
      "plant": "IMP-BMS",
      "nodeClass": "switchgear_node",
      "tier": 1,
      "floor": "F_M2",
      "colHint": 3,
      "specs": {
        "Progetto": "Sistema M-Bus Termico BMS-CT · Fascicolo 08-02-23_QE-REG (22 fogli)",
        "PLC Master": "ABB Cylon MATRIX-216 (BACnet/IP, BACnet MS/TP, Modbus)",
        "Moduli I/O Locali": "1× CBX-8R8 (CBX2) + 2× FLX-8R8 (FLX1, FLX2) + 1× FLX-16DI (FLX3)",
        "HMI & Telecontrollo": "Touch Screen Explorer 7\"/10\" + Router Industriale 4G (RUT950)",
        "Locale": "Centrale Tecnologica (Piano -2)"
      },
      "desc": "Armadio di automazione e telegestione dell'intero sistema termico/frigorifero/idrico: acquisisce 19 sonde di temperatura (ST01–ST19), stati pompe e allarmi da QE.PC, QE.CT, QE.CI e QE.LP; governa la sequenza delle pompe di calore, le 5 valvole miscelatrici 0–10V, le pompe di rilancio e dialoga in RS-485 con il modulo remoto CBX1 dentro QE.LP.",
      "sld": {
        "incomer": "Da QE.CT (Q20 Supervisione) · 230Vac 1F+N",
        "mainDevice": "Q1: ABB S201Na C16A + Trasf. T1 230/24Vac 100VA + Fusibili F1–F5",
        "busbar": "Bus 24Vac + Rete EIA-485 BACnet MS/TP (Addr. 1–3) + Modbus + LAN 4G"
      },
      "circuits": [
        {
          "code": "MTX1 + EXP1 + 4G",
          "desc": "Supervisore ABB Cylon MATRIX-216 + Pannello Touch Explorer + Router 4G",
          "breaker": "Fusibile F1 2A + Alimentaz. 24Vac",
          "cable": "Ethernet LAN + 2× RS-485"
        },
        {
          "code": "CBX2 (Addr. 2)",
          "desc": "Sonde ST01–ST08 (Esterna Nord, Puffer, Spazi Condom., B.P./A.P.) + Comandi PDC1 e P.06/P.07",
          "breaker": "24Vac protetto",
          "cable": "Morsettiera X2 + Relè Cabur K1"
        },
        {
          "code": "FLX1 (Addr. 1)",
          "desc": "Sonde ST09–ST16 (Secondario A.P., Pozzi Falda, ACS) + Comandi P.08/P.09 + 3 Valvole Mix",
          "breaker": "Bus FLX 24Vac",
          "cable": "Morsettiera X2 + Relè Cabur K2"
        },
        {
          "code": "FLX2 (Addr. 2)",
          "desc": "Sonde ST17–ST19 (ACS) + Allarmi 1–2 C. Idrica + Comandi P.02/P.03 + 2 Valvole Mix ACS",
          "breaker": "Bus FLX 24Vac",
          "cable": "Morsettiera X2"
        },
        {
          "code": "FLX3 (Addr. 3)",
          "desc": "16 Ingressi Digitali: Allarmi PDC1/PDC2, Pompe P.01/P.04/P.05, Stati P.06–P.09, Richiesta Pozzi",
          "breaker": "Bus FLX 24Vac",
          "cable": "Morsettiera X2 (mors. 104–127)"
        }
      ],
      "bom": [
        {
          "tag": "A1",
          "brand": "ABB",
          "model": "System pro E energy M Q855B618",
          "desc": "Armadio IP55 1800×600 mm RAL 7035"
        },
        {
          "tag": "MTX1",
          "brand": "ABB Cylon",
          "model": "MATRIX-216",
          "desc": "Control Engine web/BACnet/Modbus a 2 porte RS-485 + Ethernet"
        },
        {
          "tag": "CBX2, FLX1–3",
          "brand": "ABB Cylon",
          "model": "CBX-8R8 + 2× FLX-8R8 + FLX-16DI",
          "desc": "64 punti fisici I/O totali in Centrale Tecnologica"
        },
        {
          "tag": "EXP1",
          "brand": "ABB Cylon",
          "model": "EXPLOREC7 / Explorer 10",
          "desc": "Terminale operatore touch screen su fronte quadro"
        },
        {
          "tag": "K1, K2",
          "brand": "Cabur",
          "model": "2× XR081E24",
          "desc": "Moduli interfaccia a 8 relè 24V per comandi di potenza"
        }
      ],
      "datasheetIds": [
        "DS-CYLON-MATRIX",
        "DS-CYLON-CBX-FLX",
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Fascicolo Quadrista As-Built",
          "ref": "Commessa 08-02-23_QE-REG (22 fogli)",
          "scope": "Architettura rete BACnet/4G (fg.3), I/O sonde e pompe (fg.6–13) e morsettiera X2 (fg.15–19)"
        }
      ],
      "roleType": "control",
      "roleLabel": "🧠 CERVELLO BMS (PLC+4G)",
      "shortFunc": "Legge 19 sonde temperatura e governa automaticamente Pompe di Calore, Pozzi falda, 16 pompe e valvole miscelatrici.",
      "emergencyNote": "Accessibile da remoto via router 4G; su ogni uscita ha selettori Auto-0-Manuale per forzare le pompe a mano se serve."
    },
    {
      "id": "MBUS-M-Bus",
      "code": "M-BUS & CAPPE",
      "label": "Rete Contabilizzazione M-Bus & Regolazione Cappe M-Bus",
      "plant": "IMP-BMS",
      "nodeClass": "field_subsystem",
      "tier": 1,
      "floor": "F_01_14",
      "colHint": 3,
      "specs": {
        "Amplificatori Torri": "QESC-A (Q11) e QESC-B (Q11)",
        "Regolatori Centrali": "QE.CT (Q17–Q18), QE.CI (Q9), QE.LP (Q8)",
        "Moduli Cappe Piani": "QEP.01 (P.Terra A/B) e QEP.04 (Piani 7° e 10° A/B)"
      },
      "desc": "Rete dorsale di contabilizzazione dei consumi termici/idrici individuali e gestione delle apparecchiature per l'estrazione centralizzata cappe cucina distribuita lungo i cavedi delle Torri A e B.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-CYLON-MATRIX"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavole QEP.01 e QEP.04",
          "scope": "Alimentazioni dedicate apparecchiature M-Bus ai piani Terra, 7° e 10°"
        }
      ],
      "roleType": "control",
      "roleLabel": "📡 RETE CONTAB. & CAPPE",
      "shortFunc": "Rete dati lungo le due torri che legge i consumi di ogni alloggio e regola l'aspirazione cappe cucina (7°/10°).",
      "emergencyNote": "Sistema a bassissima tensione distribuito nei cavedi con amplificatori di segnale alla base delle scale."
    },
    {
      "id": "FTTH-CSOE",
      "code": "CSOE / FTTH / TV",
      "label": "Infrastruttura Multiservizio Passiva/Attiva FTTH & TV-SAT",
      "plant": "IMP-TLC",
      "nodeClass": "field_subsystem",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 4,
      "specs": {
        "Accesso Rete": "Pozzetti TP + ≥2 tubi Ø125mm → CSOE e ROE Operatori TLC",
        "Testa Radio/TV": "Antenne TV/SAT in copertura → Terminale di testa + STOM ottica",
        "Distribuzione Alloggi": "Montanti in passerella CD dedicata → Cassette di piano → QDSA + STOA"
      },
      "desc": "Infrastruttura digitale conforme all'art. 135-bis DPR 380/01 (Legge 164/14) e Guide CEI 306-2 / 64-100: integra su fibra ottica sia i servizi a Banda Ultra Larga multi-operatore sia la distribuzione televisiva terrestre/satellitare per tutte le unità delle due torri, oltre all'Armadio Dati condominiale in Portineria.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-BTICINO-VDP"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.37 e Capitolo 5",
          "scope": "Dimensionamento CSOE, ROE, STOM, STOA, QDSA e tubazioni montanti"
        }
      ],
      "roleType": "source",
      "roleLabel": "🌐 CENTRO FIBRA & TV-SAT",
      "shortFunc": "Raccoglie la fibra Internet dalla strada (ROE) e il segnale antenne TV dal tetto portandoli in fibra in ogni casa.",
      "emergencyNote": "Rete ottica passiva immune ai disturbi elettrici; gli amplificatori attivi di testa sono alimentati dai quadri scala."
    },
    {
      "id": "VIDEOCITOFONO",
      "code": "VIDEOCIT. + SOCC.",
      "label": "Impianto Videocitofonico (3 Varchi) & Chiamate Soccorso Disabili",
      "plant": "IMP-TLC",
      "nodeClass": "field_subsystem",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 4,
      "specs": {
        "Targhe Esterne": "Ingresso Portineria, Ingresso Torre A, Ingresso Torre B",
        "Alimentazioni": "QE.SSC (Q11), QESC-A (Q24), QESC-B (Q24)",
        "Chiamate Soccorso": "Palestra (WC + Doccia) e Sala Riunioni (WC) con relè Finder 13.11"
      },
      "desc": "Sistema videocitofonico condominiale con comando elettroserrature sui varchi pedonali/torri, affiancato dai sistemi di chiamata d'emergenza a tirante con segnalazione ottico-acustica fuori dai locali igienici accessibili.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-BTICINO-VDP",
        "DS-FINDER-1311"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.19, § 4.21, § 4.36 e Tavole Quote Barriere Arch.",
          "scope": "Videocitofonia, chiamate bagni disabili e quote installative accessibili"
        }
      ],
      "roleType": "control",
      "roleLabel": "🔔 CITOFONI & SOCCORSO",
      "shortFunc": "Gestisce le 3 targhe videocitofoniche agli ingressi (Portineria, A, B), le serrature e gli allarmi tirante disabili.",
      "emergencyNote": "Pulsanti di sblocco locale garantiscono sempre l'uscita pedonale dalle porte anche in assenza di tensione."
    },
    {
      "id": "TERRA-RETE",
      "code": "TERRA 50mm² + SPD",
      "label": "Anello di Terra (50 mm² Cu), 14 Dispersori & Coordinamento 4 SPD",
      "plant": "IMP-GND",
      "nodeClass": "field_subsystem",
      "tier": 1,
      "floor": "F_TERRA",
      "colHint": 4,
      "specs": {
        "Rete Disperdente": "Corda rame nudo interrata 50 mm² + 14 pozzetti con picchetti a croce 1,5 m",
        "Nodi Equipotenziali": "Collettori nei Locali Contatori + EQP 6 mm² G/V su masse estranee",
        "Scaricatori SPD": "4× DEHN DSH TT 255 FM Tipo 1+2 (QE.SSC, QESC-A, QESC-B, QE.PC)"
      },
      "desc": "Sistema unico di messa a terra e protezione contro i fulmini/sovratensioni dell'intero complesso edilizio in sistema TT, soggetto a denuncia INAIL/ATS e verifica periodica biennale ai sensi del DPR 462/01.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-DEHN-941315"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.34–4.35, § 6.10 e Cap. 13",
          "scope": "Dimensionamento dispersori, conduttori PE/EQP, SPD e obblighi DPR 462/01"
        },
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.12.1 e PL.12.2",
          "scope": "Tracciato anello interrato e posizione dei 14 pozzetti dispersori (3/4\")"
        }
      ],
      "roleType": "load",
      "roleLabel": "⏚ SCARICO A TERRA & SPD",
      "shortFunc": "Anello in rame nudo da 50 mm² con 14 picchetti nel terreno + 4 scaricatori fulmini DEHN nei quadri principali.",
      "emergencyNote": "Protezione passiva permanente: scarica istantaneamente a terra guasti d'isolamento e sovratensioni atmosferiche."
    },
    {
      "id": "LD-BOX",
      "code": "152 BOX + CORSELLI",
      "label": "Autorimessa -1/-2 (152 Box, Corselli, Rampa, Portoni EI, PS1/PS2)",
      "plant": "IMP-SSC",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M1",
      "colHint": 2,
      "specs": {
        "Capacità": "152 box auto (72 al P.-1 + 75/80 al P.-2 · Att. 75 DPR 151/11)",
        "Grado IP / Altezza": "IP55 minimo · Comandi/prese H = 1,15 m · Interr. luce box bipolari 16A",
        "Corpi Illuminanti": "Ideal Lux Zita LED IP67 (26W / 19,5W / 17W + versione EM 1h)"
      },
      "desc": "Tutti gli impianti elettrici dell'autorimessa interrata su due livelli alimentati dalla sezione Q6 di QE.SSC (sotto sgancio VVF 24Vac) e da UPS 1 per i portoni tagliafuoco.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-FOSNOVA-LED",
        "DS-PERRY-EM",
        "DS-CAVO-FG16"
      ],
      "docRefs": [
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.01 (-2) e PL.02 (-1)",
          "scope": "Distribuzione canali portacavi, punti luce/EM, sensori e 152 box"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 UTENZE AUTORIMESSA",
      "shortFunc": "Luce e presa interna dei 152 box privati, luci corselli/rampa con sensori, portoni EI e 2 pompe antiallagamento.",
      "emergencyNote": "Messa completamente fuori tensione al comando del pulsante VVF Autorimessa (salvo lampade autonome di esodo)."
    },
    {
      "id": "LD-ESTERNI",
      "code": "ESTERNI & CANCELLO",
      "label": "Illuminazione Esterna, Vialetti, Cancello & Vasca Piovane",
      "plant": "IMP-SSC",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_TERRA",
      "colHint": 2,
      "specs": {
        "Apparecchi Esterni": "Lombardo Tag 210 (25W), Tok Q H1000 (14W), Art 100 (10W) IP66 · Giunzioni gel IP68",
        "Utenze Motorizzate": "Cancello carraio (AVSSC Q5) + Pompa recupero piovane (QE-POR Q8 Tipo F)"
      },
      "desc": "Illuminazione vialetti pedonali e aree verdi esterne (10 lux medi, conforme LR Lombardia anti-inquinamento luminoso) con gestione astronomica/biregime, cancello automatico e recupero acque meteoriche.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-FOSNOVA-LED",
        "DS-VEMER-AST"
      ],
      "docRefs": [
        {
          "suite": "Planimetrie As-Built",
          "ref": "Tavole PL.12.1 e PL.12.2",
          "scope": "Rete cavidotti interrati esterni CF/CD e pozzetti ispezionabili"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 UTENZE AREE ESTERNE",
      "shortFunc": "Segnapassi e pali LED dei vialetti/giardino (accesi al tramonto da orologio astronomico), cancello e recupero piovane.",
      "emergencyNote": "Restano funzionanti anche se scatta lo sgancio interno dell'autorimessa, illuminando i percorsi esterni."
    },
    {
      "id": "LD-POMPE-CT",
      "code": "16 POMPE + PS3",
      "label": "Parco 16 Pompe Circuiti Termici/ACS/Clima (P.01–P.09) & PS3",
      "plant": "IMP-SSC",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M2",
      "colHint": 2,
      "specs": {
        "Gruppi Pompaggio": "P.01(×4), P.02, P.03, P.04(×2), P.05(×2), P.06(×2), P.07(×2), P.08(×2), P.09(×2)",
        "Regolazione": "Comandate e monitorate da QE-REG (selettori Auto-0-Man)"
      },
      "desc": "Elettropompe elettroniche gemellari e singole in Centrale Tecnologica (-2) alimentate da QE.CT e governate dal PLC Cylon di QE-REG.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200",
        "DS-CYLON-MATRIX"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.13",
          "scope": "Elenco circuiti idronici Centrale Tecnologica"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 16 POMPE IMPIANTO CLIMA",
      "shortFunc": "Spinta dell'acqua calda, refrigerata e sanitaria dai serbatoi del Piano -2 verso i circuiti delle Torri A e B.",
      "emergencyNote": "Pompe gemellari (A+B): se una pompa si blocca, il BMS QE-REG avvia automaticamente la gemella di riserva."
    },
    {
      "id": "LD-IDRICO",
      "code": "GP1 + GP2 + IRRIG.",
      "label": "Gruppi Pressurizzazione GP1/GP2, Pre-Autoclavi & Trattamento Acqua",
      "plant": "IMP-SSC",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M1",
      "colHint": 2,
      "specs": {
        "Macchine": "2× Gruppi spinta inverter GP1/GP2 (40A Tipo B), 2× Pre-autoclavi, Antilegionella/Addolcitore"
      },
      "desc": "Impianti idrici sanitari al Piano -1 per l'alimentazione idropotabile dei 14 piani delle Torri A e B.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.14",
          "scope": "Dotazioni Centrale Idrica"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 POMPE ACQUA POTABILE",
      "shortFunc": "Gruppi autoclave ad inverter GP1 e GP2 + trattamento antilegionella per portare acqua ai rubinetti fino al 14° piano.",
      "emergencyNote": "Doppio gruppo indipendente per garantire continuità del servizio idrico sanitario."
    },
    {
      "id": "LD-FALDA",
      "code": "POZZI FALDA P.10/11",
      "label": "Pozzi Geotermici Acqua di Falda (P.10, P.11/1-2), Filtri & PS4",
      "plant": "IMP-SSC",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M2",
      "colHint": 2,
      "specs": {
        "Pozzi": "Pozzo 2 (P.10, XT1B 125A) e Pozzo 1 (P.11/1-2, XT1B 125A) modulati 0–10V da CBX1",
        "Filtrazione": "Filtri a calza 01–02 + Filtro ciclonico + Pompa meteo PS4"
      },
      "desc": "Sistema di captazione e filtrazione dell'acqua di falda al Piano -2 a servizio dello scambio termico delle pompe di calore.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-DOSSENA-DER3B",
        "DS-CYLON-CBX-FLX"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.15",
          "scope": "Utenze Locale Pompe"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 POZZI GEOTERMICI FALDA",
      "shortFunc": "Pompe sommerse nei pozzi (P.10 e P.11) e filtri autopulenti che forniscono acqua di falda alle Pompe di Calore.",
      "emergencyNote": "Modulati da 0 a 100% dal BMS in base a quante pompe di calore sono accese; protetti da sonde di livello pozzo."
    },
    {
      "id": "LD-PDC-UNITS",
      "code": "PC1 + PC2A + PC2B",
      "label": "3 Gruppi Pompe di Calore Geotermiche (48 + 91 + 91 kW)",
      "plant": "IMP-PDC",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M2",
      "colHint": 3,
      "specs": {
        "PC1 (Polivalente/ACS)": "48 kW elettr. · FLA 80A · Cavo 3×70+70N+35PE",
        "PC2A & PC2B (Clima)": "2× 91 kW elettr. · FLA 151A cad. · Cavi 3×95+95N+50PE"
      },
      "desc": "Tre macchine termiche principali in Centrale Tecnologica (-2) alimentate da QE.PC e gestite in cascata da QE-REG.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-XT",
        "DS-DOSSENA-DER3B"
      ],
      "docRefs": [
        {
          "suite": "Schemi Unifilari",
          "ref": "Tavola QEPC Fogli 1–2",
          "scope": "Potenze elettriche e dimensionamento condutture PDC"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 3 MACCHINE POMPE CALORE",
      "shortFunc": "Cuore termico dell'edificio (48 + 91 + 91 kW elettrici): usano l'acqua di falda per produrre caldo, freddo e ACS.",
      "emergencyNote": "Ciascuna macchina ha protezione differenziale Tipo B indipendente: un guasto su una non ferma le altre due."
    },
    {
      "id": "LD-ROOF-A",
      "code": "ASC.A + UTA.A + CAPPE",
      "label": "2 Ascensori, UTA Copertura & Estrattore Cappe — Torre A",
      "plant": "IMP-SCA",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_ROOF",
      "colHint": 0,
      "specs": {
        "Sollevamento": "Ascensore Dx + Ascensore Sx (FM 20A Tipo B + Luce 16A)",
        "Copertura": "UTA Torre A (80A Tipo B, cavo 5G25) + Estrattore cappe (20A Tipo B)"
      },
      "desc": "Utenze tecnologiche maggiori di sollevamento e trattamento/estrazione aria della Torre A.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200",
        "DS-DOSSENA-DER3B"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.26 – 4.28",
          "scope": "UTA, estrattori cappe e ascensori"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 ASCENSORI & TETTO (A)",
      "shortFunc": "2 Ascensori (destro e sinistro), centrale trattamento aria (UTA) ed estrattore fumi cucine sul tetto Torre A.",
      "emergencyNote": "Linee forza motrice e luce cabina ascensore separate per mantenere illuminata la cabina in caso di blocco motore."
    },
    {
      "id": "LD-SCALA-CANT-A",
      "code": "SCALA & CANTINE A",
      "label": "Vano Scala A (Finestre Motorizzate), Cantine (-2/-1/T) & Rifiuti A",
      "plant": "IMP-SCA",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M1",
      "colHint": 0,
      "specs": {
        "Vano Scala": "Luce temporizzata/permanente/EM + pulsanti interbloccati finestre motorizzate",
        "Zone Servizio": "Corridoi Cantine P.T, P.-1, P.-2 (temporizzatori IP65) + Immondezzaio A"
      },
      "desc": "Impianti di illuminazione, emergenza, prese e aerazione del corpo scala e cantine della Torre A.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-FOSNOVA-LED",
        "DS-PERRY-EM"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.8, § 4.10, § 4.16",
          "scope": "Immondezzaio, cantine e vani scala"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 SCALA & CANTINE (A)",
      "shortFunc": "Luci temporizzate vano scala A, finestre motorizzate evacuazione fumi, corridoi cantine (-2/-1/T) e locale rifiuti.",
      "emergencyNote": "Lampade di emergenza autonome da 1h lungo tutta la scala e i corridoi cantine."
    },
    {
      "id": "LD-ROOF-B",
      "code": "ASC.B + UTA.B + CAPPE",
      "label": "2 Ascensori, UTA Copertura & Estrattore Cappe — Torre B",
      "plant": "IMP-SCB",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_ROOF",
      "colHint": 5,
      "specs": {
        "Sollevamento": "Ascensore Dx + Ascensore Sx (FM 20A Tipo B + Luce 16A)",
        "Copertura": "UTA Torre B (80A Tipo B, cavo 5G25) + Estrattore cappe (20A Tipo B)"
      },
      "desc": "Utenze tecnologiche maggiori di sollevamento e trattamento/estrazione aria della Torre B.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-ABB-S200",
        "DS-DOSSENA-DER3B"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.26 – 4.28",
          "scope": "UTA, estrattori cappe e ascensori"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 ASCENSORI & TETTO (B)",
      "shortFunc": "2 Ascensori (destro e sinistro), centrale trattamento aria (UTA) ed estrattore fumi cucine sul tetto Torre B.",
      "emergencyNote": "Linee forza motrice e luce cabina separate come prescritto per gli impianti elevatori."
    },
    {
      "id": "LD-SCALA-CANT-B",
      "code": "SCALA & CANTINE B",
      "label": "Vano Scala B (Finestre Motorizzate), Cantine (-2/T) & Rifiuti B",
      "plant": "IMP-SCB",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M1",
      "colHint": 5,
      "specs": {
        "Vano Scala": "Luce temporizzata/permanente/EM + finestre motorizzate",
        "Zone Servizio": "Corridoi Cantine P.Terra e P.-2 + Immondezzaio B"
      },
      "desc": "Impianti di illuminazione, emergenza, prese e aerazione del corpo scala e cantine della Torre B.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-FOSNOVA-LED",
        "DS-PERRY-EM"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.8, § 4.10, § 4.16",
          "scope": "Immondezzaio, cantine e vani scala"
        }
      ],
      "roleType": "load",
      "roleLabel": "🎯 SCALA & CANTINE (B)",
      "shortFunc": "Luci temporizzate vano scala B, finestre motorizzate, corridoi cantine (P.Terra e -2) e locale rifiuti B.",
      "emergencyNote": "Lampade di emergenza autonome da 1h lungo tutta la scala e i corridoi cantine."
    },
    {
      "id": "LD-POMPA-VVF",
      "code": "MOTOPOMPA VVF 15kW",
      "label": "Stazione Pompaggio Antincendio (Motopompa 15 kW + Ausiliari)",
      "plant": "IMP-FIRE",
      "nodeClass": "field_subsystem",
      "tier": 2,
      "floor": "F_M2",
      "colHint": 1,
      "specs": {
        "Motopompa Principale": "15 kW 400V 3F da QE.PA (cavo FTG18OM16 4G16 mm²)",
        "Ausiliari & Allarmi": "Quadro servizi ausiliari da AVSSC (Q9) + Linea allarmi verso Portineria"
      },
      "desc": "Gruppo di spinta antincendio nel Locale Pompe (-2) con doppia alimentazione funzionale (potenza in cavo resistente al fuoco da QE.PA e ausiliari di mantenimento da AVSSC).",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [
        "DS-CAVO-FTG18",
        "DS-ABB-S200"
      ],
      "docRefs": [
        {
          "suite": "Relazione Tecnica",
          "ref": "§ 4.29",
          "scope": "Alimentazione principale, ausiliaria e ripetizione allarmi"
        }
      ],
      "roleType": "load",
      "roleLabel": "🚒 MOTOPOMPA IDRANTI 15 kW",
      "shortFunc": "Motopompa principale antincendio nel Locale Pompe (-2) che mette in pressione la rete idranti/naspi in caso di rogo.",
      "emergencyNote": "Alimentata con cavo ignifugo FTG18OM16: progettata per funzionare ad oltranza anche sotto incendio."
    },
    {
      "id": "DOC-SUITE-REL",
      "code": "RELAZIONE DM 37/08",
      "label": "Relazione Tecnica Generale & Prescrizioni Normative (Cap. 1–14)",
      "plant": "IMP-SSC",
      "nodeClass": "doc_reference",
      "tier": 3,
      "floor": "F_DOC",
      "colHint": 1,
      "specs": {
        "Struttura": "14 Capitoli tecnici (39 paragrafi descrittivi impianti + guida digitale + dimensionamento)",
        "Ambito Normativo": "DM 37/08 · CEI 64-8 (Sez. 751) · CEI 0-21 · CEI 306-2 · DPR 151/11 · DPR 462/01"
      },
      "desc": "Corpus descrittivo e prescrittivo del progetto: definisce dati contrattuali, classificazioni antincendio, gradi IP, livelli di illuminamento, infrastruttura digitale passiva FTTH/TV e criteri di verifica.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [],
      "docRefs": [],
      "roleType": "doc",
      "roleLabel": "📘 RELAZIONE TECNICA",
      "shortFunc": "Descrive dati contrattuali, regole antincendio, gradi IP, fibra FTTH e obblighi di verifica biennale.",
      "emergencyNote": ""
    },
    {
      "id": "DOC-SUITE-UNIF",
      "code": "23 UNIFILARI PROG.",
      "label": "Serie Schemi Unifilari di Progetto & Tavole Quote Installative",
      "plant": "IMP-PDC",
      "nodeClass": "doc_reference",
      "tier": 3,
      "floor": "F_DOC",
      "colHint": 2,
      "specs": {
        "Elaborati": "2 Tavole quote accessibilità + 21 Schemi Unifilari (AVSSC → QEPC, inclusi QEP.01–05)",
        "Ruolo": "Unica fonte schematica per i 32 centralini di piano QEP.01–QEP.05"
      },
      "desc": "Serie degli schemi elettrici unifilari progettuali di tutti i quadri e sottoquadri, essenziale in particolare per i quadri di piano QEP non inclusi nei fascicoli del quadrista.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [],
      "docRefs": [],
      "roleType": "doc",
      "roleLabel": "📐 UNIFILARI PROGETTO",
      "shortFunc": "Schemi elettrici progettuali di tutti i quadri, inclusi i 32 centralini di piano QEP non presenti nei quaderni quadrista.",
      "emergencyNote": ""
    },
    {
      "id": "DOC-SUITE-PLAN",
      "code": "TAVOLE PL.01–PL.13",
      "label": "Serie Planimetrie Topografiche As-Built & Schematico Generale PL.13",
      "plant": "IMP-GND",
      "nodeClass": "doc_reference",
      "tier": 3,
      "floor": "F_DOC",
      "colHint": 4,
      "specs": {
        "Elaborati": "12 Planimetrie architettoniche/impiantistiche (da P.-2 a P.Tipo) + PL.12 (Terra) + PL.13 (Albero)",
        "Scale": "1:100 (Autorimessa ed Esterni) e 1:50 (Centrali, Locali Comuni, Piani Tipo)"
      },
      "desc": "Rilievo planimetrico As-Built della posizione reale di locali tecnici, canali portacavi, 152 box, cantine, 14 pozzetti dispersori di terra e cavidotti interrati.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [],
      "docRefs": [],
      "roleType": "doc",
      "roleLabel": "🗺️ PLANIMETRIE PL.01–13",
      "shortFunc": "Mappe architettoniche As-Built di box, centrali, torri, pozzetti di terra e albero generale delle linee.",
      "emergencyNote": ""
    },
    {
      "id": "DOC-SUITE-QUAD",
      "code": "18 FASCICOLI IEC 61439",
      "label": "Fascicoli Costruttivi As-Built del Quadrista (Schemi, Morsettiere & BOM)",
      "plant": "IMP-BMS",
      "nodeClass": "doc_reference",
      "tier": 3,
      "floor": "F_DOC",
      "colHint": 3,
      "specs": {
        "Fascicoli": "18 quaderni esecutivi completi (AVSSC, QE-POR, QE.SSC, QE.CT, QE.CI, QE.LP, QE.PA, Scale A/B, PDC, QE-REG)",
        "Contenuto": "Foglio dati targa, schemi multifilari potenza/ausiliari, morsettiere X1/X2/X4/XUPS, fronte quadro e distinte"
      },
      "desc": "Documentazione costruttiva certificata CEI EN 61439-1/2 dei 18 quadri principali e sottoquadri realizzati, inclusiva del quadro di supervisione BMS QE-REG.",
      "sld": null,
      "circuits": [],
      "bom": [],
      "datasheetIds": [],
      "docRefs": [],
      "roleType": "doc",
      "roleLabel": "📒 18 FASCICOLI QUADRISTA",
      "shortFunc": "Schemi esecutivi certificati IEC 61439, morsettiere, ausiliari 24V, BMS QE-REG e distinte reali dei componenti.",
      "emergencyNote": ""
    }
  ],
  "edges": [
    {
      "id": "e01",
      "source": "POD-SSC",
      "target": "RIP-250",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "80 kW · 3×150+150N",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e02",
      "source": "RIP-250",
      "target": "AVSSC",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "3×150+150N (250A)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e03",
      "source": "AVSSC",
      "target": "QEPOR",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "Q7 C40A · 3G10",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e04",
      "source": "AVSSC",
      "target": "QESSC",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "Q2 XT3N 250A · 150/185mm²",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e05",
      "source": "QESSC",
      "target": "QECT",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "Q3 XT1B 80A · 5G16",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e06",
      "source": "QESSC",
      "target": "QECI",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "Q4 XT1B 80A · 5G16",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e07",
      "source": "QESSC",
      "target": "QELP",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 1,
      "label": "Q5 XT3N 160A [UVR] · 3×120",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e08",
      "source": "POD-SCA",
      "target": "AVSCA",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 1,
      "label": "50 kW · 3×70+70N",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e09",
      "source": "AVSCA",
      "target": "QESCA",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 1,
      "label": "Q1 XT1B 160A · 3×70+70N",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e10",
      "source": "QESCA",
      "target": "QEPL",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 1,
      "label": "Q9 4P C50A · 5G16",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e11",
      "source": "QESCA",
      "target": "QEDB",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 1,
      "label": "Q22 C25A · 3G6/10",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e12",
      "source": "QESCA",
      "target": "QEP-TORRE-A",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 1,
      "label": "Q10 4P C25A · 5G6 (16 QEP)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e13",
      "source": "POD-SCB",
      "target": "AVSCB",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 1,
      "label": "50 kW · 3×70+70N",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e14",
      "source": "AVSCB",
      "target": "QESCB",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 1,
      "label": "Q1 XT1B 160A · 3×70+70N",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e15",
      "source": "QESCB",
      "target": "QESR",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 1,
      "label": "Q22 C25A · 3G6/10",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e16",
      "source": "QESCB",
      "target": "QESP",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 1,
      "label": "Q9 4P C32A · 5G10",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e17",
      "source": "QESCB",
      "target": "QEP-TORRE-B",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 1,
      "label": "Q10 4P C25A · 5G6 (16 QEP)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e18",
      "source": "POD-PDC",
      "target": "AVPC",
      "edgeType": "power_bt",
      "plant": "IMP-PDC",
      "tier": 1,
      "label": "160 kW · 3×(2×185)+185N",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e19",
      "source": "AVPC",
      "target": "QEPC",
      "edgeType": "power_bt",
      "plant": "IMP-PDC",
      "tier": 1,
      "label": "Q1 T5N 630A · 3×(2×185)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e20",
      "source": "GEN-FV-ROOF",
      "target": "QEPC",
      "edgeType": "power_fv",
      "plant": "IMP-PDC",
      "tier": 1,
      "label": "Parallelo FV · Q5 4P C50A",
      "flowCategory": "☀️ Energia FV"
    },
    {
      "id": "e21",
      "source": "RIP-250",
      "target": "QEPA",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "A monte sgancio · FTG18 3×16",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e22",
      "source": "QESSC",
      "target": "UPS-1-EI",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Q6.11 C10A → XUPS (1kVA)",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e23",
      "source": "QESSC",
      "target": "UPS-2-SGANCIO",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Q14 C10A → UPS 2 (2kVA)",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e24",
      "source": "UPS-2-SGANCIO",
      "target": "SGANCI-VVF",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Anello 24Vac T14 fail-safe",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e25",
      "source": "SGANCI-VVF",
      "target": "QESSC",
      "edgeType": "emergency_trip",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "UVR 24Vac K1 su Q5/Q6/Q7",
      "flowCategory": "🚨 Comando Sgancio"
    },
    {
      "id": "e26",
      "source": "SGANCI-VVF",
      "target": "AVSSC",
      "edgeType": "emergency_trip",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Sgancio SOR Q1 AVSSC",
      "flowCategory": "🚨 Comando Sgancio"
    },
    {
      "id": "e27",
      "source": "SGANCI-VVF",
      "target": "AVSCA",
      "edgeType": "emergency_trip",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Sgancio SOR Scala A",
      "flowCategory": "🚨 Comando Sgancio"
    },
    {
      "id": "e28",
      "source": "SGANCI-VVF",
      "target": "AVSCB",
      "edgeType": "emergency_trip",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Sgancio SOR Scala B",
      "flowCategory": "🚨 Comando Sgancio"
    },
    {
      "id": "e29",
      "source": "SGANCI-VVF",
      "target": "AVPC",
      "edgeType": "emergency_trip",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Sgancio SOR Q1 AVPC",
      "flowCategory": "🚨 Comando Sgancio"
    },
    {
      "id": "e30",
      "source": "QESCA",
      "target": "IRA-CENTRALI",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "FM16G Centrale IRA A (*)",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e31",
      "source": "QESCB",
      "target": "IRA-CENTRALI",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "FM15L Centrale IRA B (*)",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e32",
      "source": "QEPOR",
      "target": "IRA-CENTRALI",
      "edgeType": "tlc_signal",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Q7 Pannello Allarmi PA",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e33",
      "source": "QEPA",
      "target": "IRA-CENTRALI",
      "edgeType": "tlc_signal",
      "plant": "IMP-FIRE",
      "tier": 1,
      "label": "Stato/Allarme Pompa VVF",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e34",
      "source": "QECT",
      "target": "QEREG",
      "edgeType": "power_bt",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "Q20 Alim. Supervisione",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e35",
      "source": "QEREG",
      "target": "QECT",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "Sonde ST01–19 + Pompe/Valv.",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e36",
      "source": "QEREG",
      "target": "QELP",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "BACnet MS/TP → Modulo CBX1",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e37",
      "source": "QEREG",
      "target": "QEPC",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "Modbus PDC + Allarmi X4",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e38",
      "source": "QEREG",
      "target": "QECI",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "Allarmi 1–2 Centrale Idrica",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e39",
      "source": "QEREG",
      "target": "MBUS-M-Bus",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "Supervisione Contab. / Cappe",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e40",
      "source": "QEP-TORRE-A",
      "target": "MBUS-M-Bus",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "M-Bus P.T / 7° / 10° (A)",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e41",
      "source": "QEP-TORRE-B",
      "target": "MBUS-M-Bus",
      "edgeType": "bms_bus",
      "plant": "IMP-BMS",
      "tier": 1,
      "label": "M-Bus P.T / 7° / 10° (B)",
      "flowCategory": "📡 Dati BMS"
    },
    {
      "id": "e42",
      "source": "QEPOR",
      "target": "FTTH-CSOE",
      "edgeType": "tlc_signal",
      "plant": "IMP-TLC",
      "tier": 1,
      "label": "Q9 Armadio Dati",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e43",
      "source": "QESCA",
      "target": "FTTH-CSOE",
      "edgeType": "tlc_signal",
      "plant": "IMP-TLC",
      "tier": 1,
      "label": "Q23 Apparati FTTH/TV A",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e44",
      "source": "QESCB",
      "target": "FTTH-CSOE",
      "edgeType": "tlc_signal",
      "plant": "IMP-TLC",
      "tier": 1,
      "label": "Q23 Apparati FTTH B",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e45",
      "source": "QESSC",
      "target": "VIDEOCITOFONO",
      "edgeType": "tlc_signal",
      "plant": "IMP-TLC",
      "tier": 1,
      "label": "Q11 Videocitofono Gen.",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e46",
      "source": "QEPL",
      "target": "VIDEOCITOFONO",
      "edgeType": "tlc_signal",
      "plant": "IMP-TLC",
      "tier": 1,
      "label": "Q6/R6 Soccorso Palestra",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e47",
      "source": "QESR",
      "target": "VIDEOCITOFONO",
      "edgeType": "tlc_signal",
      "plant": "IMP-TLC",
      "tier": 1,
      "label": "Q4/R4 Soccorso Riunioni",
      "flowCategory": "🔔 Segnale"
    },
    {
      "id": "e48",
      "source": "TERRA-RETE",
      "target": "QESSC",
      "edgeType": "earth_pe",
      "plant": "IMP-GND",
      "tier": 1,
      "label": "PE + SPD DEHN 941315",
      "flowCategory": "⏚ Terra / SPD"
    },
    {
      "id": "e49",
      "source": "TERRA-RETE",
      "target": "QESCA",
      "edgeType": "earth_pe",
      "plant": "IMP-GND",
      "tier": 1,
      "label": "PE + SPD DEHN 941315",
      "flowCategory": "⏚ Terra / SPD"
    },
    {
      "id": "e50",
      "source": "TERRA-RETE",
      "target": "QESCB",
      "edgeType": "earth_pe",
      "plant": "IMP-GND",
      "tier": 1,
      "label": "PE + SPD DEHN 941315",
      "flowCategory": "⏚ Terra / SPD"
    },
    {
      "id": "e51",
      "source": "TERRA-RETE",
      "target": "QEPC",
      "edgeType": "earth_pe",
      "plant": "IMP-GND",
      "tier": 1,
      "label": "PE + SPD DEHN 941315",
      "flowCategory": "⏚ Terra / SPD"
    },
    {
      "id": "e52",
      "source": "QESSC",
      "target": "LD-BOX",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q6 (Box, Corselli, Rampa, PS1/2)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e53",
      "source": "UPS-1-EI",
      "target": "LD-BOX",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 2,
      "label": "XUPS → Q7 Portoni EI",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e54",
      "source": "QESSC",
      "target": "LD-ESTERNI",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q8–Q10 Luci Vialetti/Esterni",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e55",
      "source": "QEPOR",
      "target": "LD-ESTERNI",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q8 Piovane + Q11 Astro",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e56",
      "source": "AVSSC",
      "target": "LD-ESTERNI",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q5 Cancello + Q6 Irrigaz.",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e57",
      "source": "QECT",
      "target": "LD-POMPE-CT",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q4–Q14 (16 Pompe + PS3)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e58",
      "source": "QECI",
      "target": "LD-IDRICO",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q4–Q8 (GP1, GP2, Autocl.)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e59",
      "source": "QELP",
      "target": "LD-FALDA",
      "edgeType": "power_bt",
      "plant": "IMP-SSC",
      "tier": 2,
      "label": "Q4–Q7 (Pozzi 125A + Filtri)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e60",
      "source": "QEPC",
      "target": "LD-PDC-UNITS",
      "edgeType": "power_bt",
      "plant": "IMP-PDC",
      "tier": 2,
      "label": "Q2–Q4 (48 + 91 + 91 kW)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e61",
      "source": "QESCA",
      "target": "LD-ROOF-A",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 2,
      "label": "Q2 UTA + Q4–Q8 Asc./Cappe",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e62",
      "source": "QESCA",
      "target": "LD-SCALA-CANT-A",
      "edgeType": "power_bt",
      "plant": "IMP-SCA",
      "tier": 2,
      "label": "Q12–Q21 Scala/Cantine A",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e63",
      "source": "QESCB",
      "target": "LD-ROOF-B",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 2,
      "label": "Q2 UTA + Q4–Q8 Asc./Cappe",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e64",
      "source": "QESCB",
      "target": "LD-SCALA-CANT-B",
      "edgeType": "power_bt",
      "plant": "IMP-SCB",
      "tier": 2,
      "label": "Q12–Q21 Scala/Cantine B",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e65",
      "source": "QEPA",
      "target": "LD-POMPA-VVF",
      "edgeType": "fire_resistant",
      "plant": "IMP-FIRE",
      "tier": 2,
      "label": "FTG18OM16 4G16 · 15 kW",
      "flowCategory": "🚒 Alim. Sicurezza"
    },
    {
      "id": "e66",
      "source": "AVSSC",
      "target": "LD-POMPA-VVF",
      "edgeType": "power_bt",
      "plant": "IMP-FIRE",
      "tier": 2,
      "label": "Q9 Ausiliari PA (5G10)",
      "flowCategory": "⚡ Energia"
    },
    {
      "id": "e67",
      "source": "DOC-SUITE-REL",
      "target": "QESSC",
      "edgeType": "doc_trace",
      "plant": "IMP-SSC",
      "tier": 3,
      "label": "Prescrizioni & Dati",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e68",
      "source": "DOC-SUITE-REL",
      "target": "FTTH-CSOE",
      "edgeType": "doc_trace",
      "plant": "IMP-TLC",
      "tier": 3,
      "label": "Guida Digitale Cap. 5",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e69",
      "source": "DOC-SUITE-UNIF",
      "target": "QEP-TORRE-A",
      "edgeType": "doc_trace",
      "plant": "IMP-SCA",
      "tier": 3,
      "label": "Schemi QEP.01–05",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e70",
      "source": "DOC-SUITE-UNIF",
      "target": "QEP-TORRE-B",
      "edgeType": "doc_trace",
      "plant": "IMP-SCB",
      "tier": 3,
      "label": "Schemi QEP.01–05",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e71",
      "source": "DOC-SUITE-PLAN",
      "target": "TERRA-RETE",
      "edgeType": "doc_trace",
      "plant": "IMP-GND",
      "tier": 3,
      "label": "PL.12 Dispersori & Cavidotti",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e72",
      "source": "DOC-SUITE-PLAN",
      "target": "RIP-250",
      "edgeType": "doc_trace",
      "plant": "IMP-SSC",
      "tier": 3,
      "label": "PL.13 Albero Principale",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e73",
      "source": "DOC-SUITE-QUAD",
      "target": "QEPC",
      "edgeType": "doc_trace",
      "plant": "IMP-PDC",
      "tier": 3,
      "label": "Schemi IEC 61439 & BOM",
      "flowCategory": "📄 Descrive"
    },
    {
      "id": "e74",
      "source": "DOC-SUITE-QUAD",
      "target": "QEREG",
      "edgeType": "doc_trace",
      "plant": "IMP-BMS",
      "tier": 3,
      "label": "Fascicolo BMS 22 fg.",
      "flowCategory": "📄 Descrive"
    }
  ],
  "datasheets": [
    {
      "id": "DS-ABB-XT",
      "brand": "ABB",
      "family": "SACE Tmax XT (XT1B, XT1C, XT1D, XT3N) & Tmax T5N",
      "models": [
        "XT3N 250 TMD (1SDA068070R1 / 068066R1 / 068064R1)",
        "XT3N 200 TMD (1SDA068069R1)",
        "XT1B 160 TMD (1SDA066821R1)",
        "XT1C 160 TMD (1SDA067410R1)",
        "XT1B 125 TMD (1SDA066888R1)",
        "XT1B 80 TMD (1SDA066817R1)",
        "XT1D 160 4P Sez. (1SDA068209R1)",
        "XT3D 250 4P Sez. (1SDA068211R1)",
        "T5N 630 PR221DS (1SDA054400R1)",
        "Bobine SOR 230Vac (1SDA066325R1) & UVR 24Vac (1SDA066322R1)"
      ],
      "category": "Interruttori Scatolati & Sezionatori BT",
      "usedIn": [
        "AVSSC",
        "QE.SSC",
        "QE.CT",
        "QE.CI",
        "QE.LP",
        "AVSC-A",
        "QESC-A",
        "AVSC-B",
        "QESC-B",
        "AVPC",
        "QE.PC"
      ],
      "keySpecs": "Icu 18–36 kA @ 415V · Sganciatori termomagnetici regolabili TMD (0,7–1×In) · Conformi CEI EN 60947-2 / 60947-3",
      "file": "./assets/datasheets/abb_tmax_xt_series.pdf",
      "vendorUrl": "https://new.abb.com/low-voltage/it/prodotti/interruttori-automatici/interruttori-scatolati-tmax-xt"
    },
    {
      "id": "DS-ABB-S200",
      "brand": "ABB",
      "family": "System pro M compact (S200, S200M, S200P, SN201, DS201, DDA200, F200)",
      "models": [
        "S203M K40 Solo Magnetico (S615099 — Pompa VVF)",
        "S204P C16/D20/C32/C63 15–25kA",
        "S204M C10/C16/C25/D25/D32/D40/K20 10kA",
        "DS201 C10/C16/C25 30mA & 300mA Tipo A",
        "DDA204 B APR 25A 0,3A Tipo B (B273212 — Inverter/Pompe)",
        "F204 B 40A 0,3A Tipo B (F204B40300)",
        "DDA203 A 40A 0,5A (B427977 — Pompa VVF)",
        "Bobina min. tensione S2C-UA 24Vac (A428398)"
      ],
      "category": "Protezioni Modulari DIN & Differenziali Tipo A/B",
      "usedIn": [
        "AVSSC",
        "QE.SSC",
        "QE.CT",
        "QE.CI",
        "QE.LP",
        "QE.PA",
        "QESC-A",
        "QESC-B",
        "QE.PC",
        "QE-REG"
      ],
      "keySpecs": "Potere interruzione 6–25 kA · Differenziali Tipo B per inverter trifase (rilevamento guasti DC lisci fino a 1 kHz) · Versione APR immune a scatti intempestivi",
      "file": "./assets/datasheets/abb_system_pro_m_s200.pdf",
      "vendorUrl": "https://new.abb.com/low-voltage/it/prodotti/apparecchi-modulari-din"
    },
    {
      "id": "DS-DOSSENA-DER3B",
      "brand": "DOSSENA",
      "family": "Relè Differenziali Modulari Tipo B a Doppio Toroide — Serie DER3BDUAL",
      "models": [
        "9DER3BDUAL/6D (6 mod. DIN, 48÷400Vac)",
        "9DER3BDUAL/21 (incasso 96×96 mm, 48÷400Vac)",
        "Coppie Toroidi chiusi Ø80mm (9B80+9D80), Ø110mm (9B110+9D110), Ø160mm (9B160+9D160)"
      ],
      "category": "Protezione Differenziale Tipo B (CEI EN 60947-2 All. M)",
      "usedIn": [
        "AVSSC",
        "QE.LP",
        "AVSC-A",
        "QESC-A",
        "AVSC-B",
        "QESC-B",
        "AVPC",
        "QE.PC"
      ],
      "keySpecs": "Classe B AC/A/DC (correnti differenziali alternate, pulsanti e continue pure) · Soglia regolabile IΔn 0,05÷16A · Tempo regolabile 0÷5 s · Doppio toroide (AC + DC fluxgate)",
      "file": "./assets/datasheets/dossena_der3b_dual.pdf",
      "vendorUrl": "https://www.dossena.it/"
    },
    {
      "id": "DS-DEHN-941315",
      "brand": "DEHN",
      "family": "Scaricatore Combinato Spinterometrico Tipo 1+2 — DEHNshield DSH TT 255 FM",
      "models": [
        "Art. 941 315 — DSH TT 255 FM (Circuito 3+1 per sistemi TT)"
      ],
      "category": "Protezione Sovratensioni Fulmine & Manovra (SPD)",
      "usedIn": [
        "QE.SSC",
        "QESC-A",
        "QESC-B",
        "QE.PC"
      ],
      "keySpecs": "SPD Tipo 1+2 (EN 61643-11) · Tecnologia spinterometrica RADAX Flow senza corrente susseguente · Iimp (10/350 µs) = 12,5 kA/polo (50 kA N-PE) · Up ≤ 1,5 kV · Uc = 255 Vac · Contatto teleallarme FM",
      "file": "./assets/datasheets/dehn_941315_dsh_tt_255.pdf",
      "vendorUrl": "https://www.dehn.it/"
    },
    {
      "id": "DS-CYLON-MATRIX",
      "brand": "ABB Cylon",
      "family": "ASPECT-Matrix Building Energy & BMS Supervisory Controller",
      "models": [
        "MATRIX-216 (MTX1) — Web/BACnet/Modbus Supervisory Engine"
      ],
      "category": "Supervisione BMS & Regolazione HVAC",
      "usedIn": [
        "QE-REG"
      ],
      "keySpecs": "Controllore di supervisione HTML5 integrato · 2 porte RS-485 isolate (BACnet MS/TP, Modbus RTU) + Ethernet (BACnet/IP, Modbus TCP) · Data logging, trend, schedulazione oraria e teleallarmi",
      "file": "./assets/datasheets/abb_cylon_matrix_216.pdf",
      "vendorUrl": "https://new.abb.com/buildings/smarter-building/building-automation/bms"
    },
    {
      "id": "DS-CYLON-CBX-FLX",
      "brand": "ABB Cylon",
      "family": "Controllori BACnet Serie CBX e Moduli Espansione I/O Serie FLX",
      "models": [
        "CBX-8R8 (16 punti: 8 UI + 8 UniPut Relay)",
        "FLX-8R8 (Espansione 8 UI + 8 Relay)",
        "FLX-16DI (Espansione 16 Ingressi Digitali)",
        "EXPLOREC7 / Explorer 10\" Touch HMI"
      ],
      "category": "Controllori di Campo & Moduli I/O HVAC",
      "usedIn": [
        "QE-REG",
        "QE.LP"
      ],
      "keySpecs": "Bus BACnet MS/TP nativo + FLX I/O bus locale · Gestione sonde NTC/0-10V (ST01–ST19, SP01), comandi 0-10V valvole miscelatrici/inverter pozzi e selettori Auto-0-Man integrati",
      "file": "./assets/datasheets/abb_cylon_cbx_flx_manual.pdf",
      "vendorUrl": "https://new.abb.com/products/2CQG201003R1021/cbx-8r8"
    },
    {
      "id": "DS-BTICINO-FN84",
      "brand": "BTicino",
      "family": "Interruttori Magnetotermici Modulari BTDIN60 / BTDIN45",
      "models": [
        "FN84C50 (4P C50 6kA)",
        "FN84C32 (4P C32 6kA)",
        "FN84D20 (4P D20 6kA)",
        "FA81NC40 (1P+N C40 4,5kA)",
        "FA81NC25 (1P+N C25 4,5kA)"
      ],
      "category": "Interruttori Generali Sottoquadri Locali Comuni",
      "usedIn": [
        "QE-POR",
        "QE.PL",
        "QE.01BICI",
        "QE.02RIUN",
        "QE.03POLI"
      ],
      "keySpecs": "Conformi CEI EN 60898-1 · Potere di interruzione Icn 4,5 kA (BTDIN45) e 6 kA (BTDIN60) · Curva C per carichi misti e Curva D per unità motocondensanti",
      "file": "./assets/datasheets/bticino_btdin60_fn84_mcb.pdf",
      "vendorUrl": "https://catalogo.bticino.it/"
    },
    {
      "id": "DS-BTICINO-GA8813",
      "brand": "BTicino",
      "family": "Magnetotermici Differenziali Compatti BTDIN (Tipo A, Tipo F, Tipo B)",
      "models": [
        "GA8813A16 (1P+N C16 30mA Tipo A)",
        "GA8813A10 (1P+N C10 30mA Tipo A)",
        "GA8813A6 (1P+N C6 30mA Tipo A)",
        "GN8813F16 (1P+N C16 30mA Tipo F — Pompa Piovane)",
        "GN8843A16 (4P C16 30mA Tipo A — Lavanderia)",
        "G744B40 (Blocco Diff. 4P 40A 0,3A Tipo B — Clima Palestra)"
      ],
      "category": "Protezioni Terminali Sottoquadri Civili",
      "usedIn": [
        "QE-POR",
        "QE.PL",
        "QE.01BICI",
        "QE.02RIUN",
        "QE.03POLI"
      ],
      "keySpecs": "Protezione combinata sovraccarico, cortocircuito e guasto a terra · Tipo A per elettronica monofase, Tipo F per pompe inverter monofase, Tipo B per unità esterna VRF/inverter trifase",
      "file": "./assets/datasheets/bticino_btdin_ga8813a_rcbo.pdf",
      "vendorUrl": "https://catalogo.bticino.it/"
    },
    {
      "id": "DS-BTICINO-F321N",
      "brand": "BTicino",
      "family": "Portafusibili Sezionatori Cilindrici 10×38 — Serie BTDIN F32",
      "models": [
        "F321N (1P+N 32A 500Vac per cartucce 10×38 2A gG)"
      ],
      "category": "Sezionamento & Protezione Spie / Emergenza",
      "usedIn": [
        "QE-POR",
        "QE.PL",
        "QE.01BICI",
        "QE.02RIUN",
        "QE.03POLI"
      ],
      "keySpecs": "Sezionatore portafusibile 1P+N impiegato sui circuiti di ricarica/controllo dell'illuminazione di emergenza autonoma nei centralini dei locali comuni",
      "file": "./assets/datasheets/bticino_f321n_portafusibile.pdf",
      "vendorUrl": "https://catalogo.bticino.it/"
    },
    {
      "id": "DS-BTICINO-FT1A",
      "brand": "BTicino",
      "family": "Contattori Modulari Giorno/Notte — Serie FT",
      "models": [
        "FT1A1N230M (1NO 25A bobina 230Vac con selettore manuale)"
      ],
      "category": "Comando Potenza Illuminazione Esterna",
      "usedIn": [
        "QE-POR"
      ],
      "keySpecs": "Contattore modulare 25A comandato dall'interruttore crepuscolare astronomico Vemer ASTLINE per l'accensione automatica delle luci esterne portineria",
      "file": "./assets/datasheets/bticino_ft1a_contattore.pdf",
      "vendorUrl": "https://catalogo.bticino.it/"
    },
    {
      "id": "DS-FINDER-1311",
      "brand": "Finder",
      "family": "Relè di Chiamata con Comando di Reset — Serie 13.11",
      "models": [
        "13.11.8.230.0000 (1 modulo DIN, 230Vac, 1 scambio 12A con Set/Reset)"
      ],
      "category": "Sicurezza Bagni & Docce Accessibili Disabili",
      "usedIn": [
        "QE.PL",
        "QE.02RIUN"
      ],
      "keySpecs": "Relè bistabile elettronico dedicato agli impianti di chiamata di soccorso WC e doccia disabili: memorizza la tirata del cordone fino alla pressione del pulsante locale di reset",
      "file": "./assets/datasheets/finder_serie_13_chiamata.pdf",
      "vendorUrl": "https://www.findernet.com/it/italia/series/serie-13-rele-passo-passo-elettronici-e-modulari/"
    },
    {
      "id": "DS-VEMER-AST",
      "brand": "Vemer",
      "family": "Interruttori Astronomici e Strumentazione DIN (ASTLINE, MEMO DW, EV3M-4DIN)",
      "models": [
        "VE344800 (ASTLINE / Memo AST1 — Interruttore Astronomico NFC)",
        "VE513800 (MEMO DW — Orologio Digitale Settimanale Biregime)",
        "VE333100 (EV3M-4DIN — Multimetro Trifase su TA IME 150/250/600A)"
      ],
      "category": "Gestione Oraria Luci & Misura Energia",
      "usedIn": [
        "QE-POR",
        "QE.SSC",
        "QESC-A",
        "QESC-B",
        "QE.PC"
      ],
      "keySpecs": "Calcolo automatico alba/tramonto sulle coordinate geografiche locali per luci esterne, rampa e percorsi pedonali + commutazione notturna biregime + misura V/I/P/Q/E sui 4 quadri principali",
      "file": "./assets/datasheets/vemer_ve344800_astline.pdf",
      "vendorUrl": "https://www.vemer.it/"
    },
    {
      "id": "DS-CAVO-FTG18",
      "brand": "Prysmian / CEI 20-45",
      "family": "Cavo Resistente al Fuoco FTG18(O)M16 0,6/1 kV (Afumex RF-Gold)",
      "models": [
        "FTG18OM16 3×16 mm² (Ripartitore → QEPA)",
        "FTG18OM16 4G16 mm² (QEPA → Motopompa Antincendio 15 kW)"
      ],
      "category": "Condutture di Sicurezza Antincendio",
      "usedIn": [
        "RIP-250",
        "QEPA",
        "LD-POMPA-VVF"
      ],
      "keySpecs": "Barriera ignifuga in nastro vetro-mica + isolamento G18 + guaina LSZH M16 azzurra · Classe CPR B2ca-s1a,d1,a1 · Continuità di servizio sotto incendio PH120 (120 min EN 50200)",
      "file": "./assets/datasheets/cavo_ftg18om16_antincendio.pdf",
      "vendorUrl": "https://it.prysmian.com/"
    },
    {
      "id": "DS-CAVO-FG16",
      "brand": "General Cavi / CEI UNEL 35324",
      "family": "Cavi Energia CPR a Bassissima Emissione Fumi FG16(O)M16 0,6/1 kV & FG17",
      "models": [
        "FG16OM16 unipolari/multipolari da 3G1,5 fino a 2×185 mm²/fase",
        "Conduttori unipolari FG17 450/750V Cca per posa in tubo",
        "Cablaggi interni quadri FS17"
      ],
      "category": "Condutture Distribuzione Principale e Terminale",
      "usedIn": [
        "AVSSC",
        "QE.SSC",
        "QESC-A",
        "QESC-B",
        "AVPC",
        "QE.PC",
        "QECT",
        "QECI",
        "QELP"
      ],
      "keySpecs": "Classe di reazione al fuoco CPR Cca-s1b,d1,a1 obbligatoria per ambienti a maggior rischio in caso d'incendio (Autorimessa DPR 151 att. 75 e Torri >32m att. 77) · Guaina verde LSZH",
      "file": "./assets/datasheets/cavo_fg16om16_cpr_cca.pdf",
      "vendorUrl": "https://www.generalcavi.com/"
    },
    {
      "id": "DS-FOSNOVA-LED",
      "brand": "Fosnova / Disano · Ideal Lux · Lombardo · Arcluce",
      "family": "Apparecchi di Illuminazione Ordinaria LED 4000K Interni ed Esterni",
      "models": [
        "Fosnova Slim Lex 3 (18W IP44 incasso + versione EM 1h)",
        "Fosnova Slim Lex 5 (18W IP40 + EM 1h) & Pastilla (15W IP65)",
        "Ideal Lux Zita LED IP67 (26W / 19,5W / 17W + EM 1h — Box/Centrali)",
        "Arcluce Visual LED 36W · Gewiss Tonda ES 180",
        "Lombardo Tag 210 (25W), Tok Q H1000 (14W), Art 100 (10W) IP66 — Esterni"
      ],
      "category": "Illuminazione Ordinaria e Anti-Inquinamento Luminoso",
      "usedIn": [
        "LD-BOX",
        "LD-ESTERNI",
        "QEP-TORRE-A",
        "QEP-TORRE-B",
        "QEPL",
        "QESR",
        "QESP"
      ],
      "keySpecs": "Temperatura colore neutra 4000K · IP67 stagno in autorimessa/centrali · Ottiche esterne conformi LR Lombardia 17/2000 e 31/2015 contro l'inquinamento luminoso",
      "file": "./assets/datasheets/fosnova_slim_lex_led.pdf",
      "vendorUrl": "https://www.disano.it/"
    },
    {
      "id": "DS-PERRY-EM",
      "brand": "Perry Electric",
      "family": "Apparecchi Autonomi Illuminazione di Emergenza LED con Autotest",
      "models": [
        "Perry Serie GS 1LE GA300L (SE Non Permanente, 310 lm, IP44, Autonomia 1h, Ricarica 24h)"
      ],
      "category": "Illuminazione di Sicurezza Vie di Esodo (UNI EN 1838)",
      "usedIn": [
        "LD-BOX",
        "QEPOR",
        "QEPL",
        "QEDB",
        "QESR",
        "QESP",
        "QEP-TORRE-A",
        "QEP-TORRE-B"
      ],
      "keySpecs": "Sistema di autodiagnosi automatica periodica efficienza batteria e sorgente LED · Garantisce 2–5 lux medi lungo tutte le vie di esodo, scale, filtri aerati e corselli",
      "file": "./assets/datasheets/perry_1le_ga300l_emergenza.pdf",
      "vendorUrl": "https://www.perry.it/"
    },
    {
      "id": "DS-BTICINO-VDP",
      "brand": "BTicino / Guida CEI 306-2",
      "family": "Videocitofonia Digitale 2 Fili & Infrastruttura Multiservizio FTTH/TV",
      "models": [
        "3 Posti Esterni Audio/Video (Portineria, Torre A, Torre B) + Serrature",
        "CSOE + ROE Operatori + STOM Copertura + QDSA/STOA Appartamenti"
      ],
      "category": "Comunicazioni Elettroniche & Controllo Accessi",
      "usedIn": [
        "VIDEOCITOFONO",
        "FTTH-CSOE"
      ],
      "keySpecs": "Architettura conforme Legge 164/14 (art. 135-bis DPR 380/01 'Edificio predisposto alla banda ultra larga') e Guide CEI 306-2 / CEI 64-100/1-2-3",
      "file": "./assets/datasheets/bticino_videocitofonia_classe300.pdf",
      "vendorUrl": "https://professionisti.bticino.it/"
    }
  ],
  "inconsistencies": [
    {
      "id": "INC-01",
      "severity": "critica",
      "category": "Sicurezza Antincendio / Condutture",
      "title": "Tipo cavo Pompa Antincendio: FG16 invece di FTG18OM16 sullo schema quadrista QE.PA (+ disallineamento PH90 vs PH120)",
      "affectedNodes": [
        "QEPA",
        "RIP-250",
        "LD-POMPA-VVF"
      ],
      "finding": "La Relazione Tecnica (§4.4 e §6.3) e lo Schema Unifilare di progetto prescrivono obbligatoriamente cavo resistente al fuoco FTG18OM16 (3×16 mm² in ingresso e 4G16 mm² verso la motopompa da 15 kW). Nello schema esecutivo del quadrista (fascicolo QE.PA, foglio 3) la riga cavo riporta invece 'FG16 3×16' e 'FG16 4G16' (cavo ordinario Cca non resistente al fuoco). Inoltre la Relazione §6.3 richiede resistenza al fuoco 120 minuti (PH120/F120), mentre la nota sull'unifilare QEPA foglio 2 indica 90 minuti.",
      "impact": "Rischio documentale/ispettivo in sede di rinnovo CPI/SCIA VVF (DPR 151/11). È opportuno verificare visivamente in cavedio/locale pompe la guaina azzurra e la stampigliatura FTG18OM16 sui cavi reali, trattando la dicitura sullo schema quadrista come refuso grafico.",
      "verdict": "Refuso nella tabella cavi del quadrista + lieve disallineamento prestazionale (90' vs 120') tra tavola unifilare e relazione."
    },
    {
      "id": "INC-02",
      "severity": "alta",
      "category": "Architettura Sgancio VVF",
      "title": "Servizi Ausiliari e Ripetizione Allarmi Pompe Antincendio derivati A VALLE dello sgancio di AVSSC",
      "affectedNodes": [
        "AVSSC",
        "QEPOR",
        "QEPA",
        "LD-POMPA-VVF",
        "IRA-CENTRALI"
      ],
      "finding": "Mentre la motopompa principale antincendio (QE.PA) è correttamente attestata a monte di AVSSC sul Ripartitore da 250A, l'interruttore Q9 di AVSSC ('Quadro Servizi Ausiliari Pompe Antincendio', 4P 32A) e il quadro QEPOR (che con Q7 alimenta il 'Quadro Ripetizione Allarmi Pompe Antincendio' in Portineria) sono derivati a valle dell'interruttore generale Q1 di AVSSC.",
      "impact": "Se viene azionato lo sgancio generale su Q1 di AVSSC, la motopompa principale mantiene l'alimentazione di potenza, ma i servizi ausiliari del gruppo antincendio e il pannello di ripetizione allarmi in portineria perdono l'alimentazione di rete, restando dipendenti dalle sole batterie tampone a bordo quadro.",
      "verdict": "Scelta progettuale da conoscere in esercizio: verificare periodicamente l'efficienza delle batterie tampone del pannello allarmi PA e del quadro ausiliari."
    },
    {
      "id": "INC-03",
      "severity": "alta",
      "category": "Completezza Quadri Scale A e B",
      "title": "Linee Centrali Rivelazione Incendi (FM16G / FM15L) presenti in Relazione e PL.13 ma assenti negli schemi costruttivi QESC-A e QESC-B",
      "affectedNodes": [
        "QESCA",
        "QESCB",
        "IRA-CENTRALI"
      ],
      "finding": "Sia la Relazione (§4.30) sia lo Schematico Generale As-Built PL.13 elencano esplicitamente il circuito FM16G in QESC-A e il circuito FM15L in QESC-B per alimentare le Centrali di Rivelazione ed Allarme Incendio delle due torri (>32 m). Tuttavia, nei fascicoli costruttivi del quadrista (30-05-23_QESC-A e 31-05-23_QESC-B) tali partenze non compaiono: entrambi i quadri terminano con Q26 (Locali Comuni), Q27 (Luce Esterna) e Q28 (Scorta C10A 30mA).",
      "impact": "Possibile utilizzo in cantiere dell'interruttore Q28 'Scorta' senza aggiornamento della targhetta/schema del quadrista, oppure attestazione su altro punto. Inoltre, una centrale IRA secondo UNI 9795 richiede un circuito dedicato chiaramente identificato e preferibilmente non protetto da differenziale da 30 mA soggetto a scatti intempestivi.",
      "verdict": "Incoerenza tra elaborato generale d'impianto (ottobre 2023) e schemi costruttivi dei quadri scala (maggio 2023)."
    },
    {
      "id": "INC-04",
      "severity": "alta",
      "category": "Interfaccia Generazione Fotovoltaica",
      "title": "Interruttore Fotovoltaico Q5 in QE.PC privo di bobina di sgancio definita e coordinamento di isolamento in emergenza",
      "affectedNodes": [
        "QEPC",
        "GEN-FV-ROOF",
        "AVPC"
      ],
      "finding": "Nello schema unifilare di progetto QEPC era presente una nota sospensiva ('Tipologia bobina di apertura e alimentazione circuito di sgancio da definire con progettista impianto FV'). Nello schema costruttivo As-Built del quadrista (14-03-23_QE.PC, foglio 6), l'interruttore Q5 dell'impianto fotovoltaico (ABB S204M C50A 10kA) risulta installato senza bobina di apertura né blocco differenziale.",
      "impact": "In caso di sgancio di emergenza su AVPC, l'inverter FV cessa l'erogazione per perdita rete (protezione d'interfaccia CEI 0-21), ma il montante dal tetto al piano -2 rimane potenzialmente in tensione lato inverter/DC salvo presenza di uno sgancio dedicato nel pacchetto documentale separato dell'impianto FV.",
      "verdict": "Confine di fornitura tra progetto parti comuni e fornitura specialistica FV da verificare nella documentazione specifica del generatore solare."
    },
    {
      "id": "INC-05",
      "severity": "media",
      "category": "Selettività Sgancio Autorimessa (Scoperta Positiva vs Lettura Superficiale)",
      "title": "Architettura reale dello Sgancio Autorimessa tramite bobine di minima tensione 24Vac (K1 su Q5, Q6, Q7 in QE.SSC)",
      "affectedNodes": [
        "UPS-2-SGANCIO",
        "SGANCI-VVF",
        "QESSC",
        "QELP",
        "UPS-1-EI",
        "LD-BOX"
      ],
      "finding": "Dalla sola lettura sintetica della Relazione sembrerebbe che il pulsante autorimessa sganci l'intera fornitura supercondominiale. Lo schema multifilare di QE.SSC (fogli 11 e 16) rivela invece una logica molto più raffinata: UPS 2 (2000VA) alimenta un trasformatore 230/24Vac (63VA) che mantiene eccitato il relè di sicurezza K1; l'apertura del pulsante sgancia per minima tensione (24VEM, fail-safe) esclusivamente Q5 (Locale Pompe -2), Q6 (Generale Autorimessa 63A) e Q7 (uscita UPS 1 Portoni Tagliafuoco, consentendone la chiusura).",
      "impact": "Comprendere questa logica evita errori diagnostici gravi: una mancanza di tensione o guasto a UPS 2 / fusibili F14-F3 fa intervenire le bobine di minima tensione aprendo Q5, Q6 e Q7 anche senza incendio, mentre mantiene attive Centrale Tecnologica (Q3) e Centrale Idrica (Q4)!",
      "verdict": "Scelta ingegneristica fail-safe corretta ma non spiegata testualmente in Relazione: essenziale conoscerla per la manutenzione."
    },
    {
      "id": "INC-06",
      "severity": "media",
      "category": " Coordinamento Portate & Sezioni Cavi",
      "title": "Disallineamento sezioni montanti su AVSSC ↔ QE.SSC e portata dichiarata 100A su QE.CT / QE.CI con linea 5G16 mm²",
      "affectedNodes": [
        "AVSSC",
        "QESSC",
        "QECT",
        "QECI"
      ],
      "finding": "1) Il montante principale tra AVSSC (Q2, 250A) e QE.SSC è indicato come '3×(1×150)+1×150N+1×75PE' nello schema di AVSSC (p.173), ma diventa '3×(1×185)+1×185N+1×95PE' nello schema di ingresso di QE.SSC (p.188). 2) I quadri QE.CT e QE.CI dichiarano nel Foglio Dati In = 100A con sezionatore generale da 160A, ma in QE.SSC (p.189) sono alimentati tramite cavi FG16OM16 5G16 mm² protetti da interruttori XT1B 80A (regolazione 56–80A).",
      "impact": "Affinché il cavo multipolare 5G16 mm² sia correttamente protetto dal sovraccarico (Ib ≤ In ≤ Iz), la soglia termica di Q3 e Q4 in QE.SSC deve essere tarata verso il minimo (56–63A), rendendo il limite reale disponibile per ciascuna centrale pari a ~40 kW anziché i 100A nominali di carpenteria.",
      "verdict": "Discrepanza documentale tra schemi quadrista emessi in mesi diversi (marzo/aprile/giugno 2023) e margine termico stretto sui cavi 5G16."
    },
    {
      "id": "INC-07",
      "severity": "media",
      "category": " Coordinamento Documentale BMS",
      "title": "Quadro di Regolazione QE-REG (22 pagine) assente dagli elenchi della Relazione e di PL.13 + nomenclatura disallineata pompe/PDC",
      "affectedNodes": [
        "QEREG",
        "QECT",
        "QELP",
        "QEPC"
      ],
      "finding": "Il fascicolo costruttivo 08-02-23_QE-REG (commessa M-Bus BMS-CT) documenta un intero armadio H1800mm (PLC ABB Cylon MATRIX-216, espansioni CBX/FLX, Touch Explorer, Router 4G), oltre a un modulo remoto CBX-8R8 dentro QE.LP. Tuttavia QE-REG non è citato né nell'elenco disegni (§3) né nell'elenco quadri (§4.1) della Relazione Tecnica, comparendo in QE.CT solo come carico 'Q20 Centralina Supervisione 10A' (mentre QE-REG monta un generale Q1 da 16A). Inoltre QE.LP chiama le pompe pozzo 'P.10 e P.11/1-2' nella sezione potenza e 'P11A, P11B, P11C' nella sezione Cylon.",
      "impact": "Senza una mappa unificata come questo grafo, chi consulta la Relazione o PL.13 ignora l'esistenza dell'architettura BACnet/Modbus che governa tutte le centrali.",
      "verdict": " Integrazione postuma di uno schema specialistico del fornitore termotecnico (Sistema M-Bus Termico) nel plico elettrico generale."
    },
    {
      "id": "INC-08",
      "severity": "bassa",
      "category": "Corrispondenza Sottoquadri Locali Comuni",
      "title": "Linea Lavatrice (FM6N) mancante nello schema quadrista di QE.03POLIFUNZ + refusi di copia-incolla nelle intestazioni",
      "affectedNodes": [
        "QESP",
        "QESR",
        "QESCB"
      ],
      "finding": "In PL.13 e Relazione §4.22 lo Spazio Polifunzionale prevede sia la presa CEE lavanderia (FM2N) sia la linea Lavatrice (FM6N), ma nello schema quadrista 42-06-23_QE.03POLIFUNZ manca la linea Lavatrice (c'è solo una Scorta Q7 da 10A). Inoltre si rilevano tre refusi di copia-incolla nei cartigli del quadrista: QESC-B indica 'Ingresso da AVSC-A' anziché AVSC-B; QE.02RIUNIONI indica 'Quad. Scala A QESC-B' e rif. 'QE.03'; QE.03POLIFUNZ indica 'QE0.3' e rif. 'QE.04'.",
      "impact": "Nessun impatto funzionale immediato, ma genera confusione nella ricerca incrociata tra tavole di progetto (QEDB, QESR, QESP) e targhe dei quadri installati (QE.01, QE.02, QE0.3).",
      "verdict": "Refusi tipografici del quadrista ora completamente riconciliati nella tabella di corrispondenza del minisito."
    },
    {
      "id": "INC-09",
      "severity": "bassa",
      "category": "Montanti Scale & Quadri di Piano",
      "title": "32 Quadri di Piano (QEP.01–05) privi di fascicolo quadrista e alimentati in entra-esci da un'unica linea 4P 25A (5G6 mm²) per torre",
      "affectedNodes": [
        "QEP-TORRE-A",
        "QEP-TORRE-B",
        "QESCA",
        "QESCB"
      ],
      "finding": "Ciascuna torre (16 quadri QEP da P.Terra al 14° piano, ciascuno con DG 1P+N 25A) è alimentata da un singolo interruttore tetrapolare Q10 da 25A in QESC-A / QESC-B (cavo 5G6 mm² ripartito sulle 3 fasi lungo il montante, senza differenziale alla base). I 32 centralini QEP sono documentati solo negli unifilari di progetto (p.147–152) e non nei fascicoli costruttivi del quadrista; per il 14° piano (QEP.05) PL.13 indica il circuito 'Automazioni', mentre l'unifilare p.152 riporta una partenza generica 10A.",
      "impact": "Assenza di selettività amperometrica tra il DG da 25A del singolo QEP di piano e l'interruttore generale montante da 25A alla base della torre in caso di forte sovraccarico/cortocircuito; l'assenza di differenziale alla base richiede che l'intera conduttura montante 5G6 mantenga i requisiti di doppio isolamento (classe II) negli ambienti a maggior rischio d'incendio (>32 m, CEI 64-8/751).",
      "verdict": "Aspetto strutturale tipico dei servizi di pianerottolo (carico contemporaneo reale molto basso, ~2–4 kW per torre)."
    },
    {
      "id": "INC-10",
      "severity": "info",
      "category": " Chiarimento Apparente Anomalia (Falso Positivo Risolto)",
      "title": "Salto numerazione interruttori Q16–Q17 in QESC-B (assenza Cantine Piano -1 Torre B)",
      "affectedNodes": [
        "QESCB",
        "LD-SCALA-CANT-B"
      ],
      "finding": "Nello schema QESC-B la numerazione salta direttamente da Q15 (Cantine P.Terra) a Q18 (Cantine P.-2), omettendo Q16 e Q17 presenti invece in QESC-A. La verifica incrociata sulle planimetrie PL.02 e PL.04 dimostra che NON si tratta di una dimenticanza: al Piano -1 sotto la Torre B non esistono cantine (ci sono solo box, Locale Contatori B e Immondezzaio B), mentre le cantine Torre B sono collocate al Piano -2 e al Piano Terra.",
      "impact": "Il progettista/quadrista ha intenzionalmente lasciato vacanti le sigle Q16–Q17 in QESC-B per mantenere l'identica numerazione funzionale (Q18–Q28) tra i quadri gemelli delle Torri A e B.",
      "verdict": "Coerenza sostanziale confermata dalle planimetrie architettoniche."
    }
  ]
};
