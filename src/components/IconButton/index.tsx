import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  color?: "red" | "blue" | "green" | "white" | "black";
  "aria-label": string;
}

export const IconButton = ({
  icon: Icon,
  color,
  "aria-label": al,
  ...rest
}: Props) => {
  return (
    <button color={color} aria-label={al} className={styles.button} {...rest}>
      {Icon}
    </button>
  );
};
