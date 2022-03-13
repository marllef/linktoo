import styles from "./HeaderBar.module.css";
import { Box, HStack, Tab, TabList } from "@chakra-ui/react";
import { UserPopover } from "../UserPopover";
import { useAuth } from "~/hooks/useAuth";
import { Brand } from "../Brand";

interface Props {
  showTabs?: boolean;
  tabs?: string[];
}

export const HeaderBar = ({ showTabs = false, tabs = [] }: Props) => {
  return (
    <HStack className={styles.header_bar}>
      <Brand />

      <div>
        <UserPopover />
      </div>
    </HStack>
  );
};
