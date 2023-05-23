/* eslint-disable prettier/prettier */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyByCmvc8_ic-hRpUzyQATGIBPTKMijBAAw',
  authDomain: 'cashflow-704f7.firebaseapp.com',
  databaseURL: 'https://cashflow-704f7-default-rtdb.firebaseio.com',
  projectId: 'cashflow-704f7',
  storageBucket: 'cashflow-704f7.appspot.com',
  messagingSenderId: '772223170062',
  appId: '1:772223170062:web:d1d68c1846fc775c0cee5f',
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const authFirebase = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
