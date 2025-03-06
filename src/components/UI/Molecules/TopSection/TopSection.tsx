import { Col, Row } from "react-bootstrap";

const TopSection: React.FC = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" md="8" lg="6" className="text-center">
        <h1 className="mb-3">Cane Gatto Stivali</h1>
        <p className="mb-5">
          Indovina la parola usando quella precedente come indizio.
          <br />
          Se hai un dubbio clicca sulla lampadina 💡{" "}
          <span className="d-none d-lg-inline">
            (o premi il tasto <em>1</em> se giochi da desktop)
          </span>{" "}
          per ricevere un aiutino!
        </p>
      </Col>
    </Row>
  );
};

export default TopSection;
