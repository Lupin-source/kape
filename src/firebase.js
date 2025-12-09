import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4s-l4qXV1860U7YRryjXzzZFOcK07pDc",
  authDomain: "raffle-56d89.firebaseapp.com",
  projectId: "raffle-56d89",
  storageBucket: "raffle-56d89.firebasestorage.app",
  messagingSenderId: "548822334550",
  appId: "1:548822334550:web:a93f21276ff6ac22a1cff7",
  measurementId: "G-M9D5Q51V7Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, serverTimestamp };