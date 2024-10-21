const wordList = [
  {
    word: "GATTO",
    clues: ["SIBERIANO", "STIVALI", "NEVI"],
    previousWord: ["CODA", "NERO", "BAFFI"],
  },
  {
    word: "CODA",
    clues: ["STAMPA", "RAVIOLI", "AUTOSTRADA"],
    previousWord: ["GATTO", "SERPENTE", "CANE"],
  },
  {
    word: "BAFFI",
    clues: ["FACCIA", "FOLTI", "MANUBRIO"],
    previousWord: ["GATTO", "VOLPE", "UOMO"],
  },
  {
    word: "CANE",
    clues: ["ABBAIA", "CUCCIA", "OSSO"],
    previousWord: ["CODA", "VOLPE", "GIOCO"],
  },
  {
    word: "VOLPE",
    clues: ["ROSSA", "FURBA", "CACCIA"],
    previousWord: ["CANE", "BAFFI", "CODA"],
  },
  {
    word: "SERPENTE",
    clues: ["STRISCE", "VELENOSO", "RETTILE"],
    previousWord: ["CODA", "AUTOSTRADA", "CANE"],
  },
  {
    word: "NEVI",
    clues: ["INVERNO", "BIANCO", "GHIACCIO"],
    previousWord: ["GATTO", "STIVALI", "MONTAGNA"],
  },
  {
    word: "NERO",
    clues: ["COLORE", "BUIO", "OCCHIO"],
    previousWord: ["GATTO", "STIVALI", "FUOCO"],
  },
  {
    word: "STIVALI",
    clues: ["SCARPE", "INVERNO", "PIOGGIA"],
    previousWord: ["GATTO", "NEVI", "NERO"],
  },
  {
    word: "MONTAGNA",
    clues: ["VETTA", "NEVE", "SCALATA"],
    previousWord: ["NEVI", "CIELO", "PIUMA"],
  },
  {
    word: "AUTOSTRADA",
    clues: ["MACCHINA", "STRADA", "PEDAGGIO"],
    previousWord: ["SERPENTE", "CODA", "POSTA"],
  },
  {
    word: "POSTA",
    clues: ["LETTERA", "SERVIZIO", "SPEDIZIONE"],
    previousWord: ["AUTOSTRADA", "CODA", "LIBRO"],
  },
  {
    word: "LIBRO",
    clues: ["PAGINE", "LEGGERE", "BIBLIOTECA"],
    previousWord: ["POSTA", "SOGNO", "NOTTE"],
  },
  {
    word: "SOGNO",
    clues: ["DESTO", "IMMAGINAZIONE", "DORMIRE"],
    previousWord: ["LIBRO", "NOTTE", "STELLE"],
  },
  {
    word: "NOTTE",
    clues: ["PROFONDA", "BUIO", "STELLE"],
    previousWord: ["SOGNO", "NERO", "LUNA"],
  },
  {
    word: "LUNA",
    clues: ["ROSSA", "SATELLITE", "CELESTE"],
    previousWord: ["NOTTE", "STELLE", "SOLE"],
  },
  {
    word: "SOLE",
    clues: ["LUCE", "CALORE", "STELLA"],
    previousWord: ["LUNA", "STELLE", "FUOCO"],
  },
  {
    word: "STELLE",
    clues: ["LUCE", "CELESTE", "NOTTE"],
    previousWord: ["SOLE", "LUNA", "SOGNO"],
  },
  {
    word: "FUOCO",
    clues: ["FIAMMA", "CALORE", "INCENDIO"],
    previousWord: ["NERO", "SOLE", "LEGNA"],
  },
  {
    word: "LEGNA",
    clues: ["ARDERE", "FOGLIE", "CASA"],
    previousWord: ["FUOCO", "ALBERO", "PIUMA"],
  },
  {
    word: "ALBERO",
    clues: ["FOGLIE", "RADICI", "FORESTA"],
    previousWord: ["LEGNA", "PIUMA", "FOGLIA"],
  },
  {
    word: "FOGLIA",
    clues: ["VERDE", "AUTUNNO", "FICO"],
    previousWord: ["ALBERO", "PIUMA", "FIORE"],
  },
  {
    word: "FIORE",
    clues: ["COLORI", "PROFUMO", "PRIMAVERA"],
    previousWord: ["FOGLIA", "PIUMA", "LIBRO"],
  },
  {
    word: "PIUMA",
    clues: ["UCCELLO", "LEGGERO", "VOLARE"],
    previousWord: ["ALBERO", "FOGLIA", "MONTAGNA"],
  },
];

export { wordList };
