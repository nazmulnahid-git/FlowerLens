import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, Pressable, FlatList, Image, Dimensions } from 'react-native';
import { supabase } from '../lib/supabase';
import { hp, wp } from '@/helpers/common';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { IconEdit, IconLogout } from '../assets/icons/Icons';
import Avatar from '../components/Avatar';
import { getUserImageSource } from '../services/UserService';
import { StatusBar } from 'expo-status-bar';
import { getSavedFlowers } from '../services/FlowerService';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - wp(8) - wp(4) * (numColumns - 1)) / numColumns;

const ProfileScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [savedFlowers, setSavedFlowers] = useState([]);

  const fetchSavedFlowers = async () => {
    try {
      const res = await getSavedFlowers(user?.id);
      if (res.success) {
        setSavedFlowers(res.data);
      }
    } catch (error) {
      console.error('Error fetching saved flowers:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedFlowers();
    }
  }, [user]);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          setLoading(true);
          const { error } = await supabase.auth.signOut();
          if (error) {
            Alert.alert('Error', error.message);
          } else {
            router.replace('/');
            setLoading(false);
          }
        }
      }
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <UserHeader
        user={user}
        router={router}
        handleLogout={handleLogout}
        savedFlowers={savedFlowers}
      />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, handleLogout, savedFlowers }) => {
  const renderFlowerItem = ({ item }) => (
    <Pressable
      style={styles.gridItem}
      onPress={() => {
        router.push({
          pathname: `/details`,
          params: {
            class_id: item.details_id,
            prediction_percentage: item.accuracy,
            flower_image: item.image,
            saved: true,
            saved_id: item.id,
          }
        });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.flowerImage}
      />
      <View style={styles.overlayGradient}>
        <Text style={styles.flowerName} numberOfLines={2}>
          {item.details.flower_name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <View>
        <Header title={'Profile'} mb={30} />
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <IconLogout strokeWidth={1.6} height={hp(3.5)} width={hp(3.5)} color={theme.colors.text} />
        </Pressable>
      </View>

      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={getUserImageSource(user?.image)}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.5}
            />
            <Pressable onPress={() => { router.push('editProfile') }} style={styles.editIcon}>
              <IconEdit strokeWidth={1.5} height={20} width={20} />
            </Pressable>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.savedFlowersSection}>
          <Text style={styles.sectionTitle}>Saved Flowers</Text>
          {savedFlowers.length > 0 ? (
            <FlatList
              data={savedFlowers}
              renderItem={renderFlowerItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              key={numColumns}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.row}
            />

          ) : (
            <Text style={styles.noFlowersText}>No saved flowers yet</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
  },
  container: {
    flex: 1,
  },
  profileSection: {
    gap: 15,
  },
  userInfo: {
    alignItems: 'center',
    gap: 4,
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: '500',
    color: theme.colors.textDark,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: theme.colors.textLight,
  },
  logoutButton: {
    marginTop: 10,
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: '#fee2e2',
  },
  savedFlowersSection: {
    marginTop: hp(4),
    flex: 1,
  },
  sectionTitle: {
    fontSize: hp(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.gray,
    marginBottom: hp(2),
  },
  gridContainer: {
    paddingBottom: hp(2),
  },
  row: {
    justifyContent: 'flex-start',
    gap: wp(4),
    marginBottom: wp(4),
  },
  gridItem: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  flowerImage: {
    width: '100%',
    height: '100%',
  },
  overlayGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp(2),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  flowerName: {
    color: 'white',
    fontSize: hp(1.4),
    fontWeight: '500',
    textAlign: 'center',
  },
  noFlowersText: {
    textAlign: 'center',
    color: theme.colors.textLight,
    fontSize: hp(1.8),
    marginTop: hp(2),
  },
});

export default ProfileScreen;