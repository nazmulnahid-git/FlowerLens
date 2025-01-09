import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { IconBack } from '../assets/icons/Icons'
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
const { colors } = theme;

const BackButton = ({ size = 24, ...props }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()}>
      <IconBack size={size} strokeWidth={1.5} color={colors.primary} {...props} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})