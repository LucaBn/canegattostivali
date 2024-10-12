import React, { useEffect, useState } from "react";

// Components
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Keyboard from "@/components/UI/Organisms/Keyboard/Keyboard";

const wordData = [
  {
    word: "GATTO",
    clues: ["BAFFI", "CODA", "STIVALI"],
  },
];

const HomePage: React.FC = () => {
  const [currentWordIndex /* , setCurrentWordIndex */] = useState<number>(0);
  const [guessedWord, setGuessedWord] = useState<string>("");

  const { word, clues } = wordData[currentWordIndex];

  // const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setGuessedWord(e.target.value.toUpperCase());
  // };

  // const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (guessedWord === word) {
  //     alert("Hai indovinato!");
  //   } else {
  //     alert("Riprova!");
  //   }
  // };

  const handleKeyPress = (key: string) => {
    if (key === "DEL") {
      if (guessedWord.length) {
        const guessedWordWithoutLastLetter = guessedWord.slice(0, -1);
        setGuessedWord(guessedWordWithoutLastLetter);
      } else {
        console.log("Pulsing letters!");
      }
      return;
    }

    if (key === "INVIO") {
      if (guessedWord.length === word.length) {
        if (guessedWord === word) {
          alert("OK");
        } else {
          alert("KO");
        }
      } else {
        console.log("Pulsing letters!");
      }
      return;
    }

    if (guessedWord.length < word.length) {
      setGuessedWord(guessedWord + key);
    } else {
      console.log("Pulsing letters!");
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Backspace") {
        handleKeyPress("DEL");
      } else if (key === "Enter") {
        handleKeyPress("INVIO");
      } else if (/^[A-Za-z]$/.test(key)) {
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [guessedWord]);

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
                    <Button variant="secondary">{clue}</Button>
                  </Col>
                ))}
              </Row>
              <Row className="guessedword justify-content-center mt-3 mb-1 gap-1 gap-md-2">
                {word.split("").map((_, index) => (
                  <Col
                    xs="auto"
                    key={index}
                    className="guessedword__slot mb-1 p-0"
                  >
                    <Button
                      variant={
                        guessedWord[index] ? "primary" : "outline-secondary"
                      }
                      className="keyboard__btn p-1"
                    >
                      {guessedWord[index]}
                    </Button>
                  </Col>
                ))}
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
