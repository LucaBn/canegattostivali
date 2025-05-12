import React, { useState } from "react";

// Components
import IconNewspaper from "@/components/UI/Atoms/IconNewspaper/IconNewspaper";
import NotificationCircle from "@/components/UI/Atoms/NotificationCircle/NotificationCircle";
import NewsModal from "@/components/UI/Organisms/NewsModal/NewsModal";

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
import { LS_KEY_LIST } from "@/constants/localStorage";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const NewsButton: React.FC = () => {
  // Leave it here so it runs every time the component is updated
  const storedReadNews: number | null = readFromLocalStorage(
    LS_KEY_LIST.READ_NEWS
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const { changeKeyboardStatus } = useKeyboardStatus();

  const saveReadNews = () => {
    writeToLocalStorage(LS_KEY_LIST.READ_NEWS, newsData.length);
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

  const isNotificationVisible =
    !storedReadNews || storedReadNews < newsData.length;

  return (
    <>
      <span className="position-relative" onClick={handleOpen}>
        <IconNewspaper forceColor="#fff" />
        {isNotificationVisible && (
          <NotificationCircle bgColor="warning" pulse />
        )}
      </span>
      {showModal && <NewsModal handleClose={handleClose} />}
    </>
  );
};

export default NewsButton;
