import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
const RecptButton = ({ titleback, titlenext, pressback, pressnext, backgroundColor1,backgroundColor2,fontcolor,fontcolor1 }) => {
  return (
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity
        style={{marginLeft:Rw(9), borderColor:colors.headerbackground, backgroundColor: backgroundColor1, width: Rw(35),height:Rh(6),borderRadius: Rw(20),
        borderWidth: 1}}
      >
        <View >
          <Text
            style={{
             
              fontSize: fo(3),
              fontWeight:'bold',             
              textAlign: 'center',
              color: fontcolor,
              marginTop: Rh(0.5)       
              
            }}
            onPress={pressnext}
           
          >
            {titlenext}
            </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft:Rw(5),borderColor:colors.ServiceProvider_buttonBackground, backgroundColor: backgroundColor2, width: Rw(35),height:Rh(6),borderRadius: Rw(20),
        borderWidth: 1}}>
      <View>
        <Text
            style={{
             
              fontSize: fo(3),             
              textAlign: 'center',
              fontWeight:'bold', 
              color: fontcolor1,
              marginTop: Rh(0.5)    
              
            }}
            onPress={pressback}
           
          >
            {titleback}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecptButton;

const styles = StyleSheet.create({});