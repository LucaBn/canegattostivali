// Providers
import { ThemeProvider } from "@/components/providers/ThemeProvider/ThemeProvider";
import { KeyboardStatusProvider } from "./KeyboardStatusProvider/KeyboardStatusProvider";
import { ReactRouterProvider } from "@/components/providers/ReactRouterProvider/ReactRouterProvider";

export const Providers = () => {
  return (
    <ThemeProvider>
      <KeyboardStatusProvider>
        <ReactRouterProvider />
      </KeyboardStatusProvider>
    </ThemeProvider>
  );
};
