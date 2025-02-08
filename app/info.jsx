import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { theme } from '../constants/theme'
import ScreenWrapper from '../components/ScreenWrapper'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'

const supervisor = {
  name: 'Shahriar Arefin Zummon',
  designation: 'Lecturer',
  department: 'Department of CSE',
  image: require('../assets/images/nahid.jpg'),
}

const developers = [
  {
    name: 'Md. Nazmul Islam Nahid',
    id: '0182210012101186',
    batch: 'CSE 59 Batch',
    image: require('../assets/images/nahid.jpg')
  },
  {
    name: 'Puspita Dhar',
    id: '0182210012101204',
    batch: 'CSE 59 Batch',
    image: require('../assets/images/pushpita.jpg'),
  },
  {
    name: 'Safwat Nusrat',
    id: '0182210012101213',
    batch: 'CSE 59 Batch',
    image: require('../assets/images/safwat.jpg'),
  }
]

const PersonCard = ({ image, name, designation, department, id, batch }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.nameText}>{name}</Text>
      {designation && <Text style={styles.text}>{designation}</Text>}
      {department && <Text style={styles.text}>{department}</Text>}
      {id && <Text style={styles.text}>ID: {id}</Text>}
      {batch && <Text style={styles.text}>{batch}</Text>}
    </View>
  </View>
)

const Info = () => {
  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: wp(4) }}>
        <Header title="About Us" mb={20} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>FLOWER LENS</Text>
            <View style={styles.underline} />
          </View>

          <Text style={styles.description}>
            Flower Lens is an app designed for flower classification, allowing users to easily identify
            and categorize different types of flowers. It leverages advanced machine learning algorithms
            to provide accurate classifications based on user-uploaded images.
          </Text>

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
  )
}

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  underline: {
    height: 1,
    width: wp(50),
    backgroundColor: theme.colors.primary,
    marginTop: hp(1),
    borderRadius: 2,
  },
  description: {
    fontSize: hp(2.2),
    lineHeight: hp(3),
    textAlign: 'center',
    marginBottom: hp(4),
    color: theme.colors.dark,
    paddingHorizontal: wp(2),
  },
  section: {
    width: '100%',
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: wp(4),
    marginBottom: hp(2),
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    alignItems: 'center',
  },
  image: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  nameText: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  text: {
    fontSize: hp(2),
    color: theme.colors.dark,
    textAlign: 'center',
    marginBottom: hp(0.5),
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: 10,
    marginTop: hp(2),
  },
  backButtonText: {
    color: '#fff',
    fontSize: hp(2.2),
    fontWeight: 'bold',
  },
})

export default Info