import UserCard from "./components/UserCard";
import { User } from "../interfaces/User";
import { useNavigate } from "react-router-dom";

function Home(user?: User) {
    const navigate = useNavigate();
    if (!user?.username || !user.email) navigate("/login");
    return (
        <div className="flex flex-col">
            <div className="flex-grow">
                {user ? (
                    <UserCard
                        username={user.username}
                        email={user.email}
                        balance={100}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
