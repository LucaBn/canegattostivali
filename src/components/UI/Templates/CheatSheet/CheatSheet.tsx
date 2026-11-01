import { useMemo, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { WORD_LIST } from "@/constants/wordList";
import levelList from "@/assets/data/levelList.json";

type WordEntry = {
  word: string;
  nextWordList: string[];
};

type Level = {
  id: number;
  wordList: string[];
};

const wordList = WORD_LIST as WordEntry[];
const levels = levelList as Level[];

function CheatSheet() {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toUpperCase();

  const matchingWords = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }

    return wordList.filter(({ word }) =>
      word.toUpperCase().includes(normalizedSearch),
    );
  }, [normalizedSearch]);

  return (
    <Container className="py-4">
      <Button variant="primary" href="/" className="mb-4">
        Torna al gioco
      </Button>

      <h1>Cheat Sheet</h1>

      <p className="text-muted">
        Cerca una parola per vedere tutti i collegamenti disponibili nella
        modalità Random oppure consulta le soluzioni dei livelli.
      </p>

      <section className="mb-5">
        <h2>Random</h2>

        <Form.Group className="mb-4" controlId="word-search">
          <Form.Label>Cerca una parola</Form.Label>
          <Form.Control
            type="search"
            placeholder="Es. GATTO"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Form.Group>

        {search.trim() && matchingWords.length === 0 && (
          <p className="text-muted">Nessuna parola trovata.</p>
        )}

        <Row xs={1} md={2} lg={3} className="g-3">
          {matchingWords.map(({ word, nextWordList }) => (
            <Col key={word}>
              <Card>
                <Card.Body>
                  <Card.Title>{word}</Card.Title>

                  <div className="d-flex flex-wrap gap-2">
                    {nextWordList.map((nextWord) => (
                      <span key={nextWord} className="badge bg-secondary">
                        {nextWord}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <h2>Livelli</h2>

        <Accordion>
          {levels.map((level) => (
            <Accordion.Item eventKey={String(level.id)} key={level.id}>
              <Accordion.Header>Livello {level.id}</Accordion.Header>

              <Accordion.Body>
                <div className="d-flex flex-wrap align-items-center gap-2">
                  {level.wordList.map((word, index) => (
                    <span key={`${level.id}-${word}`}>
                      <span className="badge bg-primary">{word}</span>

                      {index < level.wordList.length - 1 && (
                        <span className="mx-2">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </Container>
  );
}

export default CheatSheet;
