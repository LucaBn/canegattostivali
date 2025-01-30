import { Col, Row } from "react-bootstrap";

type Props = {
  getHelp: () => void;
};

const GetHelpSection: React.FC<Props> = ({ getHelp }: Props) => {
  return (
    <Row className="justify-content-center align-items-center mt-5 user-select-none">
      <Col xs="auto">
        <span
          title="Chiedi un aiuto!"
          className="fs-2 cursor-pointer"
          onClick={getHelp}
        >
          💡
        </span>
      </Col>
    </Row>
  );
};

export default GetHelpSection;
