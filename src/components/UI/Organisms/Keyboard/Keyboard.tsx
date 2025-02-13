import React from "react";

// Components
import { Row, Col } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";

// Utils
import { generateClassNameValue } from "@/utils/html-classes";

const keys: string[][] = [
  ["SPACER", "À", "È", "Ì", "Ò", "Ù", "HELP", "SPACER"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["SPACER", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SPACER"],
  ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "CANC"],
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
      return "bg-success cursor-pointer";
    } else if (key === "CANC") {
      return "bg-danger cursor-pointer";
    } else if (key === "HELP") {
      return "bg-warning cursor-pointer";
    } else if (key === "SPACER") {
      return "invisible";
    } else {
      return "bg-secondary cursor-pointer";
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
    if (key === "INVIO") {
      return "keyboard__btn--enter";
    } else if (key === "CANC") {
      return "keyboard__btn--canc";
    } else if (key === "HELP") {
      return "keyboard__btn--help";
    } else if (key === "SPACER") {
      return "keyboard__btn--spacer";
    } else {
      return "cursor-pointer";
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
          className="h-100 d-flex align-items-center px-1 px-md-3"
          onClick={getHelp}
        >
          <span className="fs-4 me-1">💡</span>Aiutino!
        </span>
      );
    } else if (key === "SPACER") {
      return "";
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
              {row.map((key, rowIndex) => (
                <div
                  key={rowIndex}
                  onClick={(e) => handleKeyClick(e, key)}
                  className={`keyboard__btn d-flex align-items-center justify-content-center rounded text-nowrap text-white px-0 ${getExtraClasses(
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
