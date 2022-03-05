import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider as Chakra } from "@chakra-ui/react";
import { AuthProvider } from "~/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Chakra>
  );
}

export default MyApp;
