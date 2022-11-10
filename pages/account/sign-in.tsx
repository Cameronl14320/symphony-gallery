import {useRouter} from "next/router";
import { firebaseAuth } from "../../config/firebase";
import {onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import {useEffect, useState} from "react";
import Link from "next/link";
import styles from "./sign-in.module.scss";
import { Root, SignUp, SignIn as signIn} from "../../config/routes";
import { useAppContext} from "../../config/appContext";
import Membership from "../../components/auth/membership";

const signInErrors: Map<string, string> = new Map([
   ["auth/user-not-found", "Invalid email or password"],
   ["", ""],
]);

export const SignIn = () => {
    const router = useRouter();
    const context = useAppContext();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null | undefined>(null);

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
        if (isLoggedIn && router.route === signIn) {
            const redirectTo = !!(router.query.redirectTo as string) ? router.query.redirectTo as string : Root;
            router.push(redirectTo).then();
        }
    };

    const handleStandardSignIn = () => {
        setLoading(true);
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch((error => {
                setLoading(false);
                setError(signInErrors.get(error.code));
            }));
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    Loading
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Membership/>
        </div>
    );
}

export default SignIn;
