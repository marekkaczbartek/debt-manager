import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useToken = () => {
    const { token, setToken } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addToken = (token: string) => {
        setToken(token);
        setItem("token", token);
    };

    const removeToken = () => {
        setToken(null);
        setItem("user", "");
    };

    return { token, addToken, removeToken, setToken };
};
