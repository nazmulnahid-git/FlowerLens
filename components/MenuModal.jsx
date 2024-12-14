import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCancel, IconEdit, IconLogout } from '../assets/icons/Icons';

const MenuModal = ({ visible, onClose, title }) => {
  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const [openSubMenu, setOpenSubMenu] = useState(false);

  // Animation for modal sliding in/out
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -wp(80),
      duration: visible ? 300 : 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);

  const closeModal = () => {
    setOpenSubMenu(false); // Close submenu when closing modal
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <Pressable style={styles.overlay} activeOpacity={1} onPress={closeModal} />
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.modalHeader}>
            <Pressable onPress={closeModal}>
              <IconCancel width={wp(8)} height={wp(8)} strokeWidth={1.2} color={theme.colors.danger} />
            </Pressable>

            <View style={styles.userInfo}>
              <Pressable onPress={toggleSubMenu}>
                <Text style={styles.userName}>Md Nazmul Nahid</Text>
              </Pressable>
              {openSubMenu && (
                <Animated.View style={styles.subMenu}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                  }}>
                    <IconEdit width={wp(6)} height={wp(6)} strokeWidth={1.2} color={theme.colors.primary} />
                    <Text style={styles.subMenuItem}>Edit Profile</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                  }}>
                    <IconLogout width={wp(6)} height={wp(6)} strokeWidth={1.2} color={theme.colors.primary} />
                    <Text style={styles.subMenuItem}>Sign Out</Text>
                  </View>
                </Animated.View>
              )}
            </View>
          </View>

          <View style={styles.modalContent}>
            <Text>Additional content goes here...</Text>
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
    width: wp(100),
    height: hp(100),
  },
  modalContainer: {
    width: wp(80),
    height: hp(100),
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    elevation: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  closeButton: {
    fontSize: wp(4.5),
    color: '#ff5a5f',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: wp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  subMenu: {
    marginTop: hp(1),
    backgroundColor: '#dfe2e8',
    borderRadius: 5,
    padding: wp(3),
    position: 'absolute',
    top: hp(2),
    width: wp(36),

  },
  subMenuItem: {
    fontSize: wp(4),
    color: theme.colors.dark,
    paddingVertical: hp(1),
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    gap: hp(1),
  },
});
