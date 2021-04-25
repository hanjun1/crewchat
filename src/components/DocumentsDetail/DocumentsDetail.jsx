import React from "react";
import "./DocumentsDetail.css";
import DocumentDetail from "../DocumentDetail/DocumentDetail";

function DocumentsDetail(props) {
  return (
    <div className="DocumentsDetail">
      <DocumentDetail name="testdocs.pdf" size="10MB" />
      <DocumentDetail name="hellomynsfdasdfafdasfaameis.pdf" size="5KB" />
      <DocumentDetail name="ryanwashere.pdf" size="10MB" />
      <DocumentDetail name="cindysucks.pdf" size="10MB" />
      <DocumentDetail name="cindysucks.pdf" size="10MB" />
    </div>
  );
}

export default DocumentsDetail;
