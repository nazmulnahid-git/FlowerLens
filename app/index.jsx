import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '@/helpers/common';
import MenuButton from '../components/MenuButton'

const SearchScreen = () => {
  return (
    <ScreenWrapper bg='white'>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <MenuButton size={30} />
      </View>
    </ScreenWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: 45,
  },
});

export default SearchScreen;