import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDiB7FTEyz17VMTEKNN2GOcLKrpsUP8mnQ",
  authDomain: "smartindiahackathon2020.firebaseapp.com",
  databaseURL: "https://smartindiahackathon2020.firebaseio.com",
  projectId: "smartindiahackathon2020",
  storageBucket: "smartindiahackathon2020.appspot.com",
  messagingSenderId: "411359624710",
  appId: "1:411359624710:web:296417ea43993983c04d87",
  measurementId: "G-JGVDXHXYF7"
};

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();
