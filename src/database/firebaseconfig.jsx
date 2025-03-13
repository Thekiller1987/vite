import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
    apiKey: "AIzaSyCMNFL4EKka_j8H2rGnxu1ap4Y6VGo6OTY",
    authDomain: "clase-bfd67.firebaseapp.com",
    projectId: "clase-bfd67",
    storageBucket: "clase-bfd67.firebasestorage.app",
    messagingSenderId: "30205279872",
    appId: "1:30205279872:web:c0ba32c3004f88dcc8b065",
    measurementId: "G-L9B4DG54YV"
};

// Inicializa Firebase
const appfirebase = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(appfirebase);

// Inicializa Authentication
const auth = getAuth(appfirebase);

export { appfirebase, db, auth };