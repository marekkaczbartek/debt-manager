import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import RegisterForm from "./register/RegisterForm";
import Footer from "./components/Footer";
import RegisterNavbar from "./register/RegisterNavbar";
import { useEffect, useState } from "react";
import LoginForm from "./login/LoginForm";
import { User } from "../interfaces/User";
import { AuthProvider } from "./components/AuthProvider";
import { AuthContext } from "./AuthContext";
import { useAuth } from "./hooks/useAuth";

function App() {
    const { token, login, logout, setToken } = useAuth();
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                    <RegisterNavbar />
                    <div className="flex-grow flex items-center justify-center">
                        <Routes>
                            <Route
                                path="/home"
                                element={
                                    <Home
                                    // username={user?.username}
                                    // email={user?.email}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/register"
                                element={<RegisterForm />}
                            ></Route>
                            <Route
                                path="/login"
                                element={<LoginForm />}
                            ></Route>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
