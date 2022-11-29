import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNav from "./src/navigation/AppNav";
import { SafeAreaView, View } from "react-native";
import About from "./src/components/ui/About";
import BackWaves from "./src/assets/BackWaves";

function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#212529" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <AppNav />
        </Provider>
        <About />
      </SafeAreaView>
    </View>
  );
}

export default App;
