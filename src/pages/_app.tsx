import "~/configs/firebase";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import {
  Box,
  ChakraProvider as Chakra,
  TabPanel,
  TabPanels,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AuthProvider } from "~/contexts/AuthContext";
import theme from "~/theme";
import { Tabs } from "~/components/Tabs";
import { HeaderBar } from "~/components/HeaderBar";
import { LinkPanel } from "~/components/Panel/LinkPanel";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra theme={theme}>
      <AuthProvider>
        <Tabs
          className="bg-slate-100 h-screen"
          variant="simple-rounded"
          colorScheme="slate"
        >
          <Component {...pageProps} />
        </Tabs>
      </AuthProvider>
    </Chakra>
  );
}

export default MyApp;
