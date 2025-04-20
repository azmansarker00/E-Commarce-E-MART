import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0UPA02g-WVuFowTjPCcDKfmIq6D0jmxA",
    authDomain: "testmode-214a4.firebaseapp.com",
    projectId: "testmode-214a4",
    storageBucket: "testmode-214a4.firebasestorage.app",
    messagingSenderId: "767394219829",
    appId: "1:767394219829:web:fbe3fc43636f4517e72e7c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB, auth } ;