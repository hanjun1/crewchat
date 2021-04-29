import React from "react";
import "./PollDetail.css";
import PollDetailOption from "../PollDetailOption/PollDetailOption";

function PollDetail(props) {
  return (
    <div className="PollDetail">
      <p className="poll-title">{props.question}</p>
      <p className="poll-date">Created: {props.date}</p>
      {props.options.map((option) => (
        <PollDetailOption
          option={option}
          totalPeople={props.totalPeople}
          voters={option.voters}
          user={props.user}
          groupId={props.groupId}
          msgId={props.msgId}
          optionId={option._id}
          updatePoll={props.updatePoll}
        />
      ))}
    </div>
  );
}

export default PollDetail;
