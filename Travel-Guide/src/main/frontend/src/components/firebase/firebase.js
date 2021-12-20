// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-5u8BuTOs5WYM__Yt9DNMt5fgq7AHhrg",
  authDomain: "travel-guide-proj.firebaseapp.com",
  projectId: "travel-guide-proj",
  storageBucket: "travel-guide-proj.appspot.com",
  messagingSenderId: "474752713596",
  appId: "1:474752713596:web:5b87bf4d1378cb41941af9",
  measurementId: "G-SFXDZ9X8RC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};