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
          people={option.voters}
        />
      ))}
    </div>
  );
}

export default PollDetail;
