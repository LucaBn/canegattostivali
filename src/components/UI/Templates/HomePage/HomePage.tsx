import React from "react";

// Components
import { Container } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import GameSection from "@/components/UI/Organisms/GameSection/GameSection";

// Utils
import { createWordSequence } from "@/utils/game-logic";

// console.log({ initialWordSequence });

const initialWordSequence = createWordSequence();

const HomePage: React.FC = () => {
  return (
    <Container className="mt-3 mt-md-5">
      <TopSection />
      <GameSection initialWordSequence={initialWordSequence} />
    </Container>
  );
};

export default HomePage;
