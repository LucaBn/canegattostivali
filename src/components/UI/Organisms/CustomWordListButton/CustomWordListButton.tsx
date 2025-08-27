import React, { useState } from "react";

// Components
import IconPlus from "@/components/UI/Atoms/IconPlus/IconPlus";
import CustomWordListModal from "@/components/UI/Organisms/CustomWordListModal/CustomWordListModal";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const CustomWordListButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { changeKeyboardStatus } = useKeyboardStatus();

  const handleOpen = () => {
    setShowModal(true);
    changeKeyboardStatus(KeyboardStatusList.Inactive);
  };
  const handleClose = () => {
    setShowModal(false);
    changeKeyboardStatus(KeyboardStatusList.Active);
  };

  return (
    <>
      <span
        onClick={handleOpen}
        tabIndex={0}
        role="button"
        aria-label="Crea la tua sequenza di parole"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOpen();
            e.preventDefault();
          }
        }}
      >
        <IconPlus forceColor="#fff" />
      </span>
      {showModal && <CustomWordListModal handleClose={handleClose} />}
    </>
  );
};

export default CustomWordListButton;
