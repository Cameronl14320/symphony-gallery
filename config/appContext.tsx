import {createContext, useContext} from "react";

export const AppContext = createContext({
    isLoggedIn: false
});

export const AppDispatchContext = createContext({});

export default function useAppContext() {
    return useContext(AppContext);
}
