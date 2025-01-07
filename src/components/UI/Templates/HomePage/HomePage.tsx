import React, { useState, useEffect, useCallback, useRef } from "react";

// Components
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import Confetti from "@/components/UI/Atoms/Confetti/Confetti";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

// Utils
import { createWordSequence } from "@/utils/game-logic";
import { normalizeLetter } from "@/utils/string";
import { formatTime } from "@/utils/time";

// Constants
import { WORD_LIST_LENGTH } from "@/constants/wordList";

const wordSequence = createWordSequence();

console.log({ wordSequence });

const HomePage: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(1);
  const [guessedWord, setGuessedWord] = useState<string>(wordSequence[1][0]);
  const [buttonVariants, setButtonVariants] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("🤔");
  const [slotHeight, setSlotHeight] = useState<number>(56);
  const [isBuzzing, setIsBuzzing] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [filterKeys, setFilterKeys] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showExtraTimeTooltip, setShowExtraTimeTooltip] =
    useState<boolean>(false);

  const isKeyPressEnabled = useRef<boolean>(true);

  const currentWord = wordSequence[currentWordIndex];

  const updateButtonVariants = useCallback(() => {
    setButtonVariants(
      currentWord
        .split("")
        .map((_, index) =>
          guessedWord[index] ? "primary" : "outline-secondary"
        )
    );
  }, [guessedWord, currentWordIndex]);

  const isLastWord = currentWordIndex === WORD_LIST_LENGTH - 1;

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!isKeyPressEnabled.current) return;

      const normalizedKey = normalizeLetter(key);

      if (
        key !== "INVIO" &&
        key !== "CANC" &&
        filterKeys &&
        !currentWord.substring(1).includes(normalizedKey)
      )
        return;

      if (!isGameEnded) {
        setIsGameRunning(true);
      }
      setMessage("🤔");

      if (key === "CANC") {
        setGuessedWord((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
      } else if (key === "INVIO") {
        if (guessedWord === currentWord) {
          if (isLastWord) {
            setIsGameEnded(true);
            setIsGameRunning(false);
          }
          isKeyPressEnabled.current = false;
          setMessage("😃");
          setIsCorrect(true);
          setTimeout(() => {
            setIsCorrect(false);
          }, 450);

          setTimeout(() => {
            setFilterKeys(false);

            if (isLastWord) {
              setMessage("🥳");
              setShowConfetti(true);
              setTimeout(() => {
                setShowConfetti(false);
              }, 3000);
            } else {
              setMessage("🤔");
              setGuessedWord(wordSequence[currentWordIndex + 1][0]);
              setCurrentWordIndex((prev) => prev + 1);
              isKeyPressEnabled.current = true;
            }
          }, 1000);
        } else {
          setMessage("😓");
          setIsBuzzing(true);
          setTimeout(() => {
            setIsBuzzing(false);
          }, 500);
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      } else if (
        /^[A-Za-z]$/.test(normalizedKey) &&
        guessedWord.length < currentWord.length
      ) {
        setGuessedWord((prev) => prev + normalizedKey.toUpperCase());
      }
    },
    [guessedWord, currentWordIndex]
  );

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      const mappedKey =
        { Backspace: "CANC", Enter: "INVIO" }[key] || key.toUpperCase();
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
    if (isGameRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isGameRunning]);

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
    if (wordSequenceIndex === currentWordIndex && isCorrect) {
      return "success";
    }

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
        ? "theme-sensitive-color bg-transparent border-0"
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

  const useHelp = () => {
    if (isGameEnded) {
      return;
    }

    setIsGameRunning(true);

    if (filterKeys) {
      return;
    }

    setFilterKeys(true);
    setTime((prevTime) => prevTime + 10);
    setGuessedWord(wordSequence[currentWordIndex][0]);
    setShowExtraTimeTooltip(true);
    setTimeout(() => {
      setShowExtraTimeTooltip(false);
    }, 1500);
  };

  return (
    <Container className="mt-5">
      <TopSection />

      {/* TODO: rewrite this as a <Row> component */}
      <div className="d-flex justify-content-center align-items-center mb-1 mb-lg-2 gap-4 user-select-none">
        <Badge
          bg="dark"
          pill
          title={`Devi indovinare la parola numero ${currentWordIndex} su ${
            WORD_LIST_LENGTH - 1
          }`}
          className="fs-6"
        >
          {currentWordIndex} / {WORD_LIST_LENGTH - 1}
        </Badge>

        {/* TODO: create a component for this */}
        <p className="position-relative d-block fs-2 text-center">{message}</p>

        <Badge bg="dark" pill title="Timer" className="position-relative fs-6">
          <span
            className={`extra-time-tooltip ${
              showExtraTimeTooltip ? "extra-time-tooltip--visible" : ""
            } text-secondary`}
          >
            +10s
          </span>
          {formatTime(time)}
        </Badge>
      </div>

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
                  } ${
                    wordSequenceIndex === currentWordIndex && isBuzzing
                      ? "buzz"
                      : ""
                  } ${
                    wordSequenceIndex === currentWordIndex && isCorrect
                      ? "correct"
                      : ""
                  }`}
                  style={{
                    maxWidth: `calc((100dvw / ${
                      word.split("").length
                    }) - 0.5rem)`, // Remove 0.5rem because of the gap
                  }}
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
                    style={{
                      maxWidth: `calc((100dvw / ${
                        word.split("").length
                      }) - 0.5rem)`, // Remove 0.5rem because of the gap
                    }}
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

      {showConfetti && <Confetti />}

      <div className="d-flex justify-content-center align-items-center user-select-none">
        <span
          title="Chiedi un aiuto!"
          className="mt-5 fs-2 cursor-pointer"
          onClick={useHelp}
        >
          💡
        </span>
      </div>

      <Keyboard
        currentWord={currentWord}
        filterKeys={filterKeys}
        onKeyPress={handleKeyPress}
      />
    </Container>
  );
};

export default HomePage;
