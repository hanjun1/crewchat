import React from "react";
import "./ParticipantsDetail.css";
import ParticipantDetail from "../ParticipantDetail/ParticipantDetail";

function ParticipantsDetail(props) {
  return (
    <div className="ParticipantsDetail">
      {props.activeGroup.members.map((member) => (
        <ParticipantDetail key={member._id} name={member.name} />
      ))}
    </div>
  );
}

export default ParticipantsDetail;
