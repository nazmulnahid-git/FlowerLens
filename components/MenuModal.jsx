import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ScrollView,
  Easing,
  FlatList
} from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCancel } from '../assets/icons/Icons';
import Input from './SearchInput';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

const MenuModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const history=[
    {
      id:1,
      title:'History 1',
    }
  ];


  // Animation for modal sliding in/out
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -wp(80),
      duration: 400,
      easing: Easing.inOut(Easing.ease), // Add easing for smoother effect
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleClose = () => {
    setIsFocused(false);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        {/* Dismiss Modal on Outside Press */}
        <Pressable
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
          accessibilityLabel="Close"
        />

        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              width: isFocused ? '100%' : wp(80),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Header Section */}
          <View style={
            [styles.modalHeader, isFocused && styles.modalHeaderFocused]
          }>
            {
              !isFocused && <View style={styles.modalHeaderInner}>
                <Text style={styles.modalTitle}>{user ? 'History' : 'Welcome'}</Text>
                <Pressable onPress={handleClose} accessibilityLabel="Close">
                  <IconCancel
                    width={wp(8)}
                    height={wp(8)}
                    strokeWidth={1.2}
                    color={theme.colors.danger}
                  />
                </Pressable>
              </View>
            }
            {user ? <Input isFocused={isFocused} setIsFocused={setIsFocused} style={{ backgroundColor: 'white' }} /> :
              <Text style={styles.subText}>You are not logged in.</Text>
            }

          </View>
          {
            !user && <></>
          }

          {/* Main Content */}
          {!user ? (
            <View style={styles.authContainer}>
              <Text style={styles.subText}>Please log in or sign up to save and access your search history.</Text>
              <Pressable
                style={({ pressed }) => [styles.button, styles.loginBtn, pressed && styles.pressed]}
                onPress={() => {
                  handleClose();
                  router.push('login');
                }}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.button, styles.signupBtn, pressed && styles.pressed]}
                onPress={() => {
                  handleClose();
                  router.push('signup');
                }}
              >
                <Text style={[styles.buttonText, styles.signupText]}>Sign Up</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList style={styles.modalContent}>
              <Text style={styles.sectionText}>Additional content goes here...</Text>
              <Text style={styles.sectionText}>Additional content goes here...</Text>
              <Text style={styles.sectionText}>Additional content goes here...</Text>
              <Text style={styles.sectionText}>Additional content goes here...</Text>
              <Text style={styles.sectionText}>Additional content goes here...</Text>
              <Text style={styles.sectionText}>Additional content goes here...</Text>
            </FlatList>
          )}

          <View style={styles.modalFooter}>
            <Pressable onPress={() => { }} accessibilityLabel="Close">

              <Text>Md Nazmul Nahid</Text>
            </Pressable>

          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: '#fff',
    elevation: 10,
  },
  modalHeader: {
    padding: 7,
    paddingBottom: 10,
    backgroundColor: theme.colors.primaryLight,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
  },
  modalHeaderFocused: {
    backgroundColor: '#cbd0e7',
    paddingTop: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalHeaderInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: wp(7),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  modalContent: {
    flex: 1,
    paddingTop: hp(1),
  },
  sectionText: {
    fontSize: wp(4),
    marginBottom: hp(1),
    color: theme.colors.textPrimary,
  },
  authContainer: {
    padding: wp(5),
    borderRadius: wp(4),
    margin: wp(3),
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  headerText: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: hp(1),
  },
  subText: {
    fontSize: wp(4),
    color: theme.colors.textPrimary,
    margin: hp(1),
  },
  button: {
    width: '80%',
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    alignItems: 'center',
    marginVertical: hp(1),
  },
  loginBtn: {
    backgroundColor: theme.colors.primary,
  },
  signupBtn: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: wp(3),
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    color: theme.colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  modalFooter: {
    padding: 10,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
  },
});