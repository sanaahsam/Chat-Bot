import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLoginHook from "../Hooks/LoginHook";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const { login, error } = useLoginHook();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const details = { email, password };

    await login(details);
    setEmail("");

    setPassword("");
  };
  return (
    <div className="loginpage">
      <div className="login">
        <form onSubmit={handlesubmit}>
          <h1>Login</h1>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3>
            Don't have an account? <Link to="/signup">Signup</Link>
          </h3>
          <button>Login</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
