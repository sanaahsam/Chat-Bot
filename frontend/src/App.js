import React, { useContext } from "react";
import Home from "./Pages/Home";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={loggedInUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!loggedInUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!loggedInUser ? <Signup /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
