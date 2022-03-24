import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAeHG_pKOSOSLXZs1gJWghfS3-l9uqmXFA",
    authDomain: "tenedores-d7434.firebaseapp.com",
    projectId: "tenedores-d7434",
    storageBucket: "tenedores-d7434.appspot.com",
    messagingSenderId: "974591892155",
    appId: "1:974591892155:web:46a50bbf490ac1e1c6279e"
  };
  
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);