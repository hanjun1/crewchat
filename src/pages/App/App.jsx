import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import MessagePage from "../MessagePageTest/MessagePage";
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
              <MessagePage handleLogout={handleLogout} user={user} />
            )}
          />
          {/* <Route
            path="/messages"
            render={(props) => <MessagesPage {...props} />}
          /> */}
          <Redirect to="/" />
        </Switch>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}

export default App;
