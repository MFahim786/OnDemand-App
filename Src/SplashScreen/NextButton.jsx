import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import Svg, { G,Circle } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NextButton({ percentage, scrollTo }) {
  const size = 100;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 3 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    const listener = progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;
      if (progressRef.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  
    return () => {
      progressAnimation.removeListener(listener);
    };
  }, [percentage]);
  

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
        <Circle
          stroke={"#E6E7E8"}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={"#F4338F"}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          ref={progressRef}
        />
        </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
        <Ionicons name="arrow-forward-circle-sharp" size={32} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
    
  }
});
