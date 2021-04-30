import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import MessagesPage from "../MessagesPage/MessagesPage";
import NewGroupPage from "../NewGroupPage/NewGroupPage";
import ImageTestPage from "../ImageTestPage/ImageTestPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import LandingPage from "../LandingPage/LandingPage";

function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    let token = localStorage.getItem("token");

    if (token) {
      if (Date.now() < JSON.parse(atob(token.split(".")[1])).exp * 1000) {
        // let userDoc = JSON.parse(atob(token.split(".")[1])).user;
        await fetchUser(token);
      } else {
        setUser(null);
      }
    }

    setLoaded(true);
  }, []);

  async function fetchUser(jwt) {
    try {
      let fetchResponse = await fetch("/api/users", {
        headers: { Authorization: "Bearer " + jwt },
      });
      let fetchedUser = await fetchResponse.json();
      setUser(fetchedUser);
    } catch (error) {
      console.log(error);
    }
  }

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
              render={(props) => (
                <ProfilePage
                  {...props}
                  user={user}
                  setUser={setUser}
                  handleLogout={handleLogout}
                />
              )}
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
              path="/authentication"
              exact
              render={(props) => <AuthPage setUser={setUser} />}
            />
            <Route path="/" exact render={(props) => <LandingPage />} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
