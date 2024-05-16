import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDnKAFiH9F8fQXJ-mhEvpz8TQH_vCxnlOU",
  authDomain: "pustak-f758a.firebaseapp.com",
  projectId: "pustak-f758a",
  storageBucket: "pustak-f758a.appspot.com",
  messagingSenderId: "626265947460",
  appId: "1:626265947460:web:4eee6f16522df7bffe6b11",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        signInWithEmailAndPass,
        signInWithGoogle,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
