import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FaTrash as Exclude } from "react-icons/fa";
import { IconButton } from "~/components/IconButton";
import { deleteLink } from "~/hooks/fetcher";

interface Props {
  item: any;
}

export const ExcludeAction = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onDelete() {
    deleteLink(item.id)
      .then((user) => console.log("deleted", user))
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <IconButton
        aria-label="Exclude action"
        color="red"
        icon={<Exclude />}
        onClick={onOpen}
      />
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir {item.title}</ModalHeader>

          <ModalBody>
            Realmente deseja excluir {item.title} ({item.href})?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onDelete}>
              Excluir
            </Button>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
