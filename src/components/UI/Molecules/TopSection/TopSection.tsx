import { Col, Row } from "react-bootstrap";
import IconEyeSlash from "@/components/UI/Atoms/IconEyeSlash/IconEyeSlash";
import IconLightbulb from "@/components/UI/Atoms/IconLightbulb/IconLightbulb";

const TopSection: React.FC = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" md="8" lg="6" className="text-center mb-5">
        <h1 className="mb-3">Cane Gatto Stivali</h1>
        <p className="mb-1">
          Indovina la parola usando quella precedente come indizio.
        </p>
        <p className="mb-0">
          I tasti gialli forniscono un aiuto ☝🤓
          <br />
          L'occhio <IconEyeSlash forceOpacity={100} /> filtra le lettere a tua
          disposizione.
          <br />
          La lampadina <IconLightbulb forceOpacity={100} /> rivela una lettera
          in più della parola da indovinare.
        </p>
        <p className="d-none d-lg-block mt-2 mb-0">
          Da desktop puoi usare i tasti <em>1</em> e <em>2</em> per usare gli
          aiuti rapidamente!
        </p>
      </Col>
    </Row>
  );
};

export default TopSection;
