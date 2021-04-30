import React from "react";
import "./DetailsOption.css";
import DetailsOptionIcon from "../DetailsOptionIcon/DetailsOptionIcon";

function DetailsOption(props) {
  return (
    <div
      id={props.name}
      className="DetailsOption"
      onClick={props.handleOnClick}
    >
      <div className="details-container">
        <div className="icon-container">
          <DetailsOptionIcon name={props.name} />
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
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

export default DetailsOption;
