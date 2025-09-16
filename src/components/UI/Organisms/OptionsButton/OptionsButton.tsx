import React, { useEffect, useState } from "react";

// Components
import { Button } from "react-bootstrap";
import IconGear from "@/components/UI/Atoms/IconGear/IconGear";
import OptionsModal from "@/components/UI/Organisms/OptionsModal/OptionsModal";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const OptionsButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { changeKeyboardStatus } = useKeyboardStatus();

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
        aria-label="Opzioni"
        title="Opzioni"
        variant="link"
        onClick={handleOpen}
      >
        <IconGear forceColor="#fff" />
      </Button>
      <OptionsModal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default OptionsButton;
