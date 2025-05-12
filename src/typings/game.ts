type Mode = "random" | "levels" | "custom";

type Word = {
  word: string;
  nextWordList: string[];
};

type WordList = Word[];

export type { Mode, Word, WordList };
