import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as Rf,
} from 'react-native-responsive-dimensions';
const BookingButtons = ({ titlenext, pressnext, backgroundColor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pressnext}
        style={[styles.button, { backgroundColor }]}>
        <Text style={styles.buttonText}>{titlenext}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Rw(100),
    alignItems: 'center',
    paddingHorizontal: 0, // Adjust padding as needed
    paddingBottom:0, // Adjust padding as needed
    
  },
  button: {
    borderRadius: Rw(5), // Adjust the border radius for rounded corners
    paddingVertical: Rh(1.8), // Adjust the vertical padding for height
    paddingHorizontal:Rw(30) , // Adjust the horizontal padding for width
    
  },
  buttonText: {
    color: 'white',
    fontSize: Rf(2.3),
  },
});
export default BookingButtons;