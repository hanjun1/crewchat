import React from "react";
import "./DocumentDetail.css";

function DocumentDetail(props) {
  return (
    <div className="DocumentDetail">
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
          <p className="file-name">{props.name}</p>
          <p className="file-size">{props.size}</p>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetail;
