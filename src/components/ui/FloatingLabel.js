import { TextInput, View, Animated, Pressable } from "react-native";
import React, { Component } from "react";
import { MaterialIcons } from "react-native-vector-icons";

export default class FloatingLabel extends Component {
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
    const labelStyle = {
      position: "absolute",
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ["#aaa", "white"],
      }),
    };

    return (
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "stretch",
          position: "relative",
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: "#555",
        }}
      >
        <View style={{ flex: 1, paddingTop: 18 }}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <TextInput
            style={{ height: 26, fontSize: 20 }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...props}
          />
        </View>
        {this.props.value !== "" && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable>
              <MaterialIcons name="clear" size={25} color="white" />
            </Pressable>
          </View>
        )}
      </View>
    );
  }
}
