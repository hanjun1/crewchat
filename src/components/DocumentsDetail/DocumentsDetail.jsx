import React from "react";
import "./DocumentsDetail.css";
import DocumentDetail from "../DocumentDetail/DocumentDetail";

function DocumentsDetail(props) {
  return (
    <div className="DocumentsDetail">
      {props.activeGroup.msgs
        .filter((msg) => msg.type === "file")
        .map((msg) => (
          <DocumentDetail name={msg.file.fileName} size={msg.file.fileSize} />
        ))}
      {/* <DocumentDetail name="testdocs.pdf" size="10MB" />
      <DocumentDetail name="hellomynsfdasdfafdasfaameis.pdf" size="5KB" />
      <DocumentDetail name="ryanwashere.pdf" size="10MB" />
      <DocumentDetail name="cindysucks.pdf" size="10MB" />
      <DocumentDetail name="cindysucks.pdf" size="10MB" /> */}
      {/* {props.activeGroup.fileMsgs.map((file) => (
        <DocumentDetail name="cindysucks.pdf" size="10MB" />
      ))} */}
    </div>
  );
}

export default DocumentsDetail;
