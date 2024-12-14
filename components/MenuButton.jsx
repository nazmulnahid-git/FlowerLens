import React from 'react';
import { Pressable } from 'react-native';
import { IconMenu } from '../assets/icons/Icons';
import { theme } from '../constants/theme';

const { colors } = theme;

const MenuButton = ({ size = 26, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <IconMenu
        width={size}
        height={size}
        strokeWidth={2.5}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default MenuButton;
