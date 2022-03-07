import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Form } from "@unform/web";
import { FaPen as EditIcon } from "react-icons/fa";
import { IconButton } from "~/components/IconButton";
import { Input } from "~/components/Input";

interface Props {
  item: any;
}

export const EditAction = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Edit action"
        icon={<EditIcon />}
        onClick={onOpen}
      />
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalBody>
            <Form onSubmit={() => {}}>
              <Input
                name="title"
                label="Titulo"
                color="ligth"
                type="text"
                placeholder="Titulo"
                defaultValue={item.title}
              />
              <Input
                name="href"
                label="Link"
                color="ligth"
                type={"url"}
                placeholder="Link"
                defaultValue={item.href}
              />
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green">Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
