import React, { useEffect } from "react";
import "./MessagesList.css";
import MessageItem from "../MessageItem/MessageItem";

function MessagesList({ messages, user }) {
  if (messages === undefined) {
    messages = [];
  }

  function formatTime(timestamp) {
    let date = new Date(timestamp);
    let time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  }

  useEffect(() => {
    formatTime();
  }, []);

  return (
    <div className="MessagesList">
      {messages.map((msg) => (
        <MessageItem
          key={msg._id}
          content={msg.content}
          myMessage={msg.sender === user._id ? true : false}
          time={formatTime(msg.createdAt)}
          sender={msg.sender}
          senderIcon={<span className="material-icons">account_circle</span>}
        />
      ))}

      {/* DELETE LATER */}
      <MessageItem
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eaque."
        myMessage={false}
        time="10:20 pm"
        sender="Cindy Xu"
        senderIcon={<span className="material-icons">account_circle</span>}
      />
    </div>
  );
}

export default MessagesList;
