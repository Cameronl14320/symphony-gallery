import { useRouter } from "next/router";
import { firebaseAuth } from "../config/firebase";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import UserService from "../services/UserService";

export const SignUp = () => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [userService, setUserService] = useState(new UserService());
    const router = useRouter();

    // if (!!firebaseAuth.currentUser) {
    //     const router = useRouter();
    //     router.replace("/").then(_ => null);
    // }

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(firebaseAuth, email, password);

            const create = await userService.createUser(user.user.uid, nickname);

            if (create.ok) {
                router.replace("/").then(_ => null);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log("failed to sign up");
        }
    }

    return (
        <div>
            <label>Nickname</label>
            <input type="string" id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)}></input>
            <label>Email</label>
            <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <label>Password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>

            <button onClick={() => handleSignUp()}>Submit</button>
        </div>
    );
}

export default SignUp;
