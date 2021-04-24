import React from "react";
import "./PollDetailOption.css";

function PollDetailOption(props) {
  let width = `${(props.option.votes / props.totalPeople) * 100}%`;

  return (
    <div className="PollDetailOption">
      <div className="option-container">
        <div className="option-name-container">
          <p>{props.option.name}</p>
        </div>
        <div className="votes-container">
          <p>{props.option.votes} votes&ensp;</p>
          <div className="drop-down-container">
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.12 0L8 6.18084L1.88 0L0 1.90283L8 10L16 1.90283L14.12 0Z"
                fill="#56597B"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="vote-bar">
        <div className="current-vote" style={{ width }}></div>
      </div>
    </div>
  );
}

export default PollDetailOption;
