import { createContext, useContext } from "react";

const AuthContext = createContext<string | undefined>(undefined);

export function useAuthContext() {
    const token = useContext(AuthContext);

    if (token === undefined || token === "") {
        throw new Error("useAuthContext must be used within an AuthContext");
    }

    return token;
}
