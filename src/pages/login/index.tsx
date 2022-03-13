import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { AiOutlineUser as Icon } from "react-icons/ai";
import { Input } from "~/components/Input";
import { Form } from "@unform/web";
import styles from "~/styles/login.module.css";
import { useEffect, useRef } from "react";
import { SubmitButton as Submit } from "~/components/Button/Submit";
import { useAuth } from "~/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import nookies from "nookies";

const Login: NextPage = () => {
  const { signIn, user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const formRef = useRef(null);

  const toast = useToast({
    title: "Erro ao autenticar",
    status: "error",
    isClosable: true,
    variant: "solid",
    duration: 3000,
  });

  async function handleSubmit(data: any) {
    try {
      // const user = await signIn(data.email, data.senha);
      await signInWithGoogle();
      router.replace("/");
    } catch (err: any) {
      if (!toast.isActive(err.message)) {
        toast({
          id: err.message,
          description: err.message,
        });
      }
    }
  }

  return (
    <>
      <Head>
        <title>Realizar Login</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main_content}>
          <div className={styles.user_icon}>
            <Icon size={90} />
          </div>
          <div className={styles.label_page}>Fazer login</div>
          <Form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
            <Submit>Login com o Google</Submit>
          </Form>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  if (cookies["USER_AUTHENTICATED"]) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
