import React from "react";
import "./EventsDetail.css";
import EventDetail from "../EventDetail/EventDetail";

function EventsDetail(props) {
  return (
    <div className="EventsDetail">
      <div className="events">
        <EventDetail name="Family BBQ WOOT!!" />
      </div>
      <div className="events">
        <EventDetail name="Family BBQ" />
      </div>
      <div className="events">
        <EventDetail name="Family BBQ" />
      </div>
      {/* {props.activeGroup.events.map((event) => (
        <EventDetail name="Family BBQ" />
      ))} */}
    </div>
  );
}

export default EventsDetail;
