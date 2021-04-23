import React from "react";
import "./GroupsList.css";
import GroupCategory from "../../components/GroupCategory/GroupCategory";

function GroupsList() {
  return (
    <div className="GroupsList">
      <GroupCategory name={"Family"} />
      <GroupCategory name={"Friends"} />
      <GroupCategory name={"School"} />
      <GroupCategory name={"Work"} />
    </div>
  );
}

export default GroupsList;
