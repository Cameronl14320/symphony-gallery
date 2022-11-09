import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import { Browse, SignIn } from "../config/routes";
import { onAuthStateChanged } from "@firebase/auth";


export const Profile = () => {
    const router = useRouter();

    useEffect(() => {
        if (!firebaseAuth.currentUser) {
            router.push({pathname: SignIn, query: { redirectTo: Browse }}, Browse).then(_ => null);
        }

        onAuthStateChanged(firebaseAuth, (auth) => {
            if (!auth) {
                router.push({pathname: SignIn, query: { redirectTo: Browse }}, Browse).then(_ => null);
            }
        });
    }, []);

    if (!!firebaseAuth.currentUser) {
        return (
            <div>
                logged in
            </div>
        );
    }

    return (
        <div>
            Please sign in
        </div>
    );
}

export default Profile;
