import type { NextPage } from "next";
import Head from "next/head";
import { FaLock } from "react-icons/fa";
import { Input } from "~/components/Input";
import { Form } from "@unform/web";
import styles from "../styles/Home.module.css";
import { useRef } from "react";
import { SubmitButton } from "~/components/Button/Submit";

const Login: NextPage = () => {
  const formRef = useRef(null);
  return (
    <>
      <Head>
        <title>Realizar Login</title>
        <meta name="description" content="Link my world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col bg-sky-500 min-w-[320px] h-screen">
        <div className="block h-24 bg-white" />
        <div className="block left-0 h-20 bg-[url('/svg/bg2.svg')] bg-center" />

        <main className="flex flex-col w-full justify-center items-center">
          <div className="mb-5 text-white text-3xl font-bold text-center">
            Fazer login
          </div>
          <Form
            className="w-full px-10"
            ref={formRef}
            onSubmit={() => console.log("Submetido")}
          >
            <Input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
            />
            <Input name="senha" type="password" placeholder="Senha" />
            <SubmitButton>Realizar Login</SubmitButton>
          </Form>
        </main>
      </div>
    </>
  );
};

export default Login;
