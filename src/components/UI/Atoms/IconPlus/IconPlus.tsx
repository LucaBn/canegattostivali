import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/images";

// Utils
import { getImageColor } from "@/utils/imageColor";
import { generateClassNameValue } from "@/utils/htmlClasses";

interface IIconPlus extends IImage {}

const IconPlus: React.FC<IIconPlus> = ({ forceColor, forceOpacity }) => {
  const { theme } = useTheme();

  const iconColor = getImageColor(theme, forceColor);

  const opacityClass = forceOpacity ? `opacity-${forceOpacity}` : "";
  const classList = generateClassNameValue(["icon-plus", opacityClass]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={iconColor}
      className={classList}
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    </svg>
  );
};

export default IconPlus;
