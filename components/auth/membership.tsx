import {useState} from "react";
import Link from "next/link";
import {SignUp} from "../../config/routes";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {firebaseAuth} from "../../config/firebase";
import styles from "./membership.module.scss";
import Button from "../shared/button";

const membershipErrors: Map<string, string> = new Map([
    ["auth/user-not-found", "Invalid email or password"],
    ["", ""],
]);

export const Membership = () => {
    const [loading, setLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState<string | null | undefined>(null);

    const toggleIsSignIn = () => {
        setIsSignIn(!isSignIn);
    }

    const handleStandardSignIn = () => {
        setLoading(true);
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch((error => {
                setLoading(false);
                setError(membershipErrors.get(error.code));
            }));
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputSection}>
                <p style={{display: !!error ? "block" : "none"}}>{error}</p>
            </div>
            <div className={styles.inputSection}>
                <label>Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </div>
            <div className={styles.inputSection}>
                <label>Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
            </div>
            <div className={styles.buttonSection}>
                <Button onClick={() => handleStandardSignIn()}>Sign in</Button>
                <Link href={SignUp}>
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Membership;
