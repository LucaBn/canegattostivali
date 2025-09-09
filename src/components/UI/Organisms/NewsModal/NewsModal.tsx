import React, { useEffect } from "react";

// Components
import { Modal, Button, Toast } from "react-bootstrap";

// Data
import newsList from "@/assets/data/newsList.json";

// Utils
import { playSound } from "@/utils/sounds";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsModal: React.FC<Props> = ({ show, setShow }: Props) => {
  useEffect(() => {
    if (show) {
      playSound("/assets/sounds/modal-open.wav");
    } else {
      playSound("/assets/sounds/modal-close.wav");
    }
  }, [show]);

  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>News</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {newsList.map((news, index) => (
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
        <Button variant="primary" onClick={() => setShow(false)}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
