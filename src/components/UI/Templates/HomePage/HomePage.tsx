import React, { useState } from "react";

// Components
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const wordData = [
  {
    word: "GATTO",
    clues: ["BAFFI", "CODA", "STIVALI"],
  },
  {
    word: "CANE",
    clues: ["ABBAIA", "CUCCIA", "ZAMPE"],
  },
];

const HomePage: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [guessedWord, setGuessedWord] = useState<string>("");
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [score, setScore] = useState<number>(100);

  const { word, clues } = wordData[currentWordIndex];

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuessedWord(e.target.value.toUpperCase());
  };

  const handleRevealLetter = () => {
    if (revealedLetters.length < word.length) {
      setRevealedLetters([...revealedLetters, word[revealedLetters.length]]);
      setScore(score - 10);
    }
  };

  const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (guessedWord === word) {
      alert("Hai indovinato!");
    } else {
      alert("Riprova!");
    }
  };

  const handleClueClick = (clue: string) => {
    const nextWordIndex = wordData.findIndex((data) =>
      data.clues.includes(clue)
    );
    setCurrentWordIndex(nextWordIndex);
    setGuessedWord("");
    setRevealedLetters([]);
    setScore(100);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Indovina la parola!</Card.Title>
              <div className="word-box">
                {word.split("").map((letter, idx) => (
                  <span key={idx} className="letter-box">
                    {revealedLetters.includes(letter) ? letter : "_"}
                  </span>
                ))}
              </div>
              <Form onSubmit={handleGuessSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Inserisci la tua risposta:</Form.Label>
                  <Form.Control
                    type="text"
                    value={guessedWord}
                    onChange={handleGuessChange}
                    maxLength={word.length}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Invia
                </Button>
              </Form>
              <Button className="mt-3" onClick={handleRevealLetter}>
                Rivela una lettera (Penalità: -10 punti)
              </Button>
              <p>Punteggio: {score}</p>
              <div className="mt-4">
                <h5>Parole di aiuto:</h5>
                {clues.map((clue, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    onClick={() => handleClueClick(clue)}
                    className="me-2"
                  >
                    {clue}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
