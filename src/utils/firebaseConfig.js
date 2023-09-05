import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCjIIFzexluiG7gwYj_ismkb1C0yhHIw70",
    authDomain: "vue-3-dfd9a.firebaseapp.com",
    projectId: "vue-3-dfd9a",
    storageBucket: "vue-3-dfd9a.appspot.com",
    messagingSenderId: "169901640518",
    appId: "1:169901640518:web:b9383e270feb42566cf347"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth()

export { auth }