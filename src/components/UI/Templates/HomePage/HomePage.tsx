import React, { useState, useEffect, useRef } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import InfoSection from "@/components/UI/Molecules/InfoSection/InfoSection";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";
import Confetti from "@/components/UI/Atoms/Confetti/Confetti";
import EndGameModal from "@/components/UI/Organisms/EndGameModal/EndGameModal";

// Utils
import { createWordSequence } from "@/utils/game-logic";
import { normalizeLetter } from "@/utils/string";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Constants
import { WORD_LIST_LENGTH } from "@/constants/wordList";
import { APP_NAME_SHORT } from "@/constants/app";

// Typings
import { ButtonVariant } from "react-bootstrap/esm/types";
import { UserData } from "@/typings/user";
type Message = "🤔" | "😃" | "😓" | "🥳";

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_USER_DATA_VARIABLE = `${lowercaseAppName}UserData`;

const initialWordSequence = createWordSequence();

console.log({ initialWordSequence });

const HomePage: React.FC = () => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_USER_DATA_VARIABLE
  );

  const [wordSequence, setWordSequence] = useState(initialWordSequence);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(1);
  const [guessedWord, setGuessedWord] = useState<string>(wordSequence[1][0]);
  const [buttonVariants, setButtonVariants] = useState<ButtonVariant[]>([]);
  const [message, setMessage] = useState<Message>("🤔");
  const [slotHeight, setSlotHeight] = useState<number>(56);
  const [isBuzzing, setIsBuzzing] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [showExtraTimeTooltip, setShowExtraTimeTooltip] =
    useState<boolean>(false);
  const [showEndGameModal, setShowEndGameModal] = useState<boolean>(false);
  const [isUserBestTime, setIsUserBestTime] = useState<boolean>(false);

  const isKeyPressEnabled = useRef<boolean>(true);
  const filterKeys = useRef<boolean>(false); // 😭😭😭

  const currentWord = wordSequence[currentWordIndex];
  const isLastWord = currentWordIndex === WORD_LIST_LENGTH - 1;

  const updateButtonVariants = () => {
    setButtonVariants(
      currentWord
        .split("")
        .map((_, index) =>
          guessedWord[index] ? "primary" : "outline-secondary"
        )
    );
  };

  const checkIfUserBestTime = () => {
    if (
      (storedUserData &&
        storedUserData.bestTime > 0 &&
        time < storedUserData.bestTime) ||
      (storedUserData && storedUserData.bestTime === 0)
    ) {
      setIsUserBestTime(true);
    }
  };

  const updateStoredUserData = () => {
    const userMatchesWon: number =
      (storedUserData && storedUserData?.matchesWon + 1) || 1;
    const userBestTime: number =
      storedUserData &&
      storedUserData?.bestTime > 0 &&
      storedUserData?.bestTime < time
        ? storedUserData?.bestTime
        : time;
    writeToLocalStorage(LS_USER_DATA_VARIABLE, {
      ...storedUserData,
      matchesWon: userMatchesWon,
      bestTime: userBestTime,
    });
  };

  const handleKeyPress = (key: string) => {
    if (!isKeyPressEnabled.current) return;

    const normalizedKey = normalizeLetter(key);

    if (
      key !== "INVIO" &&
      key !== "CANC" &&
      key !== "1" &&
      filterKeys.current &&
      !currentWord.substring(1).includes(normalizedKey)
    )
      return;

    if (!isGameEnded) {
      setIsGameRunning(true);
    }
    setMessage("🤔");

    if (key === "1") {
      getHelp();
    } else if (key === "CANC") {
      setGuessedWord((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    } else if (key === "INVIO") {
      if (guessedWord === currentWord) {
        if (isLastWord) {
          checkIfUserBestTime();
          setIsGameEnded(true);
          setTimeout(() => {
            updateStoredUserData(); // Update UserData here to be sure that time is stopped
            setShowEndGameModal(true);
          }, 2000);
          setIsGameRunning(false);
        }
        isKeyPressEnabled.current = false;
        setMessage("😃");
        setIsCorrect(true);
        setTimeout(() => {
          setIsCorrect(false);
        }, 450);

        setTimeout(() => {
          filterKeys.current = false;

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
      /^[A-ZÀÈÌÒÙ]$/.test(normalizedKey) &&
      guessedWord.length < currentWord.length
    ) {
      setGuessedWord((prev) => prev + normalizedKey.toUpperCase());
    }
  };

  const handleKeydown = ({ key }: KeyboardEvent) => {
    const mappedKey =
      { Backspace: "CANC", Enter: "INVIO" }[key] || key.toUpperCase();
    handleKeyPress(mappedKey);
  };

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

  const getHelp = () => {
    if (filterKeys.current || isGameEnded) {
      return;
    }

    filterKeys.current = true;
    setTime((prevTime) => prevTime + 10);
    setGuessedWord(wordSequence[currentWordIndex][0]);
    setShowExtraTimeTooltip(true);
    setTimeout(() => {
      setShowExtraTimeTooltip(false);
    }, 1500);
  };

  const startGame = () => {
    const newWordSequence = createWordSequence();
    console.log({ newWordSequence });
    setWordSequence(newWordSequence);
    setCurrentWordIndex(1);
    setGuessedWord(newWordSequence[1][0]);
    setMessage("🤔");
    setIsGameRunning(false);
    setIsGameEnded(false);
    setTime(0);
    setShowConfetti(false);
    setIsUserBestTime(false);
    isKeyPressEnabled.current = true;
  };

  return (
    <Container className="mt-3 mt-md-5">
      <TopSection />

      <InfoSection
        isGameEnded={isGameEnded}
        currentWordIndex={currentWordIndex}
        message={message}
        showExtraTimeTooltip={showExtraTimeTooltip}
        time={time}
      />

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

      {showEndGameModal && (
        <EndGameModal
          show={showEndGameModal}
          time={time}
          isUserBestTime={isUserBestTime}
          wordSequence={wordSequence}
          setShow={setShowEndGameModal}
          startGame={startGame}
        />
      )}

      <Keyboard
        currentWord={currentWord}
        filterKeys={filterKeys.current}
        onKeyPress={handleKeyPress}
        getHelp={getHelp}
      />
    </Container>
  );
};

export default HomePage;
