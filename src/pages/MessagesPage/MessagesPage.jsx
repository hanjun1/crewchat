import React from "react";
import "./MessagesPage.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";

const MessagesPage = () => {
  return (
    <div className="MessagesPage">
      <MessagesList />
      <MessageInput />
    </div>
  );
};

export default MessagesPage;
