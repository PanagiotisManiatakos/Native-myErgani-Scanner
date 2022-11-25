import { ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import back from "../assets/back.svg";

const Login = () => {
  const [connetion, setConnection] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <ImageBackground source={back} style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          onChangeText={() => setConnection(1)}
          value={connetion}
          placeholder="Connection"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={() => setConnection(1)}
          value={connetion}
          placeholder="Connection"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={() => setConnection(1)}
          value={connetion}
          placeholder="Connection"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={() => setConnection(1)}
          value={connetion}
          placeholder="Connection"
          keyboardType="numeric"
        />
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "black",
  },
  card: {
    flex: 1,
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "black",
  },
  input: {
    width: "100%",
    textDecorationColor: "white",
  },
});
