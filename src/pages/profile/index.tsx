import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import nookies from "nookies";

import {
  Box,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { HeaderBar } from "~/components/HeaderBar";
import { Avatar } from "~/components/Avatar";

const Profile: NextPage = () => {
  const { user, loading } = useAuth();
  const size = useBreakpointValue({ sm: "md", md: "sm", lg: "sm" });
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/login");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>
          Profile | {user?.displayName?.split(" ")[0] || "Buscando..."}
        </title>
        <meta name="description" content="Link my world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  if (!cookies["USER_AUTHENTICATED"]) {
    console.log("Não Autenticado!");
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};

export default Profile;
