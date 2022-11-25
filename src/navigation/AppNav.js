import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import Login from "../screens/Login";

const AppNav = () => {
  return (
    // <NavigationContainer>
    //   <AuthStack />
    // </NavigationContainer>
    <Login />
  );
};

export default AppNav;
