import React, { useState, useEffect } from "react";

// Components
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import IconUser from "@/components/UI/Atoms/IconUser/IconUser";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

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
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_USER_DATA_VARIABLE = `${lowercaseAppName}UserData`;

const UserButton: React.FC = () => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_USER_DATA_VARIABLE
  );

  const { changeKeyboardStatus } = useKeyboardStatus();

  const [showModal, setShowModal] = useState<boolean>(false);
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

  const handleOpen = () => {
    setShowModal(true);
    changeKeyboardStatus(KeyboardStatusList.Inactive);
  };
  const handleClose = () => {
    setShowModal(false);
    changeKeyboardStatus(KeyboardStatusList.Active);
  };

  return (
    <>
      <span onClick={handleOpen}>
        <IconUser forceColor="#fff" />
      </span>
      {showModal && (
        <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-center">
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Scegli un nome"
                  aria-label="Scegli un nome"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  maxLength={20}
                />
              </InputGroup>

              <hr />

              <p className="mb-1">
                <span className="d-inline-block stats__icon">🏆</span> Partite
                vinte: {matchesWon}
              </p>
              <p>
                <span className="d-inline-block stats__icon">⏳</span> Miglior
                tempo: {bestTime === 0 ? "-" : formatTime(bestTime)}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="primary" onClick={handleClose}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UserButton;
