import React, { useState } from "react";

// Components
import IconUser from "@/components/UI/Atoms/IconUser/IconUser";
import UserModal from "@/components/UI/Organisms/UserModal/UserModal";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const UserButton: React.FC = () => {
  const { changeKeyboardStatus } = useKeyboardStatus();

  const [showModal, setShowModal] = useState<boolean>(false);

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
        aria-label="Profilo"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOpen();
            e.preventDefault();
          }
        }}
      >
        <IconUser forceColor="#fff" />
      </span>
      {showModal && <UserModal handleClose={handleClose} />}
    </>
  );
};

export default UserButton;
