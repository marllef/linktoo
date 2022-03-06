import {
  Editable as Edit,
  EditableInput,
  EditablePreview,
  EditableProps,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { FaPen } from "react-icons/fa";
import styles from "./Editable.module.css";

interface Props extends EditableProps {}

export const Editable = ({
  isDisabled,
  defaultValue,
  onChange,
  value,
  className,
  ...rest
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDisabled) {
      ref.current?.focus();
    }
  }, [isDisabled]);

  return (
    <Edit
      className={className}
      ref={ref}
      isDisabled={isDisabled}
      placeholder="Insira o titulo aqui..."
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
      p={0}
      {...rest}
    >
      <EditablePreview className={className} />
      <EditableInput
        className={className}
        maxLength={30}
        p={0}
        _focus={{
          ring: 2,
          
          rounded: "base",
        }}
      />
      <FaPen className="hidden peer-hover:flex" />
    </Edit>
  );
};
