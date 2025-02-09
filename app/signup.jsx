import React, { useState, useCallback } from 'react';
import { Text, Pressable, View, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { hp, wp } from '@/helpers/common';
import { IconEmail, IconPassword, IconProfile } from '../assets/icons/Icons';
import { theme } from '../constants/theme';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../lib/supabase';

const { colors } = theme;

const SignupScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = useCallback(() => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return 'Please fill all the fields to sign up.';
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      return 'Please enter a valid name.';
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

  const handleSignup = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }

    console.log('Form Data', formData);

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });
      if (error) {
        Alert.alert('Failed', error.message);
        return;
      }
      router.replace('/');
    } catch (err) {
      Alert.alert('Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputConfig = [
    {
      key: 'name',
      placeholder: 'Enter Your Full Name',
      icon: <IconProfile strokeWidth={1.6} height={25} width={25} color={colors.gray} />,
    },
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
    <ScreenWrapper>
      <StatusBar style='light' backgroundColor={theme.colors.primary} />
      <View style={styles.container}>
        <BackButton size={30} color={colors.primary} />
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.instructionText}>Please sign up to continue ...</Text>
          {inputConfig.map(({ key, ...props }) => (
            <Input
              key={key}
              {...props}
              value={formData[key]}
              onChangeText={(value) => handleChange(key, value)}
              placeholderTextColor={colors.gray}
            />
          ))}
          <Button title="Sign Up" buttonStyle={styles.signupButton} onPress={handleSignup} loading={loading} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.replace('/login')}>
              <Text style={styles.loginLink}>Log in</Text>
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
  signupButton: {
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
  loginLink: {
    color: colors.primary,
    fontWeight: theme.fonts.semibold,
  },
});

export default SignupScreen;
