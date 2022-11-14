import {useRouter} from "next/router";
import {useEffect} from "react";
import styles from "./membership.module.scss";
import { RootRoute, SignUpRoute} from "../../config/routes";
import useAppContext from "../../config/appContext";
import SignUpComponent from "../../components/auth/sign-up/sign-up.component";

export const SignIn = () => {
    const router = useRouter();
    const context = useAppContext();

    useEffect(() => {
        if (context.isLoggedIn) {
            pushToRoot(context.isLoggedIn);
        }
    }, []);

    useEffect(() => {
        if (context.isLoggedIn) {
            pushToRoot(context.isLoggedIn);
        }
    }, [context.isLoggedIn]);

    const pushToRoot = (isLoggedIn: boolean) => {
        if (isLoggedIn && router.route === SignUpRoute) {
            const redirectTo = !!(router.query.redirectTo as string) ? router.query.redirectTo as string : RootRoute;
            router.push(redirectTo).then();
        }
    };

    return (
        <div className={styles.container}>
            <SignUpComponent/>
        </div>
    );
}

export default SignIn;
