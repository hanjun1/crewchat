import React from "react";
import "./DetailsOption.css";

function DetailsOption(props) {
  return (
    <div
      id={props.name}
      className="DetailsOption"
      onClick={props.handleOnClick}
    >
      <div className="details-container">
        <div className="icon-container">
          <svg
            width="55"
            height="52"
            viewBox="0 0 55 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="55" height="52" rx="15" fill="#DADEFF" />
          </svg>
        </div>
        <p>{props.name}</p>
      </div>
      <div className="more-info-container">
        <svg
          width="14"
          height="21"
          viewBox="0 0 14 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.66397 0L0 1.88L8.65317 8L0 14.12L2.66397 16L14 8L2.66397 0Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}

export default DetailsOption;
