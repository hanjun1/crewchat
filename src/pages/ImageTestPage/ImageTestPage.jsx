import React, { useState } from "react";
import axios from "axios";

function ImageTestPage(props) {
  const [picture, setPicture] = useState(null);

  const handleUploadImage = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", picture, picture.name);
    axios
      .post("/api/uploadImage", data)
      .then((result) => {
        console.log("server response: ");
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>hi</h1>
      <form onSubmit={(e) => handleSubmitImage(e)}>
        <label>Choose File </label>
        <input type="file" onChange={(e) => handleUploadImage(e)} />
        <button>Upload Images</button>
      </form>
    </div>
  );
}

export default ImageTestPage;
