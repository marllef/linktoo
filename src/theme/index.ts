import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";
import Tabs from "./components/Tabs";

const overrides = {
  styles,
  colors,
  components: {
    Tabs,
  },
};

export default extendTheme(overrides);
