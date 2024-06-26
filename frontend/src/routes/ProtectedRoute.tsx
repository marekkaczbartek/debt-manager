import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "../../interfaces/User";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";

export const ProtectedRoute = (user: User) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar username={user.username} />
      <div className="flex flex-grow justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
