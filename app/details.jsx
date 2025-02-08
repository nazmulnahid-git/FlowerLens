import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getFlowerData } from '../services/FlowerService';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helpers/common';
import RenderHTML from 'react-native-render-html';
import { theme } from '../constants/theme';
import Loading from '../components/Loading';

const ClassDetails = () => {
  const router = useRoute();
  const { class_id, predicion_percentage, flower_image } = router.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDetails = async () => {
    try {
      setLoading(true);
      const res = await getFlowerData(class_id);
      if (res.success) setDetails(res.data);
    } catch (error) {
      console.error('Error fetching flower data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, [class_id]);

  const textStyle = {
    color: theme.colors.dark,
    fontSize: hp(2.5),
  };

  const tagsStyles = {
    div: textStyle,
    p: textStyle,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Loading />
          <Text style={styles.loadingText}>Loading flower details...</Text>
        </View>
      );
    }

    if (!details) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataTitle}>Oops!</Text>
          <Text style={styles.noDataDescription}>Something went wrong!</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: wp(3) }}>
        <View style={styles.imageContainer}>
          <Image
            source={flower_image ? { uri: flower_image } : require('../assets/images/placeholder.png')}
            style={styles.flowerImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.flowerName}>{details.flower_name}</Text>
            <Text style={styles.accuracy}>
              Accuracy: {predicion_percentage}%
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.descriptionScroll}
          showsVerticalScrollIndicator={false}
        >
          <RenderHTML
            contentWidth={wp(100)}
            source={{ html: details.description }}
            tagsStyles={tagsStyles}
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: wp(4) }}>
        <Header title='Details' mb={20} />
      </View>
      {renderContent()}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: hp(2),
    color: theme.colors.primary,
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  flowerImage: {
    width: wp(100),
    height: 230,
    borderRadius: theme.radius.md,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  flowerName: {
    fontSize: hp(3),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  accuracy: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primaryDark,
  },
  descriptionScroll: {
    paddingHorizontal: wp(2),
    fontSize: hp(3),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  noDataDescription: {
    fontSize: 16,
    marginTop: 10,
    color: theme.colors.dark,
  },
});

export default ClassDetails;