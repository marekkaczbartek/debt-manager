import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import UserCard, { UserCardProps } from "./components/UserCard";
import axios from "axios";

function Home() {
    const [user, setUser] = useState<UserCardProps | null>(null);
    const [balance, setBalance] = useState(0);

    const fetchData = async (userId: string, groupId: string) => {
        try {
            const userRes = await axios.get(
                `http://localhost:5000/users/${userId}`
            );
            const balanceRes = await axios.get(
                `http://localhost:5000/users/${userId}/balance/${groupId}`
            );
            setUser(userRes.data);
            setBalance(balanceRes.data.balance);
        } catch (error) {
            console.error("Error fetching user: ", error);
        }
    };

    useEffect(() => {
        const userId = "1";
        const groupId = "1";
        fetchData(userId, groupId);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar username={user?.username} />
            <div className="flex-grow">
                {user ? (
                    <UserCard
                        id={user.id}
                        username={user.username}
                        email={user.email}
                        password={user.password}
                        balance={balance}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
