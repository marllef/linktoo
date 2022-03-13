import { Button, ButtonProps, Icon, IconProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Props {
  status: boolean;
  change?: boolean;
}

export const CheckIcon = ({ status = false, change, ...rest }: Props) => {
  const [isValid, setIsValid] = useState(status);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsValid(status);
  }, [status]);

  useEffect(() => {
    setShow(false);
  }, [change]);

  return (
    <Icon
      as={isValid ? FaCheck : FaTimes}
      color={isValid ? "green" : "red"}
      {...rest}
    />
  );
};
