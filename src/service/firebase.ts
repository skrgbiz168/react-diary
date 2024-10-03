import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, UserCredential, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,

  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};



const signInWithGoogle = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
        .then((res) => {
            console.log(res.user);
        })
        .catch((error) => {
            console.log(error.message);
        });
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logged out");
        document.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

export { signInWithGoogle, logOut, app, db, collection, addDoc, getDocs };
