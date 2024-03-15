import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
const Input = ({ placeholder, is_password=false, onChangeText, right=10 }) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log('chla');
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log('chla');
  };

 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.font1}
        secureTextEntry={is_password && !showPassword}
        onChangeText={onChangeText}
        // disableFullscreenUI={true}
      />
      {/* {is_password && (
        <TouchableOpacity
          style={[styles.eye, { right: right }]}
          onPress={togglePasswordVisibility}
        >
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={'black'} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    fontSize: fo(1.8),
    marginLeft: Rh(5),
    borderWidth: Rw(0.2),
    borderColor: 'black',
    borderRadius: 10,
    width: Rw(80),
    padding: Rh(1.7),
    color: 'black',
    fontWeight: 'bold',
    fontFamily:colors.fontfaimly_text
  },
  eye: {
    position: 'absolute',
    top: '32%',
    transform: [{ translateY:0 }], 
  },
});

export default Input;
