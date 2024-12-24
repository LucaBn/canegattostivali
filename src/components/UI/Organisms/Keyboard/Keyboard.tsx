import React from "react";

// Components
import { Button, Container, Row, Col } from "react-bootstrap";

// Types
import { ButtonVariant } from "react-bootstrap/esm/types";

const keys: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "CANC"], // TODO: put delete icon instead of "CANC"
];

interface KeyboardProps {
  currentWord: string;
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ currentWord, onKeyPress }) => {
  const handleKeyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: string
  ) => {
    e.currentTarget.blur();
    onKeyPress(key);
  };

  const getButtonVariant = (key: string): ButtonVariant => {
    if (key === "INVIO") {
      return "success";
    } else if (key === "CANC") {
      return "danger";
    } else {
      return "secondary";
    }
  };

  const isKeyDisabled = (key: string) => {
    // TODO: enable/disable this in easy/hard mode
    return (
      key !== "INVIO" &&
      key !== "CANC" &&
      !currentWord.substring(1).includes(key)
    );
  };

  return (
    <Container className="keyboard mt-5">
      {keys.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          className="justify-content-center mb-1 gap-1 gap-md-2"
        >
          {row.map((key) => (
            <Col xs="auto" key={key} className="mb-1 p-0">
              <Button
                variant={getButtonVariant(key)}
                onClick={(e) => handleKeyClick(e, key)}
                className="keyboard__btn p-1"
                disabled={isKeyDisabled(key)}
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
