import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {}

export const Link = ({ colorScheme='blue', variant, ...rest }: Props) => {
  return <Button colorScheme={colorScheme} variant={variant} {...rest} />;
};
