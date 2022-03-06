import {
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  ListItem,
  Stack,
  Switch,
  useEditableControls,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaTrash as Exclude,
  FaCog as Settings,
  FaPen as Edit,
  FaRegStar as OutlineStar,
  FaStar as Star,
} from "react-icons/fa";
import { Editable } from "~/components/Editable";
import { IconButton } from "~/components/IconButton";
import styles from "./LinkItem.module.css";

interface Props {
  item: { title: string; href: string; active: boolean };
}

export const LinkItem = ({ item }: Props) => {
  const [checked, setChecked] = useState(item.active);
  const [isEditable, setIsEditable] = useState(true);
  const [title, setTitle] = useState(item.title);
  const [href, setHref] = useState(item.href);

  return (
    <ListItem className={styles.list_item} onMouseOver={() => {}}>
      <div className={styles.content}>
        <Flex className="box-border">
          <div
            className={`${styles.indicator} ${
              checked ? "bg-green-500" : "bg-red-500"
            } `}
          />
          <Stack className="p-2 w-full" spacing="0px">
            <div className={styles.link_title}>{item.title}</div>
            <div className={styles.link_href}>{item.href}</div>
          </Stack>
        </Flex>
        <Flex>
          <HStack className="flex flex-1 mr-2">
            <HStack className="flex rounded-full text-slate-700 bg-slate-100 p-1">
              <IconButton
                aria-label="Exclude action"
                color="red"
                icon={<Exclude />}
              />
              <IconButton
                aria-label="Edit action"
                icon={<Edit />}
                onClick={() => setIsEditable((value) => !value)}
              />
            </HStack>

            <Switch
              checked={checked}
              defaultChecked={item.active}
              onChange={(status) => setChecked(status.currentTarget.checked)}
              colorScheme="green"
            />
          </HStack>
        </Flex>
      </div>
    </ListItem>
  );
};
