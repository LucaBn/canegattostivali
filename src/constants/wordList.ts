type Word = {
  word: string;
  nextWordList: string[];
};

type WordList = Word[];

const WORD_LIST: WordList = [
  {
    word: "GATTO",
    nextWordList: ["CODA", "NERO", "BAFFI"],
  },
  {
    word: "CODA",
    nextWordList: ["GATTO", "SERPENTE", "CANE"],
  },
  {
    word: "BAFFI",
    nextWordList: ["GATTO", "VOLPE"],
  },
  {
    word: "CANE",
    nextWordList: ["CODA", "VOLPE"],
  },
  {
    word: "VOLPE",
    nextWordList: ["CANE", "BAFFI", "CODA"],
  },
  {
    word: "SERPENTE",
    nextWordList: ["CODA", "AUTOSTRADA", "CANE"],
  },
  {
    word: "NEVI",
    nextWordList: ["GATTO", "STIVALI", "MONTAGNA"],
  },
  {
    word: "NERO",
    nextWordList: ["GATTO", "STIVALI", "FUOCO"],
  },
  {
    word: "STIVALI",
    nextWordList: ["GATTO", "NEVI", "NERO"],
  },
  {
    word: "MONTAGNA",
    nextWordList: ["NEVI", "CIELO", "PIUMA"],
  },
  {
    word: "AUTOSTRADA",
    nextWordList: ["SERPENTE", "CODA", "POSTA"],
  },
  {
    word: "POSTA",
    nextWordList: ["AUTOSTRADA", "CODA", "LIBRO"],
  },
  {
    word: "LIBRO",
    nextWordList: ["POSTA", "SOGNO", "NOTTE"],
  },
  {
    word: "SOGNO",
    nextWordList: ["LIBRO", "NOTTE", "STELLE"],
  },
  {
    word: "NOTTE",
    nextWordList: ["SOGNO", "NERO", "LUNA"],
  },
  {
    word: "LUNA",
    nextWordList: ["NOTTE", "STELLE", "SOLE"],
  },
  {
    word: "SOLE",
    nextWordList: ["LUNA", "STELLE", "FUOCO"],
  },
  {
    word: "STELLE",
    nextWordList: ["SOLE", "LUNA", "SOGNO"],
  },
  {
    word: "FUOCO",
    nextWordList: ["NERO", "SOLE", "LEGNA"],
  },
  {
    word: "LEGNA",
    nextWordList: ["FUOCO", "ALBERO", "PIUMA"],
  },
  {
    word: "ALBERO",
    nextWordList: ["LEGNA", "PIUMA", "FOGLIA"],
  },
  {
    word: "FOGLIA",
    nextWordList: ["ALBERO", "PIUMA", "FIORE"],
  },
  {
    word: "FIORE",
    nextWordList: ["FOGLIA", "PIUMA", "LIBRO"],
  },
  {
    word: "PIUMA",
    nextWordList: ["ALBERO", "FOGLIA", "MONTAGNA"],
  },
];

const WORD_LIST_LENGTH = 5;

export { WORD_LIST, WORD_LIST_LENGTH, type Word, type WordList };
