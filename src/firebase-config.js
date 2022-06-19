import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDAQ2npeg0NhhnLq_XUsC8kAnnr81PtmUM",
    authDomain: "trainer-pal-79e72.firebaseapp.com",
    projectId: "trainer-pal-79e72",
    storageBucket: "trainer-pal-79e72.appspot.com",
    messagingSenderId: "712952533870",
    appId: "1:712952533870:web:a9775eac52bc048638e77f",
    measurementId: "G-Q5RG8EPGK4"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);