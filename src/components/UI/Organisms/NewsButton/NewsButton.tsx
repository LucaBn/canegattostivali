import React, { useState } from "react";

// Components
import { Modal, Button, Toast } from "react-bootstrap";
import IconNewspaper from "../../Atoms/IconNewspaper/IconNewspaper";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Data
import newsData from "@/assets/data/newsData.json";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const NewsButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { changeKeyboardStatus } = useKeyboardStatus();

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
        <IconNewspaper forceColor="#fff" />
      </span>
      {showModal && (
        <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>News</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {newsData.map((news, index) => (
              <Toast key={index} className="w-100 mb-3">
                <Toast.Header closeButton={false} className="align-items-start">
                  <p className="me-auto mb-0 pe-3">{news.title}</p>
                  <small className="text-nowrap">{news.date}</small>
                </Toast.Header>
                <Toast.Body>{news.body}</Toast.Body>
              </Toast>
            ))}
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

export default NewsButton;
