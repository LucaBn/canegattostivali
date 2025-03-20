import React, { useState } from "react";

// Components
import { Modal, Button, Toast } from "react-bootstrap";
import IconNewspaper from "@/components/UI/Atoms/IconNewspaper/IconNewspaper";
import NotificationCircle from "@/components/UI/Atoms/NotificationCircle/NotificationCircle";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/local-storage";

// Data
import newsData from "@/assets/data/newsData.json";

// Constants
import { APP_NAME_SHORT } from "@/constants/app";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const lowercaseAppName = APP_NAME_SHORT.toLowerCase();
const LS_READ_NEWS_VARIABLE = `${lowercaseAppName}ReadNews`;

const NewsButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { changeKeyboardStatus } = useKeyboardStatus();

  // Leave it here so it runs every time the component is updated
  const storedReadNews: number | null = readFromLocalStorage(
    LS_READ_NEWS_VARIABLE
  );

  const saveReadNews = () => {
    writeToLocalStorage(LS_READ_NEWS_VARIABLE, newsData.length);
  };

  const handleOpen = () => {
    setShowModal(true);
    changeKeyboardStatus(KeyboardStatusList.Inactive);
    saveReadNews();
  };
  const handleClose = () => {
    setShowModal(false);
    changeKeyboardStatus(KeyboardStatusList.Active);
  };

  return (
    <>
      <span className="position-relative" onClick={handleOpen}>
        <IconNewspaper forceColor="#fff" />
        {(!storedReadNews || storedReadNews < newsData.length) && (
          <NotificationCircle bgColor="warning" pulse />
        )}
      </span>
      {showModal && (
        <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>News</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {newsData.map((news, index) => (
              <Toast key={index} className="w-100 mb-3">
                <Toast.Header closeButton={false} className="align-items-start">
                  <p className="me-auto mb-0 pe-3">{news.title}</p>
                  <small className="text-nowrap">{news.date}</small>
                </Toast.Header>
                <Toast.Body>{news.body}</Toast.Body>
              </Toast>
            ))}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="primary" onClick={handleClose}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default NewsButton;
