import React from "react";
import {Text,TouchableOpacity,View} from "react-native"
import { colors } from "../theme";
import {
    responsiveHeight as Rh,
    responsiveScreenWidth as Rw,
    responsiveScreenFontSize as Rf,
  } from 'react-native-responsive-dimensions';
const ServiceProviderButton = ({buttonName,onPressButtonClick})=>{
    return(
        <View style={{borderRadius:Rw(1)}}>
            <TouchableOpacity
            onPress={onPressButtonClick}
            >
        <View  style={{backgroundColor:colors.ServiceProvider_buttonBackground,height:Rh(3),height:Rh(5) ,width:Rw(22),borderRadius:Rw(1)}}>
            <Text className="  text-center p-3  " style={{textAlign:"center",color:"black",fontSize:Rf(1.6),fontFamily:colors.fontfaimly_heding }}>{buttonName}</Text>
        </View>
        </TouchableOpacity>
        </View>
    )
}
export default ServiceProviderButton;