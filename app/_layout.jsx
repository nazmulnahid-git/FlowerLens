import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default _layout