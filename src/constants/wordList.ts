import { RUN_TEST } from "@/constants/app";
import {
  runWordListTest,
  sortWordsByNextWordListLength,
} from "@/tests/wordListTest";
import wordList from "@/assets/data/wordList.json";
import { WordList } from "@/typings/game";

const WORD_LIST: WordList = wordList;

const WORD_LIST_LENGTH = 11;

// Check like this because RUN_TEST value is stored as a string in .env file
if (RUN_TEST === "true") {
  runWordListTest();
  sortWordsByNextWordListLength();
}

export { WORD_LIST, WORD_LIST_LENGTH };
