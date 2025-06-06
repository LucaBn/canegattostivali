import React from "react";

// Components
import { Container, Row, Col, Image } from "react-bootstrap";

// Constants
import { AUTHOR_NAME, WEBSITE_URL } from "@/constants/app";

const Footer: React.FC = () => {
  const siteUrl: string = WEBSITE_URL;
  const authorName: string = AUTHOR_NAME;
  const authorLink: string = "https://github.com/LucaBn";

  return (
    <footer className="bg-dark text-white py-4 border-top">
      <Container>
        <Row>
          <Col xs={12} className="my-4">
            <p className="text-center mb-1">© 2&zwj;025-2381 {siteUrl}</p>
            <p className="text-center mb-1">
              Creato con ♥ da{" "}
              <a
                title="Visita la Pagina GitHub di LucaBn"
                rel="noopener noreferrer nofollow"
                className="text-white"
                href={authorLink}
                target="_blank"
              >
                {authorName}
              </a>
            </p>
            <p className="text-center">Logo realizzato da Manuela</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <p className="mb-2 text-center">Powered by</p>
            <p className="d-flex flex-column align-items-center">
              <a
                href="https://www.pimpmyjpg.com/it"
                title="Pimp my Jpg"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="d-contents text-white"
              >
                <Image
                  src="/assets/img/pimp-my-jpg.png"
                  height="50"
                  width="100"
                  alt="Logo di Pimp my Jpg con bicipiti assurdi"
                  draggable="false"
                  className="pmj__logo"
                />
                <span className="pmj__logo-label">PIMP MY JPG</span>
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            <p>
              <a
                href="https://www.buymeacoffee.com/lucabn"
                title="Offrimi un Caffè"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="d-contents"
              >
                <Image
                  src="/assets/img/buy-me-a-coffee.png"
                  height={56}
                  width={200}
                  className="d-block mx-auto rounded"
                  alt="Offrimi un Caffè"
                  draggable={false}
                />
              </a>
            </p>
            <p className="text-center">
              O, se mi vuoi davvero bene,
              <br />
              <small>
                ETH 0x7470cf0460d96a857094
                <wbr />
                f748a18669585ea5c185
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
