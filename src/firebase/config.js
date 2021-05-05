import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAVOTTfVqKRSVr6FQBVUKImFurHJ_5mGgU',
  authDomain: 'mtchallenge-44723.firebaseapp.com',
  databaseURL: 'https://mtchallenge-44723.firebaseio.com',
  projectId: 'mtchallenge-44723',
  storageBucket: 'mtchallenge-44723.appspot.com',
  messagingSenderId: '408282520618',
  appId: '1:408282520618:web:ddbb8827e00c34af49f753',
  measurementId: 'G-ZL0MJ6Y04R',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export { firebase };
