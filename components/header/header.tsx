import Link from "next/link";
import styles from "./header.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { firebaseAuth } from "../../config/firebase";


export const Header = () => {
    const [triggerReload, setTriggerReload] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (triggerReload) {
            setTriggerReload(false);
            router.reload();
        }
    }, [triggerReload]);

    const handleSignOut = () => {
        firebaseAuth.signOut()
            .then(() => {
                setTriggerReload(true);
            })
            .catch((error) => {
                console.log(error.code + error.message);
            });
    }

    return (
        <div className={styles.container}>
            <ul className={styles.left}>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/browse"}>Browse</Link>
                </li>
                <li>
                    <div className={styles.search}>
                        Search
                        <Link href={"/browse"}>Find</Link>
                    </div>
                </li>
            </ul>
            <ul className={styles.right}>
                <div style={{display: !firebaseAuth.currentUser ? "block" : "none"}}>
                    <Link href={"/sign-in"}>Sign In</Link>
                </div>
                <div onClick={() => handleSignOut()} style={{display: !!firebaseAuth.currentUser ? "block" : "none"}}>Sign Out</div>
                <Link href={"/profile"}>Profile</Link>
            </ul>
        </div>
    );
}

export default Header;
