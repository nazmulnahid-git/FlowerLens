import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const defaultProps = {
  width: 26,
  height: 26,
  color: "#000000",
  strokeWidth: 2,
};

export const IconMenu = ({
  width,
  height,
  color,
  strokeWidth,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width || defaultProps.width}
    height={height || defaultProps.height}
    color={color || defaultProps.color}
    fill="none"
    {...props}
  >
    <Path
      d="M4 5L16 5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 12L20 12"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 19L12 19"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
