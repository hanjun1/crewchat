import React from "react";
import { useMediaQuery } from "react-responsive";
import "./GroupsPage.css";
import Groups from "../../components/Groups/Groups";
import WelcomeScreen from "../../components/WelcomeScreen/WelcomeScreen";

function GroupsPage() {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="GroupsPage">
      {isDesktop && (
        <>
          <Groups />
          <WelcomeScreen />
        </>
      )}
      {isTablet && (
        <>
          <Groups />
          <WelcomeScreen />
        </>
      )}
      {isMobile && (
        <>
          <Groups />
        </>
      )}
    </div>
  );
}

export default GroupsPage;
