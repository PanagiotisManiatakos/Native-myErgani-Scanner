import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Logo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48.8 48"
    style={{
      enableBackground: "new 0 0 48.8 48",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Path
      style={{
        fill: "#29aae1",
      }}
      d="m33.3 19.2-9.5.1V5.2L33.3 0z"
    />
    <Path
      style={{
        fill: "#ec2427",
      }}
      d="M48.8 48h-9.5V5.2L48.8 0z"
    />
    <Path
      d="M3.9 44.7C1.2 42.1 0 38.5 0 33.6c0-4.8 1.2-8.5 3.9-11 1.9-1.8 4.6-3.2 9.8-3.2l19.6-.1-9.6 9.6h-9.6c-2 0-3 .2-4 1s-1.7 1.5-1.7 3.8c0 2.4.7 3 1.7 3.9 1 .8 2 1 4 1l19.2-.1V48l-19.6-.1c-5.2 0-7.9-1.3-9.8-3.2"
      style={{
        fill: "#0d73bb",
      }}
    />
  </Svg>
);

export default Logo;
