import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { FirebaseAuth } from "~/utils/Firebase";

interface AuthContextTypes {
  currentUser: User | null;
  signIn: { (email: string, password: string): Promise<User> };
  createUser: {
    (name: string, email: string, password: string): Promise<User>;
  };
  signOut: { (): Promise<void> };
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = new FirebaseAuth();

  useEffect(() => {
    if (auth.currentUser) {
      console.log("User: ", auth.currentUser);
      setUser(auth.currentUser);
    }
  }, [auth.currentUser]);

  async function signIn(email: string, password: string) {
    const currentUser = await auth.signIn(email, password);
    setUser(auth.currentUser);
    return currentUser;
  }

  async function createUser(name: string, email: string, password: string) {
    const currentUser = await auth.createUser(name, email, password);
    setUser(auth.currentUser);
    return currentUser;
  }

  async function signOut() {
    await auth.signOut();
    setUser(auth.currentUser);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser: user, signIn, signOut, createUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
