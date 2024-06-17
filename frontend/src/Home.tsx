import UserCard from "./components/UserCard";
import { User } from "../interfaces/User";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Home(user?: User) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar username={user?.username} />
            <div className="flex-grow flex items-center justify-center">
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
            </div>
            <Footer />
        </div>
    );
}

export default Home;
