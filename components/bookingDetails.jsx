import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../theme';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as Rf,
} from 'react-native-responsive-dimensions';
const BookingDetails = ({ title, pressnext, backgroundColor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pressnext}
        style={[styles.button, { backgroundColor }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
flex: 1,
  },
  button: {
   
    height: Rh(4),
    width: Rw(20),
    margin:Rw(2.3),
    borderRadius:Rw(1),
  },
  buttonText: {
    marginTop: Platform.OS === 'android' ? Rh(1.1) : Rh(1),
    textAlign: 'center',
    color: 'black',
    fontSize: Rf(1.5),
  },
});
export default BookingDetails;