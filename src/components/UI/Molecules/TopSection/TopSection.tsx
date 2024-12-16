import { Col, Row } from "react-bootstrap";

const TopSection: React.FC = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" md="8" lg="6">
        <h1 className="text-center">Cane Gatto Stivali</h1>
        <p className="mb-5 text-center">
          Indovina la parola usando quella precedente come indizio!
        </p>
      </Col>
    </Row>
  );
};

export default TopSection;
