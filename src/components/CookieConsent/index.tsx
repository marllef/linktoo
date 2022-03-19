import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CookieConsent = () => {
  const [showCookiesConsent, setShowCookiesConsent] = useState(false);
  useEffect(() => {
    const cookieConsent = localStorage.getItem("CookieConsent");
    if (!cookieConsent) {
      setShowCookiesConsent(true);
    }
  }, []);

  function handleConsent() {
    if (window) {
      localStorage.setItem("CookieConsent", "true");
      setShowCookiesConsent(false);
    }
  }

  return (
    <>
      {showCookiesConsent && (
        <Alert
          status="info"
          pos="absolute"
          bottom="0"
          px={["5", "20"]}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex justifyItems={"center"} alignItems="center">
            <AlertIcon />
            <Box>
              <AlertTitle>Uso de Cookies</AlertTitle>
              <AlertDescription>
                Este site utiliza cookies para melhorar a navegação e a
                experiência do usuário.
              </AlertDescription>
            </Box>
          </Flex>
          <Button colorScheme={"blue"} size={"sm"} onClick={handleConsent}>
            Continuar
          </Button>
        </Alert>
      )}
    </>
  );
};
