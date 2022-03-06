import { Box, Button, Center } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { ListLink } from "~/components/List/ListLink";
import styles from "./LinkPanel.module.css";

interface Props {}

export const LinkPanel = () => {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <Box className="flex flex-col justify-start w-full sm:w-96 sm:justify-center">
        <Button
          leftIcon={<FaPlus />}
          variant="solid"
          fontSize="sm"
          colorScheme="green"
        >
          Adicionar Link
        </Button>
        <ListLink
          data={[
            { title: "Google", href: "www.google.com", active: true },
            { title: "Facebook", href: "www.facebook.com", active: false },
          ]}
        />
      </Box>
    </div>
  );
};
