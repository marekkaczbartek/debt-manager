import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { interactive } from "@material-tailwind/react/types/components/popover";

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

const useUser = () => {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/users/current"
                );
                setUser(res.data);
            } catch (err) {
                throw new Error("Error fetching current user");
            }
        };
        fetchUser();
    }, []);

    return [user, setUser];
};

export default useUser;
