import React, { useEffect } from "react";

// Components
import { Button, Modal } from "react-bootstrap";
import KeyboardHandler from "@/components/UI/Organisms/KeyboardHandler/KeyboardHandler";
import SoundsHandler from "@/components/UI/Organisms/SoundsHandler/SoundsHandler";
import ThemeHandler from "@/components/UI/Organisms/ThemeHandler/ThemeHandler";

// Utils
import { playSound } from "@/utils/sounds";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsModal: React.FC<Props> = ({ show, setShow }: Props) => {
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
        <Modal.Title>Opzioni</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-4">
          <ThemeHandler />
          <SoundsHandler />
          <KeyboardHandler />
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

export default OptionsModal;
