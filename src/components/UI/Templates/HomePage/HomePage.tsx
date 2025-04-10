import React, { useState, useEffect } from "react";

// Components
import { Container } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import ModeSelectionSection from "@/components/UI/Organisms/ModeSelectionSection/ModeSelectionSection";
import GameSection from "@/components/UI/Organisms/GameSection/GameSection";

// Utils
import { createWordSequence } from "@/utils/game-logic";
import { decryptString } from "@/utils/encoding";

// Hooks
import { useLocation } from "react-router-dom";

// Constants
import { WORD_LIST_LENGTH } from "@/constants/wordList";

const initialWordSequence = createWordSequence({
  wordListLength: WORD_LIST_LENGTH,
});

// console.log({ initialWordSequence });

const queryParams = new URLSearchParams(location.search);
const customListParam = queryParams.get("customList");
const decodedSequence = decryptString(customListParam);

const WORD_SEQUENCE_DEFAULT: string[] = decodedSequence
  ? decodedSequence.split("-")
  : initialWordSequence;

const IS_CUSTOM_GAME: boolean = Boolean(decodedSequence);

type Mode =
  | "random"
  | "levels"
  | "custom"; /* TODO: handle type in a proper file */

const MODE_DEFAULT: Mode = IS_CUSTOM_GAME ? "custom" : "random";

const HomePage: React.FC = () => {
  const [wordSequence, setWordSequence] = useState<string[]>(
    WORD_SEQUENCE_DEFAULT
  );
  const [mode, setMode] = useState<Mode>(MODE_DEFAULT);

  const location = useLocation();

  useEffect(() => {
    if (customListParam) {
      const decodedSequence = decryptString(customListParam);

      if (decodedSequence) {
        setWordSequence(decodedSequence.split("-"));
      }
    }
  }, [location.search]);

  useEffect(() => {
    const newWordSequence = createWordSequence({
      wordListLength: WORD_LIST_LENGTH,
    });

    setWordSequence(newWordSequence);
  }, [mode]);

  return (
    <Container className="mt-3 mt-md-5">
      <TopSection />
      {mode !== "custom" && (
        <ModeSelectionSection mode={mode} setMode={setMode} />
      )}
      {(mode === "custom" || mode === "random") && (
        <GameSection
          isCustomGame={IS_CUSTOM_GAME}
          initialWordSequence={wordSequence}
          setMode={setMode}
        />
      )}
    </Container>
  );
};

export default HomePage;
