import React from "react";
import "./GroupItem.css";

function GroupItem() {
  return (
    <div className="GroupItem">
      <div className="group-icon">
        <svg
          width="45"
          height="42"
          viewBox="0 0 45 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="22.5" cy="21" rx="22.5" ry="21" fill="#A0A2BA" />
        </svg>
      </div>
      <div className="group-name">Fam Jam</div>
      <div className="time">10:20 pm</div>
      <div className="text-preview">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
      </div>
      <div className="participants">
        <span className="material-icons">account_circle</span>
        <span className="material-icons">account_circle</span>
        <span className="material-icons">account_circle</span>
      </div>
    </div>
  );
}

export default GroupItem;
