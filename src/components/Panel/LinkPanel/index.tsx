import { Box, Button, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateAction } from "~/components/Actions/Create";
import { ListLink } from "~/components/List/ListLink";
import { useLinks } from "~/hooks/fetcher";
import styles from "./LinkPanel.module.css";

interface Props {}

export const LinkPanel = () => {
  const { links } = useLinks();

  return (
    <div className="flex flex-col h-full w-full items-center">
      <Box className="flex flex-col justify-start w-full sm:w-96 sm:justify-center">
        <CreateAction />
        <ListLink data={links} />
      </Box>
    </div>
  );
};
