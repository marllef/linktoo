import { InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "@unform/core";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export const Input = ({ label, name, ...rest }: Props) => {
  const { fieldName, defaultValue, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input className={styles.input} id={name} ref={inputRef} {...rest} />
    </>
  );
};
