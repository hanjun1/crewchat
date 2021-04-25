import React from "react";
import "./PollDetail.css";
import PollDetailOption from "../PollDetailOption/PollDetailOption";

function PollDetail(props) {
  return (
    <div className="PollDetail">
      <p className="poll-title">{props.poll.name}</p>
      <p className="poll-date">Created: {props.poll.date}</p>
      {props.poll.options.map((option) => (
        <PollDetailOption
          option={option}
          totalPeople={props.poll.totalPeople}
          people={option.people}
        />
      ))}
    </div>
  );
}

export default PollDetail;
