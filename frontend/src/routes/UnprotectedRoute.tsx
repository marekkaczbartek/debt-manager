import NoAuthNavbar from "../register/NoAuthNavbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export const UnprotectedRoute = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NoAuthNavbar />
            <div className="flex-grow flex items-center justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
