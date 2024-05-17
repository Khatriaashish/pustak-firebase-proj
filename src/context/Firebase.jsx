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
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

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

  const handleCreateNewListing = async (data) => {
    try {
      const coverRef = ref(
        storage,
        `uploads/cover/${Date.now()}-${data.cover.name}`
      );
      const uploadResult = await uploadBytes(coverRef, data.cover);
      return await addDoc(collection(fireStore, "books"), {
        bookName: data.bookName,
        isbn: data.isbn,
        price: data.price,
        imageURL: uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (except) {
      throw except;
    }
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        signInWithEmailAndPass,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
