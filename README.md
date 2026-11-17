# Schema Interattivo Impianti Elettrici e Speciali (Parti Comuni)

Applicazione web interattiva per esplorare l'architettura funzionale, i quadri elettrici, i flussi energetici/informativi e le schede tecniche dei componenti degli impianti comuni di un complesso residenziale plurifamiliare a due torri.

## Caratteristiche principali

- **9 Viste dedicate**: panoramica simmetrica *Ingressi & Contatori* + 8 sottosistemi (*Supercondominio*, *Torre A*, *Torre B*, *Pompe di Calore & Fotovoltaico*, *Sicurezza Antincendio & UPS*, *Automazione BMS*, *Multiservizio FTTH/TV & Videocitofonia*, *Rete di Terra*).
- **Doppia modalità di consultazione**:
  - **Tavola Sinottica**: schema statico a fasce funzionali orizzontali con connettori distanziati e dorsali ortogonali raccordate.
  - **Grafo Dinamico (`Cytoscape.js`)**: 4 motori di layout (`ELK`, `Cola`, `fCoSE`, `Dagre`), raggruppamenti flessibili e ribilanciamento elastico continuo attivabile/disattivabile durante il trascinamento manuale.
- **Esplorazione interna di 2° livello (`Dentro il Quadro`)**: apertura dello schema elettrico funzionale del singolo quadro con sezionatore generale, sbarra, protezioni differenziali, scaricatori SPD, strumenti di misura e partenze.
- **Atlante e 18 Pagine Dedicate ai Pannelli Fisici (`pannelli/`)**: ricostruzione interattiva del *Fronte Quadro* e della carpenteria reale per tutti i 18 quadri elettrici con fascicolo costruttivo (`AVSSC`, `QE-POR`, `QE.SSC`, `QE.CT`, `QE.CI`, `QE.LP`, `QE.PA`, `AVSC-A`, `QESC-A`, `QE.PL`, `QE.01BICI`, `AVSC-B`, `QESC-B`, `QE.02RIUNIONI`, `QE.03POLIFUNZ`, `AVPC`, `QE.PC`, `QE-REG`), con ubicazione fisica nell'edificio, disposizione per colonne e guide DIN, dettaglio di cosa comanda ogni interruttore (`223` organi di manovra/protezione) e cosa protegge ogni fusibile (`52` portafusibili), simulazione sgancio VVF e navigazione bidirezionale con le mappe d'impianto.
- **Planimetrie Architettoniche & Localizzatore Fisico (`planimetrie/`)**: piante rigenerate da zero per tutti i livelli dell'edificio (*Piano Terra*, *Piano Rialzato Torri A/B*, *Piano -1*, *Piano -2*, *Piani Tipo 1°–14° & Copertura*) con stralci in scala `1:50` dei locali tecnici, istruzioni passo-passo su come raggiungere ogni quadro/parete e localizzazione diretta fin sul singolo interruttore o portafusibile (`?panel=qe-ssc&comp=F3`).
- **Flussi animati accessibili**: forme distinte orientate a velocità lineare costante e codifica cromatica legata esclusivamente alla tipologia fisica di energia o segnale trasferito, con simulazione **Esercizio Normale** vs **Sgancio VVF / Scarica a Terra**.
- **Libreria tecnica integrata**: 17 schede tecniche PDF pubbliche dei produttori e registro dei rilievi di verifica documentale.
- **Modalità Ricerca Guasto (`🛠️ Ricerca Guasto`)**: selezionando qualsiasi utenza o quadro non funzionante (su PC o smartphone), evidenzia automaticamente lungo l'intera catena a monte tutti gli **interruttori (`🛡️`)** e i **fusibili (`🧨`)** che potrebbero essere aperti (con link diretto alla posizione esatta sul *Fronte Quadro Fisico*) e permette di restringere la causa per esclusione indicando se altre utenze risultano ferme o funzionanti.
- **Fallback essenziale per smartphone**: aprendo il sito da telefono viene mostrata automaticamente una guida tascabile priva di grafi (ricerca rapida sigle/interruttori, consultazione per impianto o per locale fisico, navigazione testuale *a monte / a valle*, schede PDF e rilievi), mantenendo invariata l'esperienza completa su PC.

## Avvio locale

Qualsiasi server statico HTTP nella cartella radice del progetto, ad esempio:

```bash
python -m http.server 8765
```
