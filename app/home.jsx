import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
const { colors } = theme;

const HomeScreen = () => {
  return (
    <ScreenWrapper bg="#fff">
      <View style={styles.container}>
        {/* <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <Image
          source={require('@/assets/images/programmer.png')}
          style={styles.image}
        /> */}
        <Text style={styles.title}>
          Welcome to ACM Luminary
        </Text>
        <Text style={styles.subtitle}>
          Connect, collaborate, and grow with ACM community. Together, we build
          and share knowledge.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signInButton}
          // onPress={}
          >
            <Text style={styles.buttonSignIn}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
          // onPress={}
          >
            <Text style={styles.buttonSignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    width: 120,
  },
  image: {
    marginVertical: 20,
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.gray,
    marginTop: 16,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '80%',
    borderWidth: 2,
    borderColor: colors.primary,
    height: 60,
    borderRadius: 30,
  },
  signInButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    height: '100%',
  },
  signUpButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonSignIn: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonSignUp: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default HomeScreen;