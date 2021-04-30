import React from "react";
import "./GroupItem.css";

function GroupItem({ group }) {
  // Formatting
  let msgPreview;
  let lastMsgTime;
  if (group.msgs.length > 0) {
    let lastMsg = group.msgs.slice(-1)[0];
    if (lastMsg.type === "text") {
      msgPreview = lastMsg.text.content;
    } else {
      msgPreview = `${lastMsg.senderName} sent a ${lastMsg.type}`;
    }
    lastMsgTime = new Date(
      group.msgs.slice(-1)[0].updatedAt
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    msgPreview = "No Messages Yet";
    lastMsgTime = "---";
  }

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
      <div className="group-name">{group.name}</div>
      <div className="time">{lastMsgTime}</div>
      <div className="text-preview">{msgPreview}</div>
      <div className="participants">
        {group.members.map((member) =>
          member.picture === "" ? (
            <>
              <span key={member._id} className="material-icons">
                account_circle
              </span>
            </>
          ) : (
            <>
              <div className="member-icon">
                <img src={member.picture} alt="IMG"></img>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default GroupItem;
