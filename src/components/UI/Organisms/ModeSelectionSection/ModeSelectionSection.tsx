import React from "react";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import IconTornado from "@/components/UI/Atoms/IconTornado/IconTornado";
import IconLadder from "@/components/UI/Atoms/IconLadder/IconLadder";

interface Props {
  mode: "random" | "levels" | "custom";
  setMode: React.Dispatch<React.SetStateAction<"random" | "levels" | "custom">>;
}

const ModeSelectionSection: React.FC<Props> = ({ mode, setMode }) => {
  return (
    <Row className="justify-content-center mb-4 mb-lg-5">
      <Col xs={12} md={8} className="text-center">
        <h2 className="mb-3 fs-4">Seleziona la modalità di gioco</h2>
        <ToggleButtonGroup
          type="radio"
          name="gameMode"
          value={mode}
          onChange={(val) => setMode(val)}
          className="d-flex justify-content-center gap-3"
        >
          <ToggleButton
            id="mode-random"
            value="random"
            variant={mode === "random" ? "primary" : "secondary"}
            className="d-flex align-items-center justify-content-center py-2"
          >
            <IconTornado forceOpacity={100} forceColor="#fff" />
            <span className="text-white text-nowrap ms-2">Random</span>
          </ToggleButton>
          <ToggleButton
            id="mode-levels"
            value="levels"
            variant={mode === "levels" ? "primary" : "secondary"}
            className="d-flex align-items-center justify-content-center py-2"
          >
            <IconLadder forceOpacity={100} forceColor="#fff" />
            <span className="text-white text-nowrap ms-2">Livelli</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
    </Row>
  );
};

export default ModeSelectionSection;
