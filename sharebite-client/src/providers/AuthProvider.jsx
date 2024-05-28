import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider);
    };

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logoutUser = () => {
        return signOut(auth);
    };

    const updateUser = () => {
        setLoading(true);
        return updateProfile(user);
    };

    useEffect(() => {
        const unSubscriber = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            unSubscriber();
        };
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logoutUser,
        updateUser,
        githubLogin,
        googleLogin,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
