import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
const PublicRoute = () => {
    const auth = useAuth();

    return auth.isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
