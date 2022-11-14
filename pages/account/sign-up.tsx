import {useRouter} from "next/router";
import {useEffect} from "react";
import styles from "./membership.module.scss";
import { Root, SignUp as signUp} from "../../config/routes";
import { useAppContext} from "../../config/appContext";
import {SignUp as SignUpComponent} from "../../components/auth/sign-up/sign-up";

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
        if (isLoggedIn && router.route === signUp) {
            const redirectTo = !!(router.query.redirectTo as string) ? router.query.redirectTo as string : Root;
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
