import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { UnprotectedRoute } from "./UnprotectedRoute";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import GroupForm from "../forms/GroupForm";
import { User } from "../../interfaces/User";
import { useEffect, useState } from "react";
import axios from "axios";
import GroupDashboard from "../GroupDashboard";
import Dashboard from "../Dashboard";
import Home from "../Home";

const Routes = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/users/current");
        console.log(res.data);
        const { id, username, email } = res.data;
        const balance = await axios.get(
          `http://127.0.0.1:5000/api/users/${id}/balance`
        );

        setUser({
          id,
          username,
          email,
          balance: balance.data.balance,
        });
      } catch (err) {
        throw new Error("Error fetching current user");
      }
    };
    if (accessToken) fetchUser();
  }, [accessToken]);

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute {...user} />,
      children: [
        {
          path: "/home",
          element: <Home {...user} />,
        },
        {
          path: "/groups",
          element: <Dashboard {...user} />,
        },
        {
          path: "/groups/new",
          element: <GroupForm {...user} />,
        },
        {
          path: "/groups/:groupId",
          element: <GroupDashboard {...user} />,
        },
      ],
    },
  ];

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

  const router = createBrowserRouter([
    ...(!accessToken ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
