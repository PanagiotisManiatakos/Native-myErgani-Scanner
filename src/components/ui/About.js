import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../assets/Logo";

const About = () => {
  return (
    <View style={styles.container}>
      <Logo width={40} height={40} />
      <Text style={styles.text}>powered by</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 4,
    fontSize: 9,
    color: "white",
  },
});
