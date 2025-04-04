import React, { useState } from "react";

// Components
import { Form, Modal, InputGroup, Button } from "react-bootstrap";
import IconClipboard from "@/components/UI/Atoms/IconClipboard/IconClipboard";

// Utils
import { encryptStringArray } from "@/utils/encoding";

// Constants
import { WEBSITE_URL } from "@/constants/app";

const COPY_TO_CLIPBOARD_BUTTON_TEXT_DEFAULT = "Copia la URL generata";
const COPY_TO_CLIPBOARD_BUTTON_TEXT_COPIED = "URL copiata negli appunti!";

interface Props {
  handleClose: () => void;
}

const CustomWordListModal: React.FC<Props> = ({ handleClose }: Props) => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [copyToClipboardButtonText, setCopyToClipboardButtonText] =
    useState<string>(COPY_TO_CLIPBOARD_BUTTON_TEXT_DEFAULT);

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

  const resetWordList = () => {
    setWordList([]);
    setCurrentWord("");
  };

  const copyToClipboard = () => {
    const customListUrl = getCustomListUrl();
    navigator.clipboard.writeText(customListUrl);
    setCopyToClipboardButtonText(COPY_TO_CLIPBOARD_BUTTON_TEXT_COPIED);
    setTimeout(() => {
      setCopyToClipboardButtonText(COPY_TO_CLIPBOARD_BUTTON_TEXT_DEFAULT);
    }, 2000);
  };

  const getFormattedWord = (word: string) => {
    return word
      .replace(/[^a-zàáèéìíòóúùÀÁÈÉÌÒÙ]/gi, "")
      .replace("á", "à")
      .replace("é", "è")
      .replace("í", "ì")
      .replace("ó", "ò")
      .replace("ú", "ù")
      .toUpperCase();
  };

  const handleWordChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = getFormattedWord(e.target.value);
    updateWord(index, value);
  };

  const handleCurrentWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getFormattedWord(e.target.value);
    setCurrentWord(value);
  };

  const getCustomListUrl = () => {
    const baseUrl = `https://www.${WEBSITE_URL}?customList=`;
    const encryptedList = wordList.length
      ? encryptStringArray(wordList)
      : "...";
    return `${baseUrl}${encryptedList}`;
  };

  const isWordListValid =
    wordList.length >= 5 &&
    wordList.every(
      (word, index, arr) => word.length >= 2 && arr.indexOf(word) === index
    );

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Crea la tua sequenza di parole</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Inserisci da un minimo di 5 a un massimo di 11 parole per creare la
          tua sequenza.
          <br />
          Le parole devono contenere solo lettere ed essere composte da almeno 2
          caratteri.
          <br />
          Ah, e ovviamente devono essere tutte diverse tra loro!
        </p>
        <Form>
          {wordList.map((word, index) => (
            <InputGroup className="mb-2" key={index}>
              <InputGroup.Text>{index + 1}</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Inserisci una parola"
                value={word}
                onChange={(e) =>
                  handleWordChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
                maxLength={20}
                className={
                  word.length >= 2 &&
                  wordList.indexOf(word) === wordList.lastIndexOf(word)
                    ? "is-valid"
                    : "is-invalid"
                }
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
          {wordList.length < 11 && (
            <InputGroup className="mt-4 mb-3">
              <Form.Control
                type="text"
                placeholder="Inserisci una parola"
                value={currentWord}
                onChange={handleCurrentWordChange}
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
          )}
        </Form>

        <hr />

        <Form.Control
          as="textarea"
          value={getCustomListUrl()}
          onClick={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.select();
            target.setSelectionRange(0, 99999); // For mobile devices
          }}
          readOnly
          disabled={!isWordListValid}
          className={!isWordListValid ? "pointer-events-none text-muted" : ""}
          rows={2}
        />

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-2">
          <Button
            variant="success"
            onClick={copyToClipboard}
            disabled={!isWordListValid}
            className="copy-to-clipboard__button d-flex gap-2 text-nowrap"
          >
            <IconClipboard forceColor="#fff" forceOpacity={100} />{" "}
            {copyToClipboardButtonText}
          </Button>
          <Button
            variant="danger"
            onClick={resetWordList}
            disabled={wordList.length === 0}
            className="text-nowrap"
            title="Resetta la lista di parole"
          >
            Reset
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomWordListModal;
