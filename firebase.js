import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdxdEhkGEFe8zwZOxQVMAEfok_FMwyUqA",
  authDomain: "punflashecu.firebaseapp.com",
  projectId: "punflashecu",
  storageBucket: "punflashecu.firebasestorage.app",
  messagingSenderId: "573585231038",
  appId: "1:573585231038:web:b353d2b5385e9cd684a2ef",
  measurementId: "G-G7FRS22C83"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
