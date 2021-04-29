import React from "react";
import EventDetail from "../EventDetail/EventDetail";
import PollDetail from "../PollDetail/PollDetail";
import "./MessageItem.css";

function MessageItem({
  myMessage,
  msg,
  time,
  sender,
  senderIcon,
  type,
  user,
  groupId,
  fetchMessage,
  goingEvent,
  notGoingEvent,
}) {
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
              groupId={groupId}
              fetchMessage={fetchMessage}
              goingEvent={goingEvent}
              notGoingEvent={notGoingEvent}
            />
          </div>
          <div className="sender">{sender}</div>
          {senderIcon === "" ? (
            <div className="sender-icon">
              <span className="material-icons">account_circle</span>
            </div>
          ) : (
            <div className="icon-container">
              <img src={senderIcon}></img>
            </div>
          )}
        </>
      ) : type === "text" ? (
        <>
          <div className="time">{time}</div>
          <div className="content">{msg.text.content}</div>
          <div className="sender">{sender}</div>
          {senderIcon === "" ? (
            <div className="sender-icon">
              <span className="material-icons">account_circle</span>
            </div>
          ) : (
            <div className="icon-container">
              <img src={senderIcon}></img>
            </div>
          )}
        </>
      ) : type === "poll" ? (
        <>
          <div className="time">{time}</div>
          <div className="content">
            <PollDetail
              msgId={msg._id}
              question={msg.poll.question}
              options={msg.poll.options}
              date={msg.createdAt}
              sender={sender}
              user={user}
              groupId={groupId}
            />
          </div>
          <div className="sender">{sender}</div>
          <div className="sender-icon">{senderIcon}</div>
        </>
      ) : (
        <>
          <p>ur not supposed to see this</p>
        </>
      )}
    </div>
  );
}

export default MessageItem;
