import React from "react";
import "./Groups.css";
import GroupsHeader from "../../components/GroupsHeader/GroupsHeader";
import GroupsList from "../../components/GroupsList/GroupsList";

function Groups({ groups, groupCategories, setActiveGroup, useChat }) {
  return (
    <div className="Groups">
      <GroupsHeader />
      <GroupsList
        groups={groups}
        groupCategories={groupCategories}
        setActiveGroup={setActiveGroup}
        useChat={useChat}
      />
    </div>
  );
}

export default Groups;
