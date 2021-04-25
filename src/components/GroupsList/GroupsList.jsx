import React from "react";
import { Link } from "react-router-dom";
import "./GroupsList.css";
import GroupCategory from "../../components/GroupCategory/GroupCategory";

function GroupsList() {
  return (
    <div className="GroupsList">
      <Link to="/groups/id" className="message-link">
        <GroupCategory name={"Family"} />
      </Link>

      <GroupCategory name={"Friends"} />
      <GroupCategory name={"School"} />
      <GroupCategory name={"Work"} />
    </div>
  );
}

export default GroupsList;
