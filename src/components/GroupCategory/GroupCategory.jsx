import React, { useState } from "react";
import "./GroupCategory.css";
import GroupItem from "../GroupItem/GroupItem";

function GroupCategory({ name }) {
  const [showItems, setShowItems] = useState(true);
  return (
    <div className="GroupCategory">
      <header>
        <h2>{name}</h2>
        <span
          onClick={() => setShowItems(!showItems)}
          className="material-icons md-48"
        >
          {showItems ? "expand_more" : "expand_less"}
        </span>
      </header>
      <div className="content">
        {showItems ? (
          <>
            <GroupItem />
            <GroupItem />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default GroupCategory;
