import React from "react";
import "./RoomHeader.css";
import { useMediaQuery } from "react-responsive";

function RoomHeader(props) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="RoomHeader">
      {isTablet && (
        <div className="back-arrow-container">
          <svg
            onClick={() => props.setShowChatDetails(!props.showChatDetails)}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6425 4.19252L10.725 2.27502L0 13L10.725 23.725L12.6425 21.8075L3.835 13L12.6425 4.19252Z"
              fill="black"
            />
          </svg>
        </div>
      )}
      {isMobile && (
        <div className="back-arrow-container">
          <svg
            onClick={() => props.setShowChatDetails(!props.showChatDetails)}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6425 4.19252L10.725 2.27502L0 13L10.725 23.725L12.6425 21.8075L3.835 13L12.6425 4.19252Z"
              fill="black"
            />
          </svg>
        </div>
      )}
      <div className="header-container">
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
              d="M14 6.5H8C7.45 6.5 7 6.95 7 7.5V14.5H8V7.5H14V6.5ZM13.5 8.5L16.5 11.5V16.5C16.5 17.05 16.05 17.5 15.5 17.5H9.995C9.445 17.5 9 17.05 9 16.5L9.005 9.5C9.005 8.95 9.45 8.5 10 8.5H13.5ZM13 12H15.75L13 9.25V12Z"
              fill="black"
            />
          </svg>
          Copy Link Invite
        </div>
      </div>
    </div>
  );
}

export default RoomHeader;
