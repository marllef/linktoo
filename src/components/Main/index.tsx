import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {}

export const Main = (props: Props) => {
  const { children } = props;
  return (
    <Box as="main" className="h-full pt-12 overflow-hidden">
      <Box className="h-full w-full overflow-auto" {...props}>
        {children}
      </Box>
    </Box>
  );
};
