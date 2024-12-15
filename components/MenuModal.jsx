import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCancel } from '../assets/icons/Icons';
import Input from './SearchInput';

const MenuModal = ({ visible, onClose }) => {
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
        {/* Dismiss Modal on Outside Press */}
        <Pressable
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
          accessibilityLabel="Close"
        />

        {/* Modal Content */}
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}
        >
          {/* Header Section */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>History</Text>
            <Pressable onPress={closeModal} accessibilityLabel="Close">
              <IconCancel
                width={wp(8)}
                height={wp(8)}
                strokeWidth={1.2}
                color={theme.colors.danger}
              />
            </Pressable>
          </View>

          <View style={styles.searchField}>
            <Input />

          </View>

          {/* Main Content */}
          <ScrollView style={styles.modalContent}
          >
            <Text style={styles.sectionText}>Additional content goes here...</Text>
            <Text style={styles.sectionText}>Additional content goes here...</Text>
            <Text style={styles.sectionText}>Additional content goes here...</Text>
            <Text style={styles.sectionText}>Additional content goes here...</Text>
            <Text style={styles.sectionText}>Additional content goes here...</Text>
            <Text style={styles.sectionText}>Additional content goes here...</Text>

          </ScrollView>

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
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
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
});
