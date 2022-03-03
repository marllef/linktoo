import { ButtonHTMLAttributes } from "react";
import styles from "./Submit.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
}

export const SubmitButton = ({
  title = "Button",
  children,
  ...rest
}: Props) => {
  return (
    <button className={`${styles.button} `} {...rest}>
      {children || title}
    </button>
  );
};
