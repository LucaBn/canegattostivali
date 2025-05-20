import { WordList } from "@/typings/game";
import { WORD_LIST } from "@/constants/wordList";

function checkUniqueWords(array: WordList): boolean {
  const wordCount: Record<string, number> = array.reduce((acc, entry) => {
    acc[entry.word] = (acc[entry.word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nonUniqueWords = Object.entries(wordCount)
    .filter(([, count]) => count > 1)
    .map(([word]) => word);

  if (nonUniqueWords.length > 0) {
    console.error("Errore: Alcune 'word' non sono uniche:", nonUniqueWords);
  } else {
    console.log("Tutte le 'word' sono uniche.");
  }

  return nonUniqueWords.length === 0;
}

function checkNextWordsExist(array: WordList): boolean {
  const wordSet = new Set(array.map((entry) => entry.word));
  let allExist = true;

  array.forEach((entry) => {
    entry.nextWordList.forEach((nextWord) => {
      if (!wordSet.has(nextWord)) {
        console.error(
          `Errore: La parola '${nextWord}' in nextWordList di '${entry.word}' non esiste come 'word'.`
        );
        allExist = false;
      }
    });
  });

  if (allExist) {
    console.log("Tutte le parole in nextWordList esistono anche come 'word'.");
  }

  return allExist;
}

function checkBidirectionalLinks(array: WordList): boolean {
  const wordMap = new Map(
    array.map((entry) => [entry.word, entry.nextWordList])
  );
  let bidirectional = true;

  array.forEach((entry) => {
    entry.nextWordList.forEach((nextWord) => {
      const nextWordList = wordMap.get(nextWord);
      if (!nextWordList || !nextWordList.includes(entry.word)) {
        console.error(
          `Errore: Il collegamento tra '${entry.word}' e '${nextWord}' non è biunivoco.`
        );
        bidirectional = false;
      }
    });
  });

  if (bidirectional) {
    console.log("Tutti i collegamenti sono biunivoci.");
  }

  return bidirectional;
}

function checkForDuplicates(words: WordList): boolean {
  let noDuplicates = true;

  words.forEach(({ word, nextWordList }) => {
    const duplicates = nextWordList.filter(
      (item, index) => nextWordList.indexOf(item) !== index
    );
    if (duplicates.length > 0) {
      noDuplicates = false;
      console.error(`La word "${word}" ha duplicati nella sua nextWordList:`, [
        ...new Set(duplicates),
      ]);
    } else {
      console.log(`Non ci sono duplicati in alcuna nextWordList.`);
    }
  });

  return noDuplicates;
}

const runWordListTest = () => {
  const uniqueWordsValid = checkUniqueWords(WORD_LIST);
  const nextWordsExistValid = checkNextWordsExist(WORD_LIST);
  const bidirectionalLinksValid = checkBidirectionalLinks(WORD_LIST);
  const duplicatesValid = checkForDuplicates(WORD_LIST);

  if (
    uniqueWordsValid &&
    nextWordsExistValid &&
    bidirectionalLinksValid &&
    duplicatesValid
  ) {
    console.log("Random: tutti i controlli sono stati superati con successo.");
  } else {
    console.error("Random: ci sono errori nei dati.");
  }
};

function sortWordsByNextWordListLength() {
  const sortedWordList = WORD_LIST.sort((a, b) => {
    const lengthDifference = a.nextWordList.length - b.nextWordList.length;
    if (lengthDifference !== 0) {
      return lengthDifference;
    }

    return a.word.localeCompare(b.word); // Alphabetical order if lengths are equal
  });

  console.log({ sortedWordList });
}

export { runWordListTest, sortWordsByNextWordListLength };
