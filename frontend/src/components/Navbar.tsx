// src/components/Navbar.js
const Navbar = () => {
    return (
        <nav className="border-black border-solid border-b-2 px-10 py-4 font-body font-bold">
            <ul className="container flex justify-end space-x-6">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;
