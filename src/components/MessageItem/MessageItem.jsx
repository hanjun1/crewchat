import React from "react";
import EventDetail from "../EventDetail/EventDetail";
import "./MessageItem.css";

function MessageItem({ myMessage, msg, time, sender, senderIcon, type, user }) {
  return (
    <div
      className={`MessageItem ${myMessage ? "my-message" : "not-my-message"}`}
    >
      {type === "event" ? (
        <>
          <div className="time">{time}</div>
          <div className="content">
            <EventDetail
              msgId={msg._id}
              name={msg.event.name}
              date={msg.event.date}
              address={msg.event.address}
              attendees={msg.event.attendees}
              sender={sender}
              user={user}
            />
          </div>
          <div className="sender">{sender}</div>
          <div className="sender-icon">{senderIcon}</div>
        </>
      ) : (
        <>
          <div className="time">{time}</div>
          <div className="content">{msg.text.content}</div>
          <div className="sender">{sender}</div>
          <div className="sender-icon">{senderIcon}</div>
        </>
      )}
    </div>
  );
}

export default MessageItem;
