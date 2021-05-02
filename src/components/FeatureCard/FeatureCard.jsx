import React from "react";
import "./FeatureCard.css";

function FeatureCard({ title, imageLink }) {
  return (
    <div className="FeatureCard">
      <h4>{title}</h4>
      <div>
        <img src={imageLink} alt="IMG" />
      </div>
    </div>
  );
}

export default FeatureCard;
