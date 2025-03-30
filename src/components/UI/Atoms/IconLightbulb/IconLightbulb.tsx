import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/images";

// Utils
import { getImageColor } from "@/utils/image-color";
import { generateClassNameValue } from "@/utils/html-classes";

interface IIconSun extends IImage {}

const IconLightbulb: React.FC<IIconSun> = ({ forceColor, forceOpacity }) => {
  const { theme } = useTheme();

  const iconColor = getImageColor(theme, forceColor);

  const opacityClass = forceOpacity ? `opacity-${forceOpacity}` : "";
  const classList = generateClassNameValue(["icon-lightbulb", opacityClass]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={iconColor}
      className={classList}
    >
      <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
    </svg>
  );
};

export default IconLightbulb;
