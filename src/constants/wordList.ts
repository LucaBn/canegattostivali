// Typings
import { WordList } from "@/typings/game";

// Data
import wordList from "@/assets/data/wordList.json";

const WORD_LIST: WordList = wordList;

const WORD_LIST_LENGTH = 11;

const EXCLUSIVE_WORD_GROUPS = [
  ["AEREO", "BARCA"],
  ["ALBERO", "PIANTA"],
  ["ALTA", "ALTO"],
  ["APERTA", "APERTO", "CHIUSO"],
  ["BANCA", "BANCO"],
  ["BIANCA", "BIANCO"],
  ["BILANCIA", "BILANCIO"],
  ["BRONZO", "FERRO"],
  ["DIRETTA", "DIRETTO"],
  ["DOPPIA", "DOPPIO"],
  ["ELETTRICO", "ELETTRICA", "ELETTRONICA"],
  ["FERRI", "FERRO"],
  ["FRUTTA", "FRUTTO"],
  ["GIORNO", "GIORNATA"],
  ["INTERNO", "ESTERNO"],
  ["LUNGA", "LUNGO"],
  ["MECCANICA", "MECCANICO"],
  ["MEDIA", "MEDIO", "GRANDE"],
  ["MINIMA", "MINIMO"],
  ["MOSCA", "RIGA", "ROMA"],
  ["NERA", "NERO"],
  ["PALLA", "PALLONE"],
  ["PARTITA", "PARTITO"],
  ["PORTA", "PORTO"],
  ["POSTA", "POSTO"],
  ["PRIMA", "PRIMO", "ULTIMA"],
  ["PUNTA", "PUNTO"],
  ["ROSSA", "ROSSO"],
  ["SALTO", "SALTARE"],
  ["SCALA", "SCALE"],
  ["SECCA", "SECCO"],
  ["SICURA", "SICURO"],
  ["STAMPA", "STAMPO"],
  ["TORO", "LEONE", "VERGINE", "BILANCIA", "ACQUARIO", "PESCI"],
];

export { WORD_LIST, WORD_LIST_LENGTH, EXCLUSIVE_WORD_GROUPS };
