import React from "react";
import "./Messages.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";
import MessageHeader from "../../components/MessageHeader/MessageHeader";

function Messages({ setShowDetails, activeGroup, user }) {
  return (
    <div className="Messages">
      <MessageHeader
        setShowDetails={setShowDetails}
        groupName={activeGroup.name}
      />
      <MessagesList messages={activeGroup.textMsgs} user={user} />
      <MessageInput />
    </div>
  );
}

export default Messages;
