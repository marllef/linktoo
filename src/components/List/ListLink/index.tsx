import { Flex, List, ListItem, Stack, Switch } from "@chakra-ui/react";
import { LinkItem } from "~/components/ListItem/LinkItem";
import styles from "./ListLink.module.css";

interface Props {
  data: any[];
}

export const ListLink = ({ data = [] }: Props) => {
  return (
    <List className="w-full py-2">
      {data.map((item, index) => {
        return <LinkItem key={index} item={item} />;
      })}
    </List>
  );
};
