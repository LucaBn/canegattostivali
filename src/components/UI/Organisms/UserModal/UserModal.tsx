import React, { useState, useEffect } from "react";

// Components
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";
import { formatTime } from "@/utils/time";

// Constants
import { APP_NAME_SHORT } from "@/constants/app";

// Typings
import { UserData } from "@/typings/user";

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_USER_DATA_VARIABLE = `${lowercaseAppName}UserData`;

interface Props {
  handleClose: () => void;
}

const UserModal: React.FC<Props> = ({ handleClose }: Props) => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_USER_DATA_VARIABLE
  );

  const [username, setUsername] = useState<string>(
    storedUserData?.username || ""
  );
  const matchesWon = storedUserData?.matchesWon || 0;
  const bestTime = storedUserData?.bestTime || 0;

  useEffect(() => {
    writeToLocalStorage(LS_USER_DATA_VARIABLE, {
      username,
      matchesWon,
      bestTime,
    });
  }, [username]);

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column justify-content-center">
          <FloatingLabel label="Scegli un nome" aria-label="Scegli un nome">
            <Form.Control
              type="text"
              placeholder="Scegli un nome"
              aria-label="Scegli un nome"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              maxLength={20}
            />
          </FloatingLabel>

          <hr />

          <p className="mb-1">
            <span className="d-inline-block stats__icon">🏆</span>Partite vinte:{" "}
            {matchesWon}
          </p>
          <p>
            <span className="d-inline-block stats__icon">⏳</span>Miglior tempo:{" "}
            {bestTime === 0 ? "-" : formatTime(bestTime)}
          </p>
          <small>
            <em>
              * Le statistiche tengono conto solo delle partite con sequenze di
              parole generate casualmente, mentre non vengono conteggiate le
              partite custom create dagli utenti!
            </em>
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
