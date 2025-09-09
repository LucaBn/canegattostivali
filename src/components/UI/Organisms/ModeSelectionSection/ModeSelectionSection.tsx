import React, { useRef } from "react";

// Components
import { Row, Col, Button } from "react-bootstrap";
import IconTornado from "@/components/UI/Atoms/IconTornado/IconTornado";
import IconLadder from "@/components/UI/Atoms/IconLadder/IconLadder";

interface Props {
  mode: "random" | "levels" | "custom";
  setMode: (newMode: "random" | "levels" | "custom") => void;
}

const ModeSelectionSection: React.FC<Props> = ({ mode, setMode }) => {
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCardClick = (selectedMode: "random" | "levels") => {
    setMode(selectedMode);
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  };

  return (
    <>
      <Row className="justify-content-center mb-4 mb-lg-5">
        <Col xs={12} md={8} className="text-center">
          <h2 className="mb-3 fs-4">Seleziona la modalità di gioco</h2>
          <Row className="justify-content-center gap-2">
            <Button
              className="mode-selection__card mb-2 py-3"
              variant={mode === "random" ? "primary" : "secondary"}
              title="Gioca con sequenze di parole casuali e senza limiti di tempo"
              onClick={() => handleCardClick("random")}
            >
              <div className="fs-5 mb-1">
                <IconTornado forceOpacity={100} forceColor="#fff" /> Random
              </div>
              <div>
                Gioca con sequenze di parole casuali e senza limiti di tempo
              </div>
            </Button>
            <Button
              className="mode-selection__card mb-2 py-3"
              variant={mode === "levels" ? "primary" : "secondary"}
              title="Supera i livelli e sfida i tuoi amici a starti dietro"
              onClick={() => handleCardClick("levels")}
            >
              <div className="fs-5 mb-1">
                <IconLadder forceOpacity={100} forceColor="#fff" /> Livelli
              </div>
              <div>Supera i livelli e sfida i tuoi amici a starti dietro</div>
            </Button>
          </Row>
        </Col>
      </Row>
      <div
        ref={bottomDivRef}
        className="w-100"
        style={{
          scrollMarginTop: 85, // Navbar height + 20px
        }}
      />
    </>
  );
};

export default ModeSelectionSection;
