import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick: () => void;
  label: string;
  variant?: "default" | "inverse" | "fullWidth";
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  variant = "default",
}) => {
  const classNames = [styles.button];

  switch (variant) {
    case "inverse":
      classNames.push(styles.inverse);
      break;
    case "fullWidth":
      classNames.push(styles.fullWidth);
      break;
    default:
      break;
  }

  return (
    <button onClick={onClick} className={classNames.join(" ")}>
      {label}
    </button>
  );
};

export default Button;
