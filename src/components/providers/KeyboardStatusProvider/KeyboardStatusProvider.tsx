import React, { useState, createContext } from "react";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { KeyboardStatusList } from "@/typings/keyboardStatus";

// Define the context
export interface IKeyboardStatusContext {
  keyboardStatus: KeyboardStatusList;
  changeKeyboardStatus: (newKeyboardStatus: KeyboardStatusList) => void;
}

// Default createContextValue
const defaultCreateContextValue = {
  keyboardStatus: KeyboardStatusList.Active,
  changeKeyboardStatus: () => {},
};

export const KeyboardStatusContext = createContext<IKeyboardStatusContext>(
  defaultCreateContextValue
);

export const KeyboardStatusProvider: React.FC<IGenericComponent> = ({
  children,
}) => {
  const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatusList>(
    KeyboardStatusList.Active
  );

  const changeKeyboardStatus = (newKeyboardStatus: KeyboardStatusList) => {
    setKeyboardStatus(newKeyboardStatus);
  };

  const keyboardStatusValues: IKeyboardStatusContext = {
    keyboardStatus,
    changeKeyboardStatus,
  };

  return (
    <KeyboardStatusContext.Provider value={keyboardStatusValues}>
      {children}
    </KeyboardStatusContext.Provider>
  );
};
