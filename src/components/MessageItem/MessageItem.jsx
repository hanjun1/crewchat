import React from "react";
import "./MessageItem.css";

function MessageItem({ myMessage, content, time, sender, senderIcon }) {
  return (
    <div
      className={`MessageItem ${myMessage ? "my-message" : "not-my-message"}`}
    >
      <div className="time">{time}</div>
      <div className="content">{content}</div>
      <div className="sender">{sender}</div>
      <div className="sender-icon">{senderIcon}</div>
    </div>
  );
}

export default MessageItem;
