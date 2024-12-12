import { Text, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { hp } from '@/helpers/common';
import { theme } from '../constants/theme';
import Loading from './Loading';

const Button = ({
  title = '',
  loading = true,
  buttonStyle,
  textStyle,
  hasShadow = true,
  onPress = () => { },
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };


  return (
    loading ? (
      <View style={[styles.button, buttonStyle, { backgroundColor: '#fff' }]}>
        <Loading />
      </View>
    ) : (
      <Pressable
        onPress={onPress}
        style={[styles.button, hasShadow && shadowStyle, buttonStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    )
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
    height: hp(7),
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
  },
});
