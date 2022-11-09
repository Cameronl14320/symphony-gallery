import Link from "next/link";
import styles from "./header.module.scss";
import {useEffect, useState} from "react";
import { firebaseAuth } from "../../config/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { Browse, Profile, SignIn } from "../../config/routes";
import {useRouter} from "next/router";


export const Header = () => {
    const [signedIn, setSignedIn] = useState(!!firebaseAuth.currentUser);
    const [searchString, setSearchString] = useState<string>("");
    const router = useRouter();

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
                        <input type="search" value={searchString} onChange={e => setSearchString(e.target.value)}></input>
                        <Link href={{pathname: Browse, query: { searchString: searchString }}}>Find</Link>
                    </div>
                </li>
            </ul>
            <ul className={styles.right}>
                <div style={{display: signedIn || router.route === SignIn ? "none" : "block"}}>
                    <Link href={SignIn}>Sign In</Link>
                </div>
                <div onClick={() => firebaseAuth.signOut()} style={{display: signedIn ? "block" : "none"}}>Sign Out</div>
                <Link href={Profile}>Profile</Link>
            </ul>
        </div>
    );
}

export default Header;
