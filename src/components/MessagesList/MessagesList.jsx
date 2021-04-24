import React from "react";
import "./MessagesList.css";
import MessageItem from "../MessageItem/MessageItem";

function MessagesList(props) {
  return (
    <div className="MessagesList">
      {/* PROPS for message items must have the following naming convention: */}
      <MessageItem
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eaque."
        myMessage={false}
        time="10:20 pm"
        sender="Cindy Xu"
        senderIcon={<span class="material-icons">account_circle</span>}
      />
      <MessageItem
        myMessage={true}
        time="10:20 pm"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eaque."
        sender="Cindy Xu"
        senderIcon={<span class="material-icons">account_circle</span>}
      />
      <MessageItem
        content="Lorem"
        myMessage={false}
        time="10:20 pm"
        sender="Cindy Xu"
        senderIcon={<span class="material-icons">account_circle</span>}
      />
      <MessageItem
        content="lorem"
        myMessage={true}
        time="10:20 pm"
        sender="Cindy Xu"
        senderIcon={<span class="material-icons">account_circle</span>}
      />
    </div>
  );
}

export default MessagesList;
