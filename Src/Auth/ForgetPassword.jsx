import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import Input from '../../components/Input';
import Buttons from '../../components/Buttons';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import BackButton from '../../components/backbutton';
import { colors } from '../../theme';
import { Platform } from 'react-native';
import { forgetPasswordWithEmail } from '../../services/apiauth';
import { sendOtpOnEmail } from '../../services/OtpService';
import { useRoute } from '@react-navigation/core';
const ForgetPassword = ({ navigation }) => {
  const route=useRoute();
  const [formData, setFormData] = useState({
    OTPReq: '',
    NewPassword: '',
    Password:'',
  });
  console.log(formData.OTPReq);
  const otp=formData?.OTPReq;
  const [loading, setLoading] = useState(false); 
  const { id,Email } = route.params;
  console.log(Email);
  const sendOtpAndAlert = async () => {
    try {
   setLoading(true); 
     
   const response=  await sendOtpOnEmail({Email});
      console.log("++++",response);
      Alert.alert(
        'OTP',
        response.message,
      );
   
    } catch (err) {
        setLoading(false); 
      console.error('Error sending OTP:', err);
      // Handle error here
    }finally{
        setLoading(false); 

    }
  };
  
  const handlleLogin = () => {
    // Check if OTP and new password are provided
    if (!formData.OTPReq || !formData.NewPassword) {
      Alert.alert('Error', 'Please enter OTP and new password');
      return;
    }
  
    // Check if passwords match
    if (formData.NewPassword !== formData.Password) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    // If all validations pass, proceed with password reset
    setLoading(true);
    forgetPasswordWithEmail({formData,id,otp})
      .then((response) => {
        console.log('+++++',response);
        Alert.alert(
          'Password Reset',
          response.message,
        );
        if(response.success==true) {
          navigation.navigate('Login');
          }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Login error:', error);
        Alert.alert('Error changing password please check your network connection');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSignUp = () => {
    navigation.navigate('Login');
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
            <Text style={styles.EmailText}>Enter OTP</Text>
            <Input 
              placeholder={'Enter OTP'} 
              onChangeText={(text) => setFormData({ ...formData, OTPReq: text })} 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.EmailText}>New Password</Text>
            <Input 
              placeholder={'Enter New Password'} 
              is_password={true} 
              right={Rw(10)}
              onChangeText={(text) => setFormData({ ...formData, NewPassword: text })} 
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.EmailText}>Confrm Password</Text>
            <Input 
              placeholder={'Enter Confrm Password'} 
              is_password={true} 
              onChangeText={(text) => setFormData({ ...formData, Password: text })} 
              right={Rw(10)}
            />
          </View>
          
          <TouchableOpacity 
            style={{marginTop: Rw(8), marginLeft: Rw(0)}} 
            pressnext={handlleLogin}
            disabled={loading} // Disable button when loading
          >
            {/* Show activity indicator while loading */}
            {loading ? (
                <ActivityIndicator size="large" color={colors.headerbackground} />
            ) : (
              <Buttons 
                titlenext={'Re Send OTP'}
                backgroundColor1={colors.headerbackground} 
                fontcolor={colors.background}
                pressnext={sendOtpAndAlert}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={{marginTop: Rw(8), marginLeft: Rw(0)}} 
            pressnext={handlleLogin}
            disabled={loading} // Disable button when loading
          >
            {/* Show activity indicator while loading */}
            {loading ? (
                <ActivityIndicator size="large" color={colors.headerbackground} />
            ) : (
              <Buttons 
                titlenext={'Login'}
                backgroundColor1={colors.headerbackground} 
                fontcolor={colors.background}
                pressnext={handlleLogin}
              />
            )}
          </TouchableOpacity>
        </View>

       
        
        

        <View style={{flexDirection:'row', marginTop: Rw(18), marginLeft: Platform.OS==="ios" ? Rw(20) : Rw(25)}}>
          <Text style={{fontSize: fo(2), color: colors.font1}}>Login to  Account  </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={{fontSize: fo(2), color: colors.headerbackground}}>LOG IN?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgetPassword;

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

