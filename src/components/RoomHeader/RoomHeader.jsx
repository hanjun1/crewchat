import React from "react";
import "./RoomHeader.css";

function RoomHeader(props) {
  return (
    <div className="RoomHeader">
      <svg
        width="119"
        height="114"
        viewBox="0 0 119 114"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="59.5" cy="57" rx="59.5" ry="57" fill="#A0A2BA" />
      </svg>
      <h1>{props.name}</h1>
      <div className="link-container">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#6083FF" />
          <path
            d="M15.5 12.5H12.5V15.5H11.5V12.5H8.5V11.5H11.5V8.5H12.5V11.5H15.5V12.5Z"
            fill="#FAFAFA"
          />
        </svg>
        Copy Link Invite
      </div>
    </div>
  );
}

export default RoomHeader;
