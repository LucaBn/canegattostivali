import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

// Constants
import { wordList } from "@/constants/wordList";

// Utils
import { shuffle } from "@/utils/array";
import { getRandomIntInclusive } from "@/utils/number";

const initialIndex: number = getRandomIntInclusive(0, wordList.length - 1);

// TODO: generate a chain of n words before starting the game, so I'll be sure there will not be errors

const HomePage: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] =
    useState<number>(initialIndex);
  const [guessedWord, setGuessedWord] = useState<string>("");
  const [previousGuessedWords, setPreviousGuessedWords] = useState<string[]>(
    []
  );
  const [buttonVariants, setButtonVariants] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const isKeyPressEnabled = useRef<boolean>(true);
  const guessedWordRef = useRef<HTMLDivElement>(null);

  const { word, nextWordList } = wordList[currentWordIndex];

  const nextWord = useMemo(() => {
    const filteredNextWords = nextWordList.filter(
      (word) => !previousGuessedWords.includes(word)
    );
    if (filteredNextWords.length === 0) {
      setMessage("Fine!");
      return "";
    }

    const shuffedFilteredNextWords = shuffle(filteredNextWords);

    if (previousGuessedWords.length === 0) {
      setPreviousGuessedWords([word]);
    }

    const nextWordFirstLetter = shuffedFilteredNextWords[0][0];
    setGuessedWord(nextWordFirstLetter);
    return shuffedFilteredNextWords[0];
  }, [currentWordIndex]);

  const updateButtonVariants = useCallback(() => {
    setButtonVariants(
      nextWord
        .split("")
        .map((_, index) =>
          guessedWord[index] ? "primary" : "outline-secondary"
        )
    );
  }, [guessedWord, nextWord]);

  const goToNextWord = (nextWord: string) => {
    const newIndex = wordList.findIndex(
      (wordObject) => wordObject.word === nextWord
    );
    if (newIndex !== -1) {
      setCurrentWordIndex(newIndex);
      if (guessedWordRef.current) {
        guessedWordRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else {
      setGuessedWord("");
      setMessage("Fine!");
    }
  };

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!isKeyPressEnabled.current) {
        return;
      }

      if (key === "DEL") {
        if (guessedWord.length >= 2) {
          setGuessedWord((prev) => prev.slice(0, -1));
        }
      } else if (key === "INVIO") {
        if (guessedWord === nextWord) {
          isKeyPressEnabled.current = false;
          setMessage("Corretto!");
          setTimeout(() => {
            isKeyPressEnabled.current = true;
            setPreviousGuessedWords((prev) => [...prev, guessedWord]);
            goToNextWord(guessedWord);
          }, 1000);
        } else {
          setMessage("Prova un'altra parola!");
        }
      } else if (
        /^[A-Za-z]$/.test(key) &&
        guessedWord.length < nextWord.length
      ) {
        setGuessedWord((prev) => prev + key.toUpperCase());
      }
    },
    [guessedWord, nextWord]
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
    if (nextWord !== "") {
      setMessage("");
    }
    updateButtonVariants();
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [guessedWord, word]);

  console.log({ isKeyPressEnabled });
  console.log({ nextWord });

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

      <Row className="flex-column align-items-center mb-1 gap-1 gap-md-2">
        {previousGuessedWords.map((prevWord, index) => (
          <Col xs="auto" key={prevWord + index} className="mb-1 p-0">
            <Button variant="warning" className="pointer-events-none">
              {prevWord}
            </Button>
          </Col>
        ))}
      </Row>

      <Row
        ref={guessedWordRef}
        className="guessedword justify-content-center mt-3 mb-1 gap-1 gap-md-2 pointer-events-none"
      >
        {nextWord.split("").map((_, index) => (
          <Col xs="auto" key={index} className="guessedword__slot mb-1 p-0">
            <Button
              variant={buttonVariants[index] || "outline-secondary"}
              className="keyboard__btn p-1"
            >
              {guessedWord[index]}
            </Button>
          </Col>
        ))}
        <p className="text-center">{message}</p>
      </Row>

      <Keyboard onKeyPress={handleKeyPress} />
    </Container>
  );
};

export default HomePage;
