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

  const handleLeaveGroup = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      let body = {
        groupId: props.activeGroup._id,
        userId: props.user._id,
      };
      let fetchResponse = await fetch("/api/groups/removeUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      });
      if (fetchResponse.ok) {
        console.log("OKAY");
        props.fetchGroups();
      } else if (!fetchResponse.ok) {
        console.log("BAD FETCH");
      }
      fetchResponse = fetchResponse.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ChatRoomDetails">
      {showDetails.all ? (
        <div className="all">
          <div>
            <RoomHeader
              groupId={props.activeGroup._id}
              name={props.activeGroup.name}
              groupPicture={props.activeGroup.picture}
              showChatDetails={props.showChatDetails}
              setShowChatDetails={props.setShowChatDetails}
            />
            <DetailsOption name="Participants" handleOnClick={handleOnClick} />
            <DetailsOption name="Events" handleOnClick={handleOnClick} />
            <DetailsOption name="Polls" handleOnClick={handleOnClick} />
            <DetailsOption name="Photos" handleOnClick={handleOnClick} />
            <DetailsOption name="Documents" handleOnClick={handleOnClick} />
          </div>
          <form
            onSubmit={(e) => handleLeaveGroup(e)}
            className="button-container"
          >
            <button>Leave Group</button>
          </form>
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
