import {useRouter} from "next/router";
import {useEffect} from "react";
import styles from "./membership.module.scss";
import { RootRoute, SignInRoute} from "../../config/routes";
import useAppContext from "../../config/appContext";
import SignInComponent from "../../components/auth/sign-in/sign-in.component";

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
        if (isLoggedIn && router.route === SignInRoute) {
            const redirectTo = !!(router.query.redirectTo as string) ? router.query.redirectTo as string : RootRoute;
            router.push(redirectTo).then();
        }
    };

    return (
        <div className={styles.container}>
            <SignInComponent/>
        </div>
    );
}

export default SignIn;
