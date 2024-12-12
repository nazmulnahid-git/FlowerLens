import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'

const index = () => {
  return (
    <ScreenWrapper bg='white'>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Beng ... </Text>
      </View>
    </ScreenWrapper>
  )
}

export default index;