import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import Login from "../screens/Login";
import Application from "../screens/Application";
import { ReduxContext } from "../Context";

const AppNav = () => {
  const { session } = React.useContext(ReduxContext);
  console.log(session);
  return (
    <NavigationContainer>{session === null ? <Login /> : <Application />}</NavigationContainer>
    // <Application />
  );
};

export default AppNav;
