import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile({ user, setUser }) {
  const [userInfo, setUserInfo] = useState({
    name: user.name,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          name: userInfo.name,
          userId: user._id,
        }),
      };
      const fetchResponse = await fetch("/api/users/edit", options);
      if (fetchResponse.ok) {
        let updatedUser = await fetchResponse.json();
        console.log(updatedUser);
        setUser(updatedUser);
      }
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
    } catch (err) {
      console.log("SignUp Form error", err);
    }
  };
  return (
    <div className="Profile">
      <h1>Edit My Profile</h1>
      <div className="profile-pic">
        <div className="edit-profile-pic">
          <span class="material-icons md-light">edit</span>
        </div>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <button className="save-btn">Save</button>
      </form>
    </div>
  );
}

export default Profile;
