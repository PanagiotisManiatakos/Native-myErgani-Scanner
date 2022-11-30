import React from "react";
import AppNav from "./src/navigation/AppNav";
import { SafeAreaView, View } from "react-native";
import About from "./src/components/ui/About";
import "./styles";
import { ReduxContext } from "./src/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const [session, setSession] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [scan, setScan] = React.useState(undefined);

  React.useEffect(() => {
    const initRedux = async () => {
      await AsyncStorage.getItem("session").then((d) => setSession(d));
      await AsyncStorage.getItem("login").then((d) => setLogin(d));
      await AsyncStorage.getItem("scan").then((d) => setScan(d));
    };

    initRedux();
  }, []);

  const context = { session, setSession, login, setLogin, scan, setScan };
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <ReduxContext.Provider value={context}>
          <AppNav />
          <About />
        </ReduxContext.Provider>
      </SafeAreaView>
    </View>
  );
}

export default App;
