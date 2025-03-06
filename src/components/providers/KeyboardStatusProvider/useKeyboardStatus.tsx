import { useContext } from "react";

import {
  IKeyboardStatusContext,
  KeyboardStatusContext,
} from "@/components/providers/KeyboardStatusProvider/KeyboardStatusProvider";

// Define a custom hook to use the keyboardStatus context
export const useKeyboardStatus = (): IKeyboardStatusContext => {
  const context = useContext(KeyboardStatusContext);

  if (!context) {
    throw new Error(
      "useKeyboardStatus must be used within a KeyboardStatusProvider"
    );
  }
  return context;
};
