import { useRouter } from "next/router";
import { firebaseAuth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
import UserService from "../../services/UserService";
import {Root} from "../../config/routes";

export const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [userService, setUserService] = useState(new UserService());
    const router = useRouter();

    useEffect(() => {
        if (!userService) { // Ensure that userService is always intialised
            setUserService(new UserService());
        }

        // Do not allow users to sign up if they are already signed in
        if (!!firebaseAuth.currentUser) {
            router.replace(Root).then(_ => null);
        }

        onAuthStateChanged(firebaseAuth, (user) => {
            if (!!user) {
                router.replace(Root).then(_ => null);
            }
        });
    }, []);

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(firebaseAuth, email, password);

            const create = await userService.createUser(user.user.uid, nickname);

            if (!create.ok) {
                console.log("failed to create user, need to reconciliate");
            }
        } catch (error) {
            setLoading(false);
            console.log("failed to sign up");
        }
    }
    if (loading) {
        return (
            <div>
                Loading loading loading
            </div>
        )
    }

    return (
        <div>
            <label>Nickname</label>
            <input type="string" id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} required/>
            <label>Email</label>
            <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            <label>Password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
            <button onClick={() => handleSignUp()}>Submit</button>
        </div>
    );
}

export default SignUp;
