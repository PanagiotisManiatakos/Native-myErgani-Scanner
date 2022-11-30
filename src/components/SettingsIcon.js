import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SettingsModal from "./modals/SettingsModal";

const SettingsIcon = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Pressable className="hover:scale-[1.1] p-4" style={styles.container} onPress={() => setShow(true)}>
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
    top: 10,
    right: 10,
  },
});
