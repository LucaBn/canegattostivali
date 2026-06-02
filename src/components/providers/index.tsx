// Providers
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BackgroundProvider } from "@/components/providers/BackgroundProvider";
import { KeyboardStatusProvider } from "@/components/providers/KeyboardStatusProvider";
import { KeyboardSwapProvider } from "@/components/providers/KeyboardSwapProvider";
import { ReactRouterProvider } from "@/components/providers/ReactRouterProvider";

export const Providers = () => {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <KeyboardSwapProvider>
          <KeyboardStatusProvider>
            <ReactRouterProvider />
          </KeyboardStatusProvider>
        </KeyboardSwapProvider>
      </BackgroundProvider>
    </ThemeProvider>
  );
};
