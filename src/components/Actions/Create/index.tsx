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
  useToast,
} from "@chakra-ui/react";
import { FormHandles, FormHelpers } from "@unform/core";
import { Form } from "@unform/web";
import { useRef } from "react";
import { FaPen as EditIcon, FaPlus } from "react-icons/fa";
import { IconButton } from "~/components/IconButton";
import { Input } from "~/components/Input";
import { createLink } from "~/hooks/fetcher";
import { useAuth } from "~/hooks/useAuth";
import { LinkSchema } from "~/validation/schemas";
import * as Yup from "yup";

export const CreateAction = () => {
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
      await LinkSchema.validate(data, { abortEarly: false });

      if (user) {
        const { email, uid } = user;
        const link = await createLink(data, {
          email: email,
          uid: uid,
        });
        successToast({
          title: "Sucesso ao adicionar link!",
          position: "bottom",
          description: `O link ${link.title} foi adicionado à sua lista.`,
        });
        reset();
        onClose();
      }
    } catch (err: any) {
      console.log(err.message);

      const validationErrors: any = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error, index) => {
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
      <Button
        leftIcon={<FaPlus />}
        variant="solid"
        fontSize="sm"
        onClick={user! && onOpen}
        colorScheme="green"
      >
        Adicionar Link
      </Button>

      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Link</ModalHeader>
          <ModalBody>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="title"
                label="Titulo"
                color="ligth"
                required
                type="text"
                placeholder="Titulo"
              />
              <Input
                name="href"
                label="Link"
                required
                color="ligth"
                type={"url"}
                placeholder="Link"
              />
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                formRef.current?.submitForm();
              }}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
