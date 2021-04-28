import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./AuthPage.css";

function AuthPage(props) {
  return (
    <div className="AuthPage">
      <Tabs>
        <TabList>
          <Tab>Log In</Tab>
          <Tab>Create an Account</Tab>
        </TabList>
        <TabPanel>
          <LoginForm setUser={props.setUser} />
        </TabPanel>
        <TabPanel>
          <SignUpForm setUser={props.setUser} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default AuthPage;
