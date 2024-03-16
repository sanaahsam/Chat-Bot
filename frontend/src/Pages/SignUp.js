import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignupHook from "../Hooks/SignupHook";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const { signup, error } = useSignupHook();

  //handle submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("password do not match");
      return;
    }

    const data = { email, username, password, confirmpassword, gender };
    await signup(data);
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  //forgender
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="signuppage">
      <div className="signup">
        <form onSubmit={handlesubmit}>
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="gender">
            <label htmlFor="Gender">Choose your gender: </label>
            <div className="select">
              <select
                name="Gender"
                id="Gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <h3>
            Already have an account? <Link to="/login">Login</Link>
          </h3>
          <button>Signup</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
/*
{ fullname, username, confirmpassword, password, gender }
*/
