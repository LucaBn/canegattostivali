import React from "react";

// Components
import { Row, Col } from "react-bootstrap";
import KeyboardRow from "@/components/UI/Molecules/KeyboardRow/KeyboardRow";
import { readFromLocalStorage } from "@/utils/localStorage";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

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
  const lastRowKeys = readFromLocalStorage(LS_KEY_LIST.KEYBOARD_SWAP)
    ? ["CANC", "Z", "X", "C", "V", "B", "N", "M", "INVIO"]
    : ["INVIO", "Z", "X", "C", "V", "B", "N", "M", "CANC"];

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
    lastRowKeys,
  ];

  const rowProps = {
    currentWord,
    filterKeys,
    onKeyPress,
    getHelpKeyboardFilter,
    getHelpBonusLetter,
    disableHelpBonusLetterButton,
    bonusLetters,
  };

  return (
    <>
      <Row className="justify-content-center mt-4 mt-lg-5">
        <Col xs={12} className="keyboard mt-3">
          {keys.map((row, rowIndex) => (
            <KeyboardRow key={rowIndex} row={row} {...rowProps} />
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
