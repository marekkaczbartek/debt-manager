import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./Home";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";
import useUser from "./useUser";

const Routes = () => {
    const { token } = useAuth();
    const [user, setUser] = useUser();

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/home",
                    element: <Home {...user} />,
                },
                {
                    path: "/logout",
                    element: <div>Logout</div>,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <LoginForm />,
        },
        {
            path: "/register",
            element: <RegisterForm />,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;
