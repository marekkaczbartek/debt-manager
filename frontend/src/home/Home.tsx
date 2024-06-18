import { User } from "../../interfaces/User";

function Home(user: User) {
    return (
        <div className="flex flex-col">
            <div className="flex-grow"></div>
            <h1>Hello, {user.username}</h1>
            <h2>Your balance: {user.balance}</h2>
        </div>
    );
}

export default Home;
