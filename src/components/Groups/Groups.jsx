import React from "react";
import "./Groups.css";
import GroupsHeader from "../../components/GroupsHeader/GroupsHeader";
import GroupsList from "../../components/GroupsList/GroupsList";

function Groups() {
  return (
    <div className="Groups">
      <GroupsHeader />
      <GroupsList />
    </div>
  );
}

export default Groups;
