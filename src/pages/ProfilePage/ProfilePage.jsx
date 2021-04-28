import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useMediaQuery } from "react-responsive";
import SideNav from "../../components/SideNav/SideNav";
import Profile from "../../components/Profile/Profile";

function ProfilePage({ user, setUser }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div className="ProfilePage">
      {isMobile ? (
        <>
          {showSideNav && <SideNav setShowSideNav={setShowSideNav} />}
          <Profile
            user={user}
            setUser={setUser}
            setShowSideNav={setShowSideNav}
            showSideNav={showSideNav}
          />
        </>
      ) : (
        <>
          <SideNav />
          <Profile user={user} setUser={setUser} />
        </>
      )}
    </div>
  );
}
export default ProfilePage;
