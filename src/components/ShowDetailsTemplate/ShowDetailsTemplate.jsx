import React from "react";
import "./ShowDetailsTemplate.css";
import ParticipantsDetail from "../ParticipantsDetail/ParticipantsDetail";

function ShowDetailsTemplate(props) {
  return (
    <div className="ShowDetailsTemplate">
      <div className="back-button-container">
        <svg
          onClick={() =>
            props.setShowDetails({
              all: true,
              detailCategory: "",
            })
          }
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
      <h1>{props.name}</h1>
      {props.name === "Participants" ? <ParticipantsDetail /> : <p>Test</p>}
    </div>
  );
}

export default ShowDetailsTemplate;
