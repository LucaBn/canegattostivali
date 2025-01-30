import React from "react";

// Components
import { Button, Row, Col } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";

// Types
import { ButtonVariant } from "react-bootstrap/esm/types";

const keys: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "CANC"], // TODO: put delete icon instead of "CANC"
];

interface KeyboardProps {
  currentWord: string;
  filterKeys: boolean;
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
  currentWord,
  filterKeys,
  onKeyPress,
}) => {
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
    return (
      key !== "INVIO" &&
      key !== "CANC" &&
      filterKeys &&
      !currentWord.substring(1).includes(key)
    );
  };

  const isSpecialKey = (key: string) => {
    return key === "INVIO" || key === "CANC"
      ? "keyboard__btn--no-width-rules"
      : "";
  };

  const getButtonContent = (key: string) => {
    if (key === "CANC") {
      return (
        <div className="h-100 d-flex align-items-center keyboard__btn--canc">
          <IconDelete forceColor="#fff" />
        </div>
      );
    } else {
      return key;
    }
  };

  return (
    <Row className="justify-content-center">
      <Col className="keyboard mt-3">
        {keys.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            className="justify-content-center mb-2 gap-1 gap-md-2"
          >
            {row.map((key) => (
              <Col xs="auto" key={key} className="p-0">
                <Button
                  variant={getButtonVariant(key)}
                  onClick={(e) => handleKeyClick(e, key)}
                  className={`keyboard__btn ${isSpecialKey(key)} p-1`}
                  disabled={isKeyDisabled(key)}
                >
                  {getButtonContent(key)}
                </Button>
              </Col>
            ))}
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export default Keyboard;
