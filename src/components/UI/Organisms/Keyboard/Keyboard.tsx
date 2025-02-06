import React from "react";

// Components
import { Row, Col } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";

// Utils
import { generateClassNameValue } from "@/utils/html-classes";

const keys: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "È", "Ì"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ò", "À", "Ù"],
  ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "CANC", "HELP"],
];

interface KeyboardProps {
  currentWord: string;
  filterKeys: boolean;
  onKeyPress: (key: string) => void;
  getHelp: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
  currentWord,
  filterKeys,
  onKeyPress,
  getHelp,
}) => {
  const handleKeyClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    e.currentTarget.blur();
    onKeyPress(key);
  };

  const getBgClass = (key: string): string => {
    if (key === "INVIO") {
      return "bg-success keyboard__btn--enter";
    } else if (key === "CANC") {
      return "bg-danger keyboard__btn--canc";
    } else {
      return "bg-secondary";
    }
  };

  const getDisabledClass = (key: string): string => {
    if (
      key !== "INVIO" &&
      key !== "CANC" &&
      filterKeys &&
      !currentWord.substring(1).includes(key)
    ) {
      return "keyboard__btn--disabled";
    } else {
      return "";
    }
  };

  const getSpecificClass = (key: string): string => {
    if (key === "HELP") {
      return "bg-transparent";
    } else {
      return "";
    }
  };

  const getExtraClasses = (key: string): string => {
    const bgClass = getBgClass(key);
    const disabledClass = getDisabledClass(key);
    const specificClass = getSpecificClass(key);

    return generateClassNameValue([bgClass, disabledClass, specificClass]);
  };

  const getButtonContent = (key: string): string | JSX.Element => {
    if (key === "CANC") {
      return (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <IconDelete forceColor="#fff" />
        </div>
      );
    } else if (key === "HELP") {
      return (
        <span
          title="Chiedi un aiuto!"
          className="h-100 d-flex align-items-center fs-2"
          onClick={getHelp}
        >
          💡
        </span>
      );
    } else {
      return key;
    }
  };

  return (
    <>
      <Row className="justify-content-center mt-4 mt-lg-5">
        <Col xs={12} className="keyboard mt-3">
          {keys.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              className="d-flex flex-nowrap justify-content-center flex-wrap gap-1 gap-md-2 mb-2 px-1 px-md-0"
            >
              {row.map((key) => (
                <div
                  key={key}
                  onClick={(e) => handleKeyClick(e, key)}
                  className={`keyboard__btn d-flex align-items-center justify-content-center rounded text-nowrap text-white cursor-pointer px-0 ${getExtraClasses(
                    key
                  )}`}
                >
                  {getButtonContent(key)}
                </div>
              ))}
            </Row>
          ))}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="d-none d-lg-block text-center mt-3">
          Ricorda che da desktop puoi scrivere usando normalmente la tastiera! (
          ͡~ ͜ʖ ͡°)
        </Col>
      </Row>
    </>
  );
};

export default Keyboard;
