import React, { useState } from "react";
import "./ChatRoomDetails.css";
import DetailsOption from "../DetailsOption/DetailsOption";
import RoomHeader from "../RoomHeader/RoomHeader";

function ChatRoomDetails(props) {
  const [showDetails, setShowDetails] = useState({
    all: true,
    participants: false,
    events: false,
    polls: false,
    photos: false,
    documents: false,
  });

  const handleOnClick = (e) => {
    let detailsOption = e.target;
    while (detailsOption.className !== "DetailsOption") {
      detailsOption = detailsOption.parentElement;
    }
    detailsOption = detailsOption.id.toLowerCase();
    switch (detailsOption) {
      case "participants":
        setShowDetails({
          all: false,
          [detailsOption]: true,
        });
        break;
      case "events":
        setShowDetails({
          all: false,
          [detailsOption]: true,
        });
        break;
      case "polls":
        setShowDetails({
          all: false,
          [detailsOption]: true,
        });
        break;
      case "photos":
        setShowDetails({
          all: false,
          [detailsOption]: true,
        });
        break;
      case "documents":
        setShowDetails({
          all: false,
          [detailsOption]: true,
        });
        break;
      default:
        console.log("Something went terribly wrong!");
        break;
    }
  };

  return (
    <div className="ChatRoomDetails">
      {showDetails.all ? (
        <div className="all">
          <div>
            <RoomHeader name="The Fam" />
            <DetailsOption name="Participants" handleOnClick={handleOnClick} />
            <DetailsOption name="Events" handleOnClick={handleOnClick} />
            <DetailsOption name="Polls" handleOnClick={handleOnClick} />
            <DetailsOption name="Photos" handleOnClick={handleOnClick} />
            <DetailsOption name="Documents" handleOnClick={handleOnClick} />
          </div>
          <div className="button-container">
            <button>Leave Group</button>
          </div>
        </div>
      ) : showDetails.participants ? (
        <h1>participants</h1>
      ) : showDetails.events ? (
        <h1>events</h1>
      ) : showDetails.polls ? (
        <h1>polls</h1>
      ) : showDetails.photos ? (
        <h1>photos</h1>
      ) : showDetails.documents ? (
        <h1>documents</h1>
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
}

export default ChatRoomDetails;
