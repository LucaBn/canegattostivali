import React, { useState, useEffect } from "react";

// Components
import { Container } from "react-bootstrap";
import TopSection from "@/components/UI/Molecules/TopSection/TopSection";
import CustomModeSequenceWrongModal from "@/components/UI/Organisms/CustomModeSequenceWrongModal/CustomModeSequenceWrongModal";
import ModeSelectionSection from "@/components/UI/Organisms/ModeSelectionSection/ModeSelectionSection";
import GameSection from "@/components/UI/Organisms/GameSection/GameSection";
import LevelSelector from "@/components/UI/Molecules/LevelSelector/LevelSelector";

// Utils
import { createWordSequence } from "@/utils/game";
import { decryptString } from "@/utils/encoding";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";

// Hooks
import { useNavigate } from "react-router-dom";

// Typings
import { Mode } from "@/typings/game";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";
import { WORD_LIST_LENGTH } from "@/constants/wordList";

const initialWordSequence = createWordSequence({
  wordListLength: WORD_LIST_LENGTH,
});

const HomePage: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  const customListParam = queryParams.get("customList");
  const decodedSequence = decryptString(customListParam);

  const decodedSequenceArray = decodedSequence
    ? decodedSequence.split("-").filter(Boolean)
    : [];

  const hasDuplicates =
    new Set(decodedSequenceArray).size < decodedSequenceArray.length;

  const IS_CUSTOM_GAME: boolean =
    decodedSequenceArray.length > 1 && !hasDuplicates;

  const WORD_SEQUENCE_DEFAULT: string[] = IS_CUSTOM_GAME
    ? decodedSequenceArray
    : initialWordSequence;

  const gameModeFromLocalStorage = readFromLocalStorage(
    LS_KEY_LIST.GAME_MODE
  ) as Mode;

  const MODE_DEFAULT: Mode = IS_CUSTOM_GAME
    ? "custom"
    : gameModeFromLocalStorage || "random";

  const isCustomModeSequenceWrong = Boolean(customListParam && !IS_CUSTOM_GAME);

  const [wordSequence, setWordSequence] = useState<string[]>(
    WORD_SEQUENCE_DEFAULT
  );
  const [mode, setMode] = useState<Mode>(MODE_DEFAULT);
  const [levelSelectorRefreshKey, setLevelSelectorRefreshKey] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const newWordSequence = createWordSequence({
      wordListLength: WORD_LIST_LENGTH,
    });

    setWordSequence(newWordSequence);
  }, [mode]);

  const handleSetMode = (newMode: Mode) => {
    setLevelSelectorRefreshKey((prev) => prev + 1);
    setMode(newMode);
    writeToLocalStorage(LS_KEY_LIST.GAME_MODE, newMode);
  };

  const handleCloseModal = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container className="mt-3 mt-md-5">
      <TopSection />
      {mode !== "custom" && (
        <ModeSelectionSection mode={mode} setMode={handleSetMode} />
      )}

      {isCustomModeSequenceWrong ? (
        <CustomModeSequenceWrongModal handleClose={handleCloseModal} />
      ) : (
        <>
          {(mode === "custom" || mode === "random") && (
            <GameSection
              initialWordSequence={wordSequence}
              mode={mode}
              setMode={handleSetMode}
            />
          )}
          {mode === "levels" && (
            <LevelSelector
              key={levelSelectorRefreshKey}
              setMode={handleSetMode}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
