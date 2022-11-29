import React, { useEffect, useState } from "react";
import { CheckBox, Dialog } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsModal = ({ show, setShow }) => {
  const [checked, setChecked] = useState("QR");

  useEffect(() => {
    const getAsync = async () => {
      if (show) {
        await AsyncStorage.getItem("scantype")
          .then((d) => setChecked(d))
          .catch((er) => setChecked("QR"));
      }
    };

    getAsync();
  }, [show]);

  const handleSave = async () => {
    await AsyncStorage.setItem("scantype", checked)
      .then((d) => console.log(d))
      .catch((er) => console.log(er));
    setShow(false);
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
      <Dialog.Title title="Ρυθμίσεις" titleStyle={{ color: "white", justifyContent: "center", alignItems: "center" }} />
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
      <Dialog.Actions>
        <Dialog.Button title="Αποθήκευση" onPress={handleSave} />
        <Dialog.Button title="Άκυρο" onPress={() => setShow(false)} />
      </Dialog.Actions>
    </Dialog>
  );
};

export default SettingsModal;
