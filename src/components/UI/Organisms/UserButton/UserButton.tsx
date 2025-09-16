import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (showModal) {
      changeKeyboardStatus(KeyboardStatusList.Inactive);
    } else {
      changeKeyboardStatus(KeyboardStatusList.Active);
    }
  }, [showModal]);

  const handleOpen = () => {
    setShowModal(true);
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
      <UserModal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default UserButton;
