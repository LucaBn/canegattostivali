import React, { useState } from "react";

// Components
import { Form, Col, Button } from "react-bootstrap";
import IconDelete from "@/components/UI/Atoms/IconDelete/IconDelete";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";
import { playSound } from "@/utils/sounds";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

const KeyboardHandler: React.FC = () => {
  const [enterFirst, setEnterFirst] = useState<boolean>(
    readFromLocalStorage(LS_KEY_LIST.KEYBOARD_SWAP) !== null
      ? !!readFromLocalStorage(LS_KEY_LIST.KEYBOARD_SWAP)
      : false
  );

  const handleChange = (value: boolean) => {
    setEnterFirst(value);
    writeToLocalStorage(LS_KEY_LIST.KEYBOARD_SWAP, value);
    playSound("/assets/sounds/click-positive.wav");
  };

  const enterButton = (
    <Button
      variant="success"
      size="sm"
      tabIndex={-1}
      style={{ height: "35px" }}
    >
      Enter
    </Button>
  );
  const deleteButton = (
    <Button
      variant="danger"
      size="sm"
      tabIndex={-1}
      style={{ height: "35px", paddingLeft: "12px", paddingRight: "15px" }}
    >
      <IconDelete forceColor="#fff" forceOpacity={100} />
    </Button>
  );

  return (
    <Form>
      <p className="mb-1">Layout di tastiera</p>
      <Form.Group as={Col} className="d-flex flex-wrap gap-3">
        <Form.Check
          type="radio"
          name="keyboard-layout"
          id="keyboard-enter-first"
          label={
            <div className="d-flex gap-2 align-items-center cursor-pointer">
              <div className="pointer-events-none">
                {enterButton} {deleteButton}
              </div>
            </div>
          }
          checked={!enterFirst}
          onChange={() => handleChange(false)}
          title="Enter prima del CANC"
        />
        <Form.Check
          type="radio"
          name="keyboard-layout"
          id="keyboard-delete-first"
          label={
            <div className="d-flex gap-2 align-items-center cursor-pointer">
              <div className="pointer-events-none">
                {deleteButton} {enterButton}
              </div>
            </div>
          }
          checked={enterFirst}
          onChange={() => handleChange(true)}
          title="CANC prima di Enter"
        />
      </Form.Group>
    </Form>
  );
};

export default KeyboardHandler;
