import React, { useState, useEffect, useMemo, useCallback } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

// Constants
import { wordList as originalWordList } from "@/constants/wordList";

// Utils
import { shuffle } from "@/utils/array";
import { getRandomIntInclusive } from "@/utils/number";

const initialIndex = getRandomIntInclusive(0, originalWordList.length - 1);

const HomePage: React.FC = () => {
  const [wordList, setWordList] = useState(originalWordList);
  const [currentWordIndex, setCurrentWordIndex] =
    useState<number>(initialIndex);
  const [guessedWord, setGuessedWord] = useState<string>("");
  const [previousGuessedWords, setPreviousGuessedWords] = useState<string[]>(
    []
  );
  const [guessedWordButtonVariant, setGuessedWordButtonVariant] = useState<
    string[]
  >([]);
  const [message, setMessage] = useState<string>("");

  const { word, clues, previousWord } = wordList[currentWordIndex];

  const shuffledSlicedClues = useMemo(() => {
    const shuffledClues = shuffle(clues);
    const centralWord =
      previousGuessedWords.length === 0
        ? shuffle(previousWord)[0]
        : previousGuessedWords[previousGuessedWords.length - 1];
    return [shuffledClues[0], centralWord, shuffledClues[1]];
  }, [currentWordIndex]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "DEL") {
        setGuessedWord((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "INVIO") {
        if (guessedWord.length === word.length) {
          if (guessedWord === word) {
            setPreviousGuessedWords((prevValue) => [...prevValue, guessedWord]);
            setMessage("Corretto!");

            // TODO: disable writing event here
            setTimeout(() => {
              setWordList((prevValue) =>
                prevValue.filter((wordObj) => wordObj.word !== guessedWord)
              );
              goToNextWord(guessedWord);
            }, 1000);
          } else {
            setMessage("Prova un'altra parola!");
          }
        }
        return;
      }

      if (guessedWord.length < word.length) {
        setGuessedWord((prev) => prev + key);
      }
    },
    [guessedWord, word]
  );

  const goToNextWord = (previousWord: string) => {
    const validNewWordList = wordList.filter((wordObj) =>
      wordObj.previousWord.includes(previousWord)
    );
    if (validNewWordList.length) {
      const shuffledWordList = shuffle(validNewWordList);
      const wordToGuessIndex = wordList.findIndex(
        (wordObj) => wordObj.word === shuffledWordList[0].word
      );

      setGuessedWord("");
      setCurrentWordIndex(wordToGuessIndex);
    } else {
      setMessage("Fine!");
    }
  };

  const updateButtonVariants = useCallback(() => {
    const buttonVariants = word
      .split("")
      .map((_, index) =>
        guessedWord[index] ? "primary" : "outline-secondary"
      );
    setGuessedWordButtonVariant(buttonVariants);
  }, [guessedWord, word]);

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const keyMap: { [key: string]: string } = {
        Backspace: "DEL",
        Enter: "INVIO",
      };

      if (keyMap[key]) {
        handleKeyPress(keyMap[key]);
      } else if (/^[A-Za-z]$/.test(key)) {
        handleKeyPress(key.toUpperCase());
      }
    },
    [handleKeyPress]
  );

  useEffect(() => {
    setMessage("");
    updateButtonVariants();

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [guessedWord, word]);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Indovina la parola!</h1>

          <p className="mb-1 text-center">Parole di aiuto:</p>
          <Row className="justify-content-center mb-1 gap-1 gap-md-2">
            {shuffledSlicedClues.map((clue) => (
              <Col xs="auto" key={clue} className="mb-1 p-0">
                <Button variant="warning" className="pointer-events-none">
                  {clue}
                </Button>
              </Col>
            ))}
          </Row>

          <Row className="guessedword justify-content-center mt-3 mb-1 gap-1 gap-md-2 pointer-events-none">
            {word.split("").map((_, index) => (
              <Col xs="auto" key={index} className="guessedword__slot mb-1 p-0">
                <Button
                  variant={
                    guessedWordButtonVariant[index] ?? "outline-secondary"
                  }
                  className="keyboard__btn p-1"
                >
                  {guessedWord[index]}
                </Button>
              </Col>
            ))}

            <p className="text-center">{message}</p>
          </Row>
        </Col>
      </Row>

      <Row>
        <Keyboard onKeyPress={handleKeyPress} />
      </Row>
    </Container>
  );
};

export default HomePage;
