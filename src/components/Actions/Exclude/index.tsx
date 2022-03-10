import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaTrash as Exclude } from "react-icons/fa";
import { IconButton } from "~/components/IconButton";
import { deleteLink } from "~/hooks/fetcher";

interface Props {
  item: any;
}

export const ExcludeAction = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({
    duration: 5000,
    variant: "solid",
    position: "bottom",
  });

  function onDelete() {
    deleteLink(item.id)
      .then((link) =>
        toast({
          id: "success-on-delete",
          variant: "solid",
          status: "success",
          title: `${link.title} excluído com sucesso!`,
        })
      )
      .catch((err) =>
        toast({
          id: "fail-on-delete",
          variant: "solid",
          status: "error",
          title: `Erro ao excluir link.`,
          description: err.message,
        })
      );
  }

  return (
    <>
      <IconButton
        aria-label="Exclude action"
        color="red"
        icon={<Exclude size={14} />}
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
            <HStack>
              <Button colorScheme="red" onClick={onDelete}>
                Excluir
              </Button>
              <Button variant={"ghost"} mr={3} onClick={onClose}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
