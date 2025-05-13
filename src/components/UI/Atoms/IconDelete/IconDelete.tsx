import React from "react";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Typings
import { IImage } from "@/typings/images";

// Utils
import { getImageColor } from "@/utils/imageColor";
import { generateClassNameValue } from "@/utils/htmlClasses";

interface IIconDelete extends IImage {}

const IconDelete: React.FC<IIconDelete> = ({ forceColor, forceOpacity }) => {
  const { theme } = useTheme();

  const iconColor = getImageColor(theme, forceColor);

  const opacityClass = forceOpacity ? `opacity-${forceOpacity}` : "";
  const classList = generateClassNameValue(["icon-delete", opacityClass]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      strokeWidth="1.5"
      stroke={iconColor}
      className={classList}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
      />
    </svg>
  );
};

export default IconDelete;
