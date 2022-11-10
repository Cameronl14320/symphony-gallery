import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import { SignIn, Profile as profile } from "../config/routes";
import {useAppContext} from "../config/appContext";


export const Profile = () => {
    const router = useRouter();
    const context = useAppContext();

    useEffect(() => {
        if (!context.isLoggedIn) {
            pushToSignIn(context.isLoggedIn);
        }
    }, []);

    useEffect(() => {
        if (!context.isLoggedIn) {
            pushToSignIn(context.isLoggedIn);
        }
    }, [context.isLoggedIn]);

    const pushToSignIn = (isLoggedIn: boolean) => {
        if (!isLoggedIn && router.route === profile) {
            router.push({pathname: SignIn, query: {redirectTo: profile}}, profile).then();
        }
    };

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
