import React, { useRef } from "react";

// Components
import { Row, Col, Card } from "react-bootstrap";
import IconTornado from "@/components/UI/Atoms/IconTornado/IconTornado";
import IconLadder from "@/components/UI/Atoms/IconLadder/IconLadder";

interface Props {
  mode: "random" | "levels" | "custom";
  setMode: React.Dispatch<React.SetStateAction<"random" | "levels" | "custom">>;
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
            <Card
              className="mode-selection__card mb-2"
              bg={mode === "random" ? "primary" : "secondary"}
              text="light"
            >
              <Card.Body
                onClick={() => handleCardClick("random")}
                className="cursor-pointer"
              >
                <div className="fs-5 mb-1">
                  <IconTornado forceOpacity={100} forceColor="#fff" /> Random
                </div>
                <div>
                  Gioca con sequenze di parole casuali e senza limiti di tempo
                </div>
              </Card.Body>
            </Card>
            <Card
              className="mode-selection__card mb-2"
              bg={mode === "levels" ? "primary" : "secondary"}
              text="light"
            >
              <Card.Body
                onClick={() => handleCardClick("levels")}
                className="cursor-pointer"
              >
                <div className="fs-5 mb-1">
                  <IconLadder forceOpacity={100} forceColor="#fff" /> Livelli
                </div>
                <div>Supera i livelli e sfida i tuoi amici a starti dietro</div>
              </Card.Body>
            </Card>
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
