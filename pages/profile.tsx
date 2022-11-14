import { useRouter } from "next/router";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import { SignInRoute, ProfileRoute } from "../config/routes";
import useAppContext from "../config/appContext";

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
        if (!isLoggedIn && router.route === ProfileRoute) {
            router.push({pathname: SignInRoute, query: {redirectTo: ProfileRoute}}, ProfileRoute).then();
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
