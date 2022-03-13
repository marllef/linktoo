import { InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import {
  Box,
  Input as CKInput,
  InputAddon,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useField } from "@unform/core";
import styles from "./Input.module.css";
import { FaFacebook } from "react-icons/fa";

interface Props extends InputProps {
  label?: string;
  name: string;
  isLoading?: boolean;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
}

export const Input = ({
  label,
  color,
  className,
  rightElement,
  leftElement,
  isLoading,
  variant = "filled",
  name,
  ...rest
}: Props) => {
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
    <Box className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <InputGroup>
        {typeof leftElement !== "undefined" && (
          <InputLeftAddon>{leftElement}</InputLeftAddon>
        )}

        <CKInput
          id={name}
          variant={variant}
          autoComplete="off"
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />

        {isLoading ? (
          <InputRightElement>
            <Spinner color="sky.500" />
          </InputRightElement>
        ) : (
          <InputRightElement>{rightElement}</InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};
