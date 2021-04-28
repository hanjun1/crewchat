import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import MessagesPage from "../MessagesPage/MessagesPage";
import NewGroupPage from "../NewGroupPage/NewGroupPage";
import ImageTestPage from "../ImageTestPage/ImageTestPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import Profile from "../../components/Profile/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

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

    setLoaded(true);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  if (!loaded) {
    return <LoadingPage />;
  } else {
    return (
      <div className="App">
        {user ? (
          <Switch>
            <Route
              path="/profile"
              exact
              render={(props) => <Profile {...props} />}
            />
            <Route
              path="/groups/create"
              exact
              render={(props) => (
                <NewGroupPage {...props} handleLogout={handleLogout} />
              )}
            />
            <Route
              path="/groups/:id?"
              render={(props) => (
                <MessagesPage
                  {...props}
                  user={user}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route
              path="/test"
              exact
              render={(props) => <ImageTestPage {...props} />}
            />
            <Redirect to="/groups/:id?" />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <AuthPage setUser={setUser} />}
            />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
