import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { hp, wp } from '../helpers/common';
import MenuButton from '../components/MenuButton';
import { theme } from '../constants/theme';
import MenuModal from '../components/MenuModal';
import { CameraView, GalleryView } from '../components/GalleryAndCameraView';
import Button from '../components/Button';
import { IconHeaderLogo, IconInfo } from '../assets/icons/Icons';
import { router } from 'expo-router';
import { cloudinary } from '../lib/cloudinary';
import { apiBaseUrl } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { createHistory } from '../services/HistoryService';
import { StatusBar } from 'expo-status-bar';


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
  const [selectedImage, setSelectedImage] = useState(null);
  const [takenImage, setTakenImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!selectedImage && !takenImage) {
      Alert.alert("Error", "Please provide an image");
      return;
    }
    setLoading(true);

    // Upload Image to Cloudinary
    const imgURL = await cloudinary.uploadImage(
      selectedTab === "Camera" ? takenImage?.base64 : selectedImage?.base64
    );

    if (!imgURL) {
      setLoading(false);
      Alert.alert("Error", "Unable to upload image");
      return;
    }

    console.log("Uploaded Image URL:", imgURL);

    // Call the prediction API
    try {
      const response = await fetch(`${apiBaseUrl}?image_url=${encodeURIComponent(imgURL)}`);

      if (!response.ok) {
        Alert.alert("Error", "Failed to get a prediction");
        return;
      }

      const data = await response.json();
      console.log("data:", data);
      const { flower_class, probability } = data;
      if (user) {
        await createHistory({
          user_id: user.id,
          details_id: flower_class + 1,
          image: imgURL,
          accuracy: probability.toFixed(2),
        });
      }
      router.push(
        {
          pathname: `/details`,
          params: {
            class_id: flower_class + 1, // +1 to convert to 1-based indexing
            prediction_percentage: probability,
            flower_image: imgURL,
          }
        }
      );
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Failed to get a prediction");
    } finally {
      setLoading(false);
    }
  };


  return (
    <ScreenWrapper>
      <StatusBar style='light' backgroundColor={theme.colors.primary} />
      <View style={styles.headerSection}>
        <MenuButton size={30} onPress={() => setIsModalVisible(true)} />
        <IconHeaderLogo />
        <Pressable onPress={() => router.push('info')}>
          <IconInfo width={30} height={30} color={theme.colors.primary} />
        </Pressable>
      </View>
      <MenuModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <View style={styles.container}>
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
        </View>
        {selectedTab === "Camera" && <CameraView selectedImage={takenImage} setSelectedImage={setTakenImage} />}
        {selectedTab === "Gallery" && <GalleryView selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}

        <Button
          title="Search"
          buttonStyle={styles.seachButton}
          loading={loading}
          onPress={handleSearch}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(3) },
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
    gap: wp(10),
  },
  tabSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: wp(3),
  },
  tabButtons: {
    flexDirection: 'row',
    gap: wp(3),
    padding: wp(2),
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
  seachButton: {
    // marginVertical: wp(15),
    marginHorizontal: wp(3)
  }
});

export default SearchScreen;