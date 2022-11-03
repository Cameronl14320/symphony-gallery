import Link from "next/link";
import styles from "./header.module.scss";
import { useState } from "react";
import { firebaseAuth } from "../../config/firebase";
import { onAuthStateChanged } from "@firebase/auth";


export const Header = () => {
    const [signedIn, setSignedIn] = useState(!!firebaseAuth.currentUser);

    onAuthStateChanged(firebaseAuth, (user) => {
       setSignedIn(!!user);
    });

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
                <div style={{display: signedIn ? "none" : "block"}}>
                    <Link href={"/sign-in"}>Sign In</Link>
                </div>
                <div onClick={() => firebaseAuth.signOut()} style={{display: signedIn ? "block" : "none"}}>Sign Out</div>
                <Link href={"/profile"}>Profile</Link>
            </ul>
        </div>
    );
}

export default Header;
