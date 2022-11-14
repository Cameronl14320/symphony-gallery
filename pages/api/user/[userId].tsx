import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseDb } from "../../../config/firebase";
import { doc, getDoc, updateDoc, setDoc } from "@firebase/firestore";

const USER_COLLECTION_NAME = "users";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise<NextApiResponse>((resolve, reject) => {
        const requestBody = JSON.parse(req.body);
        if (!requestBody.userId) {
            res.status(404).json({ message: "Missing user id from request" });
            resolve(res);
        }

        if (req.method === "GET") { // Get User
            const document = doc(firebaseDb, USER_COLLECTION_NAME, requestBody.userId);
            getDoc(document)
                .then((data) => {
                    res.status(200).json(data.data());
                    resolve(res);
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                    resolve(res);
                });
        } else if (req.method === "POST") { // Create User
            const document = doc(firebaseDb, USER_COLLECTION_NAME, requestBody.userId);
            setDoc(document, requestBody)
                .then(() => {
                    res.status(200).json({ message: "User created successfully" });
                    resolve(res);
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                    resolve(res);
                });
        } else if (req.method === "PATCH") { // Update User
            const document = doc(firebaseDb, USER_COLLECTION_NAME, requestBody.userId);
            updateDoc(document, {})
                .then(() => {
                    res.status(200).json({ message: "User updated successfully" });
                    resolve(res);
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                    resolve(res);
                });
        } else {
            res.status(404).json({ message: 'Not found'});
            resolve(res);
        }
    });
}
