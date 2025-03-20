import { Col, Row } from "react-bootstrap";
import IconEyeSlash from "@/components/UI/Atoms/IconEyeSlash/IconEyeSlash";
import IconLightbulb from "@/components/UI/Atoms/IconLightbulb/IconLightbulb";

const TopSection: React.FC = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" md="8" lg="6" className="text-center">
        <h1 className="mb-3">Cane Gatto Stivali</h1>
        <p className="mb-1">
          Indovina la parola usando quella precedente come indizio.
        </p>
        <p className="mb-5">
          I tasti gialli forniscono un aiuto ☝🤓
          <br />
          L'occhio{" "}
          <span className="">
            <IconEyeSlash />
          </span>{" "}
          filtra le lettere a tua disposizione.
          <br />
          La lampadina{" "}
          <span className="">
            <IconLightbulb />
          </span>{" "}
          aggiunge una lettera alla parola da indovinare.
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
