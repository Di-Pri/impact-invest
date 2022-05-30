import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, CollectionReference, collection, DocumentData } from "firebase/firestore";
import { User } from "./types/User";
import { Company } from "./types/Company";

const firebaseConfig = {
  apiKey: "AIzaSyAwgOBKgHtLF32_9KSCcCkjtlXp4WoyE3k",
  authDomain: "impact-invest.firebaseapp.com",
  projectId: "impact-invest",
  storageBucket: "impact-invest.appspot.com",
  messagingSenderId: "182599738427",
  appId: "1:182599738427:web:40cbec3da9063fc49fe81e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore();

// Adding types to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

// Creating path to collections
export const usersCollection = createCollection<User>("users");
export const companiesCollection = createCollection<Company>("companies");
