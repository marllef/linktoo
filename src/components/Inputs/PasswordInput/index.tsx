import { InputHTMLAttributes } from "react";
import styles from "./PasswordInput.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordInput = ({ id, label, ...rest }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input id={id} type="password" className={styles.input} {...rest} />
    </div>
  );
};
