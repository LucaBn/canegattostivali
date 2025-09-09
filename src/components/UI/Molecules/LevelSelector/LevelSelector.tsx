import { useState, useRef } from "react";

// Components
import { Row, Col, Button, Card } from "react-bootstrap";
import GameSection from "@/components/UI/Organisms/GameSection/GameSection";

// Utils
import { playSound } from "@/utils/sounds";
import { readFromLocalStorage } from "@/utils/localStorage";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

// Typings
import { UserData } from "@/typings/user";

// Data
import levelList from "@/assets/data/levelList.json";
import NotificationCircle from "../../Atoms/NotificationCircle/NotificationCircle";

interface Props {
  setMode: (newMode: "random" | "levels" | "custom") => void;
}

const LevelSelector: React.FC<Props> = ({ setMode }: Props) => {
  // Leave it here so it runs every time the component is updated
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_KEY_LIST.USER_DATA
  );
  const lastLevelCompleted = storedUserData?.lastLevelCompleted || 0;

  const [currentLevel, setCurrentLevel] = useState<number>(-1);
  const [gameSectionRefreshKey, setGameSectionRefreshKey] = useState(0);

  const gameSectionRef = useRef<HTMLDivElement>(null);

  const scrollToGameSection = () => {
    if (gameSectionRef.current) {
      gameSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLevelChange = (levelId: number) => {
    playSound("/assets/sounds/click-positive.wav");
    setCurrentLevel(levelId);
    setGameSectionRefreshKey((prev) => prev + 1);
    requestAnimationFrame(() => {
      scrollToGameSection();
    });
  };

  const areAllLevelsCompleted = lastLevelCompleted === levelList.length;

  return (
    <>
      {currentLevel === -1 && (
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8} className="text-center">
            <Card>
              <Card.Header>Seleziona il livello</Card.Header>
              <Card.Body className="level-selector__card-body pb-0">
                {areAllLevelsCompleted ? (
                  <div className="text-center mb-3">
                    <em>Hai completato tutti i livelli!</em> 😎
                  </div>
                ) : (
                  <div className="text-center mb-3">
                    <em>
                      Un livello tira l'altro: completali in ordine per scoprire
                      cosa ti aspetta!
                    </em>
                  </div>
                )}
                <Row>
                  {levelList.map((level) => (
                    <Col
                      key={level.id}
                      xs={6}
                      sm={4}
                      lg={3}
                      xl={2}
                      className="mb-3"
                    >
                      <Button
                        variant={
                          level.id > lastLevelCompleted + 1
                            ? "secondary"
                            : "primary"
                        }
                        disabled={level.id > lastLevelCompleted + 1}
                        onClick={() => handleLevelChange(level.id)}
                        className="position-relative w-100"
                      >
                        {level.id === lastLevelCompleted + 1 && (
                          <NotificationCircle bgColor="warning" pulse />
                        )}
                        Lvl {level.id}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <div
        ref={gameSectionRef}
        className="w-100"
        style={{
          scrollMarginTop: 85, // Navbar height + 20px
        }}
      >
        {currentLevel !== -1 && (
          <GameSection
            key={gameSectionRefreshKey}
            level={currentLevel}
            mode="levels"
            initialWordSequence={levelList[currentLevel - 1].wordList}
            setMode={setMode}
            handleLevelChange={handleLevelChange}
          />
        )}
      </div>
    </>
  );
};

export default LevelSelector;
