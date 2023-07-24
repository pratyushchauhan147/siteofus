// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import {  getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNlRygRD6jSS6EIgkx5bo1fyd_f3MvRqo",
  authDomain: "siteofus.firebaseapp.com",
  projectId: "siteofus",
  storageBucket: "siteofus.appspot.com",
  messagingSenderId: "246830549205",
  appId: "1:246830549205:web:2bca2992682e3a4f5efa5c"
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export  { db, storage };