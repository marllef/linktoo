import styles from "./HeaderBar.module.css";
import { MdMenu as Icon } from "react-icons/md";

export const HeaderBar = () => {
  return (
    <div className={styles.header_bar}>
      <Icon size={26} />
      <div>LinkMe</div>
      <div></div>
    </div>
  );
};
