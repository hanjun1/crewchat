import React, { useState, useEffect } from "react";
import "./PollsDetail.css";
import PollDetail from "../PollDetail/PollDetail";

function PollsDetail(props) {
  const [pollMsgs, setPollMsgs] = useState([]);

  async function fetchMessage() {
    try {
      let jwt = localStorage.getItem("token");
      const fetchResponse = await fetch(
        `/api/groups/${props.activeGroup._id}`,
        {
          headers: { Authorization: "Bearer " + jwt },
        }
      );
      let allMsgs = await fetchResponse.json();
      let polls = [];
      for (let i = 0; i < allMsgs.length; i++) {
        if (allMsgs[i].type === "poll") {
          polls.push(allMsgs[i]);
        }
      }
      setPollMsgs(polls);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, [pollMsgs]);

  return (
    <div className="PollsDetail">
      {pollMsgs.map((msg) => (
        <div className="poll-container">
          <PollDetail
            question={msg.poll.question}
            date={msg.createdAt}
            options={msg.poll.options}
            totalPeople={msg.poll.totalPeople}
            voters={msg.poll.options.voters}
            user={props.user}
            groupId={props.activeGroup._id}
            msgId={props.msgId}
            showButton={false}
          />
        </div>
      ))}
    </div>
  );
}

export default PollsDetail;
