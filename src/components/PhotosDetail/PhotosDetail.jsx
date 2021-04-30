import React, { useState, useEffect } from "react";
import "./PhotosDetail.css";

function PhotosDetail(props) {
  const [imgMsgs, setImgMsgs] = useState([]);

  async function fetchMessage() {
    try {
      let jwt = localStorage.getItem("token");
      const fetchResponse = await fetch(
        `/api/groups/${props.activeGroup._id}`,
        {
          headers: { Authorization: "Bearer " + jwt },
        }
      );
      let allMsgs = await fetchResponse.json();
      let images = [];
      for (let i = 0; i < allMsgs.length; i++) {
        if (allMsgs[i].type === "image") {
          images.push(allMsgs[i]);
        }
      }
      setImgMsgs(images);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, [imgMsgs]);

  return (
    <div className="PhotosDetail">
      {imgMsgs.map((msg) => (
        <img src={msg.image.imgFileURL} alt="IMG" />
      ))}
    </div>
  );
}

export default PhotosDetail;
