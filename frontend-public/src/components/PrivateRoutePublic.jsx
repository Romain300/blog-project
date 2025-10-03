import { Navigate, Outlet } from "react-router-dom";
import { useAuthPublic } from "./UseAuthPublic";

const PrivateRoutePublic = () => {
    const { user, token } = useAuthPublic();

    const isLoggedIn = user && token;

    return isLoggedIn ? <Outlet/> : <Navigate to="/" replace/>;
};

export default PrivateRoutePublic;