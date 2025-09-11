import LogForm from "./logForm";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";

function Homepage() {
   
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleTokenChange = () => {
            setToken(localStorage.getItem("token"));
        };

    useEffect(() => {
        

        window.addEventListener("storage", handleTokenChange);

        return () => {
            window.removeEventListener("storage", handleTokenChange)
        }

    }, [token]);

    return token ? <Dashboard token={token}/> : <LogForm />;
}

export default Homepage;

//Use context