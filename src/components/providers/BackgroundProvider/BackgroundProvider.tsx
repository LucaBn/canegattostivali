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

// Enum
import { BackgroundEffectList } from "@/typings/backgrounds";

export interface IBackgroundContext {
  backgroundEffect: BackgroundEffectList;
  changeBackgroundEffect: (newBackgroundEffect: BackgroundEffectList) => void;
}

const defaultCreateContextValue: IBackgroundContext = {
  backgroundEffect: BackgroundEffectList.None,
  changeBackgroundEffect: () => {},
};

export const BackgroundContext = createContext<IBackgroundContext>(
  defaultCreateContextValue,
);

export const BackgroundProvider: React.FC<IGenericComponent> = ({
  children,
}) => {
  const [backgroundEffect, setBackgroundEffect] =
    useState<BackgroundEffectList>(BackgroundEffectList.None);

  useEffect(() => {
    const storedBackgroundEffect = readFromLocalStorage(
      LS_KEY_LIST.BACKGROUND_EFFECT,
    );

    switch (storedBackgroundEffect) {
      case BackgroundEffectList.None:
        setBackgroundEffect(BackgroundEffectList.None);
        break;

      case BackgroundEffectList.Dots:
        setBackgroundEffect(BackgroundEffectList.Dots);
        break;

      case BackgroundEffectList.Grid:
        setBackgroundEffect(BackgroundEffectList.Grid);
        break;

      case BackgroundEffectList.Diamond:
        setBackgroundEffect(BackgroundEffectList.Diamond);
        break;

      default:
        setBackgroundEffect(BackgroundEffectList.None);
    }
  }, []);

  const changeBackgroundEffect = (
    newBackgroundEffect: BackgroundEffectList,
  ) => {
    setBackgroundEffect(newBackgroundEffect);

    writeToLocalStorage(LS_KEY_LIST.BACKGROUND_EFFECT, newBackgroundEffect);
  };

  const backgroundValues: IBackgroundContext = {
    backgroundEffect,
    changeBackgroundEffect,
  };

  return (
    <BackgroundContext.Provider value={backgroundValues}>
      {children}
    </BackgroundContext.Provider>
  );
};
