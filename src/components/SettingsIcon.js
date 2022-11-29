import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SettingsModal from "./modals/SettingsModal";

const SettingsIcon = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Pressable style={styles.container} onPress={() => setShow(true)}>
        <FontAwesome name="gear" size={25} color="white" />
      </Pressable>
      <SettingsModal show={show} setShow={setShow} />
    </>
  );
};

export default SettingsIcon;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 20,
  },
});
