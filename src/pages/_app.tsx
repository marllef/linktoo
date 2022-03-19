import "~/configs/firebase";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider as Chakra } from "@chakra-ui/react";
import { AuthProvider } from "~/contexts/AuthContext";
import theme from "~/theme";
import { Tabs } from "~/components/Tabs";
import Head from "next/head";
import { CookieConsent } from "~/components/CookieConsent";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { username } = router.query;
  return (
    <Chakra theme={theme}>
      <Head>
        <title>LinkToo | Agregador de links</title>
        <meta name="description" content="Seus links em um único lugar." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <Tabs
          className="bg-slate-100 h-screen"
          variant="simple-rounded"
          colorScheme="slate"
        >
          <Component {...pageProps} />
        </Tabs>
        {typeof username === "undefined" && <CookieConsent />}
      </AuthProvider>
    </Chakra>
  );
}

export default MyApp;
