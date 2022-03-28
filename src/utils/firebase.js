import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDauKxruIgFkhKsfNHRtl6zpONXy8Ntw5g",
  authDomain: "tenedores--dev.firebaseapp.com",
  projectId: "tenedores--dev",
  storageBucket: "tenedores--dev.appspot.com",
  messagingSenderId: "1034243450876",
  appId: "1:1034243450876:web:1e66bde778cbeb798c7479",
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
