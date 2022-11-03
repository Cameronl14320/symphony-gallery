import { getAuth } from "@firebase/auth";

export const Browse = () => {
    const auth = getAuth();

    return (
        <div>
            Browse
        </div>
    )
}

export default Browse;
