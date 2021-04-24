import React from "react";
import "./ParticipantDetail.css";

function ParticipantDetail(props) {
  return (
    <div className="ParticipantDetail">
      <div className="participant-container">
        {props.img ? (
          <img src={props.img} alt="IMG" />
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" fill="#6083FF" />
          </svg>
        )}
        {props.name}
      </div>
    </div>
  );
}

export default ParticipantDetail;
