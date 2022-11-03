// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseDb } from "../../../config/firebase";
import {addDoc, collection, doc, getDoc, getDocs, updateDoc} from "@firebase/firestore";

const USER_COLLECTION_NAME = "users";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') { // Get User
        const document = doc(firebaseDb, USER_COLLECTION_NAME, req.body.userId);
        getDoc(document)
            .then((data) => {
                res.status(200).json(data.data());
            })
            .catch((error) => {
                res.status(error.code).json({ message: error.message });
            });
    } else if (req.method === 'POST') { // Create User
        const dbInstance = collection(firebaseDb, USER_COLLECTION_NAME);
        addDoc(dbInstance, req.body.user)
            .then(() => {
                res.status(200).json({ message: "User created successfully" });
            })
            .catch((error) => {
                res.status(error.code).json({ message: error.message });
            });
    } else if (req.method === 'PATCH') { // Update User
        const document = doc(firebaseDb, USER_COLLECTION_NAME, req.body.userId);
        updateDoc(document, {})
            .then(() => {
                res.status(200).json({ message: "User updated successfully" });
            })
            .catch((error) => {
                res.status(error.code).json({ message: error.message });
            });
    } else {
        res.status(404).json({ message: 'Not found'})
    }
}
