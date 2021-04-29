import React, { useState, useEffect } from "react";
import "./MessageInput.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

function MessageInput(props) {
  const [textContent, setTextContent] = useState("");
  const [inputType, setInputType] = useState("text");
  const [eventMsg, setEventMsg] = useState({
    name: "",
    date: "",
    address: "",
  });
  // Send Images
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState("");
  let returnedURL = "";
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState({
    option0: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChangePollQuestion = (e) => {
    setPollQuestion(e.target.value);
  };

  const handleChangePollOptions = (e) => {
    setPollOptions({
      ...pollOptions,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmitPollMsg = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      let temp = [];
      for (let option in pollOptions) {
        if (pollOptions[option] !== "") {
          temp.push({
            option: pollOptions[option],
          });
        }
      }
      let body = {
        sender: props.user._id,
        senderName: props.user.name,
        poll: {
          question: pollQuestion,
          options: temp,
        },
      };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      };
      setPollQuestion("");
      setPollOptions({
        option0: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      });
      let response = await fetch(
        `/api/messages/poll/${props.groupId}`,
        options
      );
      if (response.ok) {
        console.log("SENT");
      }
      if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      response = await response.json();
      props.sendPollMsg(response);
    } catch (err) {
      console.log(err);
    }
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
      if (response.ok) {
        console.log("SENT");
      }
      if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      response = await response.json();
      props.sendMessage(response);
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
      if (response.ok) {
        console.log("SENT");
      }
      if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      response = await response.json();
      props.sendMessage(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadImage = (e) => {
    setPicture(e.target.files[0]);
    setPictureURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitImageMessage = async (e) => {
    if (picture) {
      let data = new FormData();
      data.append("image", picture, picture.name);
      axios
        .post("/api/uploadImage", data)
        .then((result) => {
          console.log("server response: ");
          console.log(result);
          returnedURL = result.data.downloadUrl;
          postToDB(returnedURL);
          setPicture(null);
          setPictureURL("");
          setInputType("text");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("no picture added");
    }
    e.preventDefault();
  };

  async function postToDB(returnedURL) {
    try {
      let jwt = localStorage.getItem("token");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          sender: props.user._id,
          senderName: props.user.name,
          image: returnedURL,
        }),
      };
      let fetchResponse = await fetch(
        `/api/messages/image/${props.groupId}`,
        options
      );
      if (fetchResponse.ok) {
        console.log("sent image");
      }
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
      fetchResponse = await fetchResponse.json();
      props.sendMessage(fetchResponse);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setInputType("text");
  }, []);

  return (
    <>
      <div className="MessageInput-container">
        <div className="button-container">
          <div className="text-button">
            <span
              className="material-icons md"
              onClick={(e) => handleChangeInput(e)}
              id="text"
            >
              text_fields
            </span>
          </div>
          <div className="event-button">
            <span
              id="event"
              className="material-icons md"
              onClick={(e) => handleChangeInput(e)}
            >
              event
            </span>
          </div>
          <div className="poll-button">
            <span
              id="poll"
              className="material-icons md"
              onClick={(e) => handleChangeInput(e)}
            >
              poll
            </span>
          </div>
          <div className="img-button">
            <label htmlFor="img-input" className="img-input-label">
              <span
                id="image"
                className="material-icons md"
                onClick={(e) => handleChangeInput(e)}
              >
                image
              </span>
            </label>
          </div>
          <div className="doc-button">
            <span
              id="document"
              className="material-icons md"
              onClick={(e) => handleChangeInput(e)}
            >
              upload_file
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
        ) : inputType === "event" ? (
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
        ) : inputType === "poll" ? (
          <form className="poll-form-container" onSubmit={handleSubmitPollMsg}>
            <div className="poll-inputs-container">
              <label>Poll Question</label>
              <input
                className="question"
                type="text"
                name="question"
                placeholder="What is your question?"
                onChange={handleChangePollQuestion}
                value={pollQuestion}
              />
              <div className="options-container">
                <input
                  type="text"
                  name="option0"
                  placeholder="Option..."
                  onChange={handleChangePollOptions}
                  value={pollOptions.option0}
                />
                <input
                  type="text"
                  name="option1"
                  placeholder="Option..."
                  onChange={handleChangePollOptions}
                  value={pollOptions.option1}
                />
                <input
                  type="text"
                  name="option2"
                  placeholder="Option..."
                  onChange={handleChangePollOptions}
                  value={pollOptions.option2}
                />
                <input
                  type="text"
                  name="option3"
                  placeholder="Option..."
                  onChange={handleChangePollOptions}
                  value={pollOptions.option3}
                />
                <input
                  type="text"
                  name="option4"
                  placeholder="Option..."
                  onChange={handleChangePollOptions}
                  value={pollOptions.option4}
                />
              </div>
              {/* {numOptions < 5 && (
                <button
                  type="button"
                  className="add-option"
                  onClick={handleAddNewOption}
                >
                  Add Option
                </button>
              )} */}
            </div>
            <button>
              <span className="material-icons md-light">send</span>
            </button>
          </form>
        ) : inputType === "image" ? (
          <form
            className="image-form-container"
            onSubmit={handleSubmitImageMessage}
          >
            <input
              type="file"
              accept="image/*"
              id="img-input"
              onChange={(e) => handleUploadImage(e)}
            />

            <img className="img-preview" src={pictureURL}></img>

            <button>
              <span className="material-icons md-light">send</span>
            </button>
          </form>
        ) : inputType === "document" ? (
          <form>
            <button>
              <span className="material-icons md-light">send</span>
            </button>
          </form>
        ) : (
          <h1>hello</h1>
        )}
      </div>
    </>
  );
}

export default MessageInput;
