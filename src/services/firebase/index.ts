// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBT-wemrdlcXqTjGFpIhHKhT3pFqPnc9eU',
  authDomain: 'react-social-network-b0886.firebaseapp.com',
  projectId: 'react-social-network-b0886',
  storageBucket: 'react-social-network-b0886.appspot.com',
  messagingSenderId: '716760607488',
  appId: '1:716760607488:web:cc5c01c40d200fb2ff21e5',
  measurementId: 'G-2BSDSMVTW9',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getFirestore(firebaseApp);

export { firebaseApp, firebaseAnalytics, firebaseAuth, firebaseDB };
