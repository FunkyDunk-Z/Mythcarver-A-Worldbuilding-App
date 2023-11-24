import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout");

      if (response.status === 200) {
        localStorage.removeItem("user");

        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
