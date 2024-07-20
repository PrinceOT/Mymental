// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import {firebase} from 'firebase/app';
//import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMP8qsUQZJtlS4xRF0UOSVu92FQOOKB8A",
  authDomain: "mymental-ot21.firebaseapp.com",
  projectId: "mymental-ot21",
  storageBucket: "mymental-ot21.appspot.com",
  messagingSenderId: "42759283646",
  appId: "1:42759283646:web:29e3e094208e8966964fef",
  measurementId: "G-6M0W9QBSZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export  {app , auth,db};