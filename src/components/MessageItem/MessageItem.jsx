import React from "react";
import "./MessageItem.css";

function MessageItem({ myMessage }) {
  return (
    <div
      className={`MessageItem ${myMessage ? "my-message" : "not-my-message"}`}
    ></div>
  );
}

export default MessageItem;
