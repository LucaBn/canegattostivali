import React, { useState } from "react";

// Components
import { Modal, Button, Toast } from "react-bootstrap";
import IconNewspaper from "../../Atoms/IconNewspaper/IconNewspaper";

// Data
import newsData from "@/assets/data/newsData.json";

const NewsButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <span onClick={handleOpen}>
        <IconNewspaper forceColor="#fff" />
      </span>
      {showModal && (
        <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>News 📰</Modal.Title>
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
