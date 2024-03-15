import { View, Text } from 'react-native'
import React from 'react'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    responsiveHeight as Rh,
    responsiveScreenWidth as Rw,
    responsiveScreenFontSize as fo,
  } from 'react-native-responsive-dimensions';
export default function Icones({name,icon_margine, icon_top}) {
  return (
    <View style={{ marginLeft: Rw(icon_margine), marginTop: Rh(icon_top)}}>
     <Icon1 name="greater-than" size={20} color="black" />
    </View>
  )
}