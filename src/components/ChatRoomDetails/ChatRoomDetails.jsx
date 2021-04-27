import React, { useState } from "react";
import "./ChatRoomDetails.css";
import DetailsOption from "../DetailsOption/DetailsOption";
import RoomHeader from "../RoomHeader/RoomHeader";
import ShowDetailsTemplate from "../ShowDetailsTemplate/ShowDetailsTemplate";

function ChatRoomDetails(props) {
  const [showDetails, setShowDetails] = useState({
    all: true,
    detailCategory: "",
  });

  const handleOnClick = (e) => {
    let detailsOption = e.target;
    while (detailsOption.className !== "DetailsOption") {
      detailsOption = detailsOption.parentElement;
    }
    setShowDetails({
      all: false,
      detailCategory: detailsOption.id,
    });
  };

  return (
    <div className="ChatRoomDetails">
      {showDetails.all ? (
        <div className="all">
          <div>
            <RoomHeader
              name={props.activeGroup.name}
              showChatDetails={props.showChatDetails}
              setShowChatDetails={props.setShowChatDetails}
            />
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
      ) : (
        <ShowDetailsTemplate
          name={showDetails.detailCategory}
          setShowDetails={setShowDetails}
          activeGroup={props.activeGroup}
        />
      )}
    </div>
  );
}

export default ChatRoomDetails;
