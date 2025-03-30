// Components
import { Col, Row, Badge } from "react-bootstrap";

// Utils
import { formatTime } from "@/utils/time";

interface Props {
  isGameEnded: boolean;
  wordListLength: number;
  currentWordIndex: number;
  message: string;
  showExtraTimeTooltip: number;
  time: number;
}

const InfoSection: React.FC<Props> = ({
  isGameEnded,
  wordListLength,
  currentWordIndex,
  message,
  showExtraTimeTooltip,
  time,
}: Props) => {
  const progressBadgeText = isGameEnded
    ? `Hai indovinato tutte le parole!`
    : `Devi indovinare la parola numero ${currentWordIndex} su ${
        wordListLength - 1
      }`;

  return (
    <Row className="justify-content-center align-items-center mb-1 mb-lg-2 user-select-none">
      <Col xs="auto">
        <Badge bg="dark" pill title={progressBadgeText} className="fs-6">
          {currentWordIndex} / {wordListLength - 1}
        </Badge>
      </Col>

      <Col xs="auto" className="text-center">
        <p className="position-relative d-block fs-2 mb-0">{message}</p>
      </Col>

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
    </Row>
  );
};

export default InfoSection;
