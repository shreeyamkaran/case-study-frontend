import ProtectedRoute from "@/components/custom/protected-route";
import Admin from "@/components/pages/admin";
import Home from "@/components/pages/home";
import Login from "@/components/pages/login";
import Manage from "@/components/pages/manage";
import Tasks from "@/components/pages/tasks";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path: "/tasks",
        element: (
            <ProtectedRoute>
                <Tasks />
            </ProtectedRoute>
        )
    },
    {
        path: "/manage",
        element: (
            <ProtectedRoute>
                <Manage />
            </ProtectedRoute>
        )
    },
    {
        path: "/admin",
        element: <Admin />
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;