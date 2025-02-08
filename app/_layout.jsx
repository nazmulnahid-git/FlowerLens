import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Stack, useRouter } from 'expo-router'
import { getUserData } from '../services/UserService';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: TRenderEngineProvider', 'Warning: TNodeChildrenRenderer', 'Warning: MemoizedTNodeRenderer']);
const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user?.id);
      } else {
        setAuth(null);
      }
    })
  }, [])

  const updateUserData = async (user_id) => {
    const res = await getUserData(user_id);
    if (res.success) setUserData(res.data);
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default _layout