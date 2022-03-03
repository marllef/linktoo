import { User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { FirebaseAuth } from "~/utils/Firebase";

interface AuthContextTypes {
  signIn: { (email: string, password: string): Promise<User> };
  createUser: { (email: string, password: string): Promise<User> };
  signOut: { (): Promise<void> };
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const auth = new FirebaseAuth();

  async function signIn(email: string, password: string) {
    return await auth.signIn(email, password);
  }

  async function createUser(email: string, password: string) {
    return await auth.createUser(email, password);
  }

  async function signOut() {
    await auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};
