import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import Header from "../components/header/header";
import {useEffect, useState} from "react";
import {firebaseAuth} from "../config/firebase";
import {onAuthStateChanged} from "@firebase/auth";
import {AppContext} from "../config/appContext";

export const App = (props: AppProps) => {
    const { Component, pageProps, router } = props;
    const { asPath } = router;
    const [isLoggedIn, setIsLoggedIn] = useState(!!firebaseAuth.currentUser);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            setIsLoggedIn(!!user);
        });
    }, []);

    return (
        <AppContext.Provider value={{isLoggedIn: isLoggedIn}}>
            <Header/>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
}

export default App;
