import React, { useState, useEffect, useRef } from "react";

// Components
import { Row, Col, Button } from "react-bootstrap";
import InfoSection from "@/components/UI/Molecules/InfoSection/InfoSection";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";
import EndGameModal from "@/components/UI/Organisms/EndGameModal/EndGameModal";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Utils
import { createWordSequence } from "@/utils/game";
import { normalizeLetter } from "@/utils/string";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";

// Constants
import { RUN_TEST } from "@/constants/app";
import { LS_KEY_LIST } from "@/constants/localStorage";
import { WORD_LIST_LENGTH } from "@/constants/wordList";

// Typings
import { ButtonVariant } from "react-bootstrap/esm/types";
import { Mode } from "@/typings/game";
import { UserData } from "@/typings/user";
import { KeyboardStatusList } from "@/typings/keyboardStatus";
type Message = "🤔" | "😃" | "😓" | "🥳";

interface Props {
  initialWordSequence: string[];
  mode: Mode;
  level?: number;
  setMode?: (newMode: "random" | "levels" | "custom") => void;
  handleLevelChange?: (levelId: number) => void;
}

const GameSection: React.FC<Props> = ({
  initialWordSequence,
  level,
  mode,
  setMode,
  handleLevelChange,
}: Props) => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_KEY_LIST.USER_DATA
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
  const [showExtraTimeTooltip, setShowExtraTimeTooltip] = useState<number>(0);
  const [showEndGameModal, setShowEndGameModal] = useState<boolean>(false);
  const [isUserBestTime, setIsUserBestTime] = useState<boolean>(false);

  const isKeyPressEnabled = useRef<boolean>(true);
  const filterKeys = useRef<boolean>(false);
  const disableHelpBonusLetterButton = useRef<boolean>(false);
  const bonusLetters = useRef<number>(0);
  const gameSectionRef = useRef<HTMLDivElement>(null);

  const currentWord = wordSequence[currentWordIndex];
  const isLastWord = currentWordIndex === wordSequence.length - 1;

  const { keyboardStatus } = useKeyboardStatus();

  useEffect(() => {
    if (keyboardStatus === KeyboardStatusList.Inactive) {
      isKeyPressEnabled.current = false;
    } else {
      isKeyPressEnabled.current = true;
    }
  }, [keyboardStatus]);

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
    if (mode === "random") {
      const userMatchesWon: number =
        (storedUserData && storedUserData?.matchesWon + 1) || 1;
      const userBestTime: number =
        storedUserData &&
        storedUserData?.bestTime > 0 &&
        storedUserData?.bestTime < time
          ? storedUserData?.bestTime
          : time;
      writeToLocalStorage(LS_KEY_LIST.USER_DATA, {
        ...storedUserData,
        matchesWon: userMatchesWon,
        bestTime: userBestTime,
      });
    } else if (mode === "levels") {
      writeToLocalStorage(LS_KEY_LIST.USER_DATA, {
        ...storedUserData,
        lastLevelCompleted: level,
      });
    }
  };

  const handleWordGuess = () => {
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

    setTimeout(() => {
      bonusLetters.current = 0;
      disableHelpBonusLetterButton.current = false;
    }, 1500);
  };

  const handleKeyPress = (key: string) => {
    if (!isKeyPressEnabled.current) return;

    if (isCorrect) return;

    const normalizedKey = normalizeLetter(key);

    if (
      key !== "INVIO" &&
      key !== "CANC" &&
      key !== "1" &&
      key !== "2" &&
      filterKeys.current &&
      !currentWord.substring(1).includes(normalizedKey)
    )
      return;

    if (!isGameEnded) {
      setIsGameRunning(true);
    }

    setMessage("🤔");

    if (key === "1") {
      getHelpKeyboardFilter();
    } else if (key === "2" && !disableHelpBonusLetterButton.current) {
      getHelpBonusLetter();
    } else if (key === "CANC") {
      setGuessedWord((prev) =>
        prev.length > bonusLetters.current + 1 ? prev.slice(0, -1) : prev
      );
    } else if (key === "INVIO") {
      if (guessedWord === currentWord) {
        handleWordGuess();
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

  const getHelpKeyboardFilter = () => {
    if (filterKeys.current || isGameEnded) {
      return;
    }

    filterKeys.current = true;
    setTime((prevTime) => prevTime + 10);
    const partialSolution = wordSequence[currentWordIndex].slice(
      0,
      bonusLetters.current + 1
    );
    setGuessedWord(partialSolution);
    setShowExtraTimeTooltip(10);
    setTimeout(() => {
      setShowExtraTimeTooltip(0);
    }, 1500);
  };

  const getHelpBonusLetter = () => {
    if (
      isGameEnded ||
      bonusLetters.current === currentWord.length - 1 ||
      disableHelpBonusLetterButton.current
    ) {
      return;
    }

    const partialSolution = wordSequence[currentWordIndex].slice(
      0,
      bonusLetters.current + 2
    );

    setGuessedWord(partialSolution);
    setTime((prevTime) => prevTime + 5);
    bonusLetters.current = bonusLetters.current + 1;
    setShowExtraTimeTooltip(5);
    disableHelpBonusLetterButton.current = true;
    if (bonusLetters.current === currentWord.length - 1) {
      handleWordGuess();
    }
    setTimeout(() => {
      setShowExtraTimeTooltip(0);
      if (bonusLetters.current < currentWord.length - 1) {
        disableHelpBonusLetterButton.current = false;
      }
    }, 1500);
  };

  const startRandomGame = () => {
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, document.title, url.toString());

    setMode && setMode("random");

    const newWordSequence = createWordSequence({
      wordListLength: WORD_LIST_LENGTH,
    });
    if (RUN_TEST === "true") {
      console.log({ newWordSequence });
    }
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

    requestAnimationFrame(() => {
      scrollToGameSection();
    });
  };

  const scrollToGameSection = () => {
    if (gameSectionRef.current) {
      gameSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={gameSectionRef}
      className="w-100"
      style={{
        scrollMarginTop: 85, // Navbar height + 20px
      }}
    >
      <InfoSection
        isGameEnded={isGameEnded}
        showConfetti={showConfetti}
        wordListLength={wordSequence.length}
        currentWordIndex={currentWordIndex}
        message={message}
        showExtraTimeTooltip={showExtraTimeTooltip}
        time={time}
        level={level}
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

      {showEndGameModal && (
        <EndGameModal
          show={showEndGameModal}
          time={time}
          mode={mode}
          isUserBestTime={isUserBestTime}
          wordSequence={wordSequence}
          setShow={setShowEndGameModal}
          startRandomGame={startRandomGame}
          setMode={setMode}
          handleLevelChange={handleLevelChange}
          level={level}
        />
      )}

      <Keyboard
        currentWord={currentWord}
        filterKeys={filterKeys.current}
        onKeyPress={handleKeyPress}
        getHelpKeyboardFilter={getHelpKeyboardFilter}
        getHelpBonusLetter={getHelpBonusLetter}
        disableHelpBonusLetterButton={disableHelpBonusLetterButton.current}
        bonusLetters={bonusLetters.current}
      />
    </div>
  );
};

export default GameSection;
