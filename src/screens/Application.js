import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalCamera from "../components/ui/ModalCamera";
import SettingsIcon from "../components/SettingsIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

const back = require("../assets/back.svg");

const Application = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("QR");

  useEffect(() => {
    const getAsync = async () =>
      await AsyncStorage.getItem("scantype")
        .then((d) => setType(d))
        .catch((er) => setType("QR"));

    getAsync();
  }, []);

  const handleClick = async () => {
    if (type === "QR") {
      setShow(true);
    } else {
      NfcManager.start();
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        console.warn("Tag found", tag);
      } catch (ex) {
        console.warn("Oops!", ex);
      } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest();
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={back} resizeMode="cover" style={styles.imageContainer}>
        <View>
          <Pressable style={styles.buttonIn} onPress={handleClick}>
            <Text style={styles.textButton}>Είσοδος</Text>
          </Pressable>
          <Pressable style={styles.buttonOut}>
            <Text style={styles.textButton}>Έξοδος</Text>
          </Pressable>
        </View>
      </ImageBackground>
      <ModalCamera show={show} setShow={setShow} />
      <SettingsIcon />
    </View>
  );
};

export default Application;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212529",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 16,
  },
  buttonIn: {
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#198754",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonOut: {
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#dc3545",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});
