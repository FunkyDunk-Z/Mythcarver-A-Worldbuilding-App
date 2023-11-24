import { useState } from "react";
import axios from "axios";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState("");

  const forgotPassword = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/v1/users/forgot-password", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const message = response.data.message;
        setMessage(message);
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

  return { forgotPassword, isLoading, error, message };
};
