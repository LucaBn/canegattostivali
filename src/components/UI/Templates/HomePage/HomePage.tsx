import React, { useState, useEffect } from "react";

// Components
import { Container } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import ModeSelectionSection from "@/components/UI/Organisms/ModeSelectionSection/ModeSelectionSection";
import GameSection from "@/components/UI/Organisms/GameSection/GameSection";
import LevelSelector from "@/components/UI/Molecules/LevelSelector/LevelSelector";

// Utils
import { createWordSequence } from "@/utils/game-logic";
import { decryptString } from "@/utils/encoding";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Hooks
import { useLocation } from "react-router-dom";

// Typings
import { Mode } from "@/typings/game";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";
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

const gameModeFromLocalStorage = readFromLocalStorage(
  LS_KEY_LIST.GAME_MODE
) as Mode;

const MODE_DEFAULT: Mode = IS_CUSTOM_GAME
  ? "custom"
  : gameModeFromLocalStorage || "random";

const HomePage: React.FC = () => {
  const [wordSequence, setWordSequence] = useState<string[]>(
    WORD_SEQUENCE_DEFAULT
  );
  const [mode, setMode] = useState<Mode>(MODE_DEFAULT);
  const [levelSelectorRefreshKey, setLevelSelectorRefreshKey] = useState(0);

  const location = useLocation();

  const handleSetMode = (newMode: Mode) => {
    setLevelSelectorRefreshKey((prev) => prev + 1);
    setMode(newMode);
    writeToLocalStorage(LS_KEY_LIST.GAME_MODE, newMode);
  };

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
        <ModeSelectionSection mode={mode} setMode={handleSetMode} />
      )}
      {(mode === "custom" || mode === "random") && (
        <GameSection
          initialWordSequence={wordSequence}
          mode={mode}
          setMode={handleSetMode}
        />
      )}
      {mode === "levels" && (
        <LevelSelector key={levelSelectorRefreshKey} setMode={handleSetMode} />
      )}
    </Container>
  );
};

export default HomePage;
