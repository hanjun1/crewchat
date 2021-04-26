import React from "react";
import "./Groups.css";
import GroupsHeader from "../../components/GroupsHeader/GroupsHeader";
import GroupsList from "../../components/GroupsList/GroupsList";

function Groups({ groups, groupCategories }) {
  return (
    <div className="Groups">
      <GroupsHeader />
      <GroupsList groups={groups} groupCategories={groupCategories} />
    </div>
  );
}

export default Groups;
