// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
VITE_APIKEY,
VITE_AUTHDOMAIN,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGINGSENDERID,
VITE_APPID,
} = getEnvironments()

// console.log(process.env);

// console.log( import.meta.env );

// Your web app's Firebase configuration

// dev prod
// const firebaseConfig = {
//   apiKey: "AIzaSyCwfIrQJkE0I6vJTwV1S0LFKk6Hc2MzOrY",
//   authDomain: "react-curso-6b007.firebaseapp.com",
//   projectId: "react-curso-6b007",
//   storageBucket: "react-curso-6b007.appspot.com",
//   messagingSenderId: "531636387608",
//   appId: "1:531636387608:web:349e7ed8389c021d9e686d"
// }



// const firebaseConfig = {
//   apiKey: "AIzaSyDBKVzZvqJ0pXi9Cjmx_faXkYvrrT0pXYk",
//   authDomain: "react-curso-dev-91751.firebaseapp.com",
//   projectId: "react-curso-dev-91751",
//   storageBucket: "react-curso-dev-91751.appspot.com",
//   messagingSenderId: "148835546207",
//   appId: "1:148835546207:web:ee8ebf085b1a59c8c4d7ea",
//   measurementId: "G-P0TL8XXY90"
// }


const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID, 
};
console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp )

export const FirebaseDB   = getFirestore( FirebaseApp )

