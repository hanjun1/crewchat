import React from "react";
import "./Messages.css";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";
import MessageHeader from "../../components/MessageHeader/MessageHeader";
import useChat from "../../utils/useChat";

function Messages({ setShowDetails, activeGroup, user, fetchOneGroup }) {
  const { messages, setMessages, sendMessage } = useChat(activeGroup._id, user);

  return (
    <div className="Messages">
      <MessageHeader
        setShowDetails={setShowDetails}
        groupName={activeGroup.name}
      />
      <MessagesList
        groupId={activeGroup._id}
        messages={activeGroup.textMsgs}
        user={user}
        socketMessages={messages}
        setSocketMessages={setMessages}
        fetchOneGroup={fetchOneGroup}
      />
      <MessageInput
        user={user}
        groupId={activeGroup._id}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Messages;
