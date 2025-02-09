import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { theme } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helpers/common';

const supervisor = {
  name: 'Shahriar Arefin Zummon',
  designation: 'Lecturer',
  department: 'Department of CSE',
  university: 'Leading University, Sylhet',
  image: require('../assets/images/zummon.jpg'),
};

const developers = [
  {
    name: 'Md. Nazmul Islam Nahid',
    id: '0182210012101186',
    batch: 'CSE 59 Batch',
    university: 'Leading University, Sylhet',
    image: require('../assets/images/nahid.jpg')
  },
  {
    name: 'Puspita Dhar',
    id: '0182210012101204',
    batch: 'CSE 59 Batch',
    university: 'Leading University, Sylhet',
    image: require('../assets/images/pushpita.jpg'),
  },
  {
    name: 'Safwat Nusrat',
    id: '0182210012101213',
    batch: 'CSE 59 Batch',
    university: 'Leading University, Sylhet',
    image: require('../assets/images/safwat.jpg'),
  }
];

const FlowerInfoCard = () => (
  <View style={styles.flowerCard}>
    <Text style={styles.flowerTitle}>FLOWER LENS</Text>
    <View style={styles.underline} />
    <Text style={styles.description}>
      Flower Lens is an app designed for flower classification, allowing users to easily identify
      and categorize different types of flowers. It leverages advanced machine learning algorithms
      to provide accurate classifications based on user-uploaded images.
    </Text>
  </View>
);

const PersonCard = ({ image, name, designation, department, id, batch, university }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.profileImage} />
    <View style={styles.cardContent}>
      <Text style={styles.nameText}>{name}</Text>
      {designation && <Text style={styles.text}>{designation}</Text>}
      {department && <Text style={styles.text}>{department}</Text>}
      {id && <Text style={styles.text}>ID: {id}</Text>}
      {batch && <Text style={styles.text}>{batch}</Text>}
      {university && <Text style={styles.text}>{university}</Text>}
    </View>
  </View>
);

const Info = () => {
  return (
    <ScreenWrapper>
      <StatusBar style='light' backgroundColor={theme.colors.primary} />
      <View style={{ paddingHorizontal: wp(4) }}>
        <Header title="About" mb={20} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <FlowerInfoCard />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Supervised by</Text>
            <PersonCard {...supervisor} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Developed by</Text>
            {developers.map((developer, index) => (
              <PersonCard key={index} {...developer} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
  },
  flowerCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    padding: wp(5),
    marginBottom: hp(3),
    elevation: 5,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    alignItems: 'center',
  },
  flowerTitle: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    color: '#fff',
  },
  underline: {
    height: 1,
    width: wp(60),
    backgroundColor: '#fff',
    marginVertical: hp(1),
    borderRadius: 2,
  },
  description: {
    fontSize: hp(2.2),
    lineHeight: hp(3),
    textAlign: 'center',
    color: '#fff',
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 3,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    alignItems: 'center',
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    marginRight: wp(4),
  },
  cardContent: {
    flex: 1,
  },
  nameText: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
  text: {
    fontSize: hp(2),
    color: theme.colors.dark,
    marginBottom: hp(0.5),
  },
});

export default Info;
