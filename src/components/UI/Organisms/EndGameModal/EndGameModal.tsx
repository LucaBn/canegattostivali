import React, { Dispatch, SetStateAction } from "react";

// Components
import { Button, Modal } from "react-bootstrap";

// Utils
import { formatTime } from "@/utils/time";

interface IOptionsModal {
  show: boolean;
  time: number;
  wordSequence: string[];
  setShow: Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
}

const EndGameModal: React.FC<IOptionsModal> = ({
  show,
  time,
  wordSequence,
  setShow,
  startGame,
}) => {
  const handleClose = () => setShow(false);
  const handlePlayAgain = () => {
    startGame();
    handleClose();
  };

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
          <Modal.Title>Hai vinto! 🥳</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tempo impiegato: <strong>{formatTime(time)}</strong>
          </p>
          <p className="mb-1">Catena di parole:</p>
          <ul className="list-unstyled">
            {wordSequence.map((word) => (
              <li key={word}>
                <strong>{word}</strong>
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
