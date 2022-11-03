import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase";


export const Profile = () => {
    const router = useRouter();

    useEffect(() => {
        if (!firebaseAuth.currentUser) {
            router.push("/sign-in").then(_ => null);
        }
    }, [firebaseAuth.currentUser])

    if (!!firebaseAuth.currentUser) {
        return (
            <div>
                logged in
            </div>
        )
    }

    return (
        <div>
            Please sign in
        </div>
    )
}

export default Profile;
