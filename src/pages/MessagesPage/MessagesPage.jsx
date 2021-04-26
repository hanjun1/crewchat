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
  const [activeGroup, setActiveGroup] = useState({});

  useEffect(() => {
    fetchGroups();
    return () => {};
  }, []);

  async function fetchGroups() {
    try {
      let jwt = localStorage.getItem("token");
      const fetchResponse = await fetch("/api/groups", {
        headers: { Authorization: "Bearer " + jwt },
      });
      let groups = await fetchResponse.json();
      let categories = groups.reduce((cats, group) => {
        let cat = group.category;
        return cats.includes(cat) ? cats : [...cats, cat];
      }, []);
      setGroups(groups);
      setGroupCategories(categories);
      // Match URL to group ID to set active group -> redirect to "/groups" if no match
      matchGroupId(groups);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOneGroup(groupId) {
    try {
      let jwt = localStorage.getItem("token");
      const fetchResponse = await fetch(`/api/groups/${groupId}`, {
        headers: { Authorization: "Bearer " + jwt },
      });
      let group = await fetchResponse.json();
      setActiveGroup(group);
    } catch (err) {
      console.log(err);
    }
  }

  function matchGroupId(groups) {
    // console.log(groups);
    let groupId = props.match.params.id;
    // console.log(groupId);
    let match = groups.find((group) => group._id === groupId);
    if (match === undefined) {
      props.history.push("/groups");
    } else {
      setActiveGroup(match);
    }
  }

  return (
    <div className="MessagesPage">
      {isDesktop && (
        <>
          <Groups
            groups={groups}
            groupCategories={groupCategories}
            setActiveGroup={setActiveGroup}
          />
          <Messages
            activeGroup={activeGroup}
            user={props.user}
            fetchOneGroup={fetchOneGroup}
          />
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
              fetchOneGroup={fetchOneGroup}
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
              fetchOneGroup={fetchOneGroup}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MessagesPage;
