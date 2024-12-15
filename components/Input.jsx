import { StyleSheet, Text, View, TextInput } from 'react-native'; // Change here
import React from 'react';
import { hp } from '@/helpers/common';
import { theme } from '../constants/theme';

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1, marginLeft: props.icon ? 10 : 0 }}
        placeholder={props.placeholder}
        placeholderTextColor={theme.colors.gray}
        ref={props.inputRef} // Simplified
        {...props} // Spread the rest of the props
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 0.4,
    borderCurve: 'continuous',
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    paddingHorizontal: 15,
  },
});