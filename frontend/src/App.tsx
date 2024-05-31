import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import { User } from "../interfaces/User";

function App() {
    const [array, setArray] = useState<User[]>([]);
    const [count, setCount] = useState(0);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/users/");
        setArray(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button
                    onClick={() => {
                        setCount(count + 1);
                    }}
                >
                    count is {count}
                </button>
                <ul>
                    {array.map((user) => (
                        <li key={user.id}>{user.username} </li>
                    ))}
                </ul>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
