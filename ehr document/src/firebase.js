// import { initializeApp } from "firebase/app";
// import {getFirestore} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCk8R8bHzozbol87QD_aZ6tUA4A8EBqRMY",
    authDomain: "ehrinternship-6270e.firebaseapp.com",
    projectId: "ehrinternship-6270e",
    storageBucket: "ehrinternship-6270e.appspot.com",
    messagingSenderId: "858343264546",
    appId: "1:858343264546:web:cff1110f54a8fb18e8957b"
};


// const firebaseConfig = {
//     apiKey: "AIzaSyC6F8mPrXfFtcJCg2OjPokEmo0vAurNFek",
//     authDomain: "ehrwebsite.firebaseapp.com",
//     projectId: "ehrwebsite",
//     storageBucket: "ehrwebsite.appspot.com",
//     messagingSenderId: "466152067078",
//     appId: "1:466152067078:web:53b9c3299b3698181cf387",
//     measurementId: "G-RF7QJPZ7V1"
//   };



const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, collection, setDoc, doc };