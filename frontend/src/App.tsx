import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserCard, { UserCardProps } from "./components/UserCard";
import "./output.css";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
    const [user, setUser] = useState<UserCardProps | null>(null);
    const [balance, setBalance] = useState(0);

    const fetch = async (userId: string, groupId: string) => {
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
        fetch(userId, groupId);
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar username={user ? user.username : "?"} />
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
                <Footer />
            </div>
        </>
    );
}

export default App;
