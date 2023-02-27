// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjZyLkmat0Y3VEkPzr9Q7_jm-3LRGC7bc",
  authDomain: "ucsdroomies-4a216.firebaseapp.com",
  projectId: "ucsdroomies-4a216",
  storageBucket: "ucsdroomies-4a216.appspot.com",
  messagingSenderId: "702319009828",
  appId: "1:702319009828:web:b3a178ff7531be3fdeb8b1",
  measurementId: "G-T6VKB8ZFLD",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = app.firestore();
export const auth = getAuth();

// export { db, auth };
