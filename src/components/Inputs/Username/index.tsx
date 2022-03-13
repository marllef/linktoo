import {
  ChangeEvent,
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Input as CKInput,
  InputGroup,
  InputProps,
  InputRightAddon,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useField } from "@unform/core";
import styles from "./Input.module.css";
import { CheckIcon } from "~/components/CheckIcon";

interface Props extends InputProps {
  label?: string;
  name: string;
  status?: boolean | null;
  isLoading?: boolean;
  rightElement?: ReactNode;
}

export const UsernameInput = ({
  label,
  color,
  className,
  isLoading,
  status = false,
  variant = "filled",
  name,
  ...rest
}: Props) => {
  const { fieldName, registerField } = useField(name);
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
        <CKInput
          id={name}
          variant={variant}
          autoComplete="off"
          ref={inputRef}
          {...rest}
        />

        {isLoading ? (
          <InputRightAddon>
            <Spinner color="sky.500" />
          </InputRightAddon>
        ) : (
          <InputRightAddon>
            <CheckIcon status={status!} />
          </InputRightAddon>
        )}
      </InputGroup>
    </Box>
  );
};
