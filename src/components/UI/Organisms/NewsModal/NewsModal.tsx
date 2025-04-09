import React from "react";

// Components
import { Modal, Button, Toast } from "react-bootstrap";

// Data
import newsData from "@/assets/data/newsData.json";

interface Props {
  handleClose: () => void;
}

const NewsModal: React.FC<Props> = ({ handleClose }: Props) => {
  return (
    <Modal show={true} onHide={handleClose} backdrop="static" centered>
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
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
