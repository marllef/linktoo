import styles from "./HeaderBar.module.css";
import { Box, HStack, Tab, TabList } from "@chakra-ui/react";
import { UserPopover } from "../UserPopover";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  showTabs?: boolean;
  tabs?: string[];
}

export const HeaderBar = ({ showTabs = false, tabs = [] }: Props) => {
  return (
    <HStack className={styles.header_bar}>
      <div className="hidden sm:flex">LinkMe</div>
      <Box hidden={showTabs} className={styles.nav}>
        <TabList>
          <HStack>
            {(tabs || []).map((item) => (
              <Tab key={item}>{item}</Tab>
            ))}
          </HStack>
        </TabList>
      </Box>

      <div>
        <UserPopover />
      </div>
    </HStack>
  );
};
