import React, { useState } from "react";

// Components
import { Form, Col } from "react-bootstrap";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";
import { playSound } from "@/utils/sounds";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

const SoundsHandler: React.FC = () => {
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(
    !!readFromLocalStorage(LS_KEY_LIST.SOUNDS)
  );

  const handleChange = (value: boolean) => {
    setSoundsEnabled(value);
    writeToLocalStorage(LS_KEY_LIST.SOUNDS, value);
    if (value) {
      playSound("/assets/sounds/click-positive.wav");
    }
  };

  return (
    <Form>
      <p className="mb-1">Suoni</p>
      <Form.Group as={Col} className="d-flex flex-wrap gap-3">
        <Form.Check
          type="radio"
          name="sounds"
          id="sounds-on"
          label={<span className="cursor-pointer user-select-none">On</span>}
          checked={soundsEnabled}
          onChange={() => handleChange(true)}
          title="Attiva i suoni"
        />
        <Form.Check
          type="radio"
          name="sounds"
          id="sounds-off"
          label={<span className="cursor-pointer user-select-none">Off</span>}
          checked={!soundsEnabled}
          onChange={() => handleChange(false)}
          title="Disattiva i suoni"
        />
      </Form.Group>
    </Form>
  );
};

export default SoundsHandler;
