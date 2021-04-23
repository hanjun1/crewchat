import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import MessagesPage from "../MessagesPage/MessagesPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      if (Date.now() < JSON.parse(atob(token.split(".")[1])).exp * 1000) {
        let userDoc = JSON.parse(atob(token.split(".")[1])).user;
        setUser(userDoc);
      } else {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <div className="App">
      {user ? (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <div>YOU LOGGED IN WOOT!</div>
                <button onClick={() => handleLogout()}>Logout</button>
              </>
            )}
          />
          <Route
            path="/messages"
            render={(props) => <MessagesPage {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}

export default App;
