import React from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";

// Constants
import { WEBSITE_URL } from "@/constants/app";

const Footer: React.FC = () => {
  const siteUrl = WEBSITE_URL;

  return (
    <footer className="bg-dark text-white py-4 border-top">
      <Container>
        <Row>
          <Col xs={12}>
            <p className="text-center mb-1">© 2&zwj;024-2381 {siteUrl}</p>
            <p className="text-center">
              Made with ♥ by{" "}
              <a
                title="Visita la Pagina GitHub di LucaBn"
                rel="noopener noreferrer nofollow"
                className="text-white"
                href="https://github.com/LucaBn"
                target="_blank"
              >
                LucaBn
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
