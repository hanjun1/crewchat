import React, { useState } from "react";

function SignUpForm(props) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        }),
      };
      const fetchResponse = await fetch("/api/users/signup", options);

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      props.setUser(userDoc);
    } catch (err) {
      console.log("SignUp Form error", err);
      setError("SignUp Failed - Try Again");
    }
  };

  const disable = userInfo.password !== userInfo.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
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
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={userInfo.confirm}
            onChange={(e) =>
              setUserInfo({ ...userInfo, confirm: e.target.value })
            }
            required
          />
          <br />
          <button disabled={disable}>Sign Up</button>
        </form>
      </div>
      <p>&nbsp;{error}</p>
    </div>
  );
}

export default SignUpForm;
