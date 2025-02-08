import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { IconBack } from '../assets/icons/Icons'
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
const { colors } = theme;

const BackButton = ({ size = 26, ...props }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <IconBack height={size} width={size} strokeWidth={1.6} {...props} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',

  }

})