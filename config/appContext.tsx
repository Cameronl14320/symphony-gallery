import {createContext, useContext} from "react";

export const AppContext = createContext({
    isLoggedIn: false
});

export const AppDispatchContext = createContext({});

export function useAppContext() {
    return useContext(AppContext);
}

export function useAppDispatchContext() {
    return useContext(AppDispatchContext);
}
