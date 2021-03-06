import React, { useEffect, useRef } from "react";
import "./MessagesList.css";
import MessageItem from "../MessageItem/MessageItem";

function MessagesList({
  user,
  messages,
  setSocketMessages,
  fetchMessage,
  groupId,
  goingEvent,
  notGoingEvent,
  updatePoll,
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
  }, [messages]);

  return (
    <div className="MessagesList">
      {messages.map((msg) => (
        <MessageItem
          msg={msg}
          totalPeople={msg.poll.totalPeople}
          groupId={groupId}
          type={msg.type}
          key={msg._id}
          user={user}
          myMessage={
            msg.ownedByCurrentUser
              ? msg.ownedByCurrentUser
              : msg.sender._id === user._id
              ? true
              : false
          }
          time={formatTime(msg.createdAt)}
          sender={msg.sender.name}
          senderIcon={msg.sender.picture}
          fetchMessage={fetchMessage}
          goingEvent={goingEvent}
          notGoingEvent={notGoingEvent}
          updatePoll={updatePoll}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default MessagesList;
