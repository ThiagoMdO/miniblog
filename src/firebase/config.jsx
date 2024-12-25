// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpJeXQQdsUcgp0b7PF879Qas9bCOIRyjI",
  authDomain: "miniblog-82fc0.firebaseapp.com",
  projectId: "miniblog-82fc0",
  storageBucket: "miniblog-82fc0.firebasestorage.app",
  messagingSenderId: "245863945432",
  appId: "1:245863945432:web:dd6a8a345af8a8247473ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };