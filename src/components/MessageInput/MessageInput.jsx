import React, { useState, useEffect } from "react";
import "./MessageInput.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

function MessageInput(props) {
  //----------------General----------------//
  const [inputType, setInputType] = useState("text");
  const [loading, setLoading] = useState(false);
  const handleChangeInput = (e) => {
    setInputType(e.target.id);
  };

  const reduceNameLength = (name) => {
    name = name.split(".");
    let fileName =
      name[0].substring(0, 7) +
      "..." +
      name[0].substring(name[0].length - 3, name[0].length);
    return fileName + "." + name[1];
  };

  const handleLoading = (e) => {
    e.preventDefault();
  };
  //----------------Send Texts----------------//
  const [textContent, setTextContent] = useState("");

  const handleChangeTextContent = (e) => {
    setTextContent(e.target.value);
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

  //----------------Send Events-----------------//
  const [eventMsg, setEventMsg] = useState({
    name: "",
    date: "",
    address: "",
  });

  const handleChangeEventMsg = (e) => {
    setEventMsg({
      ...eventMsg,
      [e.target.name]: e.target.value,
    });
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

  //-----------------Send Images-----------------//
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState("");
  let returnedURL = "";

  const handleUploadImage = (e) => {
    setPicture(e.target.files[0]);
    setPictureURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitImageMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (picture) {
      let data = new FormData();
      data.append("image", picture, picture.name);
      axios
        .post("/api/uploadImage", data)
        .then((result) => {
          console.log("server response: ");
          console.log(result);
          returnedURL = result.data.downloadUrl;
          postToDB(returnedURL, "image");
          setPicture(null);
          setPictureURL("");
          setInputType("text");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("no picture added");
    }
  };

  async function postToDB(returnedURL, fileType) {
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
          link: returnedURL,
          fileName: file ? file.name : "",
          fileSize: file ? file.size : "",
        }),
      };
      console.log(props.user._id);
      console.log(props.user.name);
      let fetchResponse = await fetch(
        `/api/messages/${fileType}/${props.groupId}`,
        options
      );
      if (fetchResponse.ok) {
        console.log("sent image");
      }
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
      fetchResponse = await fetchResponse.json();
      props.sendImgMsg(fetchResponse);
    } catch (err) {
      console.log(err);
    }
  }

  //-----------------Send Files-----------------//
  const [file, setFile] = useState(null);

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFileMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (file) {
      let data = new FormData();
      data.append("image", file, file.name);
      axios
        .post("/api/uploadImage", data)
        .then((result) => {
          console.log("server response: ");
          console.log(result);
          returnedURL = result.data.downloadUrl;
          postToDB(returnedURL, "file");
          setFile(null);
          setInputType("text");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("no file added");
    }
  };

  //----------------Send Polls-------------------//
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

  //------------------------------------------------//

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
          <div className="file-button">
            <label htmlFor="file-input" className="file-input-label">
              <span
                id="file"
                className="material-icons md"
                onClick={(e) => handleChangeInput(e)}
              >
                upload_file
              </span>
            </label>
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
              name="image"
              onChange={(e) => handleUploadImage(e)}
            />

            <img className="img-preview" src={pictureURL} alt="IMG"></img>

            {loading ? (
              <button
                onClick={handleLoading}
                style={{ "background-color": "grey" }}
              >
                <span className="material-icons md-dark">send</span>
              </button>
            ) : (
              <button>
                <span className="material-icons md-light">send</span>
              </button>
            )}
          </form>
        ) : inputType === "file" ? (
          <form
            className="file-form-container"
            onSubmit={handleSubmitFileMessage}
          >
            {file && (
              <div className="documents-container">
                <svg
                  width="42"
                  height="45"
                  viewBox="0 0 42 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.3636 15.4545V28C25.3636 30.4109 23.4109 32.3636 21 32.3636C18.5891 32.3636 16.6364 30.4109 16.6364 28V14.3636C16.6364 12.8582 17.8582 11.6364 19.3636 11.6364C20.8691 11.6364 22.0909 12.8582 22.0909 14.3636V25.8182C22.0909 26.4182 21.6 26.9091 21 26.9091C20.4 26.9091 19.9091 26.4182 19.9091 25.8182V15.4545H18.2727V25.8182C18.2727 27.3236 19.4945 28.5455 21 28.5455C22.5055 28.5455 23.7273 27.3236 23.7273 25.8182V14.3636C23.7273 11.9527 21.7745 10 19.3636 10C16.9527 10 15 11.9527 15 14.3636V28C15 31.3164 17.6836 34 21 34C24.3164 34 27 31.3164 27 28V15.4545H25.3636Z"
                    fill="black"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="44"
                    rx="9.5"
                    stroke="black"
                  />
                </svg>
                <div className="document-details-container">
                  <a href="">
                    {file.name.length > 20 ? (
                      <p className="file-name">{reduceNameLength(file.name)}</p>
                    ) : (
                      <p className="file-name">{file.name}</p>
                    )}

                    <p className="file-size">{`${
                      (file.size - (file.size % 1000)) / 1000
                    } KB`}</p>
                  </a>
                </div>
              </div>
            )}

            <input
              type="file"
              accept=".pdf,.csv,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,text/html"
              id="file-input"
              name="file"
              onChange={(e) => handleUploadFile(e)}
            />
            {loading ? (
              <button
                onClick={handleLoading}
                style={{ "background-color": "grey" }}
              >
                <span className="material-icons md-dark">send</span>
              </button>
            ) : (
              <button>
                <span className="material-icons md-light">send</span>
              </button>
            )}
          </form>
        ) : (
          <h1>hello</h1>
        )}
      </div>
    </>
  );
}

export default MessageInput;
