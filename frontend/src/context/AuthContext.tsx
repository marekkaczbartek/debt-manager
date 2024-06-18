import axios from "axios";
import React, {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";

export const AuthContext = createContext<{
    accessToken: string | null;
    setAccessToken: (newToken: string | null) => void;
}>({
    accessToken: null,
    setAccessToken: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken_] = useState(
        localStorage.getItem("accessToken")
    );

    const setAccessToken = (newToken: string | null) => {
        setAccessToken_(newToken);
    };

    useLayoutEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + accessToken;
            localStorage.setItem("accessToken", accessToken);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("accessToken");
        }
    }, [accessToken]);

    const contextValue = useMemo(
        () => ({
            accessToken,
            setAccessToken,
        }),
        [accessToken]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return auth;
};
