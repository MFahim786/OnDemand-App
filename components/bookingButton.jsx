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
    paddingHorizontal: 0, 
    paddingBottom:0, 
    
  },
  button: {
    borderRadius: Rw(5), 
    paddingVertical: Rh(1.8), 
    paddingHorizontal:Rw(30) , 
    
  },
  buttonText: {
    color: 'white',
    fontSize: Rf(2.3),
  },
});
export default BookingButtons;