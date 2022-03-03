import { useRouter } from "next/router";
import styles from "~/styles/[username].module.css";
import {
  FaFacebook as Facebook,
  FaInstagram as Instagram,
  FaTwitter as Twitter,
} from "react-icons/fa";
import { Avatar } from "~/components/Avatar";
import Head from "next/head";
import { LinkArea } from "~/components/LinkArea";
import { useAuth } from "~/hooks/useAuth";
import { useEffect } from "react";

const UserLinks = () => {
  const router = useRouter();
  const { username } = router.query;
  const { signIn, signOut } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title> Links | @{username}</title>
      </Head>
      <header className={styles.header} />
      <main className={styles.main}>
        <Avatar src="https://github.com/marllefH.png" />
        <div className={styles.username}>@{username}</div>
        <LinkArea
          links={[
            {
              href: "#",
              title: "Facebook",
              color: "face",
            },
            {
              href: "#",
              title: "Instagram",
              color: "insta",
            },
          ]}
        />
        <div className={styles.social}>
          <Facebook
            onClick={async () =>
              await signIn("marllef-alves@hotmail.com", "22051998")
            }
            className={styles.icon}
          />  
          <Instagram
            onClick={async () => await signOut()}
            className={styles.icon}
          />
          <Twitter className={styles.icon} />
        </div>
      </main>
      <footer className={styles.footer}> Developed by marllef </footer>
    </div>
  );
};

export default UserLinks;
