import React, { useState } from "react";
import "./PollDetailOption.css";

function PollDetailOption(props) {
  let width = `${(props.option.votes / props.totalPeople) * 100}%`;
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <div className="PollDetailOption">
      <div className="option-container">
        <div className="option-name-container">
          <p>{props.option.option}</p>
        </div>
        <div className="votes-container">
          <p>{props.option.voters.length} votes&ensp;</p>
          <div className="drop-down-container">
            {showMore ? (
              <svg
                onClick={() => handleShowMore()}
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.88 10L8 3.81916L14.12 10L16 8.09717L8 0L0 8.09717L1.88 10Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                onClick={() => handleShowMore()}
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
            )}
          </div>
        </div>
      </div>
      <div className="vote-bar">
        <div className="current-vote" style={{ width }}></div>
      </div>
      {showMore && (
        <div className="people-container">
          {props.voters.map((person) => (
            <div className="person-container">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z"
                  fill="black"
                />
              </svg>
              <div>
                <p>{person.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PollDetailOption;
