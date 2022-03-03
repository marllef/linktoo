// Import the functions you need from the SDKs you need
import firebase, { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3WVwqsF_z43h5WJi-iLZcs7NE3TJKAIw",
  authDomain: "instalinker-rjs.firebaseapp.com",
  databaseURL: "https://instalinker-rjs-default-rtdb.firebaseio.com",
  projectId: "instalinker-rjs",
  storageBucket: "instalinker-rjs.appspot.com",
  messagingSenderId: "74431008770",
  appId: "1:74431008770:web:db387207717ff7c483571b",
  measurementId: "G-BP4FLL7569",
};

export class FirebaseAuth {
  private app: FirebaseApp;
  private auth: Auth;

  public currentUser: User | null;

  constructor() {
    if (!firebase?.getApps().length) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = firebase.getApp();
    }

    this.auth = getAuth(this.app);
    this.currentUser = this.auth.currentUser;
  }

  public async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.currentUser = user;
    console.log(user.email, "logado com sucesso!");

    return user;
  }

  public async createUser(email: string, password: string) {
    return (await createUserWithEmailAndPassword(this.auth, email, password))
      .user;
  }

  public async signOut() {
    await signOut(this.auth);
    this.currentUser = null;
    console.log("Usuario deslogado com sucesso!");
  }
}
