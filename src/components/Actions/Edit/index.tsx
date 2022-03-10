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
import { FormHandles, FormHelpers } from "@unform/core";
import { Form } from "@unform/web";
import { useRef } from "react";
import { FaPen as EditIcon } from "react-icons/fa";
import { IconButton } from "~/components/IconButton";
import { Input } from "~/components/Input";
import { useAuth } from "~/hooks/useAuth";
import * as Yup from "yup";
import { LinkSchema } from "~/validation/schemas";
import { updateLink } from "~/hooks/fetcher";

interface Props {
  item: any;
}

export const EditAction = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const formRef = useRef<FormHandles | null>(null);

  const successToast = useToast({
    id: "add-link-success",
    variant: "solid",
    duration: 5000,
    status: "success",
  });

  const errorToast = useToast({
    id: "add-link-error",
    variant: "solid",
    duration: 5000,
    status: "error",
  });

  async function handleSubmit(data: any, { reset }: FormHelpers) {
    try {
      const vData = await LinkSchema.validate(data, { abortEarly: false });

      if (user) {
        const link = await updateLink(item.id, {
          ...vData,
        });
        successToast({
          title: "Link atualizado com sucesso!",
          position: "bottom",
        });
        reset();
        onClose();
      }
    } catch (err: any) {
      console.log(err.message);

      const validationErrors: any = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path!] = error.message;

          if (!errorToast.isActive(error.message)) {
            errorToast({
              id: error.message,
              title: "Erro ao adicionar link.",
              position: "bottom",
              description: error.message,
            });
          }
        });

        formRef.current!.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <IconButton
        aria-label="Edit action"
        icon={<EditIcon size={14} />}
        onClick={onOpen}
      />
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalBody>
            <Form ref={formRef} onSubmit={handleSubmit}>
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
            <HStack spacing={"0.5"}>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="green"
                onClick={() => formRef.current?.submitForm()}
              >
                Salvar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
