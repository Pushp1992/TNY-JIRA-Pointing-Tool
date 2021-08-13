import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebaseClient from './firebase/firebaseClient';
import firebase from 'firebase/app';

import 'firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    firebaseClient();

    const [user, setuser] = useState(null);

    useEffect(() => {
        firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setuser(null);
                nookies.set(undefined, "token", "", {});
                return;
            };

            const token = await user.getIdToken();
            setuser(user);
            nookies.set(undefined, "token", token, {});
        });
    }, []);

    return (<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>)
};

export const useAuth = () => useContext(AuthContext);