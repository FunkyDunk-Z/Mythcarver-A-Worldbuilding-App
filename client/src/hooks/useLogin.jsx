import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/v1/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const user = response.data.data.user;

        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: user });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
