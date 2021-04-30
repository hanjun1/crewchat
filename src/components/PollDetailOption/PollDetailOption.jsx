import React, { useState, useEffect } from "react";
import "./PollDetailOption.css";

function PollDetailOption(props) {
  let width = `${(props.option.voters.length / props.totalPeople) * 100}%`;
  const [showMore, setShowMore] = useState(false);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowMore = () => setShowMore(!showMore);

  const checkStatus = () => {
    for (let voter of props.voters) {
      if (voter._id == props.user._id) {
        setVoted(true);
        return;
      }
    }
    setVoted(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleLoading = (e) => {
    e.preventDefault();
  };

  const handleVoted = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVoted(!voted);
    try {
      let jwt = localStorage.getItem("token");
      let body = {
        groupId: props.groupId,
        msgId: props.msgId,
        userId: props.user._id,
        optionId: props.optionId,
        setLoading: setLoading,
      };
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      };
      let response;
      if (!voted) {
        response = await fetch(`/api/messages/${props.groupId}/vote`, options);
      } else {
        response = await fetch(
          `/api/messages/${props.groupId}/unvote`,
          options
        );
      }
      if (response.ok) {
        console.log("OKAY!");
      } else if (!response.ok) {
        throw new Error("Fetch failed - Bad request");
      }
      response = await response.json();
      props.updatePoll(response);
      setTimeout(() => {
        setLoading(false);
      }, 50);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="PollDetailOption">
      <div className="voting-details">
        {props.showButton && (
          <div className="button-container">
            {voted ? (
              loading ? (
                <form onClick={handleLoading}>
                  <button style={{ background: "#707070" }}>-</button>
                </form>
              ) : (
                <form onClick={handleVoted}>
                  <button>-</button>
                </form>
              )
            ) : loading ? (
              <form onClick={handleLoading}>
                <button style={{ background: "#707070" }}>+</button>
              </form>
            ) : (
              <form onClick={handleVoted}>
                <button>+</button>
              </form>
            )}
          </div>
        )}
        <div className="details-container">
          <div className="option-container">
            <div className="option-name-container">
              <p>{props.option.option}</p>
            </div>
            <div className="votes-container">
              <p>{props.option.voters.length} votes&ensp;</p>
              <div className="drop-down-container">
                {showMore ? (
                  <svg
                    onClick={() => handleShowMore()}
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.88 10L8 3.81916L14.12 10L16 8.09717L8 0L0 8.09717L1.88 10Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => handleShowMore()}
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.12 0L8 6.18084L1.88 0L0 1.90283L8 10L16 1.90283L14.12 0Z"
                      fill="#56597B"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="vote-bar">
            <div className="current-vote" style={{ width }}></div>
          </div>
        </div>
      </div>
      {showMore && (
        <div className="people-container">
          {props.voters.map((person) => (
            <div className="person-container">
              {person.picture === "" ? (
                <>
                  <span className="material-icons">account_circle</span>
                </>
              ) : (
                <>
                  <div className="member-icon">
                    <img
                      className="member-icon-img"
                      src={person.picture}
                      alt="IMG"
                    ></img>
                  </div>
                </>
              )}
              <div>
                <p>{person.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PollDetailOption;
