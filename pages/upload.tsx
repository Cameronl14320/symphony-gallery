import { firebaseStorage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import React, {useState} from "react";

export const Upload = () => {
    const [uploaded, setUploaded] = useState<File[]>([]);
    const [error, setError] = useState<string>("");
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
                        if (!uploaded.some(image => image != file)) {
                            images.push(file);
                        } else {
                        images.push(file);
                            setError(`${file.name} was already uploaded`);
                        }
                    } else {
                        setError("Invalid file was uploaded");
                    }
                } else {
                    setError("File is not a valid image");
                }
            });
        }

        setUploaded(uploaded.concat(images));
    }

    const handleDragOverEvent = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const stomp: any[] = uploaded.map(file => (
        <div key={file.name}>
            <img id="test" src={URL.createObjectURL(file)} alt="testa" style={{objectFit: "contain"}}/>
        </div>
    ));

    return (
        <div>
            Upload something here
            <div style={{display: "flex", width: "500px", height: "500px", background: "gray"}} onDrop={(event) => handleDropEvent(event)} onDragOver={(event) => handleDragOverEvent(event)}>
                <div style={{display: "flex", background: "white", flex: "1 1", margin: "8px"}}>
                    {stomp}
                </div>
            </div>
            <div>
                {error}
            </div>
            <div>
            </div>
            
            <div>
                Upload images
            </div>
        </div>
    );
}

export default Upload;
