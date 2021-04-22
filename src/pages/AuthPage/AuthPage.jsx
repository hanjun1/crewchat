import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="AuthPage">
      <div>
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Sign Up" : "Login"}
        </button>
      </div>
      <div>
        {showLogin ? (
          <LoginForm setUser={props.setUser} />
        ) : (
          <SignUpForm setUser={props.setUser} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
