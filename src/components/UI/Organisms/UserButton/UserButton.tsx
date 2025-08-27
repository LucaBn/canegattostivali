import React, { useState } from "react";

// Components
import { Button } from "react-bootstrap";
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
      <Button
        aria-label="Profilo"
        title="Profilo"
        variant="link"
        onClick={handleOpen}
      >
        <IconUser forceColor="#fff" />
      </Button>
      {showModal && <UserModal handleClose={handleClose} />}
    </>
  );
};

export default UserButton;
