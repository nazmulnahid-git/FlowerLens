import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ScrollView,
  Easing
} from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCancel } from '../assets/icons/Icons';
import Input from './SearchInput';

const MenuModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const [isFocused, setIsFocused] = useState(false);

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
                <Text style={styles.modalTitle}>History</Text>
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
            <Input isFocused={isFocused} setIsFocused={setIsFocused} style={{ backgroundColor: 'white' }} />
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
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: '#fff',
    elevation: 10,
  },
  modalHeader: {
    padding: '7',
    paddingBottom: '10',
    backgroundColor: theme.colors.primaryLight,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,

  },
  modalHeaderFocused: {
    backgroundColor: '#cbd0e7',
    paddingTop: '10', borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalHeaderInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '5',
    paddingHorizontal: '10',
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
