import React from "react";
import "./MessagesPage.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";

function MessagesPage(props) {
  return (
    <div className="MessagesPage">
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default MessagesPage;
