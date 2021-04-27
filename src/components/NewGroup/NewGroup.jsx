import React from "react";
import NewGroupForm from "../NewGroupForm/NewGroupForm";
import "./NewGroup.css";

function NewGroup({ history }) {
  return (
    <div className="NewGroup">
      <NewGroupForm history={history} />
    </div>
  );
}

export default NewGroup;
