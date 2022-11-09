import {useRouter} from "next/router";
import {useEffect} from "react";
import {firebaseAuth} from "../../config/firebase";

export const SignOut = () => {
    const router = useRouter();

    useEffect(() => {
        firebaseAuth.signOut()
            .then(_ => {
                router.back();
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            Signing Out
        </div>
    )
}

export default SignOut;
