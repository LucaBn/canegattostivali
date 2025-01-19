import React from "react";

// Components
import { Col, Container, Row, Image, Button } from "react-bootstrap";

// Locales
import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="mt-4 text-center">
        <Col xs={12}>
          <h1 className="mt-2 mt-sm-3">Cane Gatto Stivali</h1>
          <p>Pagina non trovata</p>
        </Col>
        <Col xs={12}>
          <Image
            src="/assets/img/404.png"
            title="Errore 404"
            height={360}
            width={512}
            className="mw-100 h-auto"
            draggable={false}
          />
        </Col>
        <Col xs={12} className="mt-4">
          <Link to={`/`}>
            <Button>Torna alla Home Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
