import React, { useEffect, useState } from "react";
import { CheckBox, Dialog } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View } from "react-native";
import { ReduxContext } from "../../Context";

const SettingsModal = ({ show, setShow }) => {
  const { scan, setScan, setLogin, setSession } = React.useContext(ReduxContext);
  const [checked, setChecked] = useState("QR");

  useEffect(() => {
    if (show) {
      scan && setChecked(scan);
    }
  }, [show]);

  const handleSave = async () => {
    AsyncStorage.setItem("scan", checked);
    setScan(checked);
    setShow(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("session").then(() => setSession(undefined));
    await AsyncStorage.removeItem("login").then(() => setLogin(undefined));
  };

  const types = [
    {
      code: "QR",
      name: "Camera QR",
    },
    {
      code: "NFC",
      name: "NFC Reader",
    },
  ];
  return (
    <Dialog isVisible={show} onBackdropPress={() => setShow(false)}>
      <View className="flex flex-row justify-center align-center text-center">
        <Text className="text-white font-lg text-xl mb-2">Ρυθμίσεις</Text>
      </View>
      <View>
        {types.map((l) => (
          <CheckBox
            key={l.code}
            title={l.name}
            containerStyle={{ backgroundColor: "black", borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === l.code}
            onPress={() => setChecked(l.code)}
          />
        ))}
      </View>
      <View className="flex flex-row justify-evenly my-2 align-center">
        <Pressable
          onPress={() => setShow(false)}
          className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <Text className="text-white font-medium text-sm">Άκυρο</Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          className="focus:outline-none bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <Text className="text-white font-medium text-sm">Αποδοχή</Text>
        </Pressable>
      </View>
      <Pressable className="my-3" onPress={handleLogout}>
        <View className="flex flex-row justify-evenly align-center">
          <Text className="text-red-600 font-medium text-sm">Αποσύνδεση</Text>
        </View>
      </Pressable>
    </Dialog>
  );
};

export default SettingsModal;
