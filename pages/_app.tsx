import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import Header from "../components/header/header";
import { initializeApp } from "@firebase/app";
import { FirebaseConfig } from "../config/firebase";

export const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    return (
        <>
            <Header/>
            <Component {...pageProps} />
        </>
    );
}

export default App;
