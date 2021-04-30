import React, { useState, useEffect } from "react";
import "./DocumentsDetail.css";
import DocumentDetail from "../DocumentDetail/DocumentDetail";

function DocumentsDetail(props) {
  const [fileMsgs, setFileMsgs] = useState([]);

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
      let files = [];
      for (let i = 0; i < allMsgs.length; i++) {
        if (allMsgs[i].type === "file") {
          files.push(allMsgs[i]);
        }
      }
      setFileMsgs(files);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, [fileMsgs]);

  return (
    <div className="DocumentsDetail">
      {fileMsgs.map((msg) => (
        <DocumentDetail
          name={msg.file.fileName}
          size={msg.file.fileSize}
          link={msg.file.fileURL}
        />
      ))}
    </div>
  );
}

export default DocumentsDetail;
