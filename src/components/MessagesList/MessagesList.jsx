import React, { useEffect, useRef } from "react";
import "./MessagesList.css";
import MessageItem from "../MessageItem/MessageItem";

function MessagesList({
  messages,
  user,
  socketMessages,
  setSocketMessages,
  fetchMessage,
  groupId,
  addMessage,
}) {
  if (messages === undefined) {
    messages = [];
  }

  const messagesEndRef = useRef(null);

  function formatTime(timestamp) {
    let date = new Date(timestamp);
    let time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  }

  useEffect(() => {
    formatTime();
  }, []);

  useEffect(() => {
    setSocketMessages([]);
    if (groupId !== undefined) {
      fetchMessage(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    };
    scrollToBottom();
  }, [messages, socketMessages]);

  return (
    <div className="MessagesList">
      {messages.map((msg) => (
        <MessageItem
          type={msg.type}
          key={msg._id}
          msg={msg}
          myMessage={msg.sender._id === user._id ? true : false}
          time={formatTime(msg.createdAt)}
          sender={msg.senderName}
          senderIcon={<span className="material-icons">account_circle</span>}
        />
      ))}
      {socketMessages.map((msg) => (
        <MessageItem
          type={msg.type}
          msg={msg}
          myMessage={msg.ownedByCurrentUser}
          time={formatTime(msg.time)}
          sender={msg.senderName}
          senderIcon={<span className="material-icons">account_circle</span>}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default MessagesList;
