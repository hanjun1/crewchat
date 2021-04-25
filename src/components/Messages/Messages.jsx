import React from "react";
import "./Messages.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";

function Messages() {
  return (
    <div className="Messages">
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default Messages;
