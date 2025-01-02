import { WORD_LIST, type WordList } from "@/constants/wordList";

function checkUniqueWords(array: WordList): string[] {
  const wordCount: Record<string, number> = array.reduce((acc, entry) => {
    acc[entry.word] = (acc[entry.word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nonUniqueWords = Object.entries(wordCount)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, count]) => count > 1)
    .map(([word]) => word);

  if (nonUniqueWords.length > 0) {
    console.error("Errore: Alcune 'word' non sono uniche:", nonUniqueWords);
  } else {
    console.log("Tutte le 'word' sono uniche.");
  }

  return nonUniqueWords;
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

const runWordListTest = () => {
  const uniqueWordsValid = checkUniqueWords(WORD_LIST);
  const nextWordsExistValid = checkNextWordsExist(WORD_LIST);
  const bidirectionalLinksValid = checkBidirectionalLinks(WORD_LIST);

  if (
    uniqueWordsValid.length === 0 &&
    nextWordsExistValid &&
    bidirectionalLinksValid
  ) {
    console.log("Tutti i controlli sono stati superati con successo.");
  } else {
    console.log("Ci sono errori nei dati.");
  }
};

function sortWordsByNextWordListLength() {
  const sortedWordList = WORD_LIST.sort((a, b) => {
    const lengthDifference = a.nextWordList.length - b.nextWordList.length;
    if (lengthDifference !== 0) {
      return lengthDifference;
    }
    return a.word.localeCompare(b.word); // Ordine alfabetico in caso di parità
  });

  console.log({ sortedWordList });
}

export { runWordListTest, sortWordsByNextWordListLength };
