import {useState} from "react";
import {useUserService} from "../../../config/config";
import styles from "../membership.module.scss";
import DateSelector from "../dateSelector/dateSelector";
import Button from "../../shared/button";
import Link from "next/link";
import {SignIn} from "../../../config/routes";

export const SignUp = (props: { redirectTo?: string }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState<string | null | undefined>(null);
    const [date, setDate] = useState<Date | null>(null);
    const userService = useUserService();
    const { redirectTo } = props;

    const handleStandardSignUp = async () => {
        if (!date) {
            setError("Please select your date of birth");
            return;
        }

        setLoading(true);
        const result = await userService.signUpUserWithEmailAndPassword(email, password, nickname, date);

        if (!result.success) {
            setLoading(false);
            setError(result.error);
        }
    }
    
    if (loading) {
        return (
            <div className={styles.container}>
                <div>
                </div>
            </div>
        )
    }

    const signInRef = !!redirectTo ? {pathname: SignIn, query: { redirectTo: redirectTo}} : {pathname: SignIn};

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <p style={{display: !!error ? "block" : "none"}}>{error}</p>
            </div>
            <div className={styles.section}>
                <label>Nickname</label>
                <input type="text" id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} required/>
            </div>
            <div className={styles.section}>
                <label>Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </div>
            <div className={styles.section}>
                <label>Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
            </div>
            <div className={styles.section}>
                <DateSelector onChange={(newDate) => setDate(newDate)}/>
            </div>
            <div>
                <div className={styles.buttonSection}>
                    <Button onClick={() => handleStandardSignUp()}>Sign up</Button>
                </div>
                <div style={{display: "flex"}}>
                    <label>Already have an account?</label>
                    <Link style={{marginLeft: "4px"}} href={signInRef}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
