import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./MessagesPage.css";
import Groups from "../../components/Groups/Groups";
import Messages from "../../components/Messages/Messages";
import ChatRoomDetails from "../../components/ChatRoomDetails/ChatRoomDetails";
import WelcomeScreen from "../../components/WelcomeScreen/WelcomeScreen";
import SideNav from "../../components/SideNav/SideNav";

function MessagesPage({ handleLogout, user, history, match }) {
  //Media queries for conditional rendering based on screen size
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showDetails, setShowDetails] = useState(false);
  const [groups, setGroups] = useState(null);
  const [groupCategories, setGroupCategories] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [showSideNav, setShowSideNav] = useState(false);

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

  function matchGroupId(groups) {
    let groupId = match.params.id;
    let isMatch = groups.find((group) => group._id === groupId);
    if (isMatch === undefined) {
      setActiveGroup(null);
      history.push("/groups");
    } else {
      setActiveGroup(isMatch);
    }
  }

  return (
    <div className="MessagesPage">
      {isDesktop && (
        <>
          <SideNav handleLogout={handleLogout} />
          <Groups
            groups={groups}
            groupCategories={groupCategories}
            setActiveGroup={setActiveGroup}
          />
          {activeGroup ? (
            <>
              <Messages activeGroup={activeGroup} user={user} />
              <ChatRoomDetails
                activeGroup={activeGroup}
                user={user}
                fetchGroups={fetchGroups}
              />
            </>
          ) : (
            <WelcomeScreen />
          )}
        </>
      )}
      {isTablet && (
        <>
          <SideNav handleLogout={handleLogout} />
          <Groups
            groups={groups}
            groupCategories={groupCategories}
            setActiveGroup={setActiveGroup}
          />
          {activeGroup ? (
            <>
              {showDetails ? (
                <ChatRoomDetails
                  showChatDetails={showDetails}
                  setShowChatDetails={setShowDetails}
                  activeGroup={activeGroup}
                  user={user}
                  fetchGroups={fetchGroups}
                />
              ) : (
                <Messages
                  setShowDetails={setShowDetails}
                  activeGroup={activeGroup}
                  user={user}
                />
              )}
            </>
          ) : (
            <WelcomeScreen />
          )}
        </>
      )}
      {isMobile && (
        <>
          {activeGroup ? (
            <>
              {showDetails ? (
                <ChatRoomDetails
                  showChatDetails={showDetails}
                  setShowChatDetails={setShowDetails}
                  activeGroup={activeGroup}
                  user={user}
                  fetchGroups={fetchGroups}
                />
              ) : (
                <Messages
                  setShowDetails={setShowDetails}
                  activeGroup={activeGroup}
                  setActiveGroup={setActiveGroup}
                  user={user}
                />
              )}
            </>
          ) : (
            <>
              {showSideNav && (
                <SideNav
                  handleLogout={handleLogout}
                  setShowSideNav={setShowSideNav}
                />
              )}
              <Groups
                groups={groups}
                groupCategories={groupCategories}
                setActiveGroup={setActiveGroup}
                setShowSideNav={setShowSideNav}
                showSideNav={showSideNav}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MessagesPage;
