import React from "react";
import NewGroupForm from "../NewGroupForm/NewGroupForm";
import { useMediaQuery } from "react-responsive";
import "./NewGroup.css";

function NewGroup({ history, showSideNav, setShowSideNav }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="NewGroup">
      {isMobile && (
        <>
          {showSideNav ? (
            <span
              className="material-icons md-48 menu-icon"
              onClick={() => setShowSideNav(false)}
            >
              arrow_back_ios
            </span>
          ) : (
            <span
              className="material-icons md-48 menu-icon"
              onClick={() => setShowSideNav(true)}
            >
              menu
            </span>
          )}
        </>
      )}
      <NewGroupForm history={history} />
    </div>
  );
}

export default NewGroup;
