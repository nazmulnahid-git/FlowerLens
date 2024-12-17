import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { hp, wp } from '@/helpers/common';
import { theme } from '../constants/theme';
import { IconSearch } from '../assets/icons/Icons';

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
          width={wp(7)}
          height={hp(7)}
          color={theme.colors.gray}
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
