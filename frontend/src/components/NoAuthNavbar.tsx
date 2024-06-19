import { Link } from "react-router-dom";

function RegisterNavbar() {
  return (
    <nav className="flex border-gray-300 border-solid border-b px-8 py-4 font-body font-bold h-16">
      <ul className="container flex justify-end items-center align-middle space-x-6">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default RegisterNavbar;
