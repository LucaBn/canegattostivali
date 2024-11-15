import React, { useState, useEffect, useCallback, useRef } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

// Constants
import { type Word, wordList } from "@/constants/wordList";

const WORD_SEQUENCE_LENGTH = 20;

const createWordSequence = (): string[] => {
  const usedWords = new Set<string>();
  const sequence: string[] = [];

  const getRandomUnusedWord = (): Word | undefined => {
    const unusedWords = wordList.filter((w) => !usedWords.has(w.word));
    return unusedWords.length > 0
      ? unusedWords[Math.floor(Math.random() * unusedWords.length)]
      : undefined;
  };

  const getNextUnusedWord = (currentWord: Word): Word | undefined => {
    const possibleNextWords = currentWord.nextWordList
      .map((nextWord) =>
        wordList.find((w) => w.word === nextWord && !usedWords.has(w.word))
      )
      .filter((w): w is Word => w !== undefined);
    return possibleNextWords.length > 0
      ? possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)]
      : undefined;
  };

  let currentWord = getRandomUnusedWord();

  while (currentWord && sequence.length < WORD_SEQUENCE_LENGTH) {
    sequence.push(currentWord.word);
    usedWords.add(currentWord.word);
    currentWord = getNextUnusedWord(currentWord);
  }

  return sequence;
};

const wordSequence = createWordSequence();

const HomePage: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(1);
  const [guessedWord, setGuessedWord] = useState<string>(wordSequence[1][0]);
  const [buttonVariants, setButtonVariants] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("🤔");
  const [slotHeight, setSlotHeight] = useState<number>(56);

  const isKeyPressEnabled = useRef<boolean>(true);

  const updateButtonVariants = useCallback(() => {
    setButtonVariants(
      wordSequence[currentWordIndex]
        .split("")
        .map((_, index) =>
          guessedWord[index] ? "primary" : "outline-secondary"
        )
    );
  }, [guessedWord, currentWordIndex]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!isKeyPressEnabled.current) return;

      setMessage("🤔");

      if (key === "DEL") {
        setGuessedWord((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
      } else if (key === "INVIO") {
        if (guessedWord === wordSequence[currentWordIndex]) {
          isKeyPressEnabled.current = false;
          setMessage("😃");
          setTimeout(() => {
            if (currentWordIndex === WORD_SEQUENCE_LENGTH - 1) {
              setMessage("Fine!");
            } else {
              setMessage("🤔");
              setGuessedWord(wordSequence[currentWordIndex + 1][0]);
              setCurrentWordIndex((prev) => prev + 1);
              isKeyPressEnabled.current = true;
            }
          }, 1000);
        } else {
          setMessage("😓");
        }
      } else if (
        /^[A-Za-z]$/.test(key) &&
        guessedWord.length < wordSequence[currentWordIndex].length
      ) {
        setGuessedWord((prev) => prev + key.toUpperCase());
      }
    },
    [guessedWord, currentWordIndex]
  );

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const mappedKey =
        { Backspace: "DEL", Enter: "INVIO" }[key] || key.toUpperCase();
      handleKeyPress(mappedKey);
    },
    [handleKeyPress]
  );

  useEffect(() => {
    updateButtonVariants();
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [guessedWord]);

  useEffect(() => {
    const updateSlotHeight = () => {
      setSlotHeight(window.innerWidth >= 768 ? 64 : 56);
    };

    updateSlotHeight();
    window.addEventListener("resize", updateSlotHeight);

    return () => {
      window.removeEventListener("resize", updateSlotHeight);
    };
  }, []);

  return (
    <Container className="mt-5">
      {/* TODO: move this to a heading section */}
      <Row className="justify-content-center">
        <Col xs="auto" md="8" lg="6">
          <h1 className="text-center">Cane Gatto Stivali</h1>
          <p className="mb-4 text-center">
            Indovina la parola usando quella precedente come indizio!
          </p>
        </Col>
      </Row>

      <Row>
        <Col className="guessed-word__container overflow-hidden">
          {wordSequence.map((word, wordSequenceIndex) => (
            <Row
              key={word}
              className="guessed-word flex-nowrap justify-content-center gap-1 gap-md-2 pointer-events-none"
              style={{
                transform: `translateY(-${
                  (currentWordIndex - 1) * slotHeight
                }px)`,
              }}
            >
              {word.split("").map((_, index) => (
                <Col xs="auto" key={index} className="guessed-word__slot p-0">
                  <Button
                    variant={
                      wordSequenceIndex < currentWordIndex
                        ? "primary"
                        : wordSequenceIndex === currentWordIndex
                        ? buttonVariants[index] || "outline-secondary"
                        : "outline-secondary"
                    }
                    className="keyboard__btn p-1"
                  >
                    {wordSequenceIndex < currentWordIndex
                      ? wordSequence[wordSequenceIndex][index]
                      : wordSequenceIndex === currentWordIndex
                      ? guessedWord[index]
                      : ""}
                  </Button>
                </Col>
              ))}
            </Row>
          ))}
        </Col>
      </Row>

      <p className="text-center mt-3">{message}</p>

      <Keyboard onKeyPress={handleKeyPress} />
    </Container>
  );
};

export default HomePage;
