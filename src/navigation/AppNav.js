import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import Login from "../screens/Login";
import Application from "../screens/Application";

const AppNav = () => {
  return (
    // <NavigationContainer>
    //   <AuthStack />
    // </NavigationContainer>
    <Application />
  );
};

export default AppNav;
