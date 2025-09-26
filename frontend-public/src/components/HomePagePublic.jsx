import LogFormPublic from "./LogFormPublic";
import { useAuthPublic } from "./UseAuthPublic";
import DashboardPublic from "./DashboardPublic";

function HomepagePublic() {
    const { token, user } = useAuthPublic();

    return (token && user) ? <DashboardPublic /> : <LogFormPublic/>
}

export default HomepagePublic;