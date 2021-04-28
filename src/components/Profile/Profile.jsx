import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <div className="Profile">
      <h1>Edit My Profile</h1>
      <div className="profile-pic">
        <div className="edit-profile-pic">
          <span class="material-icons md-light">edit</span>
        </div>
      </div>
      <form autoComplete="off">
        <label>Name</label>
        <input type="text" name="name" required />
        <button className="save-btn">Save</button>
      </form>
    </div>
  );
}

export default Profile;
