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

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // signed in
          setUser(user);
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
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

    const logIn = (state, showMessages, navigation) => {
        setLoading(true);

        signInWithEmailAndPassword(auth, state.email, state.password)
        .then((userCredential) => {
            if (userCredential) {
                const user = userCredential.user;
                console.log("Logged in with:", user.email);
                navigation.navigate("HomeScreen","HomeScreen");
            } else {
                return Promise.reject();
            }
        })
        .catch((error) => {
            setError(error);
            showMessages('', 'Your email and password do not match');
        })
        .finally(() => setLoading(false));
    }

    const register = (state, showMessages, navigation) => {
        setLoading(true);

        createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Registered with:", user.email);
            navigation.navigate("ModelScreen","ModelScreen");
        })
        .catch((error) => {
            setError(error);
            showMessages('Account already exists', '', '')
        })
        .finally(() => setLoading(false));
    }

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
};

export default function useAuth() {
  return useContext(AuthContext);
}
