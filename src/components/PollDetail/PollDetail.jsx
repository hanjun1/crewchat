import React from "react";
import "./PollDetail.css";
import PollDetailOption from "../PollDetailOption/PollDetailOption";

function PollDetail(props) {
  function formatTime(timestamp) {
    let date = new Date(timestamp);
    let time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    date = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return date + " - " + time;
  }

  return (
    <div className="PollDetail">
      <p className="poll-title">{props.question}</p>
      <p className="poll-date">Created on: {formatTime(props.date)}</p>
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
          showButton={props.showButton}
        />
      ))}
    </div>
  );
}

export default PollDetail;
