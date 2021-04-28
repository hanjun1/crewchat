import React from "react";
import EventDetail from "../EventDetail/EventDetail";
import "./MessageItem.css";

function MessageItem({ myMessage, content, time, sender, senderIcon, type }) {
  return (
    <div
      className={`MessageItem ${myMessage ? "my-message" : "not-my-message"}`}
    >
      {type === "event" ? (
        <>
          <div className="time">{time}</div>
          <div className="content">
            <EventDetail
              name={content.name}
              date={content.date}
              address={content.address}
            />
          </div>
          <div className="sender">{sender}</div>
          <div className="sender-icon">{senderIcon}</div>
        </>
      ) : (
        <>
          <div className="time">{time}</div>
          <div className="content">{content}</div>
          <div className="sender">{sender}</div>
          <div className="sender-icon">{senderIcon}</div>
        </>
      )}
    </div>
  );
}

export default MessageItem;
