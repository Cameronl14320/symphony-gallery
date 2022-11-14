import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import HeaderComponent from "../components/header/header.component";
import {useEffect, useState} from "react";
import {firebaseAuth} from "../config/firebase";
import {onAuthStateChanged} from "@firebase/auth";
import {AppContext} from "../config/appContext";

export const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(!!firebaseAuth.currentUser);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            setIsLoggedIn(!!user);
        });
    }, []);

    return (
        <AppContext.Provider value={{isLoggedIn: isLoggedIn}}>
            <HeaderComponent/>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
}

export default App;
