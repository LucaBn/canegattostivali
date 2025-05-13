import React, { Dispatch, SetStateAction } from "react";

// Components
import { Modal, Button, Badge } from "react-bootstrap";

// Utils
import { formatTime } from "@/utils/time";
import { readFromLocalStorage } from "@/utils/localStorage";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

// Typings
import { Mode } from "@/typings/game";
import { UserData } from "@/typings/user";

interface IEndGameModal {
  show: boolean;
  time: number;
  mode: Mode;
  isUserBestTime: boolean;
  wordSequence: string[];
  setShow: Dispatch<SetStateAction<boolean>>;
  startRandomGame: () => void;
  setMode?: (newMode: "random" | "levels" | "custom") => void;
  handleLevelChange?: (levelId: number) => void;
  level?: number;
}

const EndGameModal: React.FC<IEndGameModal> = ({
  show,
  time,
  mode,
  isUserBestTime,
  wordSequence,
  setShow,
  startRandomGame,
  setMode,
  handleLevelChange,
  level,
}) => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_KEY_LIST.USER_DATA
  );

  const handleClose = () => setShow(false);

  const handlePlayRandomGame = () => {
    startRandomGame();
    handleClose();
  };

  const handleGoBackToLevelSelection = () => {
    setMode && setMode("levels");
    handleClose();
  };

  const handlePlayNextLevel = () => {
    handleLevelChange && handleLevelChange(level ? level + 1 : 1); // Level should always be set
    handleClose();
  };

  const modalTitle = storedUserData?.username
    ? `Ben fatto, ${storedUserData.username}! 🥳`
    : `Ben fatto! 🥳`;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="d-flex flex-flow-wrap gap-2">
            Tempo impiegato: <em>{formatTime(time)}</em>{" "}
            {isUserBestTime && mode === "random" && (
              <Badge
                bg="success"
                pill
                className="d-flex align-items-center fw-normal"
              >
                Record! 💪
              </Badge>
            )}
          </p>
          <p className="mb-1">Catena di parole:</p>
          <ul className="list-unstyled">
            {wordSequence.map((word) => (
              <li key={word}>
                <em>{word}</em>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {mode === "random" && (
            <Button variant="primary" onClick={handlePlayRandomGame}>
              Gioca ancora
            </Button>
          )}
          {mode === "levels" && (
            <>
              <Button
                variant="secondary"
                onClick={handleGoBackToLevelSelection}
              >
                Torna alla selezione livelli
              </Button>
              <Button variant="primary" onClick={handlePlayNextLevel}>
                Gioca il prossimo livello
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EndGameModal;
