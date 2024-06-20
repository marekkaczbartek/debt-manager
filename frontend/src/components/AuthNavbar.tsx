import React from "react";
import UserIcon from "./UserIcon";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DropdownModal from "./DropdownModal";

export interface NavbarProps {
  username?: string;
}

// src/components/Navbar.js
const AuthNavbar: React.FC<NavbarProps> = ({ username }) => {
  const { setAccessToken } = useAuth();
  const [isDropdown, setIsDropdown] = React.useState(false);
  return (
    <div>
      <nav className="border-gray-300 border-solid border-b px-8 py-4 font-body font-bold w-vw">
        <ul className="container flex justify-between items-center space-x-6">
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h1 className="text-xl mx-3">Debt Manager</h1>
          </li>
          <li className="flex items-center">
            <button onClick={() => setIsDropdown(true)}>
              <UserIcon username={username} className="mx-3 text-2xl z-101" />
            </button>
          </li>
        </ul>
      </nav>
      <DropdownModal
        onClose={() => setIsDropdown(false)}
        open={isDropdown}
        className=""
        username={username}
      >
        {/* Dropdown menu */}
        <ul className="text-center font-bold">
          <li className="py-2 px-4 hover:opacity-50 cursor-pointer">
            <button onClick={() => setIsDropdown(false)}>
              <Link to="/">Home</Link>
            </button>
          </li>
          <li className="py-2 px-4 hover:opacity-50 cursor-pointer">
            <button onClick={() => setIsDropdown(false)}>
              <Link to="/groups">Groups</Link>
            </button>
          </li>
          <li className="py-2 px-4 text-red-500 hover:opacity-50 cursor-pointer">
            <button
              onClick={() => {
                setAccessToken(null);
                // console.log("Logout");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </DropdownModal>
    </div>
  );
};

export default AuthNavbar;
