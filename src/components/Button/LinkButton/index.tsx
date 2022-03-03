import { ButtonHTMLAttributes } from "react";
import styles from "./LinkButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  colorScheme?:
    | "red"
    | "blue"
    | "green"
    | "black"
    | "white"
    | "insta"
    | "face"
    | "whats"
    | "git"
    | "telegram";
}

export const LinkButton = ({
  title = "Button",
  colorScheme = "white",
  children,
  ...rest
}: Props) => {
  return (
    <button className={`${styles.button} ${styles[colorScheme]}`} {...rest}>
      {children || title}
    </button>
  );
};
