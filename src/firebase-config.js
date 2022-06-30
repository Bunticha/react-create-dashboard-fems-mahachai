// Import the functions you need from the SDKs you need
import "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdODBohzZjMmV9DOq02zln4rza6Ab7SLM",
  authDomain: "cpf-innovation-mes.firebaseapp.com",
  databaseURL: "https://cpf-innovation-mes.firebaseio.com",
  projectId: "cpf-innovation-mes",
  storageBucket: "cpf-innovation-mes.appspot.com",
  messagingSenderId: "684190539040",
  appId: "1:684190539040:web:e07eb4bb5861ba7ddb4b45",
  //measurementId: "G-MKTG0TJBLY"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;