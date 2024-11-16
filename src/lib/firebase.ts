import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWS2eVDXXXjkHDY3k-NBVyUZHkVOOzIfk",
  authDomain: "assembler-application.firebaseapp.com",
  projectId: "assembler-application",
  storageBucket: "assembler-application.firebasestorage.app",
  messagingSenderId: "491592601906",
  appId: "1:491592601906:web:4dacf63949357a948a072b",
  measurementId: "G-DVPPML1LVW"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);