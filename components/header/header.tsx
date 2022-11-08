import Link from "next/link";
import styles from "./header.module.scss";
import { useState } from "react";
import { firebaseAuth } from "../../config/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { Browse, Profile, SignIn } from "../../config/routes";


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
                    <Link href={Browse}>Browse</Link>
                </li>
                <li>
                    <div className={styles.search}>
                        <input type={"string"} className={styles.searchBar}/>
                        <Link href={Browse}>Find</Link>
                    </div>
                </li>
            </ul>
            <ul className={styles.right}>
                <div style={{display: signedIn ? "none" : "block"}}>
                    <Link href={SignIn}>Sign In</Link>
                </div>
                <div onClick={() => firebaseAuth.signOut()} style={{display: signedIn ? "block" : "none"}}>Sign Out</div>
                <Link href={Profile}>Profile</Link>
            </ul>
        </div>
    );
}

export default Header;
