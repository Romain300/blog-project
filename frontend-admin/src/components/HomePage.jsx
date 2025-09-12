import LogForm from "./logForm";
import Dashboard from "./Dashboard";
import { useAuth } from "./useAuth";

function Homepage() {
    const auth = useAuth();
    return auth.token ? <Dashboard/> : <LogForm />;
}

export default Homepage;
