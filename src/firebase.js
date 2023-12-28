import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyMQscGUNwm7DmpFuy9_UnpcYSe6U32RY",
  authDomain: "note-with-react.firebaseapp.com",
  projectId: "note-with-react",
  storageBucket: "note-with-react.appspot.com",
  messagingSenderId: "226875561744",
  appId: "1:226875561744:web:79e17ce51c69e1d449f795"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };