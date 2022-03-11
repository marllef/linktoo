import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";
import Tabs from "./components/Tabs";
import Button from "./components/Button";

const overrides = {
  styles,
  colors,
  components: {
    Tabs,
    Button,
  },
};

export default extendTheme(overrides);
