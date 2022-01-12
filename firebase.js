// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTask = (callback) => onSnapshot(collection(db, "tasks"), callback)

export const deleteTask = id => deleteDoc(doc(db, "tasks",id))