import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import { HeaderBar } from "../components/HeaderBar";
import nookies from "nookies";
import styles from "../styles/Home.module.css";
import {
  Box,
  Flex,
  TabPanel,
  TabPanels,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LinkPanel } from "~/components/Panel/LinkPanel";
import { Tabs } from "~/components/Tabs";

const Home: NextPage = () => {
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
          Link-me | {user?.displayName?.split(" ")[0] || "Buscando..."}
        </title>
        <meta name="description" content="Link my world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Tabs
        size={size}
        className="flex h-screen overflow-hidden bg-slate-100 min-w-[20rem]"
        variant="simple-rounded"
        colorScheme="slate"
      >
        <HeaderBar />

        <TabPanels className="h-full pt-14">
          <TabPanel h="full">
            <LinkPanel />
          </TabPanel>
          <TabPanel>
            <p>Configuração</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
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

export default Home;
