import {useState} from "react";
import styles from "./membership.module.scss";
import Button from "../shared/button";
import { useUserService } from "../../config/config";
import DateSelector from "./dateSelector/dateSelector";

export const Membership = () => {
    const [loading, setLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState<string | null | undefined>(null);
    const [date, setDate] = useState<Date | null>(null);
    const userService = useUserService();

    const toggleIsSignIn = () => {
        setIsSignIn(!isSignIn);
    }

    const handleStandardSignIn = async () => {
        setLoading(true);
        const result = await userService.signInWithEmailAndPassword(email, password);

        if (!result.success) {
            setLoading(false);
            setError(result.error);
        }
    }

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
            <div className={styles.inputSection} style={{display: !isSignIn ? "flex" : "none"}}>
                <DateSelector/>
            </div>
            <div className={styles.buttonSection}>
                <Button onClick={() => {isSignIn ? handleStandardSignIn() : handleStandardSignUp()}}>{isSignIn ? "Sign in" : "Sign up"}</Button>
                <div style={{display: "flex"}}>
                    <label>{isSignIn ? "Don't have an account?" : "Already have an account?"}</label>
                    <Button style={{marginLeft: "4px"}} onClick={() => toggleIsSignIn()}>{isSignIn ? "Sign up" : "Sign in"}</Button>
                </div>
            </div>
        </div>
    );
}

export default Membership;
