import React, { useState, useEffect } from "react";

// Components
import { Container } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import GameSection from "@/components/UI/Organisms/GameSection/GameSection";

// Utils
import { createWordSequence } from "@/utils/game-logic";
import { decryptString } from "@/utils/encoding";

// Hooks
import { useLocation } from "react-router-dom";

// Constants
import { WORD_LIST_LENGTH } from "@/constants/wordList";

// console.log({ initialWordSequence });

const initialWordSequence = createWordSequence({
  wordListLength: WORD_LIST_LENGTH,
});

const queryParams = new URLSearchParams(location.search);
const customListParam = queryParams.get("customList");
const decodedSequence = decryptString(customListParam);

const WORD_SEQUENCE_DEFAULT: string[] = decodedSequence
  ? decodedSequence.split("-")
  : initialWordSequence;

const IS_CUSTOM_GAME: boolean = Boolean(decodedSequence);

const HomePage: React.FC = () => {
  const [wordSequence, setWordSequence] = useState<string[]>(
    WORD_SEQUENCE_DEFAULT
  );

  const location = useLocation();

  useEffect(() => {
    if (customListParam) {
      const decodedSequence = decryptString(customListParam);

      if (decodedSequence) {
        setWordSequence(decodedSequence.split("-"));
      }
    }
  }, [location.search]);

  return (
    <Container className="mt-3 mt-md-5">
      <TopSection />
      <GameSection
        isCustomGame={IS_CUSTOM_GAME}
        initialWordSequence={wordSequence}
      />
    </Container>
  );
};

export default HomePage;
