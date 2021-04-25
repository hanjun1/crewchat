import React from "react";
import "./Messages.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";
import MessageHeader from "../../components/MessageHeader/MessageHeader";

function Messages() {
  return (
    <div className="Messages">
      <MessageHeader />
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default Messages;
