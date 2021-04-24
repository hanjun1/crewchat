import React from "react";
import "./NewGroupForm.css";

function NewGroupForm() {
  return (
    <div className="NewGroupForm">
      <h1>New Group</h1>
      <form autoComplete="off">
        <input className="group-name" type="text" name="name" />
        <label className="name-label">Group Name</label>
        <label>Category</label>
        <select name="category">
          <option>Family</option>
          <option>Friends</option>
          <option>Work</option>
          <option>School</option>
          <option>Other</option>
        </select>

        <label>Invite Link</label>
        <div className="copy-link">
          <input type="text" name="link" value="" />
          <span class="material-icons">content_copy</span>
        </div>
        <button className="create-btn">Create Group</button>
      </form>
    </div>
  );
}

export default NewGroupForm;
