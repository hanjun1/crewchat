import React from "react";
import "./Groups.css";
import GroupsHeader from "../../components/GroupsHeader/GroupsHeader";
import GroupsList from "../../components/GroupsList/GroupsList";

function Groups({ groups, groupCategories, setActiveGroup }) {
  return (
    <div className="Groups">
      <GroupsHeader />
      <GroupsList
        groups={groups}
        groupCategories={groupCategories}
        setActiveGroup={setActiveGroup}
      />
    </div>
  );
}

export default Groups;
