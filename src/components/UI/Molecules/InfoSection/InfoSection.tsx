// Components
import { Col, Row, Badge } from "react-bootstrap";

import Confetti from "@/components/UI/Atoms/Confetti/Confetti";

// Utils
import { formatTime } from "@/utils/time";

interface Props {
  isGameEnded: boolean;
  showConfetti: boolean;
  wordListLength: number;
  currentWordIndex: number;
  message: string;
  showExtraTimeTooltip: number;
  time: number;
  level?: number;
}

const InfoSection: React.FC<Props> = ({
  isGameEnded,
  showConfetti,
  wordListLength,
  currentWordIndex,
  message,
  showExtraTimeTooltip,
  time,
  level,
}: Props) => {
  const progressBadgeText = isGameEnded
    ? `Hai indovinato tutte le parole!`
    : `Devi indovinare la parola numero ${currentWordIndex} su ${
        wordListLength - 1
      }`;

  return (
    <Row className="position-relative justify-content-center align-items-center mb-1 mb-lg-2 user-select-none">
      <Col xs="auto">
        <Badge bg="dark" pill title={progressBadgeText} className="fs-6">
          {currentWordIndex} / {wordListLength - 1}
        </Badge>
      </Col>

      <Col xs="auto" className="text-center">
        <p className="position-relative d-block fs-2 mb-0">{message}</p>
      </Col>

      {/* TODO: rewrite this logic */}
      {level ? (
        <Col xs="auto">
          <Badge
            bg="dark"
            pill
            title={`Livello ${level}`}
            className="position-relative fs-6"
          >
            Livello {level}
          </Badge>
        </Col>
      ) : (
        <Col xs="auto">
          <Badge
            bg="dark"
            pill
            title="Cronometro"
            className="position-relative fs-6"
          >
            <span
              className={`extra-time-tooltip ${
                showExtraTimeTooltip === 0 ? "" : "fade-in-out"
              } text-secondary`}
            >
              +{showExtraTimeTooltip}s
            </span>
            {formatTime(time)}
          </Badge>
        </Col>
      )}

      {showConfetti && <Confetti />}
    </Row>
  );
};

export default InfoSection;
