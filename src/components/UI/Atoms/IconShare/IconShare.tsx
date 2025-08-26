import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/images";

// Utils
import { getImageColor } from "@/utils/imageColor";
import { generateClassNameValue } from "@/utils/htmlClasses";

interface IIconShare extends IImage {}

const IconShare: React.FC<IIconShare> = ({ forceColor, forceOpacity }) => {
  const { theme } = useTheme();

  const iconColor = getImageColor(theme, forceColor);

  const opacityClass = forceOpacity ? `opacity-${forceOpacity}` : "";
  const classList = generateClassNameValue(["icon-share", opacityClass]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={iconColor}
      className={classList}
    >
      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
    </svg>
  );
};

export default IconShare;
