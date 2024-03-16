import React, { useContext, useState, useEffect, useRef } from "react";
import { MsgContext } from "../Context/msgcontext";
import Intraction from "../Components/Intraction";

import StartIntraction from "../Components/StartIntraction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { ThemeContext } from "../Context/themeContext";
import { AuthContext } from "../Context/AuthContext";

function Home() {
  const [message, setUserMessage] = useState("");
  const [botReply, setBotReply] = useState("");
  const [user, setuser] = useState(null);
  const { Msg, dispatch } = useContext(MsgContext);
  const mainAreaRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);
  const { loggedInUser } = useContext(AuthContext);

  //Style sheet for Dark Theme

  const styles = {
    Home: {
      backgroundColor: "#292c35",
    },

    input: {
      backgroundColor: "transparent",
      color: "white",
      border: "2px solid #ccc",
    },
    button: {
      backgroundColor: "transparent",
      border: "2px solid #ccc",
      color: "#ccc",
    },
  };

  useEffect(() => {
    // Scroll to the bottom when the main area is updated
    if (mainAreaRef.current) {
      mainAreaRef.current.scrollTop = mainAreaRef.current.scrollHeight;
    }
  }, [Msg, user, botReply]);

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      if (message === "") {
        return;
      }
      setBotReply("");
      setuser(message);
      const response = await fetch("http://localhost:4000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      let reply = data.reply;
      setBotReply(reply);

      dispatch({ type: "SETMSG", payload: { user: message, bot: reply } });
      setUserMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="Home" style={!isDarkTheme ? {} : styles.Home}>
      {Msg.length === 0 ? (
        /*  If user didnt communicated with the bot it will show this  */
        <div
          className="greeting"
          style={!isDarkTheme ? {} : { color: "white" }}
        >
          <img
            src="https://i.pinimg.com/564x/9a/ee/6f/9aee6f3669ba607a017378a522c72cae.jpg"
            alt="bot"
          />
          <h1>{`Hii ${loggedInUser.userName}, Let's Chat :)`}</h1>
        </div>
      ) : (
        <div
          className="main-area"
          ref={mainAreaRef}
          style={!isDarkTheme ? {} : { color: "white" }}
        >
          {Msg.slice(0, -1).map((M) => {
            return <Intraction key={M.id} data={M} />;
          })}
          {user && <StartIntraction me={user} bot={botReply} />}
        </div>
      )}

      <div className="inputQues">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleUserMessageChange}
          onKeyPress={handleKeyPress}
          style={!isDarkTheme ? {} : styles.input}
        />
        <button
          style={!isDarkTheme ? {} : styles.button}
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faArrowUp} size="xl" />
        </button>
      </div>
    </div>
  );
}

export default Home;
