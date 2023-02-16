// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjZyLkmat0Y3VEkPzr9Q7_jm-3LRGC7bc",
  authDomain: "ucsdroomies-4a216.firebaseapp.com",
  projectId: "ucsdroomies-4a216",
  storageBucket: "ucsdroomies-4a216.appspot.com",
  messagingSenderId: "702319009828",
  appId: "1:702319009828:web:b3a178ff7531be3fdeb8b1",
  measurementId: "G-T6VKB8ZFLD"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
