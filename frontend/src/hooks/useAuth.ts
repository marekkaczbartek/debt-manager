import { useEffect } from "react";
import { useToken } from "./useToken";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    // we can re export the user methods or object from this hook
    const { token, addToken, removeToken, setToken } = useToken();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const token = getItem("token");
        if (token) {
            addToken(JSON.parse(token));
        }
    }, [addToken, getItem]);

    const login = (email: string, password) => {
        addToken(token);
    };

    const logout = () => {
        removeToken();
    };

    return { token, login, logout, setToken };
};
