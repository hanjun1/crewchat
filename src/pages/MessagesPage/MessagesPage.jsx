import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./MessagesPage.css";
import Groups from "../../components/Groups/Groups";
import Messages from "../../components/Messages/Messages";
import ChatRoomDetails from "../../components/ChatRoomDetails/ChatRoomDetails";

function MessagesPage(props) {
  //Media queries for conditional rendering based on screen size
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showDetails, setShowDetails] = useState(false);
  const [groups, setGroups] = useState(null);
  const [groupCategories, setGroupCategories] = useState([]);
  // const [activeGroup, setActiveGroup] = useState(null)

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      let jwt = localStorage.getItem("token");
      const fetchResponse = await fetch("/api/groups", {
        headers: { Authorization: "Bearer " + jwt },
      });
      let groups = await fetchResponse.json();
      setGroups(groups);

      setGroupCategories(
        groups.reduce((cats, group) => {
          let cat = group.category;
          return cats.includes(cat) ? cats : [...cats, cat];
        }, [])
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="MessagesPage">
      {isDesktop && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
          <Messages user={props.user} />
          <ChatRoomDetails />
        </>
      )}
      {isTablet && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
          {showDetails ? (
            <ChatRoomDetails
              showChatDetails={showDetails}
              setShowChatDetails={setShowDetails}
            />
          ) : (
            <Messages setShowDetails={setShowDetails} user={props.user} />
          )}
        </>
      )}
      {isMobile && (
        <>
          {showDetails ? (
            <ChatRoomDetails
              showChatDetails={showDetails}
              setShowChatDetails={setShowDetails}
            />
          ) : (
            <Messages setShowDetails={setShowDetails} user={props.user} />
          )}
        </>
      )}
    </div>
  );
}

export default MessagesPage;
