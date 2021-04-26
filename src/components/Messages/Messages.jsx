import React from "react";
import "./Messages.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";
import MessageHeader from "../../components/MessageHeader/MessageHeader";

function Messages(props) {
  return (
    <div className="Messages">
      <MessageHeader setShowDetails={props.setShowDetails} />
      <MessagesList />
      <MessageInput user={props.user} />
    </div>
  );
}

export default Messages;
