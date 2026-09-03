// Typings
import { WordList } from "@/typings/game";

// Data
import wordList from "@/assets/data/wordList.json";

const WORD_LIST: WordList = wordList;

const WORD_LIST_LENGTH = 11;

const EXCLUSIVE_WORD_GROUPS = [
  ["ALTA", "ALTO"],
  ["APERTA", "APERTO", "CHIUSO"],
  ["BANCA", "BANCO"],
  ["BIANCA", "BIANCO"],
  ["BILANCIA", "BILANCIO"],
  ["DIRETTA", "DIRETTO"],
  ["DOPPIA", "DOPPIO"],
  ["ELETTRICO", "ELETTRICA", "ELETTRONICA"],
  ["FRUTTA", "FRUTTO"],
  ["GIORNO", "GIORNATA"],
  ["INTERNO", "ESTERNO"],
  ["LUNGA", "LUNGO"],
  ["MECCANICA", "MECCANICO"],
  ["MEDIA", "MEDIO"],
  ["MINIMA", "MINIMO"],
  ["NERA", "NERO"],
  ["PALLA", "PALLONE"],
  ["PARTITA", "PARTITO"],
  ["PORTA", "PORTO"],
  ["POSTA", "POSTO"],
  ["PRIMA", "PRIMO", "ULTIMA"],
  ["PUNTA", "PUNTO"],
  ["ROSSA", "ROSSO"],
  ["SCALA", "SCALE"],
  ["SECCA", "SECCO"],
  ["SICURA", "SICURO"],
  ["STAMPA", "STAMPO"],
  ["TORO", "LEONE", "VERGINE", "BILANCIA", "ACQUARIO", "PESCI"],
];

export { WORD_LIST, WORD_LIST_LENGTH, EXCLUSIVE_WORD_GROUPS };
