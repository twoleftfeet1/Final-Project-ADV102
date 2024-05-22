import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHcOMmHwm1K6dhyhQGFiAHR2pUyZJwdN0",
  authDomain: "login-c9db6.firebaseapp.com",
  projectId: "login-c9db6",
  storageBucket: "login-c9db6.appspot.com",
  messagingSenderId: "986424837560",
  appId: "1:986424837560:web:920efc1e6e26c7b00c7b4d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };