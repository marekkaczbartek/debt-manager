import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./register/Register";
import Footer from "./components/Footer";
import RegisterNavbar from "./register/RegisterNavbar";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const getNavbar = () => (isLoggedIn ? <Navbar /> : <RegisterNavbar />);

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                {getNavbar()}
                <div className="flex-grow flex items-center justify-center">
                    <Routes>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
