import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

function SideNav({ handleLogout }) {
  return (
    <div className="SideNav">
      <Link to="/groups" className="item-link">
        <div className="icon-group">
          <span className="material-icons md-48 ">chat</span>
          <h5>Messages</h5>
        </div>
      </Link>
      <Link to="/profile" className="item-link">
        <div className="icon-group">
          <span className="material-icons md-48 ">person</span>
          <h5>Profile</h5>
        </div>
      </Link>
      <div className="icon-group" onClick={handleLogout}>
        <span className="material-icons md-48 ">arrow_right_alt</span>
        <h5>Logout</h5>
      </div>
    </div>
  );
}

export default SideNav;
