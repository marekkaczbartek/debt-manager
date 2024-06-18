import NoAuthNavbar from "../components/NoAuthNavbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export const UnprotectedRoute = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NoAuthNavbar />
            <Outlet />
            <Footer />
        </div>
    );
};
