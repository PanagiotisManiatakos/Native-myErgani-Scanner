import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import LoginScreen from "../screens/LoginScreen";
import Application from "../screens/Application";
import { ReduxContext } from "../Context";

const AppNav = () => {
  const { session } = React.useContext(ReduxContext);
  return (
    <NavigationContainer>{session && session !== null ? <Application /> : <LoginScreen />}</NavigationContainer>
    // <Application />
  );
};

export default AppNav;
