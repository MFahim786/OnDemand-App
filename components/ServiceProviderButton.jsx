import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as Rf,
} from 'react-native-responsive-dimensions';

const ServiceProviderButton = ({ buttonName, onPressButtonClick, backgroundColor,fontcolor='white' }) => {


  return (
    <View style={{ borderRadius: Rw(1) }}>
      <TouchableOpacity
        onPress={onPressButtonClick}
      >
        <View
          style={{
            backgroundColor: backgroundColor,
            height: Rh(5),
            width: Rw(22),
            borderRadius: Rw(3),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.buttononhover, 
            shadowOffset: {
              width: 1,
              height: 10,
            },
            shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 14, 


          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: fontcolor,
              fontSize: Rf(1.6),
              fontFamily: colors.fontfaimly_heding,
              fontWeight:'900'
            }}
          >
            {buttonName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceProviderButton;
