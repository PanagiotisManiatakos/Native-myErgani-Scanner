import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalCamera from "../components/modals/ModalCamera";
import SettingsIcon from "../components/SettingsIcon";
import { ReduxContext } from "../Context";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
const back = require("../assets/back.svg");

const Application = () => {
  const [show, setShow] = useState(false);
  const { scan } = React.useContext(ReduxContext);
  const [hasNfc, setHasNFC] = useState(null);

  const handleClick = async () => {
    if (scan === "QR") {
      setShow(true);
    } else {
      try {
        // register for the NFC tag with NDEF in it
        console.log("prin apo request tecnhology");
        await NfcManager.requestTechnology(NfcTech.IsoDep);
        console.log("meta apo request tecnhology");
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        console.log("meta");
        console.log("Tag found", tag);
      } catch (ex) {
        console.warn(ex);
      } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest();
      }
    }
  };

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported && scan === "NFC") {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground source={back} resizeMode="cover" style={styles.imageContainer}>
        <View>
          <Pressable
            className="focus:outline-none bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onPress={handleClick}
          >
            <Text className="text-white text-lg font-medium">Είσοδος</Text>
          </Pressable>
          <Pressable className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-5 py-2.5 my-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <Text className="text-white text-lg font-medium">Έξοδος</Text>
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
  imageContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
