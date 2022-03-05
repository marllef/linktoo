import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { HeaderBar } from "../components/HeaderBar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <header>
        <HeaderBar />
      </header>
      <Head>
        <title>Link-me</title>
        <meta name="description" content="Link my world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Marllef</main>

      <footer></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
