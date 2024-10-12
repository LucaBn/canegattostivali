import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const keys: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "DEL"], // TODO: put delete icon instead of "DEL"
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const handleKeyClick = (key: string) => {
    onKeyPress(key);
  };

  return (
    <Container className="keyboard mt-3">
      {keys.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          className="justify-content-center mb-1 gap-1 gap-md-2"
        >
          {row.map((key) => (
            <Col xs="auto" key={key} className="mb-1 p-0">
              <Button
                variant="secondary"
                onClick={() => handleKeyClick(key)}
                className="keyboard__btn p-1"
              >
                {key}
              </Button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
