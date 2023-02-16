import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAAPY4x1Ci1Jsjw8a8-T0ZR4ouTy-BgIKw',
  authDomain: 'ucsdroomies-bc16f.firebaseapp.com',
  databaseURL: 'https://ucsdroomies-bc16f.firebaseio.com',
  projectId: 'ucsdroomies-bc16f',
  storageBucket: 'ucsdroomies-bc16f.appspot.com',
  messagingSenderId: '730515116933',
  appId: '1:730515116933:ios:bed84c041c690fd4b52aec',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
