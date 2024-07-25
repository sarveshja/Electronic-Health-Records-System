import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  // apiKey: "AIzaSyALcqT-d7FtR9h2zaen-vSWFp1f9PbIGqA",
  // authDomain: "ehrinternship.firebaseapp.com",
  // projectId: "ehrinternship",
  // storageBucket: "ehrinternship.appspot.com",
  // messagingSenderId: "760414788968",
  // appId: "1:760414788968:web:6488689fe693d3e8498add"

  apiKey: "AIzaSyCk8R8bHzozbol87QD_aZ6tUA4A8EBqRMY",
  authDomain: "ehrinternship-6270e.firebaseapp.com",
  projectId: "ehrinternship-6270e",
  storageBucket: "ehrinternship-6270e.appspot.com",
  messagingSenderId: "858343264546",
  appId: "1:858343264546:web:38ccd08d26b5388fe8957b"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore};