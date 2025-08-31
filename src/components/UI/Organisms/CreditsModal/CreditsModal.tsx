import React from "react";

// Components
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditsModal: React.FC<Props> = ({ show, setShow }: Props) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Credits</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="mb-2">Autore 💻</h6>
        <ul className="mb-4">
          <li className="mb-1 fst-italic">Luca</li>
        </ul>

        <h6 className="mb-2">Logo Artist 🎨</h6>
        <ul className="mb-4">
          <li className="mb-1 fst-italic">Manuela</li>
        </ul>

        <h6 className="mb-2">Tester 🧪</h6>
        <ul>
          <li className="mb-1 fst-italic">Tizio</li>
          <li className="mb-1 fst-italic">Caio</li>
          <li className="mb-1 fst-italic">Sempronio</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreditsModal;
