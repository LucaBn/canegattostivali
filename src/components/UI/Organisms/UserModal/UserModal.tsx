import React, { useState, useEffect } from "react";

// Components
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import Achievements from "@/components/UI/Organisms/Achievements/Achievements";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";
import { formatTime } from "@/utils/time";
import { playSound } from "@/utils/sounds";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

// Typings
import { UserData } from "@/typings/user";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal: React.FC<Props> = ({ show, setShow }: Props) => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_KEY_LIST.USER_DATA,
  );

  const [username, setUsername] = useState<string>(
    storedUserData?.username || "",
  );
  // TODO: rewrite this with ...prev value of storedUserData
  const matchesWon = storedUserData?.matchesWon || 0;
  const bestTime = storedUserData?.bestTime || 0;
  const lastLevelCompleted = storedUserData?.lastLevelCompleted || 0;

  useEffect(() => {
    if (show) {
      playSound("/assets/sounds/modal-open.wav");
    } else {
      playSound("/assets/sounds/modal-close.wav");
    }
  }, [show]);

  useEffect(() => {
    const trimmedUsername = username.trim();

    writeToLocalStorage(LS_KEY_LIST.USER_DATA, {
      username: trimmedUsername,
      matchesWon,
      bestTime,
      lastLevelCompleted,
    });
  }, [username]);

  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
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
              className={`${username.trim() && "is-valid"}`}
              spellCheck={false}
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

          <Achievements />

          <small className="mt-4">
            <em>
              * Le statistiche tengono conto solo delle partite giocate in
              modalità random, mentre non vengono conteggiate le partite custom
              create dagli utenti e la modalità a livelli!
            </em>
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
