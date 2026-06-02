import React from "react";

// Components
import { Form } from "react-bootstrap";

// Providers
import { useBackground } from "@/components/providers/BackgroundProvider";

// Utils
import { playSound } from "@/utils/sounds";
import { BackgroundEffectList } from "@/typings/backgrounds";

const BackgroundHandler: React.FC = () => {
  const { backgroundEffect, changeBackgroundEffect } = useBackground();

  return (
    <Form>
      <Form.Group controlId="background-effect">
        <Form.Label>Sfondo</Form.Label>

        <Form.Select
          value={backgroundEffect}
          onChange={(e) => {
            changeBackgroundEffect(e.target.value as BackgroundEffectList);
            playSound("/assets/sounds/click-positive.wav");
          }}
        >
          <option value={BackgroundEffectList.None}>Sfondo uniforme</option>

          <option value={BackgroundEffectList.Dots}>Puntini</option>

          <option value={BackgroundEffectList.Grid}>Griglia</option>

          <option value={BackgroundEffectList.Diamond}>Rombi</option>
        </Form.Select>

        <div
          className={`block text-center border rounded mt-2 py-4 ${backgroundEffect}`}
        >
          <em>Preview</em>
        </div>
      </Form.Group>
    </Form>
  );
};

export default BackgroundHandler;
