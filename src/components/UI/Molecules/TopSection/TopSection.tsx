import { Col, Row } from "react-bootstrap";
import IconKeyboard from "../../Atoms/IconKeyboard/IconKeyboard";
import IconLightbulb from "../../Atoms/IconLightbulb/IconLightbulb";

const TopSection: React.FC = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" md="8" lg="6" className="text-center">
        <h1 className="mb-3">Cane Gatto Stivali</h1>
        <p className="mb-5">
          Indovina la parola usando quella precedente come indizio.
          <br />I tasti gialli forniscono un aiuto ☝🤓
          <br />
          La tastiera{" "}
          <span className="">
            <IconKeyboard />
          </span>{" "}
          filtra le lettere a tua disposizione.
          <br />
          La lampadina <IconLightbulb /> aggiunge una lettera alla parola da
          indovinare.
          <span className="d-none d-lg-block mt-2">
            Da desktop puoi usare i tasti <em>1</em> e <em>2</em> per usare gli
            aiuti rapidamente!
          </span>
        </p>
      </Col>
    </Row>
  );
};

export default TopSection;
