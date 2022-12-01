import { StyleSheet, View } from "react-native";
import { Chase } from "react-native-animated-spinkit";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Chase size={100} color="#ffc107" />
    </View>
  );
};
export default Loader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000cc",
    zIndex: 2000,
    justifyContent: "center",
    alignItems: "center",
  },
});
