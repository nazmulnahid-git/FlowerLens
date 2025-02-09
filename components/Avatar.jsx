import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '@/helpers/common'
import { theme } from '../constants/theme'

const Avatar = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {}
}) => {
  return (
    <Image
      source={uri}
      style={[
        styles.avatar,
        style,
        {
          width: size,
          height: size,
          borderRadius: rounded,
        }
      ]}
    />
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatar: {
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
})