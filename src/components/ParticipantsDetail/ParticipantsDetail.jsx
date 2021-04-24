import React from "react";
import "./ParticipantsDetail.css";
import ParticipantDetail from "../ParticipantDetail/ParticipantDetail";

function ParticipantsDetail(props) {
  return (
    <div className="ParticipantsDetail">
      <ParticipantDetail name="Bob Smith" />
      <ParticipantDetail name="Sarah Smith" />
      <ParticipantDetail name="Emily Smith" />
      <ParticipantDetail name="Bobert Smith" />
    </div>
  );
}

export default ParticipantsDetail;
