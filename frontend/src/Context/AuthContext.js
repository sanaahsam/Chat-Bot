import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export function AuthFunction(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { loggedInUser: action.payload };
    }

    case "LOGOUT": {
      return { loggedInUser: null };
    }

    default:
      return state;
  }
}

export default function AuthContextProvider({ children }) {
  const [state, AuthDispatch] = useReducer(AuthFunction, {
    loggedInUser: null,
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("AI user"));
    if (users) {
      AuthDispatch({ type: "LOGIN", payload: users });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, AuthDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
