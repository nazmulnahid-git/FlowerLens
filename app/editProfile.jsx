import Input from '../components/Input';
import Header from '../components/Header';
import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { hp, wp } from '@/helpers/common';
import { theme } from '../constants/theme';
import { cloudinary } from '../lib/cloudinary';
import { useAuth } from '../contexts/AuthContext';
import { updateUserData } from '../services/UserService';
import { getUserImageSource } from '../services/UserService';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { IconCamera, IconLocation, IconPhone, IconProfile, IconEmail } from '../assets/icons/Icons';
import * as ImagePicker from 'expo-image-picker';

// Utility function for validation
const validateProfile = (user) => {
  if (!user.name) return 'Name is required!';
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(user.name)) return 'Please enter a valid name!';
  return null;
};

const Avatar = ({ imageSource, onPickImage }) => (
  <View style={styles.avatarContainer}>
    <Image source={imageSource} style={styles.avatar} />
    <Pressable style={styles.cameraIcon} onPress={onPickImage}>
      <IconCamera strokeWidth={1.5} height={20} width={20} />
    </Pressable>
  </View>
);

const EditProfileScreen = () => {
  const router = useRouter();
  const { user: currentUser, setUserData } = useAuth();
  const [user, setUser] = useState({
    name: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser({
      name: currentUser.name || '',
      image: currentUser.image || null,
    });
  }, [currentUser]);

  const handleUpdate = async () => {
    const errorMessage = validateProfile(user);
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }

    try {
      setLoading(true);
      const updatedUser = { ...user };

      // Upload profile image
      if (user.image && typeof user.image === 'object') {
        const imageUrl = await cloudinary.uploadImage(user.image.base64);
        if (!imageUrl) {
          Alert.alert('Error', 'Failed to upload image');
          return;
        }
        updatedUser.image = imageUrl;
      }

      const res = await updateUserData(currentUser.id, updatedUser);
      if (!res.success) throw new Error('Update failed');

      setUserData({ ...currentUser, ...updatedUser });
      router.back();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onPickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: 'photo',
        quality: 1,
        base64: true,
        aspect: [1, 1],
        allowsEditing: true,
      });

      if (!result.canceled) {
        setUser({ ...user, image: result.assets[0] });
        console.log('user', result.assets[0]);

      }
    } catch {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const imageSource =
    user.image && typeof user.image === 'object'
      ? user.image
      : getUserImageSource(currentUser?.image);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView>
          <Header title="Edit Profile" />

          <View style={styles.form}>
            <Avatar imageSource={imageSource} onPickImage={onPickImage} />

            <Text style={styles.instructionText}>Please fill your profile details</Text>

            <Input
              icon={<IconProfile strokeWidth={1.6} height={25} width={25} color={theme.colors.gray} />}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.gray}
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />

            <Button title="Update" loading={loading} onPress={handleUpdate} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xxl * 1.8,
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form: {
    gap: 18,
    marginTop: 20,
  },
  instructionText: {
    fontSize: hp(1.5),
    color: theme.colors.text,
  },
  bio: {
    flexDirection: 'row',
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
});
