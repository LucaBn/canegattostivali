import { RUN_TEST } from "./app";
import { runWordListTest } from "@/test/wordListTest";
import wordList from "../assets/data/wordList.json";

type Word = {
  word: string;
  nextWordList: string[];
};

type WordList = Word[];

const WORD_LIST: WordList = wordList;

const WORD_LIST_LENGTH = 21;

// Check like this because RUN_TEST value is stored as a string in .env file
if (RUN_TEST === "true") {
  runWordListTest();
}

export { WORD_LIST, WORD_LIST_LENGTH, type Word, type WordList };
