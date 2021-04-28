import React, { useState, useEffect } from "react";
import "./MessageInput.css";
import TextareaAutosize from "react-textarea-autosize";

function MessageInput(props) {
  const [textContent, setTextContent] = useState("");
  const [inputType, setInputType] = useState("text");
  const [eventMsg, setEventMsg] = useState({
    name: "",
    date: "",
    address: "",
  });

  const handleChangeTextContent = (e) => {
    setTextContent(e.target.value);
  };

  const handleChangeEventMsg = (e) => {
    setEventMsg({
      ...eventMsg,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeInput = (e) => {
    setInputType(e.target.id);
  };

  const handleSubmitEventMsg = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      let body = {
        sender: props.user._id,
        senderName: props.user.name,
        event: {
          ...eventMsg,
          attendees: [props.user._id],
        },
      };
      setEventMsg({ name: "", date: "", address: "" });
      props.sendEventMsg(body);
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      };
      let response = await fetch(
        `/api/messages/event/${props.groupId}`,
        options
      );
      console.log(response.ok);
      if (response.ok) {
        console.log("SENT");
      }
      if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitTextMessage = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      let body = {
        sender: props.user._id,
        senderName: props.user.name,
        textContent: textContent,
      };
      setTextContent("");
      props.sendMessage(textContent);
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      };
      // CHANGE ADDRESS TO DYNAMIC ID
      let response = await fetch(`/api/messages/${props.groupId}`, options);
      console.log(response.ok);
      if (response.ok) {
        console.log("SENT");
      }
      if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      // response = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInputType("text");
  }, []);

  return (
    <>
      <div className="MessageInput-container">
        <div className="button-container">
          <div className="text-button">
            <span
              className="material-icons md-dark"
              onClick={(e) => handleChangeInput(e)}
              id="text"
            >
              text_fields
            </span>
          </div>
          <div className="event-button">
            <span
              id="event"
              className="material-icons md-dark"
              onClick={(e) => handleChangeInput(e)}
            >
              event
            </span>
          </div>
        </div>
      </div>
      <div className="MessageInput">
        {inputType === "text" ? (
          <form
            className="text-form-container"
            onSubmit={(e) => handleSubmitTextMessage(e)}
          >
            <TextareaAutosize
              className="textarea-auto"
              type="text"
              placeholder="Type your message..."
              onChange={(e) => handleChangeTextContent(e)}
              value={textContent}
            />
            <button>
              <span className="material-icons md-light">send</span>
            </button>
          </form>
        ) : (
          <form
            className="event-form-container"
            onSubmit={(e) => handleSubmitEventMsg(e)}
          >
            <div className="event-inputs-container">
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                placeholder="What is your event's name?"
                value={eventMsg.name}
                onChange={(e) => handleChangeEventMsg(e)}
                required
              />
              <label>Event Date</label>
              <input
                name="date"
                type="datetime-local"
                value={eventMsg.date}
                onChange={(e) => handleChangeEventMsg(e)}
                required
              />
              <label>Event Address</label>
              <input
                type="text"
                name="address"
                placeholder="Where is your event going to take place?"
                value={eventMsg.address}
                onChange={(e) => handleChangeEventMsg(e)}
              />
            </div>
            <button>
              <span className="material-icons md-light">send</span>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default MessageInput;
