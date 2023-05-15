import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyCJXQjkIiMSxVs2ASy5eV8k8tYfJtrrOVU",
  authDomain: "savarrior-web.firebaseapp.com",
  projectId: "savarrior-web",
  storageBucket: "savarrior-web.appspot.com",
  messagingSenderId: "310461744278",
  appId: "1:310461744278:web:8656e60ffca9633cc26eb7"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

const storage = getStorage()

export { auth, db,storage };