import { Avatar as CAvatar, AvatarBadge, AvatarProps } from "@chakra-ui/react";
import styles from "./Avatar.module.css";

interface Props extends AvatarProps {}

export const Avatar = ({ size = "sm", ...rest }: Props) => {
  return (
    <div className={styles.avatar}>
      <CAvatar size={size} {...rest} />
    </div>
  );
};
