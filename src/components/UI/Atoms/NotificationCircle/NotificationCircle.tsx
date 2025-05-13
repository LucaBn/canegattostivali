import React from "react";

// Utils
import { generateClassNameValue } from "@/utils/htmlClasses";

// Typings
import { Color } from "react-bootstrap/esm/types";

interface Props {
  bgColor: Color;
  pulse?: boolean;
}

const NotificationCircle: React.FC<Props> = ({
  bgColor,
  pulse = false,
}: Props) => {
  const bgColorClass = bgColor !== "" ? `bg-${bgColor}` : "";
  const pulseClass = pulse ? "pulse" : "";

  const classesArray = [
    "notification",
    "rounded-circle",
    bgColorClass,
    pulseClass,
  ].filter(Boolean);

  const classes = generateClassNameValue(classesArray);

  return <span className={`${classes}`}></span>;
};

export default NotificationCircle;
