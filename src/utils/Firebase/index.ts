// Import the functions you need from the SDKs you need
import firebase, { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
  Unsubscribe,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export class FirebaseAuth {
  private app: FirebaseApp;
  private auth: Auth;

  public currentUser: User | null = null;

  constructor() {
    if (!firebase?.getApps().length) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = firebase.getApp();
    }

    this.auth = getAuth(this.app);
    this.currentUser = this.auth.currentUser;
    this.auth.onAuthStateChanged((user) => (this.currentUser = user));
  }

  public async signIn(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.currentUser = user;

      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public onAuthChange(observer: any, error?: any, completed?: any) {
    return this.auth.onAuthStateChanged(observer, error, completed);
  }

  public async createUser(name: string, email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
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

      return user;
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  public async signOut() {
    await signOut(this.auth);
    this.currentUser = null;
    console.log("Usuario deslogado com sucesso!");
  }
}
