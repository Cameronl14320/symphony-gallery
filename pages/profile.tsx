import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import { Root, SignIn } from "../config/routes";
import { onAuthStateChanged } from "@firebase/auth";


export const Profile = () => {
    const router = useRouter();

    useEffect(() => {
        if (!firebaseAuth.currentUser) {
            router.push(SignIn).then(_ => null);
        }
    }, []);

    onAuthStateChanged(firebaseAuth, (auth) => {
        if (!auth) {
            router.push(Root).then(_ => null);
        }
    });

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
