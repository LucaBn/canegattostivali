import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";

// Typings
import { IGenericComponent } from "@/typings/components";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

// Define the context
export interface IKeyboardSwapContext {
  keyboardSwapValue: boolean;
  changeKeyboardSwapValue: (newValue: boolean) => void;
}

// Default createContextValue
const defaultCreateContextValue = {
  keyboardSwapValue: false,
  changeKeyboardSwapValue: () => {},
};

export const KeyboardSwapContext = createContext<IKeyboardSwapContext>(
  defaultCreateContextValue
);

export const KeyboardSwapProvider: React.FC<IGenericComponent> = ({
  children,
}) => {
  const [keyboardSwapValue, setKeyboardSwapValue] = useState<boolean>(false);

  useEffect(() => {
    const storedCgsKeyboardSwapValue = readFromLocalStorage(
      LS_KEY_LIST.KEYBOARD_SWAP
    );

    if (typeof storedCgsKeyboardSwapValue === "boolean") {
      setKeyboardSwapValue(storedCgsKeyboardSwapValue);
    }
  }, []);

  const changeKeyboardSwapValue = (newValue: boolean) => {
    setKeyboardSwapValue(newValue);
    writeToLocalStorage(LS_KEY_LIST.KEYBOARD_SWAP, newValue);
  };

  const keyboardSwapValues: IKeyboardSwapContext = {
    keyboardSwapValue,
    changeKeyboardSwapValue,
  };

  return (
    <KeyboardSwapContext.Provider value={keyboardSwapValues}>
      {children}
    </KeyboardSwapContext.Provider>
  );
};
