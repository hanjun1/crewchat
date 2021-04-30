import React from "react";
import "./DocumentsDetail.css";
import DocumentDetail from "../DocumentDetail/DocumentDetail";

function DocumentsDetail(props) {
  return (
    <div className="DocumentsDetail">
      {props.activeGroup.msgs
        .filter((msg) => msg.type === "file")
        .map((msg) => (
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
