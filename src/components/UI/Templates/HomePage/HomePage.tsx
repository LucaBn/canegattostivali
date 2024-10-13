import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

const wordData = [
  {
    word: "GATTO",
    clues: ["BAFFI", "CODA", "STIVALI"],
  },
];

const HomePage: React.FC = () => {
  const [currentWordIndex] = useState<number>(0);
  const [guessedWord, setGuessedWord] = useState<string>("");
  const [guessedWordButtonVariant, setGuessedWordButtonVariant] = useState<
    string[]
  >([]);
  const [message, setMessage] = useState<string>("");

  const { word, clues } = wordData[currentWordIndex];

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "DEL") {
        setGuessedWord((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "INVIO") {
        if (guessedWord.length === word.length) {
          setMessage(
            guessedWord === word ? "Corretto!" : "Prova un'altra parola!"
          );
        }
        return;
      }

      if (guessedWord.length < word.length) {
        setGuessedWord((prev) => prev + key);
      }
    },
    [guessedWord, word]
  );

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
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                Indovina la parola!
              </Card.Title>

              <p className="mb-0 text-center">Parole di aiuto:</p>
              <Row className="justify-content-center mb-1 gap-1 gap-md-2">
                {clues.map((clue) => (
                  <Col xs="auto" key={clue} className="mb-1 p-0">
                    <Button variant="warning" className="pointer-events-none">
                      {clue}
                    </Button>
                  </Col>
                ))}
              </Row>

              <Row className="guessedword justify-content-center mt-3 mb-1 gap-1 gap-md-2 pointer-events-none">
                {word.split("").map((_, index) => (
                  <Col
                    xs="auto"
                    key={index}
                    className="guessedword__slot mb-1 p-0"
                  >
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
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Keyboard onKeyPress={handleKeyPress} />
      </Row>
    </Container>
  );
};

export default HomePage;
