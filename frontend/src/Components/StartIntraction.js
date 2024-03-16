import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const StartIntraction = (prop) => {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <div className="intraction">
      <div className="user">
        <img src={loggedInUser.Profilepic} alt="userpfp" />
        <div>
          <h3>{loggedInUser.userName}</h3>
          <p>{prop.me}</p>
        </div>
      </div>
      <div className="bot">
        <img
          src="https://i.pinimg.com/564x/9a/ee/6f/9aee6f3669ba607a017378a522c72cae.jpg"
          alt="bot"
        />
        <div className="typingeffect">
          <h3>Chat-Bot</h3>
          <p>{prop.bot}</p>
        </div>
      </div>
    </div>
  );
};

export default StartIntraction;
