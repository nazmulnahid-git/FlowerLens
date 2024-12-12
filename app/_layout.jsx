import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { Stack } from 'expo-router'
import Home from './home'

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

const MainLayout = () => {
  return (
    // <Home />
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default _layout