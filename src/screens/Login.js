import { StyleSheet, TextInput, View, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import back from "../assets/back.svg";
import FloatingLabel from "../components/ui/FloatingLabel";

const Login = () => {
  const [connetion, setConnection] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.mainBody}>
      <FloatingLabel label="Σύνδεση" value={connetion} onChangeText={(d) => setConnection(d)} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 30,
  },
});
