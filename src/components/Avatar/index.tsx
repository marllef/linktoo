import { Avatar as CAvatar, AvatarBadge, AvatarProps } from "@chakra-ui/react";

interface Props extends AvatarProps {}

export const Avatar = ({ size = "xs", src, ...rest }: Props) => {
  return <CAvatar size={size} src={src} userSelect="none" {...rest} />;
};
