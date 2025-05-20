// Typings
import { LevelList } from "@/typings/game";

// Data
import levelList from "@/assets/data/levelList.json";

function checkNoDuplicateWords(data: LevelList): boolean {
  const wordMap = new Map<string, number[]>();

  for (const item of data) {
    for (const word of item.wordList) {
      const existing = wordMap.get(word) || [];
      wordMap.set(word, [...existing, item.id]);
    }
  }

  let hasDuplicates = false;

  for (const [word, ids] of wordMap.entries()) {
    if (ids.length > 1) {
      console.error(
        `Parola duplicata "${word}" trovata negli array con ID: ${ids.join(
          ", "
        )}`
      );
      hasDuplicates = true;
    }
  }

  return !hasDuplicates;
}

const runLevelListTest = () => {
  const noDuplicateWordsValid = checkNoDuplicateWords(levelList);

  if (noDuplicateWordsValid) {
    console.log("Livelli: tutti i controlli sono stati superati con successo.");
  } else {
    console.error("Livelli: ci sono errori nei dati.");
  }
};

export { runLevelListTest };
