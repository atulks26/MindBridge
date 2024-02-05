import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDtNtevulNFDZIbP5lQNa7TYeR6e7b3BUU",
    authDomain: "mind-bridge-86ec9.firebaseapp.com",
    projectId: "mind-bridge-86ec9",
    storageBucket: "mind-bridge-86ec9.appspot.com",
    messagingSenderId: "402542543596",
    appId: "1:402542543596:web:e37955c3aff7cf918cdbc9",
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
