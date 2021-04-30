import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage(props) {
  return (
    <div className="LandingPage">
      <Link to="/authentication">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default LandingPage;
