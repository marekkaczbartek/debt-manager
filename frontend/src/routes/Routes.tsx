import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { UnprotectedRoute } from "./UnprotectedRoute";
import Home from "../home/Home";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import GroupForm from "../forms/GroupForm";
import { User } from "../../interfaces/User";
import { useEffect, useState } from "react";
import axios from "axios";
import GroupDashboard from "../GroupDashboard";
import AddUserForm from "../forms/AddUserForm";

const Routes = () => {
    const { accessToken } = useAuth();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:5000/api/users/current"
                );
                const { id, username, email, password } = res.data;
                const balance = await axios.get(
                    `http://127.0.0.1:5000/api/users/${id}/balance`
                );

                setUser({
                    id,
                    username,
                    email,
                    password,
                    balance: balance.data.balance,
                });
            } catch (err) {
                throw new Error("Error fetching current user");
            }
        };
        fetchUser();
    }, [accessToken]);

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute {...user} />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/home",
                    element: <Home {...user} />,
                },
                {
                    path: "/groups/new",
                    element: <GroupForm {...user} />,
                },
                {
                    path: "/groups/:groupId",
                    element: <GroupDashboard {...user} />,
                },
                {
                    path: "/groups/:groupId/add/user",
                    element: <AddUserForm {...user} />,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <UnprotectedRoute />,
            children: [
                {
                    path: "/login",
                    element: <LoginForm />,
                },
                {
                    path: "/register",
                    element: <RegisterForm />,
                },
            ],
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...(!accessToken ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;
