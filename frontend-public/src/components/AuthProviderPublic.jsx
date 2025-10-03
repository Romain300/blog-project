import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContextPublic = createContext();

const  AuthProviderPublic = ({ children }) => {
    const pathname = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }, [navigate]);

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch(error) {
            console.error("Error decoding token", error);
            return true;
        }
    };

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            alert('Your session has expired, please log in again.');
            logout();
        }
    }, [logout, token, pathname]);


    return (
        <AuthContextPublic.Provider value={{ user, token, login, logout }}>
            { children }
        </AuthContextPublic.Provider>
    )

};

export { AuthContextPublic };
export default AuthProviderPublic;