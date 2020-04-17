import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBiQ1Spea_6ahxWARm4RbNjYh0c7UeV2hk",
  authDomain: "locationserv-15f40.firebaseapp.com",
  databaseURL: "https://locationserv-15f40.firebaseio.com",
  projectId: "locationserv-15f40",
  storageBucket: "locationserv-15f40.appspot.com",
  messagingSenderId: "100525534432",
  appId: "1:100525534432:web:ee0f174a81836856757485",
  measurementId: "G-TWT8LLDM1S",
};

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
