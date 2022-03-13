import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";
import components from "./components";

const overrides = {
  styles,
  colors,
  components: {
    ...components,
  },
};

export default extendTheme(overrides);
