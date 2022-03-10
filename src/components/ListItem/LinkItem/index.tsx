import {
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  ListItem,
  Stack,
  Switch,
  useBoolean,
  useEditableControls,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { EditAction } from "~/components/Actions/Edit";
import { ExcludeAction } from "~/components/Actions/Exclude";
import { Editable } from "~/components/Editable";
import { IconButton } from "~/components/IconButton";
import { deleteLink, updateLink } from "~/hooks/fetcher";
import styles from "./LinkItem.module.css";

interface Props {
  item: { id: string; title: string; href: string; active: boolean };
}

export const LinkItem = ({ item }: Props) => {
  const [checked, setChecked] = useState(item.active);
  const [hovered, setHovered] = useBoolean();
  const successToast = useToast({
    id: "success-update-link",
    title: "Link alterado com sucesso!",
    variant: "solid",
    position: "bottom",
    duration: 2000,
    status: "success",
  });

  return (
    <ListItem className={styles.list_item} onMouseLeave={setHovered.off} onMouseEnter={setHovered.on}>
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
            <div className={`${hovered ? "flex" : "hidden"}`}>
              <HStack className=" rounded-full text-slate-700 bg-slate-100 p-[2px]">
                <ExcludeAction item={item} />
                <EditAction item={item} />
              </HStack>
            </div>

            <Switch
              checked={checked}
              defaultChecked={item.active}
              size="sm"
              onChange={(status) => {
                updateLink(item.id, { active: status.currentTarget.checked })
                  .then((value) => {
                    successToast({
                      description: `O link ${value.title} ${
                        !checked ? "agora está" : "não está mais"
                      } publico!`,
                    });
                    setChecked(value.active);
                  })
                  .catch((err) => console.log(err.message));
              }}
              colorScheme="green"
            />
          </HStack>
        </Flex>
      </div>
    </ListItem>
  );
};
