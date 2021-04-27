import React from "react";
import "./EventsDetail.css";
import EventDetail from "../EventDetail/EventDetail";

function EventsDetail(props) {
  return (
    <div className="EventsDetail">
      <EventDetail name="Family BBQ WOOT!!" />
      <EventDetail name="Family BBQ" />
      <EventDetail name="Family BBQ" />
      {/* {props.activeGroup.events.map((event) => (
        <EventDetail name="Family BBQ" />
      ))} */}
    </div>
  );
}

export default EventsDetail;
