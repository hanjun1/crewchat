import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      };
      const fetchRespose = await fetch("/api/users/login", options);

      if (!fetchRespose.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchRespose.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      props.setUser(userDoc);
    } catch (err) {
      console.log("LoginForm error", err);
      setError("Login Failed - Try Again");
    }
  };

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          required
        />
        <br />
        <button className="login-btn">Log In</button>
      </form>
      <p>&nbsp;{error}</p>
      {/* <p className="signup-link">don't have an account? Sign Up</p> */}
    </div>
  );
}

export default LoginForm;
