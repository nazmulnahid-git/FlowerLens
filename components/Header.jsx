import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from './BackButton';
import { hp } from '@/helpers/common';
import { theme } from '../constants/theme';

const Header = ({
  title,
  showBackButton = true,
  mb = 10
}) => {
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {
        showBackButton && (
          <View style={styles.backButton}>
            <BackButton size={hp(3.5)} color={theme.colors.primary} />
          </View>
        )
      }
      <Text style={styles.title}>{title || ''}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  title: {
    fontSize: hp(3),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  }
})