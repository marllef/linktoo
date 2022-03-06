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
  const { signIn, signOut, createUser } = useAuth();

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
          <Facebook className={styles.icon} />
          <Instagram className={styles.icon} />
          <Twitter className={styles.icon} />
        </div>
      </main>
      <footer className={styles.footer}> Developed by marllef </footer>
    </div>
  );
};

export default UserLinks;
