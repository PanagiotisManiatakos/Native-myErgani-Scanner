import React from "react";
import AppNav from "./src/navigation/AppNav";
import { SafeAreaView, Text, View } from "react-native";
import About from "./src/components/ui/About";
import "./styles";
import { ReduxContext } from "./src/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

function App() {
  const [session, setSession] = React.useState(undefined);
  const [login, setLogin] = React.useState(undefined);
  const [scan, setScan] = React.useState(undefined);
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    const initRedux = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await AsyncStorage.getItem("session").then((d) => setSession(JSON.parse(d)));
        await AsyncStorage.getItem("login").then((d) => setLogin(JSON.parse(d)));
        await AsyncStorage.getItem("scan").then((d) => setScan(d));
      } catch (error) {
      } finally {
        setAppIsReady(true);
      }
    };

    initRedux();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const context = { session, setSession, login, setLogin, scan, setScan };
  return (
    <View style={{ flex: 1, backgroundColor: "#181c24" }} onLayout={onLayoutRootView}>
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
