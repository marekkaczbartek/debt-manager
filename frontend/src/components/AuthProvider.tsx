import axios from "axios";

import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";

const AuthContext = createContext(undefined);

const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within a provider");
    }

    return authContext;
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/users/current`
                );
                setToken(res.data.token);
                // setBalance(balanceRes.data.balance);
            } catch (error) {
                setToken(null);
            }
        };
        fetchData();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = axios.interceptors.request.use((config) => {
            config.headers.Authorization = token
                ? `Bearer ${token}`
                : config.headers.Authorization;
            return config;
        });
        return () => {
            axios.interceptors.request.eject(authInterceptor);
        };
    });

    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
