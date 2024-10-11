import React from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
          <h1>Titolo</h1>
          <p className="white-space-pre-line lh-lg">Descrizione</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
