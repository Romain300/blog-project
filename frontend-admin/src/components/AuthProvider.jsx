import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext();
import * as jwtDecode from "jwt-decode";

const AuthProvider = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate('/');
    }, [navigate]);

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        }catch (error) {
            console.error("Error decoding token", error);
            return true;
        }
    };

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            alert('Your session has expired, please log in again.');
            logout();
        }
    }, [pathname, logout, token])

    
    
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;

//solve decoding token issue 