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
  FlatList,
  Image,
} from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCancel, IconHeaderLogo } from '../assets/icons/Icons';
import Input from './SearchInput';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { getHistory } from '../services/HistoryService';

const MenuModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getHistoryData = async () => {
    try {
      const res = await getHistory(user?.id);
      if (res.success) setHistory(res.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -wp(80),
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [visible]);

  useEffect(() => {
    if (user) getHistoryData();
  }, [user]);

  const handleClose = () => {
    setIsFocused(false);
    onClose();
  };

  const renderHistoryItem = ({ item }) => (
    <Pressable onPress={() => {
      handleClose();
      router.push(
        {
          pathname: `/details`,
          params: {
            class_id: item.details_id,
            predicion_percentage: item.accuracy,
            flower_image: item.image,
          }
        }
      );
    }
    }>
      <View style={styles.historyItem}>
        <Image source={{ uri: item.image }} style={styles.flowerImage} />
        <Text style={styles.flowerName}>{item.details.flower_name}</Text>
      </View>
    </Pressable >
  );

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.overlay} activeOpacity={1} onPress={handleClose} />

        <Animated.View
          style={[
            styles.modalContainer,
            {
              width: isFocused ? '100%' : wp(80),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={[styles.modalHeader, isFocused && styles.modalHeaderFocused]}>
            {!isFocused && (
              <View style={styles.modalHeaderInner}>
                <Text style={styles.modalTitle}>{user ? 'History' : 'Welcome'}</Text>
                <Pressable onPress={handleClose}>
                  <IconCancel width={wp(8)} height={wp(8)} strokeWidth={1.2} color={theme.colors.danger} />
                </Pressable>
              </View>
            )}
            {user ? (
              <Input isFocused={isFocused} setIsFocused={setIsFocused} style={{ backgroundColor: 'white' }} />
            ) : (
              <Text style={styles.subText}>You are not logged in.</Text>
            )}
          </View>

          {!user ? (
            <View style={styles.authContainer}>
              <IconHeaderLogo />
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
            // <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              renderItem={renderHistoryItem}
              contentContainerStyle={styles.historyList}
            />
            // </ScrollView>
          )}


          <View style={styles.modalFooter}>
            {user?.name ? <Text>{user?.name}</Text> : <Text> Flower Lens </Text>}
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
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
  },
  modalHeaderFocused: {
    backgroundColor: '#cbd0e7',
    paddingTop: 10,
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
  authContainer: {
    padding: wp(5),
    borderRadius: wp(4),
    marginTop: 'auto',
    marginBottom: hp(40),
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
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
  historyList: {
    padding: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  flowerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  flowerName: {
    fontSize: wp(4),
    color: theme.colors.textPrimary,
  },
  modalFooter: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    padding: 10,
    height: hp(8),
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
  },
});
