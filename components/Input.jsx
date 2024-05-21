import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
const Input = ({  placeholder, is_password=false, onChangeText,right,width=80 ,keyboardtype}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container} >
      <View style={{width: Rw(width),  marginLeft: Rh(5),
    borderWidth: Rw(0.2),marginLeft: Rh(5),
    borderWidth: Rw(0.2),
    borderColor: 'black',
    borderRadius: 10,
    height:Rh(6),
    // opacity: 0.3,

    }}>
      <TextInput
         style={styles.logininput}
        placeholder={placeholder}
        placeholderTextColor={colors.font1}
        secureTextEntry={!showPassword && is_password}
        onChangeText={onChangeText}
        disableFullscreenUI={false}
        keyboardType={keyboardtype}
      />
      </View>
      {is_password && (
        <TouchableOpacity style={{ top: Rh(1.6), position: 'absolute',right:right,}} onPress={togglePasswordVisibility}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={'black'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 
  logininput: {
    marginTop:Platform.OS=='ios'? Rh(1.4):0,
    fontSize: fo(2), 
    color: colors.font1,

  },
 
});

export default Input;
