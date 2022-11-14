import {useState} from "react";
import {useUserService} from "../../../config/config";
import styles from "../membership.module.scss";
import Button from "../../shared/button";
import Link from "next/link";
import {SignUp} from "../../../config/routes";

export const SignIn = (props: { redirectTo?: string }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const userService = useUserService();
    const { redirectTo } = props;

    const handleStandardSignIn = async () => {
        setLoading(true);
        const result = await userService.signInWithEmailAndPassword(email, password);

        if (!result.success) {
            setLoading(false);
            setError(result.error);
        }
    }

    const signUpRef = !!redirectTo ? {pathname: SignUp, query: { redirectTo: redirectTo}} : {pathname: SignUp};

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <p style={{display: !!error ? "block" : "none"}}>{error}</p>
            </div>
            <div className={styles.section}>
                <label>Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </div>
            <div className={styles.section}>
                <label>Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
            </div>
            <div>
                <div className={styles.buttonSection}>
                    <Button onClick={() => handleStandardSignIn()}>Sign in</Button>
                </div>
                <div style={{display: "flex"}}>
                    <label>Don't have an account?</label>
                    <Link style={{marginLeft: "4px"}} href={signUpRef}>Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
