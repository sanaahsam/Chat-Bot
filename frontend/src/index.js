import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import MsgContextProvider from "../src/Context/msgcontext";
import ThemeContextProvider from "./Context/themeContext";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ThemeContextProvider>
          <MsgContextProvider>
            <App />
          </MsgContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
