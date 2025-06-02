import React, { useCallback, memo } from "react";

// Components
import { Row } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";
import IconLightbulb from "@/components/UI/Atoms/IconLightbulb/IconLightbulb";
import IconKeyboard from "@/components/UI/Atoms/IconEyeSlash/IconEyeSlash";

// Utils
import { generateClassNameValue } from "@/utils/htmlClasses";

const getBgClass = (key: string): string => {
  if (key === "INVIO") return "bg-success cursor-pointer";
  if (key === "CANC") return "bg-danger cursor-pointer";
  if (key === "HELP_KEYBOARD_FILTER" || key === "HELP_BONUS_LETTER")
    return "bg-warning cursor-pointer";
  if (key === "SPACER") return "invisible";
  return "bg-secondary cursor-pointer";
};

const getSpecificClass = (key: string): string => {
  if (key === "INVIO") return "keyboard__btn--enter";
  if (key === "CANC") return "keyboard__btn--canc";
  if (key === "HELP_KEYBOARD_FILTER")
    return "keyboard__btn--help-keyboard-filter";
  if (key === "HELP_BONUS_LETTER") return "keyboard__btn--help-bonus-letter";
  if (key === "SPACER") return "keyboard__btn--spacer";
  return "cursor-pointer";
};

interface KeyboardRowProps {
  row: string[];
  currentWord: string;
  filterKeys: boolean;
  onKeyPress: (key: string) => void;
  getHelpKeyboardFilter: () => void;
  getHelpBonusLetter: () => void;
  disableHelpBonusLetterButton: boolean;
  bonusLetters: number;
}

const KeyboardRow: React.FC<KeyboardRowProps> = memo(
  ({
    row,
    currentWord,
    filterKeys,
    onKeyPress,
    getHelpKeyboardFilter,
    getHelpBonusLetter,
    disableHelpBonusLetterButton,
    bonusLetters,
  }) => {
    const handleKeyClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
        e.currentTarget.blur();
        onKeyPress(key);
      },
      [onKeyPress]
    );

    const getDisabledClass = useCallback(
      (key: string): string => {
        if (
          key !== "INVIO" &&
          key !== "CANC" &&
          key !== "HELP_BONUS_LETTER" &&
          filterKeys &&
          !currentWord.substring(bonusLetters + 1).includes(key)
        ) {
          return "keyboard__btn--disabled";
        } else if (
          key === "HELP_BONUS_LETTER" &&
          disableHelpBonusLetterButton
        ) {
          return "keyboard__btn--disabled keyboard__btn--loading";
        } else {
          return "";
        }
      },
      [currentWord, filterKeys, bonusLetters, disableHelpBonusLetterButton]
    );

    const getExtraClasses = useCallback(
      (key: string): string => {
        const bgClass = getBgClass(key);
        const disabledClass = getDisabledClass(key);
        const specificClass = getSpecificClass(key);
        return generateClassNameValue([bgClass, disabledClass, specificClass]);
      },
      [getDisabledClass]
    );

    const getButtonContent = useCallback(
      (key: string): string | JSX.Element => {
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
      },
      [getHelpKeyboardFilter, getHelpBonusLetter]
    );

    return (
      <Row className="d-flex flex-nowrap justify-content-center flex-wrap gap-1 gap-md-2 mb-2 px-1 px-md-0">
        {row.map((key, keyIndex) => (
          <div
            key={keyIndex}
            onClick={(e) => handleKeyClick(e, key)}
            className={`keyboard__btn d-flex align-items-center justify-content-center rounded text-nowrap text-white px-0 ${getExtraClasses(
              key
            )}`}
          >
            {getButtonContent(key)}
          </div>
        ))}
      </Row>
    );
  }
);

export default KeyboardRow;
