import { createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;

