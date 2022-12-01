import { TextInput, View, Animated, Pressable } from "react-native";
import React, { Component } from "react";
import { MaterialIcons } from "react-native-vector-icons";
class FloatingLabel extends Component {
  state = { isFocused: false };

  UNSAFE_componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === "" ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const style = defaultStyles;
    const animatedLabelStyle = {
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 10],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ["#888", "#888"],
      }),
    };

    return (
      // <View
      //   style={{
      //     justifyContent: "flex-start",
      //     flexDirection: "row",
      //     flexWrap: "nowrap",
      //     alignItems: "stretch",
      //     position: "relative",
      //     width: "100%",
      //     borderBottomWidth: 1,
      //     borderBottomColor: "#555",
      //   }}
      // >
      <View style={style.container}>
        <Animated.Text style={[style.labelStyle, animatedLabelStyle]}>{label}</Animated.Text>
        <TextInput
          style={style.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.props.innerRef}
          {...props}
          blurOnSubmit
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          clearButtonMode="always"
        />
      </View>
      //   {this.props.value !== "" && (
      //     <View style={{ alignItems: "center", justifyContent: "center" }}>
      //       <Pressable>
      //         <MaterialIcons name="clear" size={25} color="white" />
      //       </Pressable>
      //     </View>
      //   )}
      // </View>
    );
  }
}

export default React.forwardRef((props, ref) => <FloatingLabel innerRef={ref} {...props} />);

const defaultStyles = {
  container: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginVertical: 10,
  },
  labelStyle: {
    position: "absolute",
    left: 0,
  },
  textInput: {
    height: 20,
    marginTop: 18,
    fontSize: 20,
    color: "#fff",
  },
};
