import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { hp, wp } from '@/helpers/common';
import { theme } from '../constants/theme';
import Svg, { Path } from 'react-native-svg';

const IconSearch = ({ width = 24, height = 24, color = '#000000', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      d="M17.5 17.5L22 22"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

const Input = ({
  placeholder = 'Search',
  placeholderTextColor = theme.colors.gray,
  icon = true,
  inputRef,
  style,
  iconProps,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <IconSearch
          width={24}
          height={24}
          color={theme.colors.gray}
          accessibilityLabel="Search Icon"
          {...iconProps}
        />
      )}
      <TextInput
        style={[styles.textInput, { marginLeft: icon ? wp(2) : 0 }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        ref={inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingHorizontal: wp(3),
    backgroundColor: theme.colors.background,
  },
  textInput: {
    flex: 1,
    fontSize: wp(4),
    color: theme.colors.textPrimary,
  },
});
