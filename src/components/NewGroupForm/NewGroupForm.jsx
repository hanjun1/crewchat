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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          name: inputs.name,
          category: inputs.category,
          link: inputs.link,
        }),
      };
      const fetchResponse = await fetch("/api/groups/create", options);
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="NewGroupForm">
      <h1>New Group</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
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
