import React from "react";
import "./GroupsHeader.css";

function GroupsHeader() {
  return (
    <div className="GroupsHeader">
      <div className="title">
        <h2>Groups</h2>
        <button className="new-group-btn">
          <span class="material-icons md-light">add</span>
        </button>
      </div>
      <div className="searchbar">
        <input type="text" placeholder="search.." />
        <button>
          <span class="material-icons">search</span>
        </button>
      </div>
    </div>
  );
}

export default GroupsHeader;
