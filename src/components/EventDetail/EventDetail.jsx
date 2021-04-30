import React, { useState, useEffect } from "react";
import "./EventDetail.css";

function EventDetail(props) {
  const [showMore, setShowMore] = useState(false);
  const [going, setGoing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleGoing = async (e) => {
    e.preventDefault();
    setGoing(!going);
    setLoading(true);
    try {
      let jwt = localStorage.getItem("token");
      let body = {
        groupId: props.groupId,
        msgId: props.msgId,
        userId: props.user._id,
      };
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      };
      let response = await fetch(
        `/api/messages/${props.groupId}/going`,
        options
      );
      if (response.ok) {
        console.log("OKAY!");
      } else if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      response = await response.json();
      props.goingEvent(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNotGoing = async (e) => {
    e.preventDefault();
    setGoing(!going);
    setLoading(true);
    try {
      let jwt = localStorage.getItem("token");
      let body = {
        groupId: props.groupId,
        msgId: props.msgId,
        userId: props.user._id,
      };
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      };
      let response = await fetch(
        `/api/messages/${props.groupId}/notgoing`,
        options
      );
      if (response.ok) {
        console.log("OKAY!");
      } else if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      response = await response.json();
      props.notGoingEvent(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatus = () => {
    for (let attendee of props.attendees) {
      if (attendee._id === props.user._id) {
        setGoing(true);
        return;
      }
    }
    setGoing(false);
  };

  const handleLoading = (e) => {
    e.preventDefault();
  };

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

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="EventDetail">
      <div className="event-container">
        <div className="icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="event-detail-container">
          <p className="event-title">{props.name}</p>
          <p className="event-date">{formatTime(props.date)}</p>
          <p className="event-location">{props.address}</p>
          {showMore ? (
            <div>
              <div>
                {props.attendees.map((person) => (
                  <div className="person">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#6083FF" />
                    </svg>
                    <div className="name">
                      <p>{person.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="people-going">
              {props.attendees.map((person) => (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="10" fill="#6083FF" />
                </svg>
              ))}
              <p>+ going</p>
              <svg
                onClick={() => handleShowMore()}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.825 7.15833L10 10.975L6.175 7.15833L5 8.33333L10 13.3333L15 8.33333L13.825 7.15833Z"
                  fill="#56597B"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {showMore ? (
        <div className="show-button-container">
          <svg
            onClick={() => handleShowMore()}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.175 12.8416L10 9.02496L13.825 12.8416L15 11.6666L10 6.66663L5 11.6666L6.175 12.8416Z"
              fill="black"
            />
          </svg>
        </div>
      ) : (
        <></>
      )}
      {props.showGoing && (
        <div className="button-container">
          {going ? (
            loading ? (
              <form onSubmit={handleLoading}>
                <button style={{ background: "#707070" }}>I'm not going</button>
              </form>
            ) : (
              <form onSubmit={(e) => handleNotGoing(e)}>
                <button>I'm not going</button>
              </form>
            )
          ) : loading ? (
            <form onSubmit={handleLoading}>
              <button style={{ background: "#707070" }}>I'm going</button>
            </form>
          ) : (
            <form onSubmit={(e) => handleGoing(e)}>
              <button>I'm going</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default EventDetail;
