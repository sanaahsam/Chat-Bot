import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useLoginHook = () => {
  const [error, setError] = useState(null);
  const { AuthDispatch } = useContext(AuthContext);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        console.log(data.error);
        return;
      }
      localStorage.setItem("AI user", JSON.stringify(data));
      AuthDispatch({ type: "LOGIN", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  };
  return { login, error };
};

export default useLoginHook;
