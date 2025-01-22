import { Col, Row } from "react-bootstrap";

const TopSection: React.FC = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" md="8" lg="6" className="text-center">
        <h1 className="mb-3">Cane Gatto Stivali</h1>
        <p className="mb-5 user-select-none">
          Indovina la parola usando quella precedente come indizio.
          <br />
          Se hai un dubbio clicca sulla lampadina 💡 (o premi il tasto{" "}
          <strong>1</strong> se giochi da desktop) per ricevere un aiutino!
        </p>
      </Col>
    </Row>
  );
};

export default TopSection;
