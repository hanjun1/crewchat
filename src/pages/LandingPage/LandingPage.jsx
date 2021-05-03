import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

function LandingPage(props) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <div className="LandingPage">
      {/* Main Section */}

      <div className="main">
        <div className="circle"></div>
        <h1 className="logo">Crew Chat</h1>
        <Link to="/authentication" className="login">
          <h2>Login</h2>
        </Link>
        <h1 className="caption">The best way to connect with your crew</h1>
        <Link to="/authentication">
          <button>Try it now</button>
        </Link>
        {isDesktop ? (
          <img src="https://i.imgur.com/LSvz8dl.png" alt="IMG" />
        ) : (
          <img src="https://i.imgur.com/foIJJeW.png" alt="IMG" />
        )}
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Send not only messages, but also...</h2>
        <div className="card-container">
          <FeatureCard
            title={"Images"}
            imageLink={"https://i.imgur.com/4ANZ9PE.png"}
          />
          <FeatureCard
            title={"Files"}
            imageLink={"https://i.imgur.com/SDrxAqQ.png"}
          />
          <FeatureCard
            title={"Polls"}
            imageLink={"https://i.imgur.com/XYbWmDB.png"}
          />
          <FeatureCard
            title={"Events"}
            imageLink={"https://i.imgur.com/cKawS4i.png"}
          />
        </div>
      </div>

      {/* Responsive Section */}
      <div className="responsive">
        <h1 className="words">Use CrewChat anywhere</h1>
        <h2 className="words">Mobile, Tablet, and Desktop Compatible</h2>
        <div className="images">
          <img
            className="desktop"
            src="https://i.imgur.com/LSvz8dl.png"
            alt="IMG"
          />
          <img
            className="tablet"
            src="https://i.imgur.com/rPTdYdl.png"
            alt="IMG"
          />
          <img
            className="mobile"
            src="https://i.imgur.com/foIJJeW.png"
            alt="IMG"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <h4>© Cindy Xu , Ryan Kim, 2021</h4>
      </div>
    </div>
  );
}

export default LandingPage;
