import "~/configs/firebase";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import {
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
  const size = useBreakpointValue({ sm: "md", md: "sm", lg: "sm" });

  return (
    <Chakra theme={theme}>
      <AuthProvider>
        <Tabs
          size={size}
          className="flex h-screen overflow-hidden bg-slate-100 min-w-[20rem]"
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
