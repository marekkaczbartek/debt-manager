import React from "react";
import UserIcon from "./UserIcon";
import { useAuth } from "../AuthContext";

export interface NavbarProps {
    username?: string;
}

// src/components/Navbar.js
const Navbar: React.FC<NavbarProps> = ({ username }) => {
    const { setToken } = useAuth();
    return (
        <nav className="border-gray-300 border-solid border-b px-8 py-4 font-body font-bold">
            <ul className="container flex justify-end items-center space-x-6">
                {/* <li>Home</li>
                <li>About</li>
                <li>Services</li> */}
                <li>
                    <button
                        onClick={() => {
                            setToken(null);
                        }}
                    >
                        Logout
                    </button>
                </li>
                <li>
                    <UserIcon username={username} />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
