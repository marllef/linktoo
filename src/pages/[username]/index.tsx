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
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UserLinks = ({
  links,
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title> Links | @{username}</title>
      </Head>
      <header className={styles.header} />
      <main className={styles.main}>
        <Avatar size="2xl" name={`${username}`} />
        <div className={styles.username}>@{username}</div>
        <LinkArea links={links} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  try {
    const { links } = await prisma.user.findUnique({
      where: {
        username: `${username}`,
      },
      select: {
        links: {
          where: {
            active: {
              equals: true,
            },
          },
        },
      },
      rejectOnNotFound: true,
    });

    return {
      props: {
        links,
        username,
      },
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      notFound: true,
    };
  }
};

export default UserLinks;
