import React from "react";
import { Link } from "react-router-dom";
import "./NewGroupSuccessModal.css";

function NewGroupSuccessModal({ newGroupLink, name }) {
  return (
    <div className="NewGroupSuccessModal">
      <div className="modal">
        <h2>{name} has been created!</h2>
        <h4>Please copy the invite link below to invite other members</h4>
        <label>Invite Link</label>
        <div className="copy-link">
          <input type="text" name="link" disabled value={newGroupLink} />
          <span className="material-icons">content_copy</span>
        </div>
        <Link to="/groups" className="done-btn">
          Done
        </Link>
      </div>
    </div>
  );
}

export default NewGroupSuccessModal;
