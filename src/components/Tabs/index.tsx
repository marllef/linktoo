import {
  Tabs as _Tabs,
  TabsProps,
  useBreakpoint,
  useBreakpointValue,
  useStyleConfig,
} from "@chakra-ui/react";

interface Props extends TabsProps {
  variant?:
    | "line"
    | (string & {})
    | "enclosed"
    | "enclosed-colored"
    | "simple-rounded"
    | "soft-rounded"
    | "solid-rounded"
    | "unstyled";
}

export const Tabs = (props: Props) => {
  const { variant, ...rest } = props;
  const size = useBreakpointValue({ sm: "md", md: "sm", lg: "sm" });

  const styles = useStyleConfig("Tabs", { variant, ...rest });

  return <_Tabs __css={styles} size={size} variant={variant} {...rest} />;
};
