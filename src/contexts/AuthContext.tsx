import { User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthServices } from "~/services/AuthServices";

interface AuthContextTypes {
  user: User | null;
  loading: boolean;
  signIn: { (email: string, password: string): Promise<User> };
  signInWithGoogle: { (): Promise<User> };
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthServices.onAuthChange((user) => {
      setUser(user);
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

  async function signOut() {
    await AuthServices.signOut();
    setLoading(false);
    setUser(null);
  }

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signOut,
    createUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
