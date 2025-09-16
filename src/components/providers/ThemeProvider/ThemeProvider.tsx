import React, { useState, useEffect, createContext } from "react";

// Utils
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/utils/localStorage";

// Typings
import { IGenericComponent } from "@/typings/components";
import { ThemeList } from "@/typings/themes";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

// Define the context
export interface IThemeContext {
  theme: ThemeList;
  changeTheme: (newTheme: ThemeList) => void;
}

// Default createContextValue
const defaultCreateContextValue = {
  theme: ThemeList.Dark,
  changeTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(
  defaultCreateContextValue
);

export const ThemeProvider: React.FC<IGenericComponent> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeList>(ThemeList.Dark);

  useEffect(() => {
    const storedCgsTheme = readFromLocalStorage(LS_KEY_LIST.THEME);

    switch (storedCgsTheme) {
      case ThemeList.Dark:
        setTheme(ThemeList.Dark);
        break;
      case ThemeList.Light:
        setTheme(ThemeList.Light);
        break;
      default:
        break;
    }
  }, []);

  const changeTheme = (newTheme: ThemeList) => {
    setTheme(newTheme);
    writeToLocalStorage(LS_KEY_LIST.THEME, newTheme);
  };

  const themeValues: IThemeContext = {
    theme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
