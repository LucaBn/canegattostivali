// Components
import { Col, Row, Badge } from "react-bootstrap";

// Utils
import { formatTime } from "@/utils/time";

// Constants
import { WORD_LIST_LENGTH } from "@/constants/wordList";

type Props = {
  isGameEnded: boolean;
  currentWordIndex: number;
  message: string;
  showExtraTimeTooltip: boolean;
  time: number;
};

const InfoSection: React.FC<Props> = ({
  isGameEnded,
  currentWordIndex,
  message,
  showExtraTimeTooltip,
  time,
}: Props) => {
  const progressBadgeText = isGameEnded
    ? `Hai indovinato tutte le parole!`
    : `Devi indovinare la parola numero ${currentWordIndex} su ${
        WORD_LIST_LENGTH - 1
      }`;

  return (
    <Row className="justify-content-center align-items-center mb-1 mb-lg-2 user-select-none">
      <Col xs="auto">
        <Badge bg="dark" pill title={progressBadgeText} className="fs-6">
          {currentWordIndex} / {WORD_LIST_LENGTH - 1}
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
              showExtraTimeTooltip ? "extra-time-tooltip--visible" : ""
            } text-secondary`}
          >
            +10s
          </span>
          {formatTime(time)}
        </Badge>
      </Col>
    </Row>
  );
};

export default InfoSection;
