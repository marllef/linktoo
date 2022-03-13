import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import nookies from "nookies";


import { HeaderBar } from "~/components/HeaderBar";

const Profile: NextPage = () => {
  const { user, loading } = useAuth();
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
