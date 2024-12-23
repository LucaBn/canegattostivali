import { RUN_TEST } from "./app";
import { runWordListTest } from "@/test/wordListTest";

type Word = {
  word: string;
  nextWordList: string[];
};

type WordList = Word[];

const WORD_LIST: WordList = [
  {
    word: "GATTO",
    nextWordList: [
      "CODA",
      "NERO",
      "BAFFI",
      "CANE",
      "STIVALI",
      "FELINO",
      "RAZZA",
      "VOLPE",
      "ZAMPA",
      "STREGA",
    ],
  },
  {
    word: "CODA",
    nextWordList: ["GATTO", "SERPENTE", "CANE", "FILA", "CAPELLI", "CAVALLO"],
  },
  {
    word: "BAFFI",
    nextWordList: ["GATTO", "MANUBRIO", "LECCARSI", "BARBA"],
  },
  {
    word: "CANE",
    nextWordList: [
      "GATTO",
      "CODA",
      "OSSO",
      "FEDELE",
      "RAZZA",
      "RIPORTO",
      "ZAMPA",
      "LUPO",
    ],
  },
  {
    word: "STIVALI",
    nextWordList: [
      "GATTO",
      "PELLE",
      "PIOGGIA",
      "COWBOY",
      "NEVE",
      "LAVORO",
      "PESCA",
    ],
  },
  {
    word: "FELINO",
    nextWordList: ["GATTO", "TIGRE", "LEONE", "SALAME"],
  },
  {
    word: "RAZZA",
    nextWordList: ["GATTO", "CANE", "PURA", "UMANA"],
  },
  {
    word: "VOLPE",
    nextWordList: ["GATTO", "ROSSA", "BIANCA", "DESERTO", "FURBA"],
  },
  {
    word: "SERPENTE",
    nextWordList: ["CODA", "BOA", "MUTA", "CORALLO"],
  },
  {
    word: "FILA",
    nextWordList: ["CODA", "INDIANA", "PRIMA", "ULTIMA"],
  },
  {
    word: "CAPELLI",
    nextWordList: [
      "CODA",
      "LUNGHI",
      "CORTI",
      "TAGLIO",
      "BARBA",
      "RIPORTO",
      "TINTA",
    ],
  },
  {
    word: "CAVALLO",
    nextWordList: ["CODA", "COWBOY", "SELLA", "SELVATICO"],
  },
  {
    word: "MANUBRIO",
    nextWordList: ["BAFFI", "BICICLETTA", "PESI"],
  },
  {
    word: "LECCARSI",
    nextWordList: ["BAFFI", "DITA", "LABBRA", "FERITE"],
  },
  {
    word: "BARBA",
    nextWordList: ["BAFFI", "CAPELLI", "NOIA"],
  },
  {
    word: "OSSO",
    nextWordList: ["CANE", "SCHELETRO", "SACRO", "TEMPORALE", "MARTELLO"],
  },
  {
    word: "FEDELE",
    nextWordList: ["CANE", "COMPAGNO", "CREDENTE"],
  },
  {
    word: "RIPORTO",
    nextWordList: ["CANE", "CAPELLI"],
  },
  {
    word: "PELLE",
    nextWordList: [
      "STIVALI",
      "GIACCA",
      "CREMA",
      "SECCA",
      "MORBIDA",
      "OCA",
      "BIANCA",
      "NERA",
    ],
  },
  {
    word: "PIOGGIA",
    nextWordList: ["STIVALI", "TEMPORALE", "ACIDA", "GOCCIA", "BATTENTE"],
  },
  {
    word: "COWBOY",
    nextWordList: ["STIVALI", "CAVALLO", "CAPPELLO", "GIACCA", "PISTOLA"],
  },
  {
    word: "NEVE",
    nextWordList: [
      "STIVALI",
      "MONTAGNA",
      "FIOCCO",
      "BIANCA",
      "PALLA",
      "PUPAZZO",
      "TEMPESTA",
      "GOMME",
    ],
  },
  {
    word: "LAVORO",
    nextWordList: [
      "STIVALI",
      "FORZA",
      "AGILE",
      "REMOTO",
      "UFFICIO",
      "CONTRATTO",
      "ORARIO",
    ],
  },
  {
    word: "PESCA",
    nextWordList: ["STIVALI", "FRUTTO", "CANNA", "RETE", "FRUTTA"],
  },
  {
    word: "TIGRE",
    nextWordList: ["FELINO", "UOMO", "STRISCE", "SQUALO", "ZANZARA", "OCCHIO"],
  },
  {
    word: "LEONE",
    nextWordList: ["FELINO", "RE", "MARINO", "PAPA", "MONTAGNA"],
  },
  {
    word: "SALAME",
    nextWordList: ["FELINO", "CIOCCOLATO", "FETTA", "PANINO"],
  },
  {
    word: "PURA",
    nextWordList: ["RAZZA", "ACQUA", "MATEMATICA", "ARIA"],
  },
  {
    word: "UMANA",
    nextWordList: ["RAZZA", "TORCIA"],
  },
  {
    word: "ROSSA",
    nextWordList: ["VOLPE", "MELA", "CROCE", "LUNA", "BIRRA", "CARNE"],
  },
  {
    word: "BIANCA",
    nextWordList: [
      "VOLPE",
      "NEVE",
      "PIZZA",
      "LUCE",
      "VOCE",
      "PELLE",
      "CASA",
      "NOTTE",
      "PAGINA",
      "CARNE",
    ],
  },
  {
    word: "DESERTO",
    nextWordList: ["VOLPE", "DUNA", "SABBIA", "OASI", "CACTUS", "ROSA"],
  },
  {
    word: "FURBA",
    nextWordList: ["VOLPE", "FAINA"],
  },
  {
    word: "BOA",
    nextWordList: ["SERPENTE", "MARE", "ACQUA"],
  },
  {
    word: "MUTA",
    nextWordList: ["SERPENTE", "ZITTA", "SUB", "NUOTO"],
  },
  {
    word: "CORALLO",
    nextWordList: ["SERPENTE", "NOZZE", "COLLANA"],
  },
  {
    word: "INDIANA",
    nextWordList: ["FILA", "TRIBU"],
  },
  {
    word: "PRIMA",
    nextWordList: ["FILA", "CLASSE", "DONNA", "PAGINA", "SERATA", "VOLTA"],
  },
  {
    word: "ULTIMA",
    nextWordList: ["FILA", "CENA", "VOLTA", "ORA", "SPIAGGIA"],
  },
  {
    word: "LUNGHI",
    nextWordList: ["CAPELLI", "COLTELLI"],
  },
  {
    word: "CORTI",
    nextWordList: ["CAPELLI", "PANTALONI"],
  },
  {
    word: "TAGLIO",
    nextWordList: ["CAPELLI"],
  },
  {
    word: "SELLA",
    nextWordList: ["CAVALLO"],
  },
  {
    word: "SELVATICO",
    nextWordList: ["CAVALLO"],
  },
  {
    word: "BICICLETTA",
    nextWordList: ["MANUBRIO"],
  },
  {
    word: "PESI",
    nextWordList: ["MANUBRIO", "MISURE", "PALESTRA"],
  },
  {
    word: "PALESTRA",
    nextWordList: ["PESI", "CORSO", "BORSA", "DOCCIA"],
  },
  {
    word: "CORSO",
    nextWordList: ["PALESTRA", "STUDIO", "FIUME"],
  },
  {
    word: "STUDIO",
    nextWordList: ["CORSO", "UFFICIO", "MEDICO", "CASO", "BORSA"],
  },
  {
    word: "CASO",
    nextWordList: ["STUDIO", "UNICO"],
  },
  {
    word: "MEDICO",
    nextWordList: ["STUDIO", "BASE"],
  },
  {
    word: "BASE",
    nextWordList: ["MEDICO", "CASA", "ALTEZZA", "MILITARE", "GEOMETRIA"],
  },
  {
    word: "ALTEZZA",
    nextWordList: ["BASE", "GEOMETRIA"],
  },
  {
    word: "GEOMETRIA",
    nextWordList: ["BASE", "ALTEZZA", "MATEMATICA"],
  },
  {
    word: "MILITARE",
    nextWordList: ["BASE", "UNIFORME", "LEVA", "SCUOLA", "ALLEANZA"],
  },
  {
    word: "LEVA",
    nextWordList: ["MILITARE", "MONDO", "CAMBIO"],
  },
  {
    word: "CAMBIO",
    nextWordList: ["LEVA"],
  },
  {
    word: "MONDO",
    nextWordList: ["LEVA", "TERRA", "BENE"],
  },
  {
    word: "BENE",
    nextWordList: ["MONDO", "SERVIZIO"],
  },
  {
    word: "SERVIZIO",
    nextWordList: ["BENE", "CIVILE"],
  },
  {
    word: "UNIFORME",
    nextWordList: ["MILITARE", "COLORE"],
  },
  {
    word: "COLORE",
    nextWordList: ["UNIFORME", "TINTA"],
  },
  {
    word: "TINTA",
    nextWordList: ["COLORE", "CAPELLI"],
  },
  {
    word: "MISURE",
    nextWordList: ["PESI"],
  },
  {
    word: "DITA",
    nextWordList: ["LECCARSI"],
  },
  {
    word: "LABBRA",
    nextWordList: ["LECCARSI"],
  },
  {
    word: "FERITE",
    nextWordList: ["LECCARSI"],
  },
  {
    word: "NOIA",
    nextWordList: ["BARBA"],
  },
  {
    word: "SCHELETRO",
    nextWordList: ["OSSO"],
  },
  {
    word: "SACRO",
    nextWordList: ["OSSO"],
  },
  {
    word: "TEMPORALE",
    nextWordList: ["OSSO", "PIOGGIA"],
  },
  {
    word: "COMPAGNO",
    nextWordList: ["FEDELE"],
  },
  {
    word: "CREDENTE",
    nextWordList: ["FEDELE"],
  },
  {
    word: "GIACCA",
    nextWordList: ["PELLE", "COWBOY", "CHIODO"],
  },
  {
    word: "CREMA",
    nextWordList: ["PELLE", "DOLCE"],
  },
  {
    word: "SECCA",
    nextWordList: ["PELLE", "TERRA", "FRUTTA"],
  },
  {
    word: "TERRA",
    nextWordList: ["SECCA", "SOLE", "MONDO", "UOMO"],
  },
  {
    word: "SOLE",
    nextWordList: ["TERRA", "LUNA", "LUCE", "TENDA"],
  },
  {
    word: "FRUTTA",
    nextWordList: ["SECCA", "PESCA", "FRESCA", "ALBERO", "CASSETTA"],
  },
  {
    word: "ALBERO",
    nextWordList: ["FRUTTA", "LEGNO", "MAESTRO"],
  },
  {
    word: "MAESTRO",
    nextWordList: ["ALBERO", "MUSICA", "SCUOLA"],
  },
  {
    word: "SCUOLA",
    nextWordList: ["MAESTRO", "MILITARE", "POLIZIA"],
  },
  {
    word: "LEGNO",
    nextWordList: ["ALBERO", "CASSA", "TAVOLO", "SEGA"],
  },
  {
    word: "TAVOLO",
    nextWordList: ["LEGNO", "CUCINA"],
  },
  {
    word: "CASSA",
    nextWordList: ["LEGNO", "INTEGRAZIONE", "DISCOTECA", "RISPARMIO"],
  },
  {
    word: "INTEGRAZIONE",
    nextWordList: ["CASSA"],
  },
  {
    word: "PENSIONE",
    nextWordList: ["ALBERGO", "FONDO", "MINIMA"],
  },
  {
    word: "MINIMA",
    nextWordList: ["PENSIONE", "PRESSIONE"],
  },
  {
    word: "PRESSIONE",
    nextWordList: ["MINIMA", "GOMME"],
  },
  {
    word: "GOMME",
    nextWordList: ["PRESSIONE", "NEVE"],
  },
  {
    word: "ALBERGO",
    nextWordList: ["PENSIONE", "CAMERA"],
  },
  {
    word: "CAMERA",
    nextWordList: ["ALBERGO", "LETTO", "STANZA", "MUSICA"],
  },
  {
    word: "STANZA",
    nextWordList: ["CAMERA"],
  },
  {
    word: "MUSICA",
    nextWordList: [
      "CAMERA",
      "DISCOTECA",
      "ELETTRONICA",
      "CD",
      "MAESTRO",
      "VOLUME",
    ],
  },
  {
    word: "ELETTRONICA",
    nextWordList: ["MUSICA", "FATTURA", "POSTA", "BILANCIA"],
  },
  {
    word: "FATTURA",
    nextWordList: ["ELETTRONICA", "STREGA"],
  },
  {
    word: "STREGA",
    nextWordList: ["FATTURA", "SCOPA", "CAPPELLO", "GATTO", "MAGIA", "COLPO"],
  },
  {
    word: "SCOPA",
    nextWordList: ["STREGA", "CARTE", "MANICO", "VAPORE"],
  },
  {
    word: "MANICO",
    nextWordList: ["SCOPA", "RACCHETTA"],
  },
  {
    word: "RACCHETTA",
    nextWordList: ["MANICO"],
  },
  {
    word: "CARTE",
    nextWordList: ["SCOPA"],
  },
  {
    word: "POSTA",
    nextWordList: ["ELETTRONICA", "CASSETTA", "LETTERA"],
  },
  {
    word: "CASSETTA",
    nextWordList: ["POSTA", "FRUTTA"],
  },
  {
    word: "DISCOTECA",
    nextWordList: ["MUSICA", "CASSA"],
  },
  {
    word: "LETTO",
    nextWordList: ["CAMERA", "LIBRO", "VAGONE"],
  },
  {
    word: "LIBRO",
    nextWordList: ["LETTO", "VOLUME", "PAGINA"],
  },
  {
    word: "VOLUME",
    nextWordList: ["LIBRO", "MUSICA"],
  },
  {
    word: "FRESCA",
    nextWordList: ["FRUTTA", "ARIA"],
  },
  {
    word: "MORBIDA",
    nextWordList: ["PELLE"],
  },
  {
    word: "OCA",
    nextWordList: ["PELLE", "PASSO"],
  },
  {
    word: "PASSO",
    nextWordList: ["OCA", "MONTAGNA"],
  },
  {
    word: "ACIDA",
    nextWordList: ["PIOGGIA"],
  },
  {
    word: "GOCCIA",
    nextWordList: ["PIOGGIA", "ACQUA", "VASO"],
  },
  {
    word: "BATTENTE",
    nextWordList: ["PIOGGIA"],
  },
  {
    word: "CAPPELLO",
    nextWordList: ["COWBOY", "STREGA"],
  },
  {
    word: "PISTOLA",
    nextWordList: ["COWBOY"],
  },
  {
    word: "MONTAGNA",
    nextWordList: ["NEVE", "LEONE", "SOLDI", "PASSO"],
  },
  {
    word: "SOLDI",
    nextWordList: ["MONTAGNA", "SPORCHI"],
  },
  {
    word: "SPORCHI",
    nextWordList: ["SOLDI", "PANNI"],
  },
  {
    word: "PANNI",
    nextWordList: ["SPORCHI"],
  },
  {
    word: "FIOCCO",
    nextWordList: ["NEVE"],
  },
  {
    word: "PALLA",
    nextWordList: ["NEVE", "CALCIO"],
  },
  {
    word: "CALCIO",
    nextWordList: ["PALLA", "ANGOLO"],
  },
  {
    word: "ANGOLO",
    nextWordList: ["CALCIO", "COTTURA"],
  },
  {
    word: "COTTURA",
    nextWordList: ["ANGOLO", "VAPORE"],
  },
  {
    word: "VAPORE",
    nextWordList: ["COTTURA", "SCOPA"],
  },
  {
    word: "PUPAZZO",
    nextWordList: ["NEVE"],
  },
  {
    word: "TEMPESTA",
    nextWordList: ["NEVE", "SABBIA"],
  },
  {
    word: "FORZA",
    nextWordList: ["LAVORO", "CAMICIA"],
  },
  {
    word: "AGILE",
    nextWordList: ["LAVORO"],
  },
  {
    word: "REMOTO",
    nextWordList: ["LAVORO", "PASSATO"],
  },
  {
    word: "PASSATO",
    nextWordList: ["REMOTO", "VERDURE"],
  },
  {
    word: "VERDURE",
    nextWordList: ["PASSATO", "STAGIONE"],
  },
  {
    word: "STAGIONE",
    nextWordList: ["VERDURE"],
  },
  {
    word: "UFFICIO",
    nextWordList: ["LAVORO", "STUDIO"],
  },
  {
    word: "CONTRATTO",
    nextWordList: ["LAVORO", "CHIAMATA"],
  },
  {
    word: "CHIAMATA",
    nextWordList: ["CONTRATTO", "CONSUMO", "RACCOLTA"],
  },
  {
    word: "CONSUMO",
    nextWordList: ["CHIAMATA", "CODICE"],
  },
  {
    word: "RACCOLTA",
    nextWordList: ["CHIAMATA", "PUNTI"],
  },
  {
    word: "PUNTI",
    nextWordList: ["RACCOLTA", "PATENTE"],
  },
  {
    word: "PATENTE",
    nextWordList: ["PUNTI", "LIBRETTO"],
  },
  {
    word: "LIBRETTO",
    nextWordList: ["PATENTE", "RISPARMIO"],
  },
  {
    word: "RISPARMIO",
    nextWordList: ["LIBRETTO", "CASSA"],
  },
  {
    word: "ORARIO",
    nextWordList: ["LAVORO", "TRENO"],
  },
  {
    word: "FRUTTO",
    nextWordList: ["PESCA", "FIORE"],
  },
  {
    word: "CANNA",
    nextWordList: ["PESCA", "RETE"],
  },
  {
    word: "UOMO",
    nextWordList: ["TIGRE", "NERO", "TERRA", "CAMICIA"],
  },
  {
    word: "STRISCE",
    nextWordList: ["TIGRE"],
  },
  {
    word: "SQUALO",
    nextWordList: ["TIGRE", "BIANCO"],
  },
  {
    word: "ZANZARA",
    nextWordList: ["TIGRE"],
  },
  {
    word: "RE",
    nextWordList: ["LEONE"],
  },
  {
    word: "MARINO",
    nextWordList: ["LEONE", "ACQUARIO", "SALE"],
  },
  {
    word: "PAPA",
    nextWordList: ["LEONE"],
  },
  {
    word: "CIOCCOLATO",
    nextWordList: ["SALAME", "UOVO", "TORTA"],
  },
  {
    word: "FETTA",
    nextWordList: ["SALAME", "TORTA"],
  },
  {
    word: "PANINO",
    nextWordList: ["SALAME"],
  },
  {
    word: "ACQUA",
    nextWordList: [
      "PURA",
      "BOA",
      "MARE",
      "SANTA",
      "GOCCIA",
      "TRASPARENTE",
      "DOCCIA",
      "MOTO",
      "BICCHIERE",
      "BOTTIGLIA",
    ],
  },
  {
    word: "MATEMATICA",
    nextWordList: ["PURA", "GEOMETRIA", "OPINIONE"],
  },
  {
    word: "OPINIONE",
    nextWordList: ["MATEMATICA", "IDEA"],
  },
  {
    word: "IDEA",
    nextWordList: ["OPINIONE", "BRILLANTE"],
  },
  {
    word: "BRILLANTE",
    nextWordList: ["IDEA", "GIOIELLO"],
  },
  {
    word: "GIOIELLO",
    nextWordList: ["BRILLANTE", "ANELLO", "COLLANA"],
  },
  {
    word: "ANELLO",
    nextWordList: ["GIOIELLO", "NASO"],
  },
  {
    word: "NASO",
    nextWordList: ["ANELLO", "PUNTA"],
  },
  {
    word: "PUNTA",
    nextWordList: ["NASO", "PIEDE"],
  },
  {
    word: "PIEDE",
    nextWordList: ["PUNTA", "MARTELLO", "COLLO"],
  },
  {
    word: "MARTELLO",
    nextWordList: ["PIEDE", "CHIODO", "OSSO"],
  },
  {
    word: "CHIODO",
    nextWordList: ["MARTELLO", "GIACCA"],
  },
  {
    word: "ARIA",
    nextWordList: ["PURA", "FRESCA", "VIZIATA"],
  },
  {
    word: "VIZIATA",
    nextWordList: ["ARIA"],
  },
  {
    word: "TORCIA",
    nextWordList: ["UMANA"],
  },
  {
    word: "MELA",
    nextWordList: ["ROSSA"],
  },
  {
    word: "CROCE",
    nextWordList: ["ROSSA"],
  },
  {
    word: "LUNA",
    nextWordList: ["ROSSA", "NOTTE", "LUPO", "SOLE"],
  },
  {
    word: "BIRRA",
    nextWordList: ["ROSSA"],
  },
  {
    word: "PIZZA",
    nextWordList: ["BIANCA"],
  },
  {
    word: "LUCE",
    nextWordList: ["BIANCA", "DEBOLE", "GAS", "SOLE"],
  },
  {
    word: "GAS",
    nextWordList: ["LUCE"],
  },
  {
    word: "VOCE",
    nextWordList: ["BIANCA", "DEBOLE"],
  },
  {
    word: "CASA",
    nextWordList: ["BIANCA", "DOLCE", "BASE"],
  },
  {
    word: "DUNA",
    nextWordList: ["DESERTO"],
  },
  {
    word: "SABBIA",
    nextWordList: ["DESERTO", "TEMPESTA", "SPIAGGIA"],
  },
  {
    word: "OASI",
    nextWordList: ["DESERTO"],
  },
  {
    word: "CACTUS",
    nextWordList: ["DESERTO", "SPINA"],
  },
  {
    word: "ROSA",
    nextWordList: ["DESERTO", "MONTE", "FIORE", "SPINA"],
  },
  {
    word: "SPINA",
    nextWordList: ["ROSA", "ELETTRICA", "CACTUS"],
  },
  {
    word: "ELETTRICA",
    nextWordList: ["SPINA", "SEGA", "CHITARRA"],
  },
  {
    word: "CHITARRA",
    nextWordList: ["ELETTRICA", "SPAGHETTI", "CORDA"],
  },
  {
    word: "CORDA",
    nextWordList: ["CHITARRA", "SALTO"],
  },
  {
    word: "SALTO",
    nextWordList: ["CORDA", "ALTO", "LUNGO", "SCI"],
  },
  {
    word: "SCI",
    nextWordList: ["SALTO", "FONDO"],
  },
  {
    word: "FONDO",
    nextWordList: ["SCI", "PENSIONE"],
  },
  {
    word: "ALTO",
    nextWordList: ["SALTO", "MARE", "COLLO"],
  },
  {
    word: "COLLO",
    nextWordList: ["ALTO", "PIEDE", "BOTTIGLIA", "CAMICIA"],
  },
  {
    word: "CAMICIA",
    nextWordList: ["COLLO", "LINO", "FORZA", "UOMO"],
  },
  {
    word: "LINO",
    nextWordList: ["CAMICIA", "TENDA"],
  },
  {
    word: "TENDA",
    nextWordList: ["LINO", "SOLE"],
  },
  {
    word: "BOTTIGLIA",
    nextWordList: ["COLLO", "ACQUA"],
  },
  {
    word: "LUNGO",
    nextWordList: ["SALTO"],
  },
  {
    word: "SPAGHETTI",
    nextWordList: ["CHITARRA", "PASTA", "POMODORO"],
  },
  {
    word: "FIORE",
    nextWordList: ["ROSA", "FRUTTO"],
  },
  {
    word: "FAINA",
    nextWordList: ["FURBA"],
  },
  {
    word: "MARE",
    nextWordList: ["BOA", "ACQUA", "PESCI", "ALTO"],
  },
  {
    word: "ZITTA",
    nextWordList: ["MUTA"],
  },
  {
    word: "SUB",
    nextWordList: ["MUTA"],
  },
  {
    word: "NUOTO",
    nextWordList: ["MUTA"],
  },
  {
    word: "NOZZE",
    nextWordList: ["CORALLO"],
  },
  {
    word: "COLLANA",
    nextWordList: ["CORALLO", "GIOIELLO"],
  },
  {
    word: "TRIBU",
    nextWordList: ["INDIANA"],
  },
  {
    word: "CLASSE",
    nextWordList: ["PRIMA", "RAPPRESENTANTE", "MERITO"],
  },
  {
    word: "MERITO",
    nextWordList: ["CLASSE", "CIVILE"],
  },
  {
    word: "CIVILE",
    nextWordList: ["MERITO", "PROTEZIONE", "SERVIZIO", "CODICE"],
  },
  {
    word: "CODICE",
    nextWordList: ["CIVILE", "SEGRETO", "CONSUMO"],
  },
  {
    word: "SEGRETO",
    nextWordList: ["CODICE", "STATO", "AGENTE"],
  },
  {
    word: "AGENTE",
    nextWordList: ["SEGRETO", "POLIZIA", "BORSA"],
  },
  {
    word: "BORSA",
    nextWordList: ["AGENTE", "STUDIO", "VIAGGIO", "PALESTRA"],
  },
  {
    word: "VIAGGIO",
    nextWordList: ["BORSA", "TRENO"],
  },
  {
    word: "TRENO",
    nextWordList: ["VIAGGIO", "VAGONE", "ORARIO"],
  },
  {
    word: "VAGONE",
    nextWordList: ["TRENO", "LETTO", "RISTORANTE"],
  },
  {
    word: "RISTORANTE",
    nextWordList: ["VAGONE", "CARNE"],
  },
  {
    word: "CARNE",
    nextWordList: ["RISTORANTE", "ROSSA", "BIANCA"],
  },
  {
    word: "POLIZIA",
    nextWordList: ["AGENTE", "SCUOLA"],
  },
  {
    word: "STATO",
    nextWordList: ["SEGRETO", "ANIMO"],
  },
  {
    word: "ANIMO",
    nextWordList: ["STATO"],
  },
  {
    word: "PROTEZIONE",
    nextWordList: ["CIVILE"],
  },
  {
    word: "DONNA",
    nextWordList: ["PRIMA"],
  },
  {
    word: "PAGINA",
    nextWordList: ["PRIMA", "LIBRO", "BIANCA", "WEB", "NUMERO"],
  },
  {
    word: "NUMERO",
    nextWordList: ["PAGINA", "MAGIA"],
  },
  {
    word: "MAGIA",
    nextWordList: ["NUMERO", "STREGA", "NERA"],
  },
  {
    word: "NERA",
    nextWordList: ["MAGIA", "PELLE", "NOTTE", "FORESTA", "CRONACA"],
  },
  {
    word: "CRONACA",
    nextWordList: ["NERA", "DIRITTO"],
  },
  {
    word: "DIRITTO",
    nextWordList: ["CRONACA", "ROVESCIO"],
  },
  {
    word: "ROVESCIO",
    nextWordList: ["DIRITTO", "MEDAGLIA"],
  },
  {
    word: "MEDAGLIA",
    nextWordList: ["ROVESCIO", "VALORE"],
  },
  {
    word: "VALORE",
    nextWordList: ["MEDAGLIA", "SCARSO", "STIMA"],
  },
  {
    word: "STIMA",
    nextWordList: ["VALORE", "VALUTAZIONE"],
  },
  {
    word: "VALUTAZIONE",
    nextWordList: ["STIMA", "FINALE"],
  },
  {
    word: "FINALE",
    nextWordList: ["VALUTAZIONE", "FILM"],
  },
  {
    word: "FILM",
    nextWordList: ["FINALE", "PELLICOLA"],
  },
  {
    word: "PELLICOLA",
    nextWordList: ["FILM", "TRASPARENTE"],
  },
  {
    word: "SCARSO",
    nextWordList: ["VALORE", "DEBOLE"],
  },
  {
    word: "DEBOLE",
    nextWordList: ["SCARSO", "VOCE", "CUORE", "LUCE"],
  },
  {
    word: "CUORE",
    nextWordList: ["DEBOLE", "SPEZZATO", "GOLA"],
  },
  {
    word: "SPEZZATO",
    nextWordList: ["CUORE"],
  },
  {
    word: "GOLA",
    nextWordList: ["CUORE"],
  },
  {
    word: "FORESTA",
    nextWordList: ["NERA"],
  },
  {
    word: "WEB",
    nextWordList: ["PAGINA", "SITO"],
  },
  {
    word: "SITO",
    nextWordList: ["WEB"],
  },
  {
    word: "SERATA",
    nextWordList: ["PRIMA"],
  },
  {
    word: "VOLTA",
    nextWordList: ["PRIMA", "ULTIMA"],
  },
  {
    word: "CENA",
    nextWordList: ["ULTIMA"],
  },
  {
    word: "ORA",
    nextWordList: ["ULTIMA", "LEGALE"],
  },
  {
    word: "LEGALE",
    nextWordList: ["ORA", "RAPPRESENTANTE"],
  },
  {
    word: "RAPPRESENTANTE",
    nextWordList: ["LEGALE", "CLASSE"],
  },
  {
    word: "SPIAGGIA",
    nextWordList: ["ULTIMA", "SABBIA"],
  },
  {
    word: "NERO",
    nextWordList: ["GATTO", "PEPE", "OCCHIO", "UOMO"],
  },
  {
    word: "OCCHIO",
    nextWordList: ["NERO", "DENTE", "TIGRE"],
  },
  {
    word: "DENTE",
    nextWordList: ["OCCHIO", "LATTE", "AVVELENATO"],
  },
  {
    word: "AVVELENATO",
    nextWordList: ["DENTE"],
  },
  {
    word: "LATTE",
    nextWordList: ["DENTE", "POLVERE", "MIELE"],
  },
  {
    word: "POLVERE",
    nextWordList: ["LATTE", "SPARO"],
  },
  {
    word: "SPARO",
    nextWordList: ["POLVERE", "COLPO"],
  },
  {
    word: "COLPO",
    nextWordList: ["SPARO", "STREGA"],
  },
  {
    word: "SANTA",
    nextWordList: ["ACQUA", "CHIESA", "VERGINE", "BEATA", "ALLEANZA"],
  },
  {
    word: "ALLEANZA",
    nextWordList: ["SANTA", "MILITARE"],
  },
  {
    word: "BEATA",
    nextWordList: ["SANTA", "IGNORANZA"],
  },
  {
    word: "IGNORANZA",
    nextWordList: ["BEATA"],
  },
  {
    word: "CD",
    nextWordList: ["VERGINE", "MUSICA"],
  },
  {
    word: "VERGINE",
    nextWordList: ["SANTA", "ACQUARIO", "PESCI", "BILANCIA", "CD"],
  },
  {
    word: "ACQUARIO",
    nextWordList: ["VERGINE", "PESCI", "BILANCIA", "MARINO", "VETRO"],
  },
  {
    word: "PESCI",
    nextWordList: ["ACQUARIO", "VERGINE", "BILANCIA", "RETE", "MARE", "FIUME"],
  },
  {
    word: "FIUME",
    nextWordList: ["PESCI", "DELTA", "CORSO"],
  },
  {
    word: "DELTA",
    nextWordList: ["FIUME", "LETTERA"],
  },
  {
    word: "LETTERA",
    nextWordList: ["DELTA", "POSTA"],
  },
  {
    word: "BILANCIA",
    nextWordList: [
      "CUCINA",
      "ACQUARIO",
      "PESCI",
      "VERGINE",
      "PIATTO",
      "ELETTRONICA",
    ],
  },
  {
    word: "PIATTO",
    nextWordList: ["BILANCIA", "CUCINA", "DOCCIA", "PASTA"],
  },
  {
    word: "PASTA",
    nextWordList: ["PIATTO", "BIANCO", "POMODORO", "SPAGHETTI"],
  },
  {
    word: "POMODORO",
    nextWordList: ["PASTA", "SPAGHETTI"],
  },
  {
    word: "BIANCO",
    nextWordList: ["PASTA", "MONTE", "SQUALO", "ASSEGNO"],
  },
  {
    word: "ASSEGNO",
    nextWordList: ["BIANCO", "UNICO", "CIRCOLARE"],
  },
  {
    word: "CIRCOLARE",
    nextWordList: ["ASSEGNO", "MOTO", "SEGA"],
  },
  {
    word: "SEGA",
    nextWordList: ["CIRCOLARE", "LEGNO", "ELETTRICA"],
  },
  {
    word: "MOTO",
    nextWordList: ["CIRCOLARE", "ACQUA"],
  },
  {
    word: "UNICO",
    nextWordList: ["ASSEGNO", "CASO", "RARO"],
  },
  {
    word: "RARO",
    nextWordList: ["UNICO"],
  },
  {
    word: "MONTE",
    nextWordList: ["BIANCO", "ROSA"],
  },
  {
    word: "DOCCIA",
    nextWordList: ["PIATTO", "ACQUA", "PALESTRA"],
  },
  {
    word: "RETE",
    nextWordList: ["PESCI", "CANNA", "PESCA", "CALZE"],
  },
  {
    word: "CALZE",
    nextWordList: ["RETE", "LANA"],
  },
  {
    word: "LANA",
    nextWordList: ["CALZE", "PECORA"],
  },
  {
    word: "PECORA",
    nextWordList: ["LANA", "LUPO"],
  },
  {
    word: "LUPO",
    nextWordList: ["PECORA", "LUNA", "CANE"],
  },
  {
    word: "SALE",
    nextWordList: ["MARINO", "PEPE", "GROSSO", "CRISTALLO"],
  },
  {
    word: "CRISTALLO",
    nextWordList: ["SALE", "BICCHIERE"],
  },
  {
    word: "BICCHIERE",
    nextWordList: ["CRISTALLO", "ACQUA"],
  },
  {
    word: "PEPE",
    nextWordList: ["SALE", "NERO"],
  },
  {
    word: "GROSSO",
    nextWordList: ["SALE"],
  },
  {
    word: "VETRO",
    nextWordList: ["ACQUARIO", "TRASPARENTE"],
  },
  {
    word: "TRASPARENTE",
    nextWordList: ["VETRO", "ACQUA", "PELLICOLA"],
  },
  {
    word: "CUCINA",
    nextWordList: ["BILANCIA", "TAVOLO", "PIATTO"],
  },
  {
    word: "DOLCE",
    nextWordList: ["CASA", "MIELE", "TORTA", "CREMA"],
  },
  {
    word: "COLTELLI",
    nextWordList: ["LUNGHI"],
  },
  {
    word: "PANTALONI",
    nextWordList: ["CORTI", "ZAMPA"],
  },
  {
    word: "ZAMPA",
    nextWordList: ["PANTALONI", "GALLINA", "GATTO", "CANE"],
  },
  {
    word: "GALLINA",
    nextWordList: ["ZAMPA", "UOVO"],
  },
  {
    word: "UOVO",
    nextWordList: ["GALLINA", "CIOCCOLATO"],
  },
  {
    word: "VASO",
    nextWordList: ["GOCCIA", "NOTTE"],
  },
  {
    word: "NOTTE",
    nextWordList: ["VASO", "LUNA", "BIANCA", "NERA"],
  },
  {
    word: "MIELE",
    nextWordList: ["DOLCE", "LATTE"],
  },
  {
    word: "TORTA",
    nextWordList: ["DOLCE", "CIOCCOLATO", "FETTA"],
  },
  {
    word: "CHIESA",
    nextWordList: ["SANTA", "CAMPANILE"],
  },
  {
    word: "CAMPANILE",
    nextWordList: ["CHIESA"],
  },
];

const WORD_LIST_LENGTH = 5;

if (RUN_TEST) {
  runWordListTest();
}

export { WORD_LIST, WORD_LIST_LENGTH, type Word, type WordList };
