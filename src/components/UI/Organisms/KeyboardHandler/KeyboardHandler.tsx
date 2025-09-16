import React from "react";

// Components
import { Form, Col, Button } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";

// Utils
import { playSound } from "@/utils/sounds";

// Hooks
import { useKeyboardSwap } from "@/components/providers/KeyboardSwapProvider";

const KeyboardHandler: React.FC = () => {
  const { changeKeyboardSwapValue, keyboardSwapValue } = useKeyboardSwap();

  const handleChange = (value: boolean) => {
    changeKeyboardSwapValue(value);
    playSound("/assets/sounds/click-positive.wav");
  };

  const enterButton = (
    <Button id="enter-button" variant="success" size="sm" tabIndex={-1}>
      INVIO
    </Button>
  );
  const deleteButton = (
    <Button id="delete-button" variant="danger" size="sm" tabIndex={-1}>
      <IconDelete forceColor="#fff" forceOpacity={100} />
    </Button>
  );

  return (
    <Form>
      <p className="mb-1">Layout di tastiera</p>
      <Form.Group
        as={Col}
        className="d-flex flex-wrap gap-3 keyboard-layout__container"
      >
        <Form.Check
          type="radio"
          name="keyboard-layout"
          id="keyboard-enter-first"
          label={
            <div className="cursor-pointer">
              <div className="d-flex gap-1 align-items-center pointer-events-none user-select-none">
                {enterButton} {deleteButton}
              </div>
            </div>
          }
          checked={!keyboardSwapValue}
          onChange={() => handleChange(false)}
          title="INVIO prima del CANC"
        />
        <Form.Check
          type="radio"
          name="keyboard-layout"
          id="keyboard-delete-first"
          label={
            <div className="cursor-pointer">
              <div className="d-flex gap-1 align-items-center pointer-events-none user-select-none">
                {deleteButton} {enterButton}
              </div>
            </div>
          }
          checked={keyboardSwapValue}
          onChange={() => handleChange(true)}
          title="CANC prima di INVIO"
        />
      </Form.Group>
    </Form>
  );
};

export default KeyboardHandler;
