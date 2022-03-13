import { List } from "@chakra-ui/react";
import { Link } from "@prisma/client";
import { LinkItem } from "~/components/ListItem/LinkItem";

interface Props {
  data: Link[];
}

export const ListLink = ({ data = [] }: Props) => {
  return (
    <List className="w-full py-2">
      {data.map((item, index) => {
        return <LinkItem key={item.id} item={item} />;
      })}
    </List>
  );
};
