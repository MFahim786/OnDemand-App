import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../theme';
import { useRoute } from '@react-navigation/native';
import { beautaionGallrey } from '../../services/beautationData';
import { baseUrl } from '../../services/supabase';

import {
  responsiveScreenWidth as Rw,
} from 'react-native-responsive-dimensions';

const PhotosGallrey = () => {
  const route = useRoute();
  const { beauticianId } = route.params;
  const [imageData, setImageData] = useState(null);
  console.log(imageData?.photos);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await beautaionGallrey(beauticianId);
        setImageData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!imageData) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      {imageData?.gallery?.map((item) => (
        <View key={item._id} style={styles.imageContainer}>
         {item.photos.map((photo, index) => (
  <Image
    key={photo._id}
    source={{ uri: `${baseUrl}/${photo.address.replace(/uploads/g, '')}` }}
    style={styles.image}
  />
))}

        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop:3,
    alignItems:'center',
    marginLeft:Rw(5)
  },
  imageContainer: {
    width: '30%',
    marginVertical: 5,
  },
  image: {
    width: Rw(30
    ),
    height: Rw(30), 
   
    borderRadius: 10,
    marginBottom: Rw(3), 
  },
});

export default PhotosGallrey;
