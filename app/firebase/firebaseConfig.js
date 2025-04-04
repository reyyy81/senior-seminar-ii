import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCyu7W5ZDnApJF0pfo_wGnPNMXYLoKab8E",
  authDomain: "drop-spot-3651a.firebaseapp.com",
  projectId: "drop-spot-3651a",
  storageBucket: "drop-spot-3651a.firebasestorage.app",
  messagingSenderId: "823987500412",
  appId: "1:823987500412:web:354f786cb846616bdca0f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};