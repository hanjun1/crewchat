import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./GroupsPage.css";
import Groups from "../../components/Groups/Groups";
import WelcomeScreen from "../../components/WelcomeScreen/WelcomeScreen";

function GroupsPage() {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [groups, setGroups] = useState(null);
  const [groupCategories, setGroupCategories] = useState([]);

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
    <div className="GroupsPage">
      {isDesktop && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
          <WelcomeScreen />
        </>
      )}
      {isTablet && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
          <WelcomeScreen />
        </>
      )}
      {isMobile && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
        </>
      )}
    </div>
  );
}

export default GroupsPage;
