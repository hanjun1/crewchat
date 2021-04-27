import React from "react";
import "./ShowDetailsTemplate.css";
import ParticipantsDetail from "../ParticipantsDetail/ParticipantsDetail";
import PhotosDetail from "../PhotosDetail/PhotosDetail";
import DocumentsDetail from "../DocumentsDetail/DocumentsDetail";
import EventsDetail from "../EventsDetail/EventsDetail";
import PollsDetail from "../PollsDetail/PollsDetail";

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
      {props.name === "Participants" ? (
        <ParticipantsDetail activeGroup={props.activeGroup}/>
      ) : props.name === "Photos" ? (
        <PhotosDetail activeGroup={props.activeGroup} />
      ) : props.name === "Documents" ? (
        <DocumentsDetail activeGroup={props.activeGroup} />
      ) : props.name === "Events" ? (
        <EventsDetail activeGroup={props.activeGroup} />
      ) : props.name === "Polls" ? (
        <PollsDetail activeGroup={props.activeGroup} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ShowDetailsTemplate;
