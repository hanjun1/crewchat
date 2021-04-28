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
              votes: 3,
              people: [
                {
                  name: "Ryan Kim",
                },
                {
                  name: "Bobert Smith",
                },
                {
                  name: "John Smith",
                },
              ],
            },
            {
              name: "No",
              votes: 1,
              people: [
                {
                  name: "Cindy Xu",
                },
              ],
            },
            {
              name: "Maybe",
              votes: 0,
              people: [],
            },
          ],
          totalPeople: 4,
        }}
      />
      <PollDetail
        poll={{
          name: "Is everyone free tmr?",
          date: "04/23/2021 - 11:30 AM",
          options: [
            {
              name: "Yes",
              votes: 3,
              people: [
                {
                  name: "Ryan Kim",
                },
                {
                  name: "Bobert Smith",
                },
                {
                  name: "John Smith",
                },
              ],
            },
            {
              name: "No",
              votes: 1,
              people: [
                {
                  name: "Cindy Xu",
                },
              ],
            },
            {
              name: "Maybe",
              votes: 0,
              people: [],
            },
          ],
          totalPeople: 4,
        }}
      />
      <PollDetail
        poll={{
          name: "Is everyone free tmr?",
          date: "04/23/2021 - 11:30 AM",
          options: [
            {
              name: "Yes",
              votes: 3,
              people: [
                {
                  name: "Ryan Kim",
                },
                {
                  name: "Bobert Smith",
                },
                {
                  name: "John Smith",
                },
              ],
            },
            {
              name: "No",
              votes: 1,
              people: [
                {
                  name: "Cindy Xu",
                },
              ],
            },
            {
              name: "Maybe",
              votes: 0,
              people: [],
            },
          ],
          totalPeople: 4,
        }}
      />
      {/* {props.activeGroup.polls.map((poll) => (
        <PollDetail
        poll={{
          name: "Is everyone free tmr?",
          date: "04/23/2021 - 11:30 AM",
          options: [
            {
              name: "Yes",
              votes: 3,
              people: [
                {
                  name: "Ryan Kim",
                },
                {
                  name: "Bobert Smith",
                },
                {
                  name: "John Smith",
                },
              ],
            },
            {
              name: "No",
              votes: 1,
              people: [
                {
                  name: "Cindy Xu",
                },
              ],
            },
            {
              name: "Maybe",
              votes: 0,
              people: [],
            },
          ],
          totalPeople: 4,
        }}
      />
      ))} */}
    </div>
  );
}

export default PollsDetail;
