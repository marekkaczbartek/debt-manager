import UserIcon from "../components/UserIcon";

function RegisterNavbar() {
    return (
        <nav className="border-gray-300 border-solid border-b px-8 py-4 font-body font-bold">
            <ul className="container flex justify-end items-center space-x-6">
                <li>
                    <button>Register</button>
                </li>
                <li>
                    <button>Login</button>
                </li>
                <li>
                    <UserIcon />
                </li>
            </ul>
        </nav>
    );
}

export default RegisterNavbar;
