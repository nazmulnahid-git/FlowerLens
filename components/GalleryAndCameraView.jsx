import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Alert } from 'react-native';
import { wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { IconCameraOpen, IconCancel, IconGalleryUpload } from '../assets/icons/Icons';
import * as ImagePicker from 'expo-image-picker';

export const GalleryView = ({ selectedImage, setSelectedImage }) => {

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: 'photo',
        quality: 1,
        // base64: true,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open gallery. Please try again.');
    }
  };

  const handleDiscardImage = () => {
    Alert.alert(
      'Discard',
      'Are you sure you want to discard this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setSelectedImage(null),
        },
      ]
    );
  };



  return (
    <Pressable onPress={openGallery} style={styles.container}>
      {selectedImage ? (
        <>
          <Image
            style={styles.image}
            source={{ uri: selectedImage }}
            resizeMode="contain"
          />
          <Pressable style={styles.crossButton} onPress={handleDiscardImage}>
            <IconCancel
              width={25}
              height={25}
              strokeWidth={1.5}
              color={theme.colors.danger}
            />
          </Pressable>
          <Text style={styles.uploadText}>Click to upload</Text>
        </>
      ) : (
        <View style={styles.placeholderContainer}>
          <IconGalleryUpload />
          <Text style={styles.uploadText}>Click to upload</Text>
        </View>
      )}
    </Pressable>
  );
};

export const CameraView = ({ selectedImage, setSelectedImage }) => {
  const takePicture = async () => {
    try {
      const photo = await ImagePicker.launchCameraAsync({
        mediaType: 'photo',
        quality: 1,
        // base64: true,
      });

      if (!photo.canceled) {
        setSelectedImage(photo.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to take picture. Please try again.');
    }
  };

  const handleDiscardImage = () => {
    Alert.alert(
      'Discard',
      'Are you sure you want to discard this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setSelectedImage(null),
        },
      ]
    );
  };

  return (
    <Pressable onPress={takePicture} style={styles.container}>
      {selectedImage ? (
        <>
          <Image
            style={styles.image}
            source={{ uri: selectedImage }}
            resizeMode="contain"
          />
          <Pressable style={styles.crossButton} onPress={handleDiscardImage}>
            <IconCancel
              width={25}
              height={25}
              strokeWidth={1.5}
              color={theme.colors.danger}
            />
          </Pressable>
          <Text style={styles.uploadText}>Click to upload</Text>
        </>
      ) : (
        <View style={styles.placeholderContainer}>
          <IconCameraOpen />
          <Text style={styles.uploadText}>Open Camera</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp(85),
    height: wp(85) * (4 / 3),
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(85),
    height: wp(85) * (4 / 3),
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    backgroundColor: theme.colors.secondaryLight,
  },
  uploadText: {
    marginTop: 10,
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  crossButton: {
    position: 'absolute',
    top: 10,
    right: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 3,
  },
});

