import React from "react";

// Components
import { Row, Col } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";
import IconLightbulb from "@/components/UI/Atoms/IconLightbulb/IconLightbulb";
import IconKeyboard from "@/components/UI/Atoms/IconEyeSlash/IconEyeSlash";

// Utils
import { generateClassNameValue } from "@/utils/html-classes";

const keys: string[][] = [
  [
    "SPACER",
    "À",
    "È",
    "Ì",
    "Ò",
    "Ù",
    "HELP_KEYBOARD_FILTER",
    "HELP_BONUS_LETTER",
    "SPACER",
  ],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["SPACER", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SPACER"],
  ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "CANC"],
];

interface Props {
  currentWord: string;
  filterKeys: boolean;
  onKeyPress: (key: string) => void;
  getHelpKeyboardFilter: () => void;
  getHelpBonusLetter: () => void;
  disableHelpBonusLetterButton: boolean;
  bonusLetters: number;
}

const Keyboard: React.FC<Props> = ({
  currentWord,
  filterKeys,
  onKeyPress,
  getHelpKeyboardFilter,
  getHelpBonusLetter,
  disableHelpBonusLetterButton,
  bonusLetters,
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
    } else if (key === "HELP_KEYBOARD_FILTER") {
      return "bg-warning cursor-pointer";
    } else if (key === "HELP_BONUS_LETTER") {
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
      key !== "HELP_BONUS_LETTER" &&
      filterKeys &&
      !currentWord.substring(bonusLetters + 1).includes(key)
    ) {
      return "keyboard__btn--disabled";
    } else if (key === "HELP_BONUS_LETTER" && disableHelpBonusLetterButton) {
      return "keyboard__btn--disabled keyboard__btn--loading";
    } else {
      return "";
    }
  };

  const getSpecificClass = (key: string): string => {
    if (key === "INVIO") {
      return "keyboard__btn--enter";
    } else if (key === "CANC") {
      return "keyboard__btn--canc";
    } else if (key === "HELP_KEYBOARD_FILTER") {
      return "keyboard__btn--help-keyboard-filter";
    } else if (key === "HELP_BONUS_LETTER") {
      return "keyboard__btn--help-bonus-letter";
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
          <IconDelete forceColor="#fff" forceOpacity={100} />
        </div>
      );
    } else if (key === "HELP_KEYBOARD_FILTER") {
      return (
        <span
          className="h-100 w-100 d-flex align-items-center justify-content-center"
          onClick={getHelpKeyboardFilter}
          title="Rimuovi dalla tastiera le lettere che non servono"
        >
          <IconKeyboard forceColor="#000" forceOpacity={100} />
        </span>
      );
    } else if (key === "HELP_BONUS_LETTER") {
      return (
        <span
          className="h-100 w-100 d-flex align-items-center justify-content-center"
          onClick={getHelpBonusLetter}
          title="Aggiungi una lettera alla parola"
        >
          <IconLightbulb forceColor="#000" forceOpacity={100} />
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
