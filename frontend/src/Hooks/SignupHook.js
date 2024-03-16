import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useSignupHook = () => {
  const [error, setError] = useState(null);
  const { AuthDispatch } = useContext(AuthContext);

  const signup = async ({
    email,
    username,
    password,
    confirmpassword,
    gender,
  }) => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmpassword,
          gender,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem("AI user", JSON.stringify(data));
      AuthDispatch({ type: "LOGIN", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  };

  return { error, signup };
};

export default useSignupHook;
