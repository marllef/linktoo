import styles from "./HeaderBar.module.css";
import { Tab, TabList } from "@chakra-ui/react";
import { UserPopover } from "../UserPopover";
import { useAuth } from "~/hooks/useAuth";

export const HeaderBar = () => {
  const selected = { bg: "slate.100", color: "green.500" };
  const focus = { ring: 2 };

  return (
    <div className={styles.header_bar}>
      <div className="hidden sm:flex">LinkMe</div>
      <div className="flex justify-center items-center">
        <TabList>
          <Tab>Links</Tab>
          <Tab>Configurações</Tab>
        </TabList>
      </div>

      <div>
        <UserPopover />
      </div>
    </div>
  );
};
