import React from "react";
import MessageInput from "../MessageInput/MessageInput";
import MessagesList from "../MessagesList/MessagesList";

const MessagesPanel = () => {
  return (
    <div>
      <MessagesList />
      <MessageInput />
    </div>
  );
};

export default MessagesPanel;
