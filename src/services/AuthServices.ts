import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";

import { User as DBUser } from "@prisma/client";

import nookies from "nookies";

const auth = getAuth();

export const AuthServices = {
  login: async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      nookies.set(null, "USER_AUTHENTICATED", "TRUE", {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);

      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        }),
      });

      nookies.destroy(null, "USER_AUTHENTICATED");

      nookies.set(null, "USER_AUTHENTICATED", "TRUE", {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return user;
    } catch (err: any) {
      console.log("ERRO:", err.message);
      throw new Error(err.message);
    }
  },

  updateUser: async (
    user: User,
    updates: { username: string; photoUrl: string }
  ) => {
    try {
      const response = await fetch(`/api/database/users/${user.email}`, {
        method: "PUT",
        body: JSON.stringify({
          ...updates,
        }),
      });
      const updated: DBUser = await response.json();

      return updated;
    } catch (err: any) {
      console.log(err.message);
    }
  },

  createUser: async (name: string, email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: user.email,
          uid: user.uid,
        }),
      });

      nookies.destroy(null, "USER_AUTHENTICATED");
      
      nookies.set(null, "USER_AUTHENTICATED", "TRUE", {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return user;
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  },

  signOut: async () => {
    await signOut(auth);
    nookies.destroy(null, "USER_AUTHENTICATED");
  },

  onAuthChange: async (onChange: { (user: User | null): void }) => {
    return auth.onIdTokenChanged((user) => onChange(user));
  },
};
