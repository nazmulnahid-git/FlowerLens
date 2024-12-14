import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { hp, wp } from '@/helpers/common';
import MenuButton from '../components/MenuButton';
import { theme } from '../constants/theme';
import MenuModal from '../components/MenuModal';

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
          title="Menu"
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
          {selectedTab === "Camera" && <Text style={styles.tabContent}>This is the First Tab Panel</Text>}
          {selectedTab === "Gallery" && <Text style={styles.tabContent}>This is the Second Tab Panel</Text>}
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
});

export default SearchScreen;
