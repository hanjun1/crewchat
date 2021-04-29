import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Profile.css";
import axios from "axios";

function Profile({ user, setUser, showSideNav, setShowSideNav }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [userInfo, setUserInfo] = useState({
    name: user.name,
  });
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState(user.picture);
  let returnedURL = "";

  const handleUploadImage = (e) => {
    setPicture(e.target.files[0]);
    setPictureURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (picture) {
      let data = new FormData();
      data.append("image", picture, picture.name);
      axios
        .post("/api/uploadImage", data)
        .then((result) => {
          console.log("server response: ");
          console.log(result);
          returnedURL = result.data.downloadUrl;
          postToDB(returnedURL);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      postToDB(pictureURL);
    }
  };

  async function postToDB(returnedURL) {
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
          picture: returnedURL,
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
      console.log(err);
    }
  }

  return (
    <div className="Profile">
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
      <h1>Edit My Profile</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="profile-pic">
          <div className="img-container">
            <img src={pictureURL}></img>
          </div>

          <label htmlFor="img-input" className="edit-profile-pic">
            <span className="material-icons md-light">edit</span>
          </label>
          <input
            type="file"
            accept="image/*"
            id="img-input"
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
        <h5>Profile Picture</h5>

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
