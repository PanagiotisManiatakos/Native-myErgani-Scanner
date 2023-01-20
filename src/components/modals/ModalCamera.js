import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dialog } from "@rneui/base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from "expo-av";
import { Ionicons } from "react-native-vector-icons";

const ModalCamera = ({ show, setShow }) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraDir, setCameraDir] = React.useState("front");
  const [scanned, setScanned] = React.useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("../../assets/beep.mp3"));
    await sound.playAsync();
  }

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  React.useEffect(() => {
    show && setScanned(false);
    show && setCameraDir("front");
  }, [show]);

  if (hasPermission === null) {
    return (
      <Dialog style={{ flex: 1 }} isVisible={show} onBackdropPress={() => setShow(false)}>
        <View>
          <Text className="text-white text-center">Requesting for camera permission</Text>
        </View>
      </Dialog>
    );
  }
  if (hasPermission === false) {
    return (
      <Dialog style={{ flex: 1 }} isVisible={show} onBackdropPress={() => setShow(false)}>
        <View>
          <Text className="text-white text-center">No access to Camera</Text>
        </View>
      </Dialog>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    playSound();
    setScanned(true);
    setShow(false);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  return (
    <Dialog
      overlayStyle={{ flex: 1, marginVertical: "40%", width: "85%" }}
      isVisible={show}
      onBackdropPress={() => setShow(false)}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          type={cameraDir}
          style={StyleSheet.absoluteFillObject}
        />
        <Pressable
          style={{ bottom: 0, right: 0, position: "absolute" }}
          onPress={() => setCameraDir(cameraDir == "front" ? "back" : "front")}
        >
          <Ionicons name="camera-reverse" size={40} />
        </Pressable>
        {/* {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />} */}
      </View>
      <Pressable
        className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-5 py-2.5 mt-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onPress={() => setShow(false)}
      >
        <Text className="text-white text-center text-lg font-medium">Κλείσιμο</Text>
      </Pressable>
    </Dialog>
  );
};

export default ModalCamera;
