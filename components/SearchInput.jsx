import React from 'react';
import { Pressable, StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { hp, wp } from '@/helpers/common';
import { theme } from '../constants/theme';
import { IconBack, IconSearch } from '../assets/icons/Icons';

const Input = ({
  placeholder = 'Search',
  placeholderTextColor = theme.colors.gray,
  icon = true,
  inputRef,
  style,
  iconProps,
  isFocused,
  setIsFocused,
  ...props
}) => {
  const prefixIcon = icon ? isFocused ?
    <Pressable onPress={() => {
      setIsFocused(false);
      Keyboard.dismiss();
    }}>
      <IconBack width={wp(7)} height={hp(7)} color={theme.colors.gray} />
    </Pressable >
    : <IconSearch width={wp(7)} height={hp(7)} color={theme.colors.gray} />
    : null;

  return (
    <View style={[styles.container, style]}>
      {prefixIcon}
      <TextInput
        style={[styles.textInput, { marginLeft: icon ? wp(2) : 0 }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
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
