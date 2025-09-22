import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = () => {
    const { token, user } = useAuth();

    const isLoggedIn = user && token;

    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace/>
};

export default PrivateRoute;