import { Avatar as CAvatar, AvatarBadge, AvatarProps } from "@chakra-ui/react";
import styles from "./Avatar.module.css";

interface Props extends AvatarProps {}

export const Avatar = ({ size = "xs", ...rest }: Props) => {
  return (
    <CAvatar size={size} {...rest} userSelect="none">
      <AvatarBadge />
    </CAvatar>
  );
};
