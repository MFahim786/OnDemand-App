import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';

const Buttons = ({ titlenext, pressnext, backgroundColor1, fontcolor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: backgroundColor1 }]}
        onPress={pressnext}
      >
        <Text style={[styles.buttonText, { color: fontcolor }]}>{titlenext}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: Rw(65),
    height: Rh(5),
    borderRadius: Rw(20),
    borderWidth: 1,
    borderColor: 'transparent', // Making the border color transparent
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    fontSize: fo(2),
    textAlign: 'center',
    paddingTop: Rh(0),
    fontFamily:colors.fontfaimly_heding,
  },
});
