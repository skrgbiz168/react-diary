import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

type UserContextType = User | null | undefined;

const initialState: UserContextType = null

const AuthContext = createContext<UserContextType>(initialState)

type Props = { children: ReactNode }

export const AuthProvider = ({ children } : Props) => {
    const [user, setUser] = useState<UserContextType>(initialState)

    useEffect(() => {
        return onAuthStateChanged(getAuth(), (user) => {
            setUser(
              user,
            )
        });
        }, [children] );

    return (
        <AuthContext.Provider value={user}>{ children }</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider;
