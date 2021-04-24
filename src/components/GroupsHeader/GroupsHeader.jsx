import React from "react";
import { Link } from "react-router-dom";
import "./GroupsHeader.css";

function GroupsHeader() {
  return (
    <div className="GroupsHeader">
      <div className="title">
        <h2>Groups</h2>
        <Link to="/groups/create" className="new-group-btn">
          <span className="material-icons md-light">add</span>
        </Link>
      </div>
      <div className="searchbar">
        <input type="text" placeholder="search.." />
        <button>
          <span className="material-icons">search</span>
        </button>
      </div>
    </div>
  );
}

export default GroupsHeader;
