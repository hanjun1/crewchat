import React, { useState } from "react";
import "./MessageInput.css";

function MessageInput(props) {
  const [content, setContent] = useState("");

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    let jwt = localStorage.getItem("token");
    let body = {
      sender: props.user._id,
      senderName: props.user.name,
      content: content,
    };
    setContent("");
    props.sendMessage(content);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(body),
    };
    // CHANGE ADDRESS TO DYNAMIC ID
    const response = await fetch(`/api/messages/${props.groupId}`, options);
    await response.json();
  };

  return (
    <div className="MessageInput">
      <form onSubmit={(e) => handleSubmitMessage(e)}>
        <input
          type="text"
          placeholder="type your message.."
          onChange={(e) => handleChangeContent(e)}
          value={content}
        />
        <button>
          <span className="material-icons md-light">send</span>
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
