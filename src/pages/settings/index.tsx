import type { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  StackDivider,
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

const Settings: NextPage = () => {
  const { user, data, updateUserData, loading } = useAuth();
  const { users } = useUsers();
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const [photoURL, setPhotoURL] = useState(data?.photoUrl!);
  const [isValid, setIsValid] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

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

    if (find.length) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  function handleSubmit(data: any) {
    if (isValid) {
      updateUserData(user!, { ...data });
    }
  }

  return (
    <>
      <Head>
        <title>
          Preferências | {user?.displayName?.split(" ")[0] || "Buscando..."}
        </title>
        <meta name="description" content="Link my world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />

      <Main p={2}>
        <Form onSubmit={handleSubmit} ref={formRef}>
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
                    rightElement={<CheckIcon status={isValid} />}
                    onChange={onChange}
                    defaultValue={data?.username!}
                  />

                  <Input
                    isLoading={photoLoading}
                    name="photoUrl"
                    label="URL da Foto"
                    type="url"
                    defaultValue={data?.photoUrl!}
                    onBlur={() => setPhotoLoading(false)}
                    onChange={(e) => {
                      setPhotoLoading(true);
                      setPhotoURL(e.currentTarget.value);
                      setTimeout(() => setPhotoLoading(false), 4000);
                    }}
                  />
                </VStack>
              </HStack>

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
