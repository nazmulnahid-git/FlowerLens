import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Easing,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCancel, IconHeaderLogo, IconDelete } from '../assets/icons/Icons';
import Input from './SearchInput';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { deleteHistory, getHistory } from '../services/HistoryService';
import { getUserImageSource } from '../services/UserService';

const MenuModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const getHistoryData = async () => {
    try {
      const res = await getHistory(user?.id);
      if (res.success) {
        setHistory(res.data);
        setFilteredHistory(res.data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredHistory(history);
      return;
    }

    const filtered = history.filter(item =>
      item.details.flower_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHistory(filtered);
  };

  const handleDeleteHistory = (itemId) => {
    Alert.alert(
      "Delete History",
      "Are you sure you want to delete this item from your history?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const res = await deleteHistory(itemId, user?.id);
            if (!res.success) {
              Alert.alert("Error", "Failed to delete history item");
              return;
            }
            const updatedHistory = history.filter(item => item.id !== itemId);
            setHistory(updatedHistory);
            setFilteredHistory(updatedHistory.filter(item =>
              item.details.flower_name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
            setSelectedItem(null);
          }
        }
      ]
    );
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
  }, [user, visible]);

  const handleClose = () => {
    setIsFocused(false);
    setSearchQuery('');
    setFilteredHistory(history);
    onClose();
  };

  const renderHistoryItem = ({ item }) => {
    const isSelected = selectedItem === item.id;

    return (
      <Pressable
        onPress={() => {
          handleClose();
          router.push({
            pathname: `/details`,
            params: {
              class_id: item.details_id,
              prediction_percentage: item.accuracy,
              flower_image: item.image,
            }
          });
        }}
        onLongPress={() => setSelectedItem(item.id)}
        style={({ pressed }) => [
          styles.historyItem,
          isSelected && styles.historyItemSelected,
          pressed && styles.historyItemPressed
        ]}
      >
        <View style={styles.historyItemContent}>
          <Image
            source={{ uri: item.image }}
            style={styles.flowerImage}
          />
          <View style={styles.flowerDetails}>
            <Text style={styles.flowerName}>{item.details.flower_name}</Text>
            <Text style={styles.accuracy}>Accuracy: {item.accuracy}%</Text>
          </View>
          {isSelected && (
            <Pressable
              onPress={() => handleDeleteHistory(item.id)}
              style={styles.deleteButton}
            >
              <IconDelete width={wp(6)} height={wp(6)} color={theme.colors.danger} />
            </Pressable>
          )}
        </View>
      </Pressable>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery ? 'No flowers found matching your search' : 'No history items yet'}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <Pressable
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => {
            setSelectedItem(null);
            handleClose();
          }}
        />

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
              <Input
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search flowers..."
                style={{ backgroundColor: 'white' }}
              />
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
            <View>
              {filteredHistory.length !== history.length && filteredHistory.length > 0 && (
                <Text style={styles.searchResults}>
                  Showing {filteredHistory.length} of {history.length}
                </Text>
              )}
              <FlatList
                data={filteredHistory}
                keyExtractor={(item) => item.id}
                renderItem={renderHistoryItem}
                contentContainerStyle={[
                  styles.historyList,
                  !filteredHistory.length && styles.emptyList
                ]}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={renderEmptyList}
              />
            </View>
          )}

          <Pressable
            style={styles.modalFooter}
            onPress={() => {
              if (!user) return;
              onClose();
              router.push('/profile');
            }}
          >
            {user?.name ? (
              <View style={styles.footerContent}>
                <Image
                  source={getUserImageSource(user?.image)}
                  style={styles.footerImage}
                />
                <Text style={styles.footerText}>{user?.name}</Text>
              </View>
            ) : (
              <Text style={styles.footerPlaceholder}>Flower Lens</Text>
            )}
          </Pressable>

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
    padding: wp(4),
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: theme.radius.md,
    marginVertical: hp(0.5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyItemSelected: {
    backgroundColor: theme.colors.primaryLight,
  },
  historyItemPressed: {
    opacity: 0.8,
  },
  historyItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
  },
  flowerImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    marginRight: wp(3),
  },
  flowerDetails: {
    flex: 1,
  },
  flowerName: {
    fontSize: wp(4),
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: hp(0.5),
  },
  accuracy: {
    fontSize: wp(3.5),
    color: theme.colors.textSecondary,
  },
  deleteButton: {
    padding: wp(2),
  },
  separator: {
    height: hp(1),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(4),
  },
  emptyText: {
    fontSize: wp(4),
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  emptyList: {
    flexGrow: 1,
  },
  footerContent: {
    alignItems: 'center',
  },
  searchResults: {
    fontSize: wp(4),
    color: theme.colors.gray,
    marginTop: hp(0.5),
    paddingHorizontal: wp(5),
    textAlign: 'right',
  },
  modalFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: hp(2),
    backgroundColor: theme.colors.primaryLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
  },

  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },

  footerImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  footerText: {
    fontSize: wp(4),
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },

  footerPlaceholder: {
    fontSize: wp(4),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textPrimary,
  },
});
