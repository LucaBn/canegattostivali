import React from "react";

// Components
import { Modal, Button } from "react-bootstrap";

interface ICustomModeSequenceWrongModal {
  show: boolean;
  setShow: () => void;
}

const CustomModeSequenceWrongModal: React.FC<ICustomModeSequenceWrongModal> = ({
  show,
  setShow,
}) => {
  return (
    <Modal
      show={show}
      onHide={setShow}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Ops 😞</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          La pagina che stai cercando di caricare contiene una{" "}
          <em>sequenza di parole custom</em> che per qualche arcano motivo non
          può essere caricata.
        </p>
        <p>Chiudi questo messaggio e continua a giocare normalmente!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={setShow}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModeSequenceWrongModal;
