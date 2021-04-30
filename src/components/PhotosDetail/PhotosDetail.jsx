import React from "react";
import "./PhotosDetail.css";

function PhotosDetail(props) {
  return (
    <div className="PhotosDetail">
      {props.activeGroup.msgs
        .filter((msg) => msg.type === "image")
        .map((msg) => (
          <img src={msg.image.imgFileURL} alt="IMG" />
        ))}
    </div>
  );
}

export default PhotosDetail;
