import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./NewGroupPage.css";
import Groups from "../../components/Groups/Groups";
import NewGroup from "../../components/NewGroup/NewGroup";
import SideNav from "../../components/SideNav/SideNav";

function NewGroupPage({ history, handleLogout }) {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [groups, setGroups] = useState(null);
  const [groupCategories, setGroupCategories] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [showSideNav, setShowSideNav] = useState(false);

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
    <div className="NewGroupPage">
      {isDesktop && (
        <>
          <SideNav handleLogout={handleLogout} />
          <Groups
            groups={groups}
            groupCategories={groupCategories}
            setActiveGroup={setActiveGroup}
          />
          <NewGroup history={history} />
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
          <NewGroup history={history} />
        </>
      )}
      {isMobile && (
        <>
          {showSideNav && (
            <SideNav
              handleLogout={handleLogout}
              setShowSideNav={setShowSideNav}
            />
          )}
          <NewGroup
            history={history}
            setShowSideNav={setShowSideNav}
            showSideNav={showSideNav}
          />
        </>
      )}
    </div>
  );
}

export default NewGroupPage;
