import React, { useState } from "react";

// Components
import { Button, Form, Alert, Card } from "react-bootstrap";

// Constants
import { APP_NAME_SHORT } from "@/constants/app";
import { LS_KEY_LIST } from "@/constants/localStorage";

// Utils
import { playSound } from "@/utils/sounds";
import { decryptData, encryptData } from "@/utils/string";

const LOCAL_STORAGE_KEYS = [
  LS_KEY_LIST.USER_DATA,
  LS_KEY_LIST.SOUNDS,
  LS_KEY_LIST.KEYBOARD_SWAP,
  LS_KEY_LIST.GAME_MODE,
  LS_KEY_LIST.READ_NEWS,
  LS_KEY_LIST.THEME,
];

const SECRET_KEY = APP_NAME_SHORT;

const DataManager: React.FC = () => {
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const isApp =
    new URLSearchParams(window.location.search).get("isApp") === "true";

  const exportData = () => {
    playSound("/assets/sounds/click-positive.wav");

    const data: Record<string, unknown> = {};

    LOCAL_STORAGE_KEYS.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) data[key] = JSON.parse(value);
    });

    const encrypted = encryptData(data, SECRET_KEY);

    const blob = new Blob([JSON.stringify(encrypted, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cgs_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        const decrypted = decryptData(importedData, APP_NAME_SHORT);

        LOCAL_STORAGE_KEYS.forEach((key) => {
          if (key in decrypted) {
            localStorage.setItem(key, JSON.stringify(decrypted[key]));
          }
        });
        if (isApp) {
          setImportSuccess(
            "Dati importati con successo!\nIn caso di problemi riavvia l'app."
          );
        } else {
          setImportSuccess(
            "Dati importati con successo!\nIn caso di problemi ricarica la pagina."
          );
        }
      } catch (err) {
        console.error(err);
        setImportError("Errore nel file JSON importato.");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">Gestione dati e statistiche</Card.Title>

        <div className="d-flex flex-column gap-2">
          <Button variant="primary" onClick={exportData} className="w-100">
            📤 Esporta dati (JSON)
          </Button>

          <hr />

          <Form.Group controlId="import-json-file">
            <Form.Label>📥 Importa da file JSON</Form.Label>
            <Form.Control type="file" accept=".json" onChange={importData} />
            <Form.Text className="text-danger d-block mt-2">
              ⚠️ Importando un file i dati e le statistiche esistenti verranno
              sovrascritti!
            </Form.Text>
          </Form.Group>

          {importSuccess && (
            <Alert
              variant="success"
              onClose={() => setImportSuccess(null)}
              dismissible
              className="white-space-pre-line"
            >
              {importSuccess}
            </Alert>
          )}
          {importError && (
            <Alert
              variant="danger"
              onClose={() => setImportError(null)}
              dismissible
            >
              {importError}
            </Alert>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DataManager;
