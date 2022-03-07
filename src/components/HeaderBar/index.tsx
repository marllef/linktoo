import styles from "./HeaderBar.module.css";
import { Tab, TabList } from "@chakra-ui/react";
import { UserPopover } from "../UserPopover";
import { useAuth } from "~/hooks/useAuth";

export const HeaderBar = () => {
  const { user } = useAuth();
  return (
    <div className={styles.header_bar}>
      <div className="hidden sm:flex">LinkMe</div>
      <div>
        <TabList>
          <Tab _selected={{ bg: "slate.100", color: "green.500" }}>Links</Tab>
          <Tab _selected={{ bg: "slate.100", color: "green.500" }}>
            Configurações
          </Tab>
        </TabList>
      </div>

      <div>
        <UserPopover />
      </div>
    </div>
  );
};
