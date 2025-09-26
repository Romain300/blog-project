import { AuthContextPublic } from "./AuthProviderPublic";
import { useContext } from "react";

export const useAuthPublic = () => {
    return useContext(AuthContextPublic);
};