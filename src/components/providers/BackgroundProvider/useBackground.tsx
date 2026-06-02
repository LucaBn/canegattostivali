import { useContext } from "react";

import {
  IBackgroundContext,
  BackgroundContext,
} from "@/components/providers/BackgroundProvider/BackgroundProvider";

// Define a custom hook to use the background context
export const useBackground = (): IBackgroundContext => {
  const context = useContext(BackgroundContext);

  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
