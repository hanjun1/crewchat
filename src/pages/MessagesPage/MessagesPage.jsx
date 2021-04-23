import React from "react";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesList from "../../components/MessagesList/MessagesList";

const MessagesPage = () => {
  return (
    <div>
      <MessagesList />
      <MessageInput />
    </div>
  );
};

export default MessagesPage;
