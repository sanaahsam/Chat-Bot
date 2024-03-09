import React, { useContext, useState } from "react";
import { MsgContext } from "../src/Context/msgcontext";
import Intraction from "./Components/Intraction";
import "./App.css";

function App() {
  const [message, setUserMessage] = useState("");
  const [botReply, setBotReply] = useState("");
  const [user, setuser] = useState("");
  const { Msg, dispatch } = useContext(MsgContext);

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
      setuser("");
      dispatch({ type: "SETMSG", payload: { user: message, bot: reply } });
      setUserMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Digital Aries</h1>
      </div>

      <div className="main-area">
        <p>User: {user}</p>
        <p>Bot: {botReply}</p>
        {Msg.map((M) => {
          return <Intraction data={M} />;
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleUserMessageChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
