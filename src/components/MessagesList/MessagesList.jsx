import React from "react";
import "./MessagesList.css";
import MessageItem from "../MessageItem/MessageItem";

function MessagesList(props) {
  return (
    <div className="MessagesList">
      <MessageItem myMessage={true} />
      <MessageItem myMessage={false} />
      <MessageItem myMessage={true} />
      <MessageItem myMessage={false} />
    </div>
  );
}

export default MessagesList;
