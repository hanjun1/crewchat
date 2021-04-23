import React from "react";
import "./MessagesList.css";
import MessageItem from "../MessageItem/MessageItem";

const MessagesList = () => {
  return (
    <div className="MessagesList">
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
    </div>
  );
};

export default MessagesList;
