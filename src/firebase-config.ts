import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
