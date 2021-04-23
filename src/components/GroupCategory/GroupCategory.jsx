import React from "react";
import "./GroupCategory.css";
import GroupItem from "../GroupItem/GroupItem";

function GroupCategory({ name }) {
  return (
    <div className="GroupCategory">
      <header>
        <h2>{name}</h2>
        <span class="material-icons md-48">expand_more</span>
      </header>
      <content>
        <GroupItem />
        <GroupItem />
      </content>
    </div>
  );
}

export default GroupCategory;
