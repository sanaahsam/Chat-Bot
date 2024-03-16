import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Context/themeContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);
  const { loggedInUser, AuthDispatch } = useContext(AuthContext);

  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
    console.log(isDarkTheme);
  };

  //logout button
  const logoutUser = async () => {
    const res = await fetch("http://localhost:4000/logout");
    console.log(res);

    localStorage.removeItem("AI user");
    AuthDispatch({ type: "LOGOUT" });
  };

  return (
    <header
      style={
        !isDarkTheme
          ? {
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }
          : {
              backgroundColor: "#f1f1f1",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }
      }
    >
      <div className="logo">
        <Link to={"/"}>
          <h1>Digital Aries</h1>
        </Link>
        {!loggedInUser && (
          <div className="AuthOption">
            <a href="/login">Login</a>
            <a href="/signup">SignUp</a>
          </div>
        )}
        {loggedInUser && (
          <div className="otherOption">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={toggleTheme}
              checked={isDarkTheme}
            />
            <label htmlFor="checkbox" class="checkbox-label">
              <FontAwesomeIcon
                icon={faSun}
                style={{ color: "#FFD43B" }}
                size="xl"
              />
              <FontAwesomeIcon
                icon={faMoon}
                style={{ color: "#ffffff" }}
                size="xl"
              />
              <span class="ball"></span>
            </label>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
