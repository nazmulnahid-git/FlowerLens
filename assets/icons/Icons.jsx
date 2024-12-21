import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

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

export const IconCancel = ({
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
      d="M15 9L9 14.9996M15 15L9 9.00039"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
    />
  </Svg>
);


export const IconEdit = ({
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
      d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinejoin="round"
    />
    <Path
      d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconLogout = ({
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
      d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


export const IconDelete = ({
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
      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M9.5 16.5L9.5 10.5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M14.5 16.5L14.5 10.5"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const IconSearch = ({
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
      d="M17.5 17.5L22 22"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconBack = ({
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
    <Path d="M3.99982 11.9998L19.9998 11.9998"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7"
      stroke={color || defaultProps.color}
      strokeWidth={strokeWidth || defaultProps.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconGalleryUpload = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"
      width="130" height="130" viewBox="0 0 87 87" fill="none">
      <Path
        d="M16.6919 13.2801C18.6421 6.00166 26.1235 1.68231 33.4019 3.63257L72.9383 14.2263C80.2167 16.1766 84.5361 23.6579 82.5858 30.9364L71.9921 70.4727C70.0418 77.7512 62.5605 82.0705 55.2821 80.1203L15.7457 69.5265C8.46723 67.5763 4.14788 60.0949 6.09814 52.8165L16.6919 13.2801Z"
        fill="#6662FF"
      />
      <Path
        d="M0 39.8299C0 32.1887 0 28.3681 1.48707 25.4496C2.79514 22.8824 4.88236 20.7951 7.44959 19.4871C10.3681 18 14.1887 18 21.8299 18H46.3886C54.0297 18 57.8503 18 60.7689 19.4871C63.3361 20.7951 65.4233 22.8824 66.7314 25.4496C68.2185 28.3681 68.2185 32.1887 68.2185 39.8299V64.3886C68.2185 72.0297 68.2185 75.8503 66.7314 78.7689C65.4233 81.3361 63.3361 83.4233 60.7689 84.7314C57.8503 86.2185 54.0297 86.2185 46.3885 86.2185H21.8299C14.1887 86.2185 10.3681 86.2185 7.44959 84.7314C4.88236 83.4233 2.79514 81.3361 1.48707 78.7689C0 75.8503 0 72.0297 0 64.3885V39.8299Z"
        fill="url(#paint0_linear_125_8)"
      />
      <Path
        d="M21.8299 18.8527H46.3886C50.2232 18.8527 53.0479 18.8534 55.2803 19.0358C57.5026 19.2174 59.0627 19.5748 60.3817 20.2469C62.7885 21.4732 64.7453 23.4299 65.9716 25.8367C66.6437 27.1557 67.0011 28.7158 67.1827 30.9382C67.3651 33.1705 67.3657 35.9952 67.3657 39.8299V64.3886C67.3657 68.2232 67.3651 71.0479 67.1827 73.2803C67.0011 75.5026 66.6437 77.0627 65.9716 78.3817C64.7453 80.7885 62.7885 82.7453 60.3817 83.9716C59.0627 84.6437 57.5026 85.0011 55.2803 85.1827C53.0479 85.3651 50.2232 85.3657 46.3885 85.3657H21.8299C17.9952 85.3657 15.1705 85.3651 12.9382 85.1827C10.7158 85.0011 9.15573 84.6437 7.83671 83.9716C5.42993 82.7453 3.47316 80.7885 2.24685 78.3817C1.57477 77.0627 1.21735 75.5026 1.03577 73.2803C0.853385 71.0479 0.852722 68.2232 0.852722 64.3885V39.8299C0.852722 35.9952 0.853385 33.1705 1.03577 30.9382C1.21735 28.7158 1.57477 27.1557 2.24685 25.8367C3.47316 23.4299 5.42993 21.4732 7.83671 20.2469C9.15573 19.5748 10.7158 19.2174 12.9382 19.0358C15.1705 18.8534 17.9952 18.8527 21.8299 18.8527Z"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.70546"
      />
      <Path
        d="M28.4243 57.7942L34.1092 52.1093M34.1092 52.1093L39.7941 57.7942M34.1092 52.1093V64.9003M45.479 58.8499C47.215 57.4162 48.3214 55.2473 48.3214 52.8199C48.3214 48.5029 44.8217 45.0032 40.5047 45.0032C40.1941 45.0032 39.9036 44.8412 39.7459 44.5737C37.8926 41.4286 34.4708 39.3184 30.5562 39.3184C24.6693 39.3184 19.897 44.0906 19.897 49.9775C19.897 52.9139 21.0844 55.5729 23.0052 57.5008"
        stroke="white"
        strokeWidth="2.84244"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient id="paint0_linear_125_8" x1="34.1092" y1="18" x2="-29" y2="131" gradientUnits="userSpaceOnUse">
          <Stop offset="0.275223" stopColor="#D5D3FF" />
          <Stop offset="0.643784" stopColor="white" />
        </LinearGradient>
      </Defs>
    </Svg>

  );
};
