// Constants
import { type Word, WORD_LIST_LENGTH, WORD_LIST } from "@/constants/wordList";

const createWordSequence = (): string[] => {
  const usedWords = new Set<string>();
  const sequence: string[] = [];

  const getRandomUnusedWord = (): Word | undefined => {
    const unusedWords = WORD_LIST.filter((w) => !usedWords.has(w.word));
    return unusedWords.length > 0
      ? unusedWords[Math.floor(Math.random() * unusedWords.length)]
      : undefined;
  };

  const getNextUnusedWord = (currentWord: Word): Word | undefined => {
    const possibleNextWords = currentWord.nextWordList
      .map((nextWord) =>
        WORD_LIST.find((w) => w.word === nextWord && !usedWords.has(w.word))
      )
      .filter((w): w is Word => w !== undefined);
    return possibleNextWords.length > 0
      ? possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)]
      : undefined;
  };

  let currentWord = getRandomUnusedWord();

  while (sequence.length < WORD_LIST_LENGTH) {
    if (currentWord) {
      sequence.push(currentWord.word);
      usedWords.add(currentWord.word);
      currentWord = getNextUnusedWord(currentWord);
    } else {
      sequence.length = 0;
      usedWords.clear();
      currentWord = getRandomUnusedWord();
    }
  }

  return sequence;
};

export { createWordSequence };
