import React from "react";
import "./PollsDetail.css";
import PollDetail from "../PollDetail/PollDetail";

function PollsDetail(props) {
  return (
    <div className="PollsDetail">
      <PollDetail
        poll={{
          name: "Is everyone free tmr?",
          date: "04/23/2021 - 11:30 AM",
          options: [
            {
              name: "Yes",
              votes: 5,
            },
            {
              name: "No",
              votes: 3,
            },
            {
              name: "Maybe",
              votes: 2,
            },
          ],
          totalPeople: 10,
        }}
      />
    </div>
  );
}

export default PollsDetail;
