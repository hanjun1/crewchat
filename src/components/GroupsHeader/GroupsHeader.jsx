import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./GroupsHeader.css";

function GroupsHeader({ setShowSideNav, showSideNav }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="GroupsHeader">
      {isMobile && (
        <>
          {showSideNav ? (
            <span
              class="material-icons md-48 menu-icon"
              onClick={() => setShowSideNav(false)}
            >
              arrow_back_ios
            </span>
          ) : (
            <span
              class="material-icons md-48 menu-icon"
              onClick={() => setShowSideNav(true)}
            >
              menu
            </span>
          )}
        </>
      )}
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
