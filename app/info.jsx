import { Pressable, StyleSheet, Text, View,Image, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { theme } from '../constants/theme'
import ScreenWrapper from '../components/ScreenWrapper';
import { Header } from '@rneui/themed';

const supervisor={
  name:'Shahriar Arefin Zummon',
  designation:'Lecturer',
  department:'Department of CSE',
  image:require('../assets/images/nahid.jpg'),
};
const developers=[
  {
    name:'Md. Nazmul Islam Nahid',
    id:'0182210012101186',
    batch:'CSE 59 Batch',
    image:require('../assets/images/nahid.jpg')
  },
  {
    name:'Puspita Dhar',
    id:'0182210012101204',
    batch:'CSE 59 Batch',
    image:require('../assets/images/pushpita.jpg'),
  },
  {
    name:'Safwat Nusrat',
    id:'0182210012101213',
    batch:'CSE 59 Batch',
    image:require('../assets/images/safwat.jpg'),
  }
]
const Info = () => {
  return (
    <ScreenWrapper>
    <ScrollView>
    <View style={{ 
      padding:20,
      alignItems:'center'

    }}>
      <Text style={styles.title}>FLOWER LENS</Text>
      <Text style={[styles.description]}>Flower Lens is an app designed for flower classification, allowing users to easily identify and categorize different types of flowers. It leverages advanced machine learning algorithms to provide accurate classifications based on user-uploaded images.</Text>

      <Text style={styles.info}>Supervised by</Text>
      <View style={styles.card}>
      <Image source={supervisor.image} style={styles.image}/>
      <Text style={styles.nametext}>{supervisor.name}</Text>
      <Text style={styles.text}>{supervisor.designation}</Text>
      <Text style={[styles.text,{marginBottom:10}]}>{supervisor.department}</Text>
      </View>


      <Text style={styles.info}>Developed by</Text>
      {developers.map((developer,index)=>(
        <View key={index} style={styles.card}>
          <Image source={developer.image} style={styles.image}/>
          <Text style={styles.nametext}>{developer.name}</Text>
          <Text style={styles.text}>ID: {developer.id}</Text>
          <Text style={[styles.text, { marginBottom: 10 }]}>{developer.batch}</Text>
          </View>
        
      ))}

      <Pressable onPress={() => router.back()}>
        <Text style={{marginTop:20,fontSize:20}}>Back</Text>
      </Pressable>
    </View>
    </ScrollView>
    </ScreenWrapper>
  )
}

export default Info

const styles = StyleSheet.create({
  card:{
    marginBottom:20,
    backgroundColor:'#f8f8f8',
    width:'90%',
    marginTop:10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent:'center',
    alignSelf:'center',
    color:theme.colors.primaryDark
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    fontWeight:'bold',
    alignSelf:'center',
  },
  info:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent:'center',
    alignSelf:'center',
    color:theme.colors.primary
  },
  image:{
    width: 160,
    height: 160, 
    borderRadius: 100, 
    marginBottom:20,
    marginTop:10,
    alignSelf:'center'
  },
  nametext:{
    fontSize: 20,
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:theme.colors.primaryDark
  },
  text:{
    fontSize: 16,
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'
  }
})