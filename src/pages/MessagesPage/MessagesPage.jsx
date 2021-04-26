import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
  const [activeGroup, setActiveGroup] = useState({});

  useEffect(() => {
    fetchGroups();
    matchGroupId();
    return () => {};
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
      console.log(groups);
      let groupId = props.match.params.id;
      console.log(groupId);
      let match = groups.find((group) => group._id === groupId);
      console.log(match);
      if (match === undefined) {
        console.log("redirecting...");
        props.history.push("/groups");
      } else {
        setActiveGroup(match);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function matchGroupId() {}

  return (
    <div className="MessagesPage">
      {isDesktop && (
        <>
          <Groups
            groups={groups}
            groupCategories={groupCategories}
            setActiveGroup={setActiveGroup}
          />
          <Messages activeGroup={activeGroup} user={props.user} />
          <ChatRoomDetails activeGroup={activeGroup} />
        </>
      )}
      {isTablet && (
        <>
          <Groups
            groups={groups}
            groupCategories={groupCategories}
            setActiveGroup={setActiveGroup}
          />
          {showDetails ? (
            <ChatRoomDetails
              showChatDetails={showDetails}
              setShowChatDetails={setShowDetails}
              activeGroup={activeGroup}
            />
          ) : (
            <Messages
              setShowDetails={setShowDetails}
              activeGroup={activeGroup}
              user={props.user}
            />
          )}
        </>
      )}
      {isMobile && (
        <>
          {showDetails ? (
            <ChatRoomDetails
              showChatDetails={showDetails}
              setShowChatDetails={setShowDetails}
              activeGroup={activeGroup}
            />
          ) : (
            <Messages
              setShowDetails={setShowDetails}
              activeGroup={activeGroup}
              user={props.user}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MessagesPage;
