import { Word } from "@/typings/game";
import {
  WORD_LIST_LENGTH,
  WORD_LIST,
  EXCLUSIVE_WORD_GROUPS,
} from "@/constants/wordList";

interface Props {
  wordListLength?: number;
  excludedWords?: string[];
}

const createWordSequence = ({
  wordListLength = WORD_LIST_LENGTH,
  excludedWords: wordsToExclude = [],
}: Props): string[] => {
  const usedWords = new Set<string>();
  const excludedWords = new Set<string>(wordsToExclude);
  const sequence: string[] = [];

  const excludeRelatedWords = (word: string) => {
    EXCLUSIVE_WORD_GROUPS.filter((group) => group.includes(word)).forEach(
      (group) => {
        group.forEach((relatedWord) => {
          if (relatedWord !== word) {
            excludedWords.add(relatedWord);
          }
        });
      },
    );
  };

  const getRandomUnusedWord = (): Word | undefined => {
    const availableWords = WORD_LIST.filter(
      (w) => !usedWords.has(w.word) && !excludedWords.has(w.word),
    );

    return availableWords.length > 0
      ? availableWords[Math.floor(Math.random() * availableWords.length)]
      : undefined;
  };

  const getNextUnusedWord = (currentWord: Word): Word | undefined => {
    const possibleNextWords = currentWord.nextWordList
      .map((nextWord) =>
        WORD_LIST.find(
          (w) =>
            w.word === nextWord &&
            !usedWords.has(w.word) &&
            !excludedWords.has(w.word),
        ),
      )
      .filter((w): w is Word => w !== undefined);

    return possibleNextWords.length > 0
      ? possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)]
      : undefined;
  };

  let currentWord = getRandomUnusedWord();

  while (sequence.length < wordListLength) {
    if (currentWord) {
      sequence.push(currentWord.word);
      usedWords.add(currentWord.word);

      excludeRelatedWords(currentWord.word);

      currentWord = getNextUnusedWord(currentWord);
    } else {
      sequence.length = 0;
      usedWords.clear();
      excludedWords.clear();
      wordsToExclude.forEach((word) => excludedWords.add(word));
      currentWord = getRandomUnusedWord();
    }
  }

  return sequence;
};

export { createWordSequence };
