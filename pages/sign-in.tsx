import {useRouter} from "next/router";
import { firebaseAuth } from "../config/firebase";
import { signInAnonymously } from "@firebase/auth";
import {useState} from "react";
import Link from "next/link";


export const SignIn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (!!firebaseAuth.currentUser) {
        router.replace("/").then(_ => null);
    }

    const handleAnonymousSignIn = () => {
        setLoading(true);
        signInAnonymously(firebaseAuth)
            .then(() => {
                router.replace("/");
            })
            .catch((error => {
                setLoading(false);
                console.log(error.code + error.message);
            }));
    }

    if (loading) {
        return (
            <div>
                Signing in...
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => handleAnonymousSignIn()}>
                Anonymously
            </button>
            Sign In
            <Link href={"/sign-up"}>
                Sign up
            </Link>
        </div>
    );
}

export default SignIn;
