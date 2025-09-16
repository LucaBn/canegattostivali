import React from "react";

// Components
import { Col, Form } from "react-bootstrap";
import IconMoon from "@/components/UI/Atoms/IconMoon/IconMoon";
import IconSun from "@/components/UI/Atoms/IconSun/IconSun";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Utils
import { playSound } from "@/utils/sounds";

// Constants
import { ThemeList } from "@/typings/themes";

const ThemeHandler: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  const forceColor = theme === ThemeList.Dark ? "#fff" : "#000";

  const getThemeIcon = (option: ThemeList): JSX.Element | null => {
    switch (option) {
      case ThemeList.Dark:
        return <IconMoon forceColor={forceColor} forceOpacity={100} />;
      case ThemeList.Light:
        return <IconSun forceColor={forceColor} forceOpacity={100} />;
      default:
        return null;
    }
  };

  return (
    <Form>
      <p className="mb-1">Tema</p>
      <Form.Group as={Col} className="d-flex flex-wrap gap-3">
        {Object.values(ThemeList).map((option) => (
          <Form.Check
            key={option}
            type="radio"
            name="theme"
            id={`theme-option-${option}`}
            className="option-radio"
            label={<div className="mx-1">{getThemeIcon(option)}</div>}
            checked={theme === option}
            onChange={() => changeTheme(option)}
            title={option === ThemeList.Dark ? "Tema Scuro" : "Tema Chiaro"}
            onClick={() => playSound("/assets/sounds/click-positive.wav")}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

export default ThemeHandler;
