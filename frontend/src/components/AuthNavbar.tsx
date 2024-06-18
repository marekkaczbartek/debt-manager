import React from "react";
import UserIcon from "./UserIcon";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export interface NavbarProps {
    username?: string;
}

// src/components/Navbar.js
const AuthNavbar: React.FC<NavbarProps> = ({ username }) => {
    const { setAccessToken } = useAuth();
    return (
        <nav className="border-gray-300 border-solid border-b px-8 py-4 font-body font-bold">
            <ul className="container flex justify-end items-center space-x-6">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/groups/new">Create Group</Link>
                </li>
                <li>
                    <button
                        onClick={() => {
                            setAccessToken(null);
                        }}
                    >
                        Log Out
                    </button>
                </li>
                <li>
                    <UserIcon username={username} />
                </li>
            </ul>
        </nav>
    );
};

export default AuthNavbar;
