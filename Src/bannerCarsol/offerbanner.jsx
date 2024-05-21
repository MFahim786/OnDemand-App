import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Animated, Text } from 'react-native';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw } from 'react-native-responsive-dimensions';
import { catitems } from '../../assets/Categories/catgorey';
import { colors } from '../../theme';
import * as Animatable from 'react-native-animatable';
export default function BannerCarousel() {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Animatable.View animation={'slideInDown'}  style={styles.bannerContainer}>
        <ImageBackground
          style={styles.bannerImage}
          source={require("../../assets/Banner/1.png")}
        >
         {/* //explore button is paste here */}
        </ImageBackground>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={catitems}
        horizontal={true}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Rh(19),
    marginTop: Rh(1),
    marginLeft: Rw(3),
    backgroundColor: `${colors.background}`,
  },
  bannerContainer: {
    width: Rw(81), // Responsive width
    height: Rw(64), // Responsive height
    alignItems: 'between',
    marginRight: Rw(0),
  },
  bannerImage: {
    width: Rw(80),
    height: Rh(20),
    borderRadius: Rw(5), // Responsive rounded edges
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  bannerText: {
    color: '#fff', // Text color
    fontSize: 18, // Text size
    fontWeight: 'bold', // Text weight
  },
});
