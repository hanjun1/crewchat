import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./MessageHeader.css";

function MessageHeader({ setShowDetails, groupName }) {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="MessageHeader">
      {isDesktop && <h1>{groupName}</h1>}
      {isTablet && (
        <>
          <h1>{groupName}</h1>
          <span
            onClick={() => setShowDetails(true)}
            className="right-arrow material-icons md-36 md-light"
          >
            arrow_forward_ios
          </span>
        </>
      )}
      {isMobile && (
        <>
          <Link to="/groups" className="left-arrow-link">
            <span className="left-arrow material-icons md-36 md-light">
              arrow_back_ios
            </span>
          </Link>
          <h1>{groupName}</h1>
          <span
            onClick={() => setShowDetails(true)}
            className="right-arrow material-icons md-36 md-light"
          >
            arrow_forward_ios
          </span>
        </>
      )}
    </div>
  );
}

export default MessageHeader;
