import React, { useEffect, useState } from "react";

// Components
import { Button } from "react-bootstrap";
import IconPlus from "@/components/UI/Atoms/IconPlus/IconPlus";
import CustomWordListModal from "@/components/UI/Organisms/CustomWordListModal/CustomWordListModal";

// Providers
import { useKeyboardStatus } from "@/components/providers/KeyboardStatusProvider/useKeyboardStatus";

// Typings
import { KeyboardStatusList } from "@/typings/keyboardStatus";

const CustomWordListButton: React.FC = () => {
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
        aria-label="Crea la tua sequenza di parole"
        title="Crea la tua sequenza di parole"
        variant="link"
        onClick={handleOpen}
      >
        <IconPlus forceColor="#fff" />
      </Button>
      <CustomWordListModal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default CustomWordListButton;
