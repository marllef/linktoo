import * as RAvatar from "@radix-ui/react-avatar";
import { useRouter } from "next/router";
import styles from "./Avatar.module.css";
import { FaUserAlt } from "react-icons/fa";

const { Root, Image, AvatarFallback } = RAvatar;

interface AvatarProps {
  src?: string;
}

export const Avatar = ({ src = "./" }: AvatarProps) => {
  const {
    query: { username },
  } = useRouter();
  return (
    <div>
      <Root draggable={false} className={styles.container}>
        <Image draggable={false} className={styles.image} src={src} />
        <AvatarFallback draggable={false} className={styles.falback}>
          <FaUserAlt />
        </AvatarFallback>
      </Root>
    </div>
  );
};
