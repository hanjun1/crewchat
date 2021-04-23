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
          class="material-icons md-48"
        >
          {showItems ? "expand_more" : "expand_less"}
        </span>
      </header>
      <content>
        {showItems ? (
          <>
            <GroupItem />
            <GroupItem />
          </>
        ) : null}
      </content>
    </div>
  );
}

export default GroupCategory;
