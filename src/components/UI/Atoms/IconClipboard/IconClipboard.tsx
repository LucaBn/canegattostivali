import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/images";

// Utils
import { getImageColor } from "@/utils/imageColor";
import { generateClassNameValue } from "@/utils/htmlClasses";

interface IIconClipboard extends IImage {}

const IconClipboard: React.FC<IIconClipboard> = ({
  forceColor,
  forceOpacity,
}) => {
  const { theme } = useTheme();

  const iconColor = getImageColor(theme, forceColor);

  const opacityClass = forceOpacity ? `opacity-${forceOpacity}` : "";
  const classList = generateClassNameValue(["icon-clipboard", opacityClass]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={iconColor}
      className={classList}
    >
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
    </svg>
  );
};

export default IconClipboard;
