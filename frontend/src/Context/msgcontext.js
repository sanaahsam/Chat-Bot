import React, { createContext, useReducer } from "react";

export const MsgContext = createContext();

export const reducerfunction = (state, action) => {
  switch (action.type) {
    case "GETMSG":
      return { Msg: action.payload };
    case "SETMSG":
      return { Msg: [...state.Msg, action.payload] };
    default:
      return state;
  }
};

export default function MsgContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerfunction, {
    Msg: [],
  });

  return (
    <MsgContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MsgContext.Provider>
  );
}
