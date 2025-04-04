import React, { Dispatch, SetStateAction } from "react";

// Components
import { Modal, Button, Badge } from "react-bootstrap";

// Utils
import { formatTime } from "@/utils/time";
import { readFromLocalStorage } from "@/utils/local-storage";

// Constants
import { APP_NAME_SHORT } from "@/constants/app";

// Typings
import { UserData } from "@/typings/user";

interface IOptionsModal {
  show: boolean;
  time: number;
  isCustomGame: boolean;
  isUserBestTime: boolean;
  wordSequence: string[];
  setShow: Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
}

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_USER_DATA_VARIABLE = `${lowercaseAppName}UserData`;

const EndGameModal: React.FC<IOptionsModal> = ({
  show,
  time,
  isCustomGame,
  isUserBestTime,
  wordSequence,
  setShow,
  startGame,
}) => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_USER_DATA_VARIABLE
  );

  const handleClose = () => setShow(false);

  const handlePlayAgain = () => {
    startGame();
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
            {isUserBestTime && !isCustomGame && (
              <Badge bg="success" pill className="d-flex align-items-center">
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
          <Button variant="primary" onClick={handlePlayAgain}>
            Gioca ancora
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EndGameModal;
