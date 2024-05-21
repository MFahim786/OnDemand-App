import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../theme';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as Rf,
} from 'react-native-responsive-dimensions';
const BookingDetails = ({ title, pressnext, backgroundColor,shadowOpacity }) => {
  return (
    <View style={[styles.container, { shadowOpacity: shadowOpacity }]}>
      
      <TouchableOpacity
        onPress={pressnext}
        style={[styles.button, { backgroundColor }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
  button: {
   
    height: Rh(4),
    width: Rw(20),
    margin:Rw(2.3),
    borderRadius:Rw(3),
    shadowColor:'rgba(255, 255, 255,0.9)', // Adjust the opacity as needed
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 14, 
    
  },
  buttonText: {
    marginTop: Platform.OS === 'android' ? Rh(0.7) : Rh(1),
    textAlign: 'center',
    color: 'black',
    fontSize: Rf(1.5),
    fontWeight:'700'
  },
});
export default BookingDetails;