import { useContext } from "react";

import {
  IKeyboardSwapContext,
  KeyboardSwapContext,
} from "@/components/providers/KeyboardSwapProvider/KeyboardSwapProvider";

// Define a custom hook to use the keyboardSwap context
export const useKeyboardSwap = (): IKeyboardSwapContext => {
  const context = useContext(KeyboardSwapContext);

  if (!context) {
    throw new Error(
      "useKeyboardSwap must be used within a KeyboardSwapProvider"
    );
  }
  return context;
};
