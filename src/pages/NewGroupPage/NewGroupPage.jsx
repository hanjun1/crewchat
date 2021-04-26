import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./NewGroupPage.css";
import Groups from "../../components/Groups/Groups";
import NewGroupForm from "../../components/NewGroupForm/NewGroupForm";

function NewGroupPage() {
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
    <div className="NewGroupPage">
      {isDesktop && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
          <NewGroupForm />
        </>
      )}
      {isTablet && (
        <>
          <Groups groups={groups} groupCategories={groupCategories} />
          <NewGroupForm />
        </>
      )}
      {isMobile && (
        <>
          <NewGroupForm />
        </>
      )}
    </div>
  );
}

export default NewGroupPage;
