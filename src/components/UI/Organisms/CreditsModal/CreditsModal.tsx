import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const author = ["Luca"];
const logoArtist = ["Manuela"];
const testers = [
  "Alessandro",
  "Andrea",
  "Andrea",
  "Andrea",
  "Chiara",
  "Christian",
  "Daria",
  "Domenico",
  "Emanuele",
  "Francesco",
  "Gaia",
  "Giorgio",
  "Glici",
  "Grazia",
  "Jon",
  "Luca",
  "Manuela",
  "Manuela",
  "Marco",
  "Marco",
  "Mattia",
  "Sara",
  "Sofia",
  "Stefano",
];
const virtualAssistants = ["ChatGPT"];

const CreditsModal: React.FC<Props> = ({ show, setShow }: Props) => {
  const countDuplicates = (arr: string[]) => {
    const map = new Map<string, number>();
    arr.forEach((name) => {
      map.set(name, (map.get(name) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) =>
      count > 1 ? `${name} ×${count}` : name
    );
  };

  const uniqueTesters = countDuplicates(testers);

  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Credits</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="mb-2">Autore 💻</h6>
        <div className="mb-4">
          {author.map((name, i) => (
            <Badge
              key={i}
              bg="light"
              text="dark"
              className="fs-6 fw-normal me-2 mb-2 border"
            >
              {name}
            </Badge>
          ))}
        </div>

        <h6 className="mb-2">Logo Artist 🎨</h6>
        <div className="mb-4">
          {logoArtist.map((name, i) => (
            <Badge
              key={i}
              bg="light"
              text="dark"
              className="fs-6 fw-normal me-2 mb-2 border"
            >
              {name}
            </Badge>
          ))}
        </div>

        <h6 className="mb-2">Tester 🧪</h6>
        <div className="d-flex flex-wrap mb-4">
          {uniqueTesters.map((name, i) => (
            <Badge
              key={i}
              bg="light"
              text="dark"
              className="fs-6 fw-normal me-2 mb-2 border"
            >
              {name}
            </Badge>
          ))}
        </div>

        <h6 className="mb-2">Assistente Virtuale 🤖</h6>
        <div className="d-flex flex-wrap">
          {virtualAssistants.map((name, i) => (
            <Badge
              key={i}
              bg="light"
              text="dark"
              className="fs-6 fw-normal me-2 mb-2 border"
            >
              {name}
            </Badge>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreditsModal;
