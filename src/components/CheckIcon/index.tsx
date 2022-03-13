import { Button, ButtonProps, Icon, IconProps, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Props {
  status: boolean;
  showStatus?: boolean;
}

export const CheckIcon = ({
  status = false,
  showStatus = false,
  ...rest
}: Props) => {
  const [isValid, setIsValid] = useState(status);

  useEffect(() => {
    setIsValid(status);
  }, [status]);

  return (
    <>
      {showStatus && (
        <Icon
          as={isValid ? FaCheck : FaTimes}
          color={isValid ? "green" : "red"}
          {...rest}
        />
      )}
    </>
  );
};
