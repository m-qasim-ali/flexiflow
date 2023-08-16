// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJUJUQ_jx4zo2U5M4RhZ60Z8LnMBNxTyU',
  authDomain: 'flexiflow-8bc9f.firebaseapp.com',
  projectId: 'flexiflow-8bc9f',
  storageBucket: 'flexiflow-8bc9f.appspot.com',
  messagingSenderId: '848300245731',
  appId: '1:848300245731:web:8679a87d2b1896d53d3bd6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001)
}

export { app, auth, db };
