import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // signed in
          setUser(currentUser);
        } else {
          // not signed in
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    [],
  );

  const logOut = () => {
    setLoading(true);

    signOut(auth)
      .then(console.log("Logged out"))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const logIn = (state, showMessages, navigation) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, state.email, state.password)
      // eslint-disable-next-line consistent-return
      .then((userCredential) => {
        if (userCredential) {
          const { currentUser } = userCredential;
          console.log("Logged in with:", currentUser.email);
          navigation.navigate("HomeScreen", "HomeScreen");
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => {
        setError(err);
        showMessages("", "Your email and password do not match");
      })
      .finally(() => setLoading(false));
  };

  const register = (state, showMessages, navigation) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredentials) => {
        const currentUser = userCredentials.user;
        console.log("Registered with:", currentUser.email);
        navigation.navigate("CreateProfileScreen", "CreateProfileScreen");
      })
      .catch((err) => {
        setError(err);
        showMessages("Account already exists", "", "");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      logIn,
      logOut,
      register,
    }),
    [user, loading, error],
  ); // only update the containts if either of [user, loading, error] changed

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
