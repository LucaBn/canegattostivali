// Providers
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { KeyboardStatusProvider } from "@/components/providers/KeyboardStatusProvider";
import { KeyboardSwapProvider } from "@/components/providers/KeyboardSwapProvider";
import { ReactRouterProvider } from "@/components/providers/ReactRouterProvider";

export const Providers = () => {
  return (
    <ThemeProvider>
      <KeyboardSwapProvider>
        <KeyboardStatusProvider>
          <ReactRouterProvider />
        </KeyboardStatusProvider>
      </KeyboardSwapProvider>
    </ThemeProvider>
  );
};
