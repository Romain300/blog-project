import { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContextPublic = createContext();


const  AuthProviderPublic = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", newUser);
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

    return (
        <AuthContextPublic.Provider value={{ user, token, login, logout }}>
            { children }
        </AuthContextPublic.Provider>
    )

};

export { AuthContextPublic };
export default AuthProviderPublic;