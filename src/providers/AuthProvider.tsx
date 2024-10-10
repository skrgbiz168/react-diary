import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth';

type UserContextType = User | null;

const initialState: UserContextType = getAuth().currentUser

const AuthContext = createContext<UserContextType>(initialState)

type Props = { children: ReactNode }

export const AuthProvider = ({ children } : Props) => {
    const [user, setUser] = useState<UserContextType>(initialState)
    const [isSignIn, setIsSignIn] = useState(false);

     useEffect(() => {
        return onAuthStateChanged(getAuth(), (user) => {
          setUser(user)
          setIsSignIn(user!=null?true:false)
        });
        }, [children] );

    return (
        <AuthContext.Provider value={user}>{ children }</AuthContext.Provider>
    );
}

export const user = getAuth().currentUser;
export const useAuthContext = () => useContext(AuthContext);

