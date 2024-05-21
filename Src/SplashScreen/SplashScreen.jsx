import { View, Text, FlatList, StyleSheet, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import slides from '../../assets/Onbording/slides';
import OnbordingItem from './onbordingItem';
import Paginater from './Paginater';
import NextButton from './NextButton';

export default function SplashScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null); // Create a ref for FlatList

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('Last item');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnbordingItem item={item} />} 
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          ref={slidesRef} // Assign the ref
        />
      </View>
      <View>
        <Paginater data={slides} scrollx={scrollx} /> 
        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
