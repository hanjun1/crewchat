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
  updatePoll,
  totalPeople,
}) {
  const reduceNameLength = (name) => {
    name = name.split(".");
    let fileName =
      name[0].substring(0, 7) +
      "..." +
      name[0].substring(name[0].length - 3, name[0].length);
    return fileName + "." + name[1];
  };

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
              showGoing={true}
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
              totalPeople={totalPeople}
              groupId={groupId}
              updatePoll={updatePoll}
              showButton={true}
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
      ) : type === "image" ? (
        <>
          <div className="time">{time}</div>
          <div className="content">
            <img src={msg.image.imgFileURL}></img>
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
      ) : type === "file" ? (
        <>
          <div className="time">{time}</div>
          <div className="content">
            <div className="documents-container">
              <svg
                width="42"
                height="45"
                viewBox="0 0 42 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3636 15.4545V28C25.3636 30.4109 23.4109 32.3636 21 32.3636C18.5891 32.3636 16.6364 30.4109 16.6364 28V14.3636C16.6364 12.8582 17.8582 11.6364 19.3636 11.6364C20.8691 11.6364 22.0909 12.8582 22.0909 14.3636V25.8182C22.0909 26.4182 21.6 26.9091 21 26.9091C20.4 26.9091 19.9091 26.4182 19.9091 25.8182V15.4545H18.2727V25.8182C18.2727 27.3236 19.4945 28.5455 21 28.5455C22.5055 28.5455 23.7273 27.3236 23.7273 25.8182V14.3636C23.7273 11.9527 21.7745 10 19.3636 10C16.9527 10 15 11.9527 15 14.3636V28C15 31.3164 17.6836 34 21 34C24.3164 34 27 31.3164 27 28V15.4545H25.3636Z"
                  fill="black"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="41"
                  height="44"
                  rx="9.5"
                  stroke="black"
                />
              </svg>
              <div className="document-details-container">
                <a href={msg.file.fileURL}>
                  {msg.file.fileName.length > 20 ? (
                    <p className="file-name">
                      {reduceNameLength(msg.file.fileName)}
                    </p>
                  ) : (
                    <p className="file-name">{msg.file.fileName}</p>
                  )}

                  <p className="file-size">{`${
                    (msg.file.fileSize - (msg.file.fileSize % 1000)) / 1000
                  } KB`}</p>
                </a>
              </div>
            </div>
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
      ) : (
        <>
          <p>ur not supposed to see this</p>
        </>
      )}
    </div>
  );
}

export default MessageItem;
