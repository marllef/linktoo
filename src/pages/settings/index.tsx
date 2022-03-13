import type { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  StackDivider,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form } from "@unform/web";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import nookies from "nookies";

import { useAuth } from "~/hooks/useAuth";
import { HeaderBar } from "~/components/HeaderBar";
import { Avatar } from "~/components/Avatar";
import { Main } from "~/components/Main";
import { Input } from "~/components/Input";
import styles from "../../styles/settings.module.css";
import { useUsers } from "~/hooks/fetcher";
import { CheckIcon } from "~/components/CheckIcon";
import { FormHandles } from "@unform/core";
import { AuthServices } from "~/services/AuthServices";
import {
  FaAt,
  FaCamera,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaUserAlt,
} from "react-icons/fa";

const Settings: NextPage = () => {
  const { user, data, updateUserData, loading } = useAuth();
  const { users } = useUsers();
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const [photoURL, setPhotoURL] = useState(data?.photoUrl!);
  const [isValid, setIsValid] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  const toast = useToast({
    position: "bottom",
    duration: 5000,
    variant: "solid",
  });

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/login");
      return;
    }
  }, [user]);

  useEffect(() => {
    if (data?.photoUrl) {
      setPhotoURL(data.photoUrl);
    }
  }, [data]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const find = users.filter((listUser) => listUser.username === value);
    setShowStatus(true);

    if (find.length) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  async function handleSubmit(data: any) {
    const {
      username,
      facebook: fb,
      instagram: ig,
      twitter: tt,
      ...rest
    } = data;
    const facebook = fb.replace("https://", "").replace("http://", "");
    const instagram = ig.replace("https://", "").replace("http://", "");
    const twitter = tt.replace("https://", "").replace("http://", "");

    const social = {
      facebook,
      instagram,
      twitter,
    };

    try {
      const find = users.filter((listUser) => listUser.username === username);
      if (find.length) {
        await updateUserData(user!, { ...social, ...rest });
        toast({
          id: "success-on-save-data",
          title: "Alterações salvas com sucesso!",
          description: "O nome de usuario não foi alterado.",
          status: "warning",
        });
      } else {
        await updateUserData(user!, { ...data, ...social });
        toast({
          id: "success-on-save-data",
          title: "Alterações salvas com sucesso!",
          status: "success",
        });
      }
      setTimeout(router.reload, 3000);
    } catch (err: any) {
      toast({
        id: "error-on-save-data",
        title: "Erro ao salvar alterações.",
        description: err.message,
        status: "error",
      });
    }
  }

  return (
    <>
      <Head>
        <title>
          Preferências | {user?.displayName?.split(" ")[0] || "Buscando..."}
        </title>
      </Head>

      <HeaderBar />

      <Main p={2} bg="white">
        <Form onSubmit={handleSubmit} ref={formRef} initialData={data}>
          <Center>
            <VStack
              w="full"
              divider={<StackDivider borderColor={"gray.200"} />}
              maxW={"md"}
              spacing={3}
            >
              <Heading w="full" pt={[3, 2]} size={"sm"}>
                PERFIL
              </Heading>
              <HStack className={styles.profile} spacing={6}>
                <Avatar size={"xl"} src={photoURL} />

                <VStack className={styles.inputs}>
                  <Input
                    name="username"
                    label="Usuário"
                    isLoading={loading}
                    leftElement={<FaAt />}
                    rightElement={
                      <CheckIcon status={!isValid} showStatus={showStatus} />
                    }
                    onChange={onChange}
                  />

                  <Input
                    isLoading={photoLoading || loading}
                    name="photoUrl"
                    label="URL da Foto"
                    type="url"
                    leftElement={<FaCamera />}
                    onBlur={() => setPhotoLoading(false)}
                    onChange={(e) => {
                      setPhotoLoading(true);
                      setPhotoURL(e.currentTarget.value);
                      setTimeout(() => setPhotoLoading(false), 4000);
                    }}
                  />
                </VStack>
              </HStack>
              <VStack w={"full"}>
                <Input
                  isLoading={loading}
                  name="facebook"
                  label="Facebook"
                  leftElement={<FaFacebookF />}
                  type="url"
                />
                <Input
                  isLoading={loading}
                  name="instagram"
                  label="Instagram"
                  leftElement={<FaInstagram />}
                  type="url"
                />
                <Input
                  isLoading={loading}
                  name="twitter"
                  label="Twitter"
                  leftElement={<FaTwitter />}
                  type="url"
                />
              </VStack>

              <HStack>
                <Button
                  size={"sm"}
                  variant="solid"
                  colorScheme="green"
                  onClick={formRef.current?.submitForm}
                >
                  Salvar Mudanças
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Form>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  if (!cookies["USER_AUTHENTICATED"]) {
    console.log("Não Autenticado!");
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};

export default Settings;
