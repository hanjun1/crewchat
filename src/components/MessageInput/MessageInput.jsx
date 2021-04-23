import React from "react";
import "./MessageInput.css";

function MessageInput(props) {
  return (
    <div className="MessageInput">
      <input type="text" placeholder="type your message.." />
      <button>
        <span class="material-icons md-light">send</span>
      </button>
    </div>
  );
}

export default MessageInput;
