import React, { useState, useEffect } from "react";
import "./EventsDetail.css";
import EventDetail from "../EventDetail/EventDetail";

function EventsDetail(props) {
  const [eventMsgs, setEventMsgs] = useState([]);

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
      let events = [];
      for (let i = 0; i < allMsgs.length; i++) {
        if (allMsgs[i].type === "event") {
          events.push(allMsgs[i]);
        }
      }
      setEventMsgs(events);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="EventsDetail">
      {eventMsgs.map((msg) => (
        <div className="event-container">
          <EventDetail
            msgId={msg._id}
            name={msg.event.name}
            date={msg.event.date}
            address={msg.event.address}
            attendees={msg.event.attendees}
            user={props.user}
            groupId={props.activeGroup._id}
            showGoing={false}
          />
        </div>
      ))}
    </div>
  );
}

export default EventsDetail;
