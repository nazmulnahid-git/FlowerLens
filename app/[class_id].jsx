import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getFlowerData } from '../services/FlowerService';

const ClassDetails = () => {
  const router = useRoute();
  const { class_id } = router.params;
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    const res = await getFlowerData(1);
    if (res.success) setDetails(res.data);
  }
  useEffect(() => {
    getDetails();
  }, [class_id]);

  return (
    details ?
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataTitle}> {details.flower_name} </Text>
        <Text style={styles.noDataDescription}>Description</Text>
      </View>
      :
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataTitle}> Opps </Text>
        <Text style={styles.noDataDescription}>Something wen wrong..!</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noDataDescription: {
    fontSize: 16,
    marginTop: 10,
  },
})

export default ClassDetails