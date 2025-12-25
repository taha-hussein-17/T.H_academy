import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey: "AIzaSyDVf8oRTW9lW_6vzIud_1UL9wC0vSZF6-U", 
  authDomain: "thacademy-8b312.firebaseapp.com", 
  projectId: "thacademy-8b312", 
  storageBucket: "thacademy-8b312.firebasestorage.app", 
  messagingSenderId: "1011932233454", 
  appId: "1:1011932233454:web:d2d55cd69d9f83bdb9fdff", 
  measurementId: "G-5PYWMQ9XX7" 
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

/**
 * RECOMMENDED FIRESTORE SECURITY RULES (Copy to Firebase Console):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read: if true;
 *       allow write: if request.auth != null;
 *     }
 *   }
 * }
 */

export default app;
