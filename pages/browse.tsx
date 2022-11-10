import {useRouter} from "next/router";

export const Browse = () => {
    const router = useRouter();

    const searchString = router.query.searchString as string;

    if (!!searchString) {
        return (
          <div>
              Browsing for {searchString}
          </div>
        );
    }

    return (
        <div>
            Browse in general
        </div>
    )
}

export default Browse;
