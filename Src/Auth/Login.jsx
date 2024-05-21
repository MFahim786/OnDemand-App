import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import Buttons from '../../components/Buttons';
import ScreenWrapper from '../../components/ScreenWrapper';
import GmailAccountList from './GmailAuth'; // Import your GmailAccountList component

import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import { colors } from '../../theme';
import { Platform } from 'react-native';
import { LoginUser } from '../../services/apiauth';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
  });

  const [loading, setLoading] = useState(true); // Initially set to true
  const [loading2, setLoading2] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); // State variable to manage password visibility
  const [showGoogleSignInDialog, setShowGoogleSignInDialog] = useState(false); // State variable to control the visibility of the Google sign-in dialog

  useEffect(() => {
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    setLoading(true);
    try {
      const authToken = await AsyncStorage.getItem('AuthToken');
      if (authToken) {
        navigation.replace('BottomNavigation'); // Use replace instead of navigate to avoid stacking screens
      } else {
        setLoading(false); // Set loading to false when the check is completed
      }
    } catch (error) {
      console.error('Error checking AuthToken:', error);
      setLoading(false); // Set loading to false even in case of errors
    }
  };

  const handleGoogleSignIn = () => {
    // Show the Google sign-in dialog
    setShowGoogleSignInDialog(false);
    navigation.navigate('GmailAccountList');
  };

  const closeGoogleSignInDialog = () => {
    // Hide the Google sign-in dialog
    setShowGoogleSignInDialog(false);
  };

  const handlleLogin = () => {
    if (formData.UserName.length < 1) {
      Alert.alert('Please Enter your username');
      return;
    }
    if (formData.Password.length < 6) {
      Alert.alert('Password must be at least 6 characters long.');
      return;
    }
    setLoading2(true); // Start loading when login is initiated
    LoginUser(formData)
    .then((response) => {
      if (response.success) {
        if (response.Message === 'Email Verification Required') {
          // Navigate to OTP verification screen
          navigation.navigate('OtpVerfication');
        } else {
          // Navigate to the main app screen
          navigation.navigate('BottomNavigation');
        }
      } else {
        setLoading2(false);
        console.error('Login failed:', response.Message);
      }
    })
    .catch((error) => {
      setLoading2(false);
      console.error('Login error:', error);
      Alert.alert('Enter Correct Username & Password');
    })
    .finally(() => {
      setLoading2(false);
    });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgetPasswordEmailOtp');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };
  const handleFacebook = () => {
    navigation.navigate('FacebookSignIn');
  }
  const handlePhone = () => {
    navigation.navigate('PhoneAuth');
    
  };
if(loading){
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.headerbackground} />
    </View>
  )
}
  return (
    <ScreenWrapper>
      <View style={styles.container}>  
       <View style={{backgroundColor:colors.topbackground,height:Rh(8),width:'100%'}}>
        <Text style={styles.loginText}>Log In</Text> 
        </View>
        <Text style={styles.h2}>Login to your account to access all the features in Barber Shop</Text>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.EmailText}>User Name</Text>
            <Input 
              placeholder={'Enter Username'} 
              onChangeText={(text) => setFormData({ ...formData, UserName: text })} 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.EmailText}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Input 
                placeholder={'Enter Password'} 
                is_password={!showPassword} 
                onChangeText={(text) => setFormData({ ...formData, Password: text })} 
                right={Rw(1.3)}
              />
            
            </View>
          </View>

          <View style={styles.forgetsaveContainer}>
            <TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              {/* Add your Forgot Password functionality here */}
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={{marginTop: Rw(8), marginLeft: Rw(0)}} 
            pressnext={handlleLogin}
            disabled={loading} // Disable button when loading
          >
            {/* Show activity indicator while loading */}
            {loading2 ? (
                <ActivityIndicator size="large" color={colors.headerbackground} />
            ) : (
              <Buttons 
                titlenext={'Log In'}
                backgroundColor1={colors.headerbackground} 
                fontcolor={colors.background}
                pressnext={handlleLogin}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.lowertxtContainer}>
          <View style={styles.line}></View>
          <Text style={{fontSize: fo(2), color: colors.heading}}>Or Sign in with</Text>
          <View style={styles.line}></View>
        </View>
        
        <View style={{ flexDirection: 'row', marginLeft: Rw(37), marginTop: Rw(1)}}>
          <View>
            <TouchableOpacity onPress={handleFacebook}>
            <Image 
              style={{width:35, height:35, top:"32%", left:"2%" }}
              source={require("../../assets/facebook.png")}
            />
            </TouchableOpacity>
          </View>
          {/* <View>
            <Image 
              style={{width:45, height:45, top:"18%", left:"2%" }}
              source={require("../../assets/apple.png")}
            />
          </View> */}
          <View>
            {/* Google sign-in icon */}
            <TouchableOpacity onPress={handleGoogleSignIn}>
              <Image 
                style={{width:35, height:35, top:"32%", left:"25%" }}
                source={require("../../assets/googleIcon.png")}
              />
            </TouchableOpacity>
            
          </View>
          <View>
            {/* Google sign-in icon */}
            <TouchableOpacity onPress={handlePhone}>
              <Image 
                style={{width:35, height:35, top:"32%", left:"40%" }}
                source={require("../../assets/phone.png")}
              />
            </TouchableOpacity>
            
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop: Rw(18), marginLeft: Platform.OS==="ios" ? Rw(20) : Rw(25)}}>
          <Text style={{fontSize: fo(2), color: colors.font1}}>Don't have an Account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={{fontSize: fo(2), color: colors.headerbackground}}>SIGN UP?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Google sign-in dialog */}
      {/* <Modal
        visible={showGoogleSignInDialog}
        transparent={true}
        animationType="slide"
        onRequestClose={closeGoogleSignInDialog}
      >
        <View style={styles.modalContainer}>
          <GmailAccountList />
          <TouchableOpacity onPress={closeGoogleSignInDialog}>
            <Text style={{ color: 'white', marginTop: 20 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },

  loginText: {
    fontSize:fo(3),
    marginTop: Rw(5),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'white',
  },

  h2: {
    fontSize:Platform.OS=='android'?fo(2) : fo(2.2),
    backgroundColor: colors.headerbackground,
    color: colors.background,
    marginTop: Rw(0),
    padding: 40,
    textAlign: 'center',
    color:'black',
    height:Rh(14)
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});
