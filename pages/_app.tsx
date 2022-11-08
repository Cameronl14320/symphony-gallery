import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import Header from "../components/header/header";

export const App = (props: AppProps) => {
    const { Component, pageProps, router } = props;
    const { asPath } = router;

    // if (asPath.startsWith("/account")) {
    //     return (
    //         <Component {...pageProps} />
    //     );
    // }

    return (
        <>
            <Header/>
            <Component {...pageProps} />
        </>
    );
}

export default App;
