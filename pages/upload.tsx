import { firebaseStorage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

export const Upload = () => {
    const storageRef = ref(firebaseStorage, 'some-child');

    return (
        <div>
            Upload something here

        </div>
    );
}

export default Upload;
