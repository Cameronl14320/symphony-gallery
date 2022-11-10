import {useRouter} from "next/router";
import {useEffect} from "react";
import {firebaseAuth} from "../../config/firebase";
import {Root} from "../../config/routes";

export const SignOut = () => {
    const router = useRouter();

    useEffect(() => {
        firebaseAuth.signOut()
            .then(_ => {
                router.push(Root).then();
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
