import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();