import styles from "./HeaderBar.module.css";
import { HStack, Tab, TabList } from "@chakra-ui/react";
import { UserPopover } from "../UserPopover";
import { useAuth } from "~/hooks/useAuth";

export const HeaderBar = () => {
  return (
    <HStack className={styles.header_bar}>
      <div className="hidden sm:flex">LinkMe</div>
      <div className="flex justify-center items-center">
        <TabList>
          <HStack>
            <Tab>Links</Tab>
            <Tab>Configurações</Tab>
          </HStack>
        </TabList>
      </div>

      <div>
        <UserPopover />
      </div>
    </HStack>
  );
};
