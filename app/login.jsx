import React, { useState, useCallback } from 'react';
import { Text, Pressable, View, StyleSheet, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { hp, wp } from '@/helpers/common';
import { IconEmail, IconPassword } from '../assets/icons/Icons';
import { theme } from '../constants/theme';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Input from '../components/Input';
import ScreenWrapper from '../components/ScreenWrapper';

const { colors } = theme;

const LoginScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = useCallback(() => {
    const { email, password } = formData;
    if (!email || !password) {
      return 'Please enter both email and password to login.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return null;
  }, [formData]);

  const handleLogin = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }
    console.log('Form Data', formData);

    setLoading(true);
    // try {
    //   const { error } = await supabase.auth.signInWithPassword({
    //     email: formData.email,
    //     password: formData.password,
    //   });
    //   if (error) throw new Error(error.message);
    // } catch (err) {
    //   Alert.alert('Login Failed', err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const inputConfig = [
    {
      key: 'email',
      placeholder: 'Enter Your Email',
      keyboardType: 'email-address',
      icon: <IconEmail strokeWidth={1.6} height={25} width={25} color={colors.gray} />,
    },
    {
      key: 'password',
      placeholder: 'Enter Your Password',
      secureTextEntry: true,
      icon: <IconPassword strokeWidth={1.6} height={26} width={26} color={colors.gray} />,
    },
  ];

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton size={30} color={colors.primary} />
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.instructionText}>Please log in to continue ...</Text>
          {inputConfig.map(({ key, ...props }) => (
            <Input
              key={key}
              {...props}
              value={formData[key]}
              onChangeText={(value) => handleChange(key, value)}
              placeholderTextColor={colors.gray}
            />
          ))}
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <Button title="Login" buttonStyle={styles.loginButton} onPress={handleLogin} loading={loading} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => router.replace('/signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: 25,
  },
  welcomeText: {
    fontSize: hp(5),
    color: colors.textDark,
    fontWeight: theme.fonts.bold,
  },
  form: {
    gap: 25,
  },
  instructionText: {
    fontSize: hp(2),
    color: colors.text,
  },
  forgotPassword: {
    textAlign: 'right',
    color: colors.primary,
    fontWeight: theme.fonts.semibold,
  },
  loginButton: {
    marginHorizontal: wp(3),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    color: colors.text,
    fontSize: hp(2),
  },
  signupLink: {
    color: colors.primary,
    fontWeight: theme.fonts.semibold,
  },
});

export default LoginScreen;
