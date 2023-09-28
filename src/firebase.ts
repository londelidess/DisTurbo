// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmHYANG6fo6Hr-yMchVr4f_gFN-nsjs0E",
  authDomain: "disturbo-9ef64.firebaseapp.com",
  projectId: "disturbo-9ef64",
  storageBucket: "disturbo-9ef64.appspot.com",
  messagingSenderId: "98760648971",
  appId: "1:98760648971:web:f41c86531ab2d94f231a0e",
  measurementId: "G-W681H1N821"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export{ auth, provider, db };
