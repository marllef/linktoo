import { User as DBUser } from "@prisma/client";
import { User as FBUser } from "firebase/auth";

import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserByEmail } from "~/hooks/fetcher";
import { AuthServices } from "~/services/AuthServices";

interface AuthContextTypes {
  user: FBUser | null;
  data?: DBUser;
  loading: boolean;
  signIn: { (email: string, password: string): Promise<FBUser> };
  signInWithGoogle: { (): Promise<FBUser> };
  createUser: {
    (name: string, email: string, password: string): Promise<FBUser>;
  };
  updateUserData: { (user: FBUser, changes: any): Promise<DBUser> };
  signOut: { (): Promise<void> };
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FBUser | null>(null);
  const [data, setData] = useState<DBUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthServices.onAuthChange(async (user) => {
      setUser(user);
      if (user) {
        const userData = await getUserByEmail(user.email!);
        setData(userData);
      }
      setLoading(false);
    });
  }, []);

  async function signIn(email: string, password: string) {
    const currentUser = await AuthServices.login(email, password);
    setUser(currentUser);
    return currentUser;
  }

  async function signInWithGoogle() {
    const currentUser = await AuthServices.loginWithGoogle();
    setUser(currentUser);
    return currentUser;
  }

  async function createUser(name: string, email: string, password: string) {
    const currentUser = await AuthServices.createUser(name, email, password);
    setUser(currentUser);
    return currentUser;
  }

  async function updateUserData(user: FBUser, changes: any) {
    const updatedUser = await AuthServices.updateUser(user, changes);
    return updatedUser!;
  }

  async function signOut() {
    await AuthServices.signOut();
    setLoading(false);
    setUser(null);
  }

  const value = {
    user,
    data,
    loading,
    signIn,
    signInWithGoogle,
    signOut,
    createUser,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
