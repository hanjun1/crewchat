import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import MessagePage from "../MessagePageTest/MessagePage";
import MessagesPage from "../MessagesPage/MessagesPage";
import ChatRoomDetails from "../../components/ChatRoomDetails/ChatRoomDetails";
import GroupsPage from "../GroupsPage/GroupsPage";
import NewGroupForm from "../../components/NewGroupForm/NewGroupForm";
import NewGroupSuccessModal from "../../components/NewGroupSuccessModal/NewGroupSuccessModal";

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
          <Route
            path="/messages"
            render={(props) => <MessagesPage {...props} />}
          />
          <Route
            path="/chatdetails"
            render={(props) => <ChatRoomDetails {...props} />}
          />
          <Route path="/groups" render={(props) => <GroupsPage {...props} />} />
          <Route
            path="/newgroup"
            render={(props) => <NewGroupForm {...props} />}
          />
          <Route
            path="/newgroupmodal"
            render={(props) => <NewGroupSuccessModal {...props} />}
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
