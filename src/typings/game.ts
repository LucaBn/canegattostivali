type Mode = "random" | "levels" | "custom";

type Word = {
  word: string;
  nextWordList: string[];
};

type WordList = Word[];

type Level = {
  id: number;
  wordList: string[];
};

type LevelList = Level[];

export type { Mode, Word, WordList, Level, LevelList };
