import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getFlowerData } from '../services/FlowerService';

const ClassDetails = () => {
  const router = useRoute();
  const { class_id } = router.params;
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    console.log('i am here');
    const res = await getFlowerData(1);
    if (res.success) setDetails(res.data);
    console.log(res);
  }
  useEffect(() => {
    getDetails();
  }, [class_id]);
  console.log(router.params.class_id);
  // Destructure the className and classDescription from route.params
  // const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rose</Text>
      <Text style={styles.description}>asdf</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
})

export default ClassDetails