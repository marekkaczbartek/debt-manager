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
    <nav className="border-gray-300 border-solid border-b px-8 py-4 font-body font-bold w-vw">
      <ul className="container flex justify-between items-center space-x-6">
        <li className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h1 className="text-xl mx-3">Debt Manager</h1>
        </li>
        {/* <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <button
            onClick={() => {
              setAccessToken(null);
            }}
          >
            Log Out
          </button>
        </li> */}
        <li className="flex items-center">
          <Link to="/home" className="mx-3 text-xl">
            Home
          </Link>
          <button
            onClick={() => {
              setAccessToken(null);
            }}
            className="mx-3 text-xl"
          >
            Log Out
          </button>
          <UserIcon username={username} className="mx-3 text-xl" />
        </li>
      </ul>
    </nav>
  );
};

export default AuthNavbar;
