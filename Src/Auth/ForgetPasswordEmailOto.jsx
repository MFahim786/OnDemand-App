import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import Input from '../../components/Input';
import Buttons from '../../components/Buttons';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import BackButton from '../../components/backbutton';
import { colors } from '../../theme';
import { Platform } from 'react-native';
import { sendOtpOnEmail } from '../../services/OtpService';
const ForgetPasswordEmailOtp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Email: '',
  });
  const [loading, setLoading] = useState(false); 
 
  const sendOtpAndAlert = async () => {
    try {
   setLoading(true); 
     
   const response=  await sendOtpOnEmail(formData);
      console.log("++++",response);
      Alert.alert(
        'OTP',
        response.message,
      );
      if(response.success==true) {
      navigation.navigate('ForgetPassword',{id:response?.id,Email:formData?.Email});
      }
    } catch (err) {
        setLoading(false); 
        Alert.alert('Error logging in please check your network connection');
      console.error('Error sending OTP:', err);
      // Handle error here
    }finally{
        setLoading(false); 

    }
  };
  

  return (
    <ScreenWrapper>
      <View style={styles.container}>     
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS=='android'? 0: Rh(1.3)}}>
      <TouchableOpacity
          style={styles.backButton}
        >
          <BackButton onPress={()=> navigation.navigate('Login')}/>
        </TouchableOpacity>
        <Text style={styles.loginText}>Forget Password</Text> 
        </View>
        <Text style={styles.h2}>Change The Password to Book Beautation</Text>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.EmailText}>Enter Gmail Address</Text>
            <Input 
              placeholder={'Enter Gmail'} 
              onChangeText={(text) => setFormData({ ...formData, Email: text })} 
            />
          </View>

         
         
            {/* Show activity indicator while loading */}
            <View style={{marginTop:Rh(10)}}>
            {loading ? (
                <ActivityIndicator size="large" color={colors.headerbackground} />
            ) : (
              <Buttons 
                titlenext={'Send OTP'}
                backgroundColor1={colors.headerbackground} 
                fontcolor={colors.background}
                pressnext={sendOtpAndAlert}
              />
            )}
    </View>
         
        </View>

       
        
        

        <View style={{flexDirection:'row', marginTop: Rw(18), marginLeft: Platform.OS==="ios" ? Rw(20) : Rw(25)}}>
          <Text style={{fontSize: fo(2), color: colors.font1}}>Login to  Account  </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style={{fontSize: fo(2), color: colors.headerbackground}}>LOG IN?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgetPasswordEmailOtp;

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },

  loginText: {
    fontSize: fo(3),
    marginTop: Rw(8),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'black',
  },

  h2: {
    fontSize: fo(2.5),
    backgroundColor: colors.headerbackground,
    color: colors.background,
    marginTop: Rw(0),
    padding: 40,
    textAlign: 'center',
  },

  inputContainer: {
    marginTop: Rw(8),
  },

  EmailText: {
    fontSize: fo(1.3),
    color: colors.font1,
    fontWeight: 'bold',
    marginLeft: Rw(10),
    marginBottom:Rh(1)
  },

  forgetsaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Rw(2),
  },

  saveMeText: {
    fontSize: fo(1.8),
    color: colors.heading,
    marginLeft: Rw(10)
  },

  forgetPasswordText: {
    fontSize: fo(1.8),
    color: colors.headerbackground,
    fontWeight: 'bold',
    marginRight: Rw(10)
  },

  lowertxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Rw(12),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black', 
    marginHorizontal: Rw(0.5), 
  },
  loginText: {
    fontSize: fo(3),
    marginTop: Rw(0),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'white',
  },

  
  backButton: {
    position: 'absolute',
    top: Rh(0.5),
    left: Rw(0.2),
    zIndex: 1,
    marginTop:Rh(2),
    marginLeft:Rw(4)
  },
});

