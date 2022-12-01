import { StyleSheet, ScrollView, KeyboardAvoidingView, Pressable, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FloatingLabel from "../../components/ui/FloatingLabel";
import login from "../../services/login";
import Loader from "../../components/ui/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ setAllOk, setLogin }) => {
  const [loading, setLoading] = useState(false);

  const [connection, setConnection] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [conError, setConnError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [error, setError] = useState("");

  const userRef = useRef();
  const passRef = useRef();

  const handleLogin = async () => {
    if (connection === "") {
      setConnError(true);
      return;
    }
    if (user === "") {
      setUserError(true);
      return;
    }
    if (pass === "") {
      setPassError(true);
      return;
    }
    setLoading(true);
    const response = await login({
      url: `https://${connection}.oncloud.gr/s1services`,
      username: user,
      password: pass,
    });
    if (response.success) {
      AsyncStorage.setItem("login", JSON.stringify(response));
      AsyncStorage.setItem("lastlogin", JSON.stringify({ connection, user, pass }));
      setLogin({ username: user, password: pass, sn: response.sn, objs: response.objs, clientID: response.clientID });
      setAllOk(true);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(response);
    }
  };

  useEffect(() => {
    const getPrevious = async () =>
      await AsyncStorage.getItem("lastlogin").then((d) => {
        const data = JSON.parse(d);
        setConnection(data?.connection ?? "");
        setUser(data?.user ?? "");
        setPass(data?.pass ?? "");
      });
    // setConnection(previous?.connection ?? "");
    // setUsername(previous?.username ?? "");
    getPrevious();
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={styles.viewContainer}>
        <ScrollView contentContainerStyle={{ padding: 30 }} keyboardShouldPersistTaps="handled">
          <FloatingLabel
            label="Σύνδεση"
            value={connection}
            onSubmitEditing={() => userRef.current.focus()}
            onChangeText={(d) => setConnection(d)}
          />
          <FloatingLabel
            innerRef={userRef}
            label="Username"
            textContentType="username"
            value={user}
            onSubmitEditing={() => passRef.current.focus()}
            onChangeText={(d) => setUser(d)}
          />
          <FloatingLabel
            innerRef={passRef}
            label="Password"
            textContentType="password"
            secureTextEntry={true}
            value={pass}
            onSubmitEditing={handleLogin}
            onChangeText={(d) => setPass(d)}
          />
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text className="text-slate-900 font-medium text-sm">Είσοδος</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    // alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
  },
});
