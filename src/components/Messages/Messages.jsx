import React from "react";
import "./Messages.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";
import MessageHeader from "../../components/MessageHeader/MessageHeader";

function Messages({ setShowDetails }) {
  return (
    <div className="Messages">
      <MessageHeader setShowDetails={setShowDetails} />
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default Messages;
