import React, { useState } from "react";
import "./NewGroupForm.css";
import NewGroupSuccessModal from "../NewGroupSuccessModal/NewGroupSuccessModal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function NewGroupForm({ history }) {
  const [inputs, setInputs] = useState({
    name: "",
    category: "Other",
    pastedLink: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [newGroupLink, setNewGroupLink] = useState("");
  const [joinError, setJoinError] = useState("");
  const BASE_URL = "http://localhost:3000/groups/";
  let link;

  //Post Request to add new group to database
  async function handleCreateGroup(e) {
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
        }),
      };
      const fetchResponse = await fetch("/api/groups/create", options);
      //sets fetches group link from newly created group for pop up modal
      let newGroup = await fetchResponse.json();
      link = BASE_URL + newGroup._id;
      await setNewGroupLink(link);
      if (fetchResponse.ok) {
        setShowModal(true);
      }
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
    } catch (error) {
      console.log(error);
    }
  }

  //Post Request to join an existing Group
  async function handleJoinGroup(e) {
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
          link: inputs.pastedLink,
        }),
      };
      const fetchResponse = await fetch("/api/groups/join", options);
      // if successful, redirect to group
      if (fetchResponse.ok) {
        let groupId = await fetchResponse.json();
        console.log("successful fetch");
        setJoinError("");
        history.push("/groups/" + groupId);
      }
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
    } catch (error) {
      console.log(error);
      console.log("unsuccessful fetch");
      setJoinError("Oops! This group does not exist");
    }
  }

  return (
    <div className="NewGroupForm">
      <Tabs>
        <TabList>
          <Tab>Create Group</Tab>
          <Tab>Join Group</Tab>
        </TabList>

        <TabPanel>
          <h1>New Group</h1>
          <form autoComplete="off" onSubmit={handleCreateGroup}>
            <input
              className="group-name"
              type="text"
              name="name"
              maxLength="25"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              required
            />
            <label className="name-label">Group Name</label>
            <label>Category</label>
            <select
              name="category"
              value={inputs.category}
              onChange={(e) =>
                setInputs({ ...inputs, category: e.target.value })
              }
            >
              <option>Family</option>
              <option>Friends</option>
              <option>Work</option>
              <option>School</option>
              <option>Other</option>
            </select>
            <button className="create-btn">Create Group</button>
          </form>
        </TabPanel>
        <TabPanel>
          <h1 className="join-group-header">Join Group</h1>
          <form autoComplete="off" onSubmit={handleJoinGroup}>
            <label>Paste Invite Link Here</label>
            <div className="copy-link">
              <input
                type="text"
                name="link"
                value={inputs.pastedLink}
                onChange={(e) =>
                  setInputs({ ...inputs, pastedLink: e.target.value })
                }
              />
            </div>
            <p className="join-error">{joinError}</p>
            <button className="create-btn">Join Group</button>
          </form>
        </TabPanel>
      </Tabs>

      {showModal ? (
        <NewGroupSuccessModal
          link={inputs.link}
          name={inputs.name}
          newGroupLink={newGroupLink}
        />
      ) : null}
    </div>
  );
}

export default NewGroupForm;
