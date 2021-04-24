import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./MessagePage.css";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);

function MessagePage(props) {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setAllMessages((allMessages) => [...allMessages, message]);
    });
    return () => socket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      name: props.user.name,
      content: e.target.elements.msg.value,
    };
    e.target.elements.msg.value = "";
    socket.emit("chatMessage", msg);
  };

  return (
    <div>
      <div>YOU LOGGED IN WOOT!</div>
      <button onClick={() => props.handleLogout()}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input id="msg" type="text" required />
        <button>Send</button>
      </form>
      <div className="chat-log">
        {allMessages.map((message) => (
          <p>
            {message.name}: {message.content}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MessagePage;
