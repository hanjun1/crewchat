import React, { useState } from "react";
import "./RoomHeader.css";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

function RoomHeader({
  groupId,
  name,
  showChatDetails,
  setShowChatDetails,
  groupPicture,
}) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [copySuccess, setCopySuccess] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState(groupPicture);
  let returnedURL = "";
  const BASE_URL = "https://project4-test.herokuapp.com/groups";

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
          picture: returnedURL,
        }),
      };
      const fetchResponse = await fetch(`/api/groups/${groupId}`, options);
      if (fetchResponse.ok) {
      }
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
    } catch (err) {
      console.log(err);
    }
  }

  async function copyToClipBoard(copyMe) {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  }

  return (
    <div className="RoomHeader">
      {isTablet && (
        <div className="back-arrow-container">
          <svg
            onClick={() => setShowChatDetails(!showChatDetails)}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6425 4.19252L10.725 2.27502L0 13L10.725 23.725L12.6425 21.8075L3.835 13L12.6425 4.19252Z"
              fill="black"
            />
          </svg>
        </div>
      )}
      {isMobile && (
        <div className="back-arrow-container">
          <svg
            onClick={() => setShowChatDetails(!showChatDetails)}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6425 4.19252L10.725 2.27502L0 13L10.725 23.725L12.6425 21.8075L3.835 13L12.6425 4.19252Z"
              fill="black"
            />
          </svg>
        </div>
      )}
      <div className="header-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="profile-pic">
            <div className="img-container">
              <img src={pictureURL} alt="IMG"></img>
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
          {picture ? (
            <button className="save-btn">Save</button>
          ) : (
            <button className="save-btn disabled" disabled>
              Save
            </button>
          )}
        </form>
        <h1>{name}</h1>
        <div
          className="link-container"
          onClick={() => copyToClipBoard(BASE_URL + groupId)}
        >
          <h5 className="copy-success">{copySuccess}</h5>
          <div className="copy-icon">
            <span className="material-icons md-light">content_copy</span>
          </div>
          <h5>Copy Link Invite</h5>
        </div>
      </div>
    </div>
  );
}

export default RoomHeader;
