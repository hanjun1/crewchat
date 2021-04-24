import React, { useState } from "react";
import "./NewGroupForm.css";

function NewGroupForm() {
  const [inputs, setInputs] = useState({
    name: "",
    category: "Other",
    link: randomLink(),
  });

  function randomLink() {
    return Math.random().toString(36).substr(2, 10);
  }

  return (
    <div className="NewGroupForm">
      <h1>New Group</h1>
      <form autoComplete="off">
        <input
          className="group-name"
          type="text"
          name="name"
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          required
        />
        <label className="name-label">Group Name</label>
        <label>Category</label>
        <select
          name="category"
          value={inputs.category}
          onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
        >
          <option>Family</option>
          <option>Friends</option>
          <option>Work</option>
          <option>School</option>
          <option>Other</option>
        </select>

        <label>Invite Link</label>
        <div className="copy-link">
          <input type="text" name="link" disabled value={inputs.link} />
          <span className="material-icons">content_copy</span>
        </div>
        <button className="create-btn">Create Group</button>
      </form>
    </div>
  );
}

export default NewGroupForm;
