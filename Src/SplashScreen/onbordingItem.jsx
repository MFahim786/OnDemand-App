import { View, StyleSheet, Text, useWindowDimensions, Image } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
      <View style={{ flex: 0.3 }}>
      <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    color: `${colors.heading}`,
    textAlign: 'center',
  },
  description: {
    fontWeight: '800',
    color: `${colors.heading}`,
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
