import React, { useState, useEffect, useCallback, useRef } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

// Utils
import { createWordSequence } from "@/utils/game-logic";

// Constants
import { WORD_SEQUENCE_LENGTH } from "@/constants/wordList";

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
              setMessage("🥳");
            } else {
              setMessage("🤔");
              setGuessedWord(wordSequence[currentWordIndex + 1][0]);
              setCurrentWordIndex((prev) => prev + 1);
              isKeyPressEnabled.current = true;
            }
          }, 1000);
        } else {
          setMessage("😓");
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
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

  const getButtonVariant = (
    index: number,
    wordSequenceIndex: number,
    currentWordIndex: number
  ): string => {
    return wordSequenceIndex < currentWordIndex
      ? "primary"
      : wordSequenceIndex === currentWordIndex
      ? buttonVariants[index] || "outline-secondary"
      : "outline-secondary";
  };

  const getButtonClass = (
    wordSequenceIndex: number,
    currentWordIndex: number
  ): string => {
    return `p-1 ${
      wordSequenceIndex < currentWordIndex
        ? "theme-sensitive-button bg-transparent border-0"
        : wordSequenceIndex === currentWordIndex + 1
        ? "opacity-50"
        : wordSequenceIndex > currentWordIndex + 1
        ? "opacity-0"
        : ""
    }`;
  };

  const getButtonLetter = (
    index: number,
    wordSequenceIndex: number,
    currentWordIndex: number
  ) => {
    return wordSequenceIndex < currentWordIndex
      ? wordSequence[wordSequenceIndex][index]
      : wordSequenceIndex === currentWordIndex
      ? guessedWord[index]
      : "";
  };

  return (
    <Container className="mt-5">
      <TopSection />

      <Row>
        <Col className="guessed-word__container overflow-hidden">
          {wordSequence.map((word, wordSequenceIndex) => (
            <Row
              key={word}
              className="guessed-word flex-nowrap justify-content-center gap-1 gap-md-2 pointer-events-none"
              style={{
                transform: `translateY(${
                  -(currentWordIndex - 1) * slotHeight
                }px) ${
                  wordSequenceIndex === currentWordIndex + 1
                    ? "scale(0.85)"
                    : ""
                }`,
                transformOrigin: "bottom",
              }}
            >
              {word.split("").map((_, index) => (
                <Col
                  xs="auto"
                  key={index}
                  className={`guessed-word__slot text-center p-0 ${
                    wordSequenceIndex < currentWordIndex
                      ? "guessed-word__slot--previous"
                      : ""
                  }`}
                >
                  <Button
                    variant={getButtonVariant(
                      index,
                      wordSequenceIndex,
                      currentWordIndex
                    )}
                    className={getButtonClass(
                      wordSequenceIndex,
                      currentWordIndex
                    )}
                  >
                    {getButtonLetter(
                      index,
                      wordSequenceIndex,
                      currentWordIndex
                    )}
                  </Button>
                </Col>
              ))}
            </Row>
          ))}
        </Col>
      </Row>

      {/* TODO: create a component for this */}
      <p className="h2 text-center mt-5">{message}</p>

      <Keyboard onKeyPress={handleKeyPress} />
    </Container>
  );
};

export default HomePage;
