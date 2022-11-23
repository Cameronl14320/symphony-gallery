import { firebaseStorage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import React, {useState} from "react";

export const Upload = () => {
    const [uploaded, setUploaded] = useState<File[]>([]);
    const storageRef = ref(firebaseStorage, 'some-child');

    const handleDropEvent = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const items = Array.from(event.dataTransfer.items);
        const images: File[] = [];
        if (items) {
            items.forEach((item, index) => {
                if (item.kind === 'file' && item.type.match('^image/')) {
                    const file = item.getAsFile();
                    if (!!file) {
                        images.push(file);
                    }
                }
            });
        }

        setUploaded(images);
    }

    const handleDragOverEvent = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    return (
        <div>
            Upload something here
            <div style={{width: "500px", height: "500px", background: "black"}} onDrop={(event) => handleDropEvent(event)} onDragOver={(event) => handleDragOverEvent(event)}>

            </div>
        </div>
    );
}

export default Upload;
