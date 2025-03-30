import React, { useState } from "react";

// Components
import { Form, Modal, InputGroup, Button } from "react-bootstrap";
import IconClipboard from "@/components/UI/Atoms/IconClipboard/IconClipboard";
import IconPlus from "@/components/UI/Atoms/IconPlus/IconPlus";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Utils
import { encryptStringArray } from "@/utils/encoding";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const COPY_TO_CLIPBOARD_BUTTON_TEXT_DEFAULT = "Copia la URL generata";
const COPY_TO_CLIPBOARD_BUTTON_TEXT_COPIED = "URL copiata negli appunti!";

const CustomWordListButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [copyToClipboardButtonText, setCopyToClipboardButtonText] =
    useState<string>(COPY_TO_CLIPBOARD_BUTTON_TEXT_DEFAULT);

  const { changeKeyboardStatus } = useKeyboardStatus();

  const handleOpen = () => {
    setShowModal(true);
    changeKeyboardStatus(KeyboardStatusList.Inactive);
  };
  const handleClose = () => {
    setShowModal(false);
    changeKeyboardStatus(KeyboardStatusList.Active);
  };

  const addWord = () => {
    if (currentWord.length >= 2 && wordList.length < 11) {
      setWordList([...wordList, currentWord]);
      setCurrentWord("");
    }
  };

  const updateWord = (index: number, newValue: string) => {
    const updatedWordList = wordList.map((word, i) =>
      i === index ? newValue : word
    );
    setWordList(updatedWordList);
  };

  const removeWord = (index: number) => {
    setWordList(wordList.filter((_, i) => i !== index));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://www.canegattostivali.com?customList=${encryptStringArray(
        wordList
      )}`
    );
    setCopyToClipboardButtonText(COPY_TO_CLIPBOARD_BUTTON_TEXT_COPIED);
    setTimeout(() => {
      setCopyToClipboardButtonText(COPY_TO_CLIPBOARD_BUTTON_TEXT_DEFAULT);
    }, 2000);
  };

  return (
    <>
      <span onClick={handleOpen}>
        <IconPlus forceColor="#fff" />
      </span>
      {showModal && (
        <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Crea la tua sequenza di parole</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Inserisci da 5 a 11 parole per creare la tua sequenza.
              <br />
              Le parole possono contenere solo lettere e devono essere composte
              da almeno 2 caratteri.
            </p>
            <Form>
              {wordList.map((word, index) => (
                <InputGroup className="mb-2" key={index}>
                  <InputGroup.Text>{index + 1}</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci una parola"
                    value={word}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^a-zàáèéìíòóúùÀÁÈÉÌÒÙ]/gi, "")
                        .replace("á", "à")
                        .replace("é", "è")
                        .replace("í", "ì")
                        .replace("ó", "ò")
                        .replace("ú", "ù")
                        .toUpperCase();
                      updateWord(index, value);
                    }}
                    maxLength={20}
                    className={word.length < 2 ? "is-invalid" : "is-valid"}
                  />
                  <Button
                    variant="danger"
                    onClick={() => removeWord(index)}
                    title="Rimuovi parola"
                  >
                    -
                  </Button>
                </InputGroup>
              ))}
              <InputGroup className="mt-4 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Inserisci una parola"
                  value={currentWord}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^a-zàáèéìíòóúùÀÁÈÉÌÒÙ]/gi, "")
                      .replace("á", "à")
                      .replace("é", "è")
                      .replace("í", "ì")
                      .replace("ó", "ò")
                      .replace("ú", "ù")
                      .toUpperCase();
                    setCurrentWord(value);
                  }}
                  maxLength={20}
                  aria-label="Inserisci una parola"
                />
                <Button
                  variant="primary"
                  onClick={addWord}
                  disabled={currentWord.length < 2 || wordList.length >= 11}
                  title="Aggiungi parola"
                >
                  +
                </Button>
              </InputGroup>
            </Form>

            <hr />

            <Form.Control
              as="textarea"
              value={`https://www.canegattostivali.com?customList=${
                wordList.length ? encryptStringArray(wordList) : "..."
              }`}
              onClick={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.select();
                target.setSelectionRange(0, 99999); // For mobile devices
              }}
              readOnly
            />

            <Button
              variant="success"
              onClick={copyToClipboard}
              disabled={
                wordList.length < 5 || wordList.some((word) => word.length < 2)
              }
              className="mt-2"
            >
              <IconClipboard forceOpacity={100} /> {copyToClipboardButtonText}
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CustomWordListButton;
