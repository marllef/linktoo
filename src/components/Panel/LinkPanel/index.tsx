import { Box } from "@chakra-ui/react";
import { CreateAction } from "~/components/Actions/Create";
import { ListLink } from "~/components/List/ListLink";
import { useLinks } from "~/hooks/fetcher";

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
