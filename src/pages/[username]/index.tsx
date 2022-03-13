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
import { Box, Text } from "@chakra-ui/react";

const prisma = new PrismaClient();

const UserLinks = ({
  links,
  username,
  photoUrl,
  social,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <div className={`${styles.container} ${styles.gradient} `}>
      <Head>
        <title> Links | @{username}</title>
      </Head>
      <header className={styles.header} />
      <main className={styles.main}>
        <Avatar size="2xl" src={photoUrl} />
        <Text className={`${styles.username}`}>@{username}</Text>
        <LinkArea links={links} />
        <Box className={styles.social}>
          {social?.facebook ? (
            <Facebook
              className={styles.icon}
              onClick={() => router.push(`https://${social.facebook}`)}
            />
          ) : null}
          {social?.instagram ? (
            <Instagram
              className={styles.icon}
              onClick={() => router.push(`https://${social.instagram}`)}
            />
          ) : null}
          {social?.twitter ? (
            <Twitter
              className={styles.icon}
              onClick={() => router.push(`https://${social.twitter}`)}
            />
          ) : null}
        </Box>
      </main>
      <footer className={styles.footer}> Developed by marllef </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  try {
    const { links, photoUrl, instagram, facebook, twitter } =
      await prisma.user.findUnique({
        where: {
          username: `${username}`,
        },
        select: {
          photoUrl: true,
          facebook: true,
          instagram: true,
          twitter: true,
          links: {
            where: {
              active: {
                equals: true,
              },
            },
            orderBy: {
              index: "asc",
            },
          },
        },
        rejectOnNotFound: true,
      });

    return {
      props: {
        links,
        username,
        photoUrl,
        social: {
          instagram,
          twitter,
          facebook,
        },
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
