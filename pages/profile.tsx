import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import { Browse, SignIn, Profile as profile } from "../config/routes";
import { onAuthStateChanged } from "@firebase/auth";


export const Profile = () => {
    const router = useRouter();

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
