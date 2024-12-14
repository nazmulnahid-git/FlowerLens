import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { IconMenu } from '../assets/icons/Icons'
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
const { colors } = theme;

const MenuButton = ({ size = 26 }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => console.log('pressed')}>
      <IconMenu width={size} height={size} strokeWidth={2.5} color={colors.primary} />
    </Pressable>
  )
}

export default MenuButton