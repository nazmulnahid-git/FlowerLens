import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { hp, wp } from '@/helpers/common';
import MenuButton from '../components/MenuButton';
import { theme } from '../constants/theme';
import MenuModal from '../components/MenuModal';
import { IconGalleryUpload } from '../assets/icons/Icons';
import * as ImagePicker from 'expo-image-picker';

const GalleryView = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openGallery = async (options) => {
    let result = await ImagePicker.launchImageLibraryAsync(options);

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={() => openGallery({
        mediaType: 'photo',
        quality: 1,
        base64: true,
      })}
    >
      <View style={styles.galleryContainer}>
        <View style={styles.galleryFlexColumnCenter}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
              resizeMode="cover"
            />
          ) : (
            <IconGalleryUpload />
          )}
          <Text style={styles.galleryClickToUploadText}>Click to upload</Text>
        </View>
      </View>
    </Pressable>
  );
};


const CameraView = () => {
  return (
    <View style={styles.cameraView}>
      <Text>Camera View</Text>
    </View>
  );
}


const TabButton = ({ value, selectedValue, onPress, label }) => {
  const isChecked = (value === selectedValue);

  return (
    <Pressable
      style={[
        styles.radioContainer,
        isChecked && styles.radioContainerActive,
      ]}
      onPress={() => onPress(value)}
    >
      <Text style={[styles.radioLabel, isChecked && styles.radioLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
};

const SearchScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Gallery");
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <MenuButton size={30} onPress={() => setIsModalVisible(true)} />
        <MenuModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />

        <View style={styles.tabSection}>
          <View style={styles.tabButtons}>
            {['Camera', 'Gallery'].map((item) => (
              <TabButton
                key={item}
                value={item}
                label={item}
                selectedValue={selectedTab}
                onPress={setSelectedTab}
              />
            ))}
          </View>

          {/* Tab Panels */}
          {selectedTab === "Camera" && <CameraView />}
          {selectedTab === "Gallery" && <GalleryView />}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: 10,
  },
  tabSection: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtons: {
    flexDirection: 'row',
    gap: wp(3),
    marginBottom: hp(2),
    padding: '5',
    borderRadius: 10,
    backgroundColor: '#dfe2e8',
  },
  radioContainer: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  radioContainerActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryDark,
  },
  radioLabel: {
    color: '#000',
    fontSize: wp(4),
  },
  radioLabelActive: {
    color: '#fff',
  },
  tabContent: {
    marginTop: hp(3),
    fontSize: wp(4),
    textAlign: 'center',
  },
  galleryContainer: {
    justifyContent: 'center',
    padding: 10,
    height: '70%',
    width: wp(85),
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
  },
  galleryFlexColumnCenter: {
    alignItems: 'center',
  },
  galleryClickToUploadText: {
    marginTop: 20,
    color: '#5c58e5',
    fontSize: 24,
    fontWeight: '600',
  },
  alleryAllowedText: {
    marginTop: 10,
    color: '#5c58e5',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default SearchScreen;
