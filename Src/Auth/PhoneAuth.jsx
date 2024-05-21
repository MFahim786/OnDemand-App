import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import Buttons from '../../components/Buttons';
import ScreenWrapper from '../../components/ScreenWrapper';
import auth from '@react-native-firebase/auth';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import { colors } from '../../theme';
import { Platform } from 'react-native';
import {  numberLogin } from '../../services/apiauth';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    PhoneNo: '',
    Otp: '',
    Password:'',
  });

  const [loading, setLoading] = useState(false); 
  const [loading2, setLoading2] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 
  const [showGoogleSignInDialog, setShowGoogleSignInDialog] = useState(false); 
  const [uid,setUID] = useState('');
  const [loginFunction,setLoginFunction] = useState(true);
 // If null, no SMS has been sent
 const [confirm, setConfirm] = useState(null);


 function onAuthStateChanged(user) {
  if (user) {
  
  }
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);

// Handle the button press
async function signInWithPhoneNumber() {

  if (formData.PhoneNo.length<10) {
    Alert.alert('Please Enter your Correct 10 Digit Phone Number');
    return;
  }
  setLoading2(true);
  const confirmation = await auth().signInWithPhoneNumber('+92'+formData.PhoneNo);
  try{
  setLoading2(false);
  }catch(error){
    console.log(error)
    setLoading2(false);
  }
  setConfirm(confirmation);
}

async function confirmCode() {
  setLoading2(true);
  try {
  const confirmation=  await confirm.confirm(formData.Otp);

  if(confirmation && confirmation?.user?.uid){
 setUID(confirmation?.user?.uid);
 setLoginFunction(false);
 setConfirm(null);
 setLoading2(false);
  }

  } catch (error) {
    console.log('Invalid code.');
    Alert.alert('Invalid Otp code.');
    setLoading2(false);
  }
}



 
const handlleLogin = () => {
  
  if (formData.Password.length < 6) {
    Alert.alert('Password must be at least 6 characters long.');
    return;
  }
  setLoading2(true); // Start loading when login is initiated
  numberLogin({formData,uid})
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
          {loginFunction?(<View style={styles.inputContainer}>
            <Text style={styles.EmailText}>Phone No</Text>
            <Input 
              placeholder={'03000000000'} 
              onChangeText={(text) => setFormData({ ...formData, PhoneNo: text })} 
              keyboardtype='numeric'
            />
          </View>):(<View style={styles.inputContainer}>
            <Text style={styles.EmailText}>Enter Password</Text>
            <Input 
              placeholder={'Enter Password'} 
              onChangeText={(text) => setFormData({ ...formData, Password: text })} 
              is_password={!showPassword} 
              right={Rw(11)}
            />
          </View>)}
          

           {confirm?(<View style={styles.inputContainer}>
            <Text style={styles.EmailText}>Enter Otp</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Input 
                placeholder={'Enter Otp'} 
                onChangeText={(text) => setFormData({ ...formData, Otp: text })} 
                right={Rw(1.3)}
                keyboardtype='numeric'
              />
            
            </View>
          </View>):(
            <Text></Text>
          )}
          

         
          <TouchableOpacity 
            style={{marginTop: Rw(8), marginLeft: Rw(0)}} 
            // pressnext={confirmCode()}
            disabled={loading} // Disable button when loading
          >
            {/* Show activity indicator while loading */}
            {loginFunction ? (
    loading2 ? (
        <ActivityIndicator size="large" color={colors.headerbackground} />
    ) : (
        <Buttons 
            titlenext={'Verify'}
            backgroundColor1={colors.headerbackground} 
            fontcolor={colors.background}
            pressnext={confirm ? confirmCode : signInWithPhoneNumber}
        />
    )
) : (
    loading2 ? (
        <ActivityIndicator size="large" color={colors.headerbackground} />
    ) : (
        <Buttons 
            titlenext={'Log In'}
            backgroundColor1={colors.headerbackground} 
            fontcolor={colors.background}
            pressnext={handlleLogin}
        />
    )
)}

           
          </TouchableOpacity>
        </View>

       
      
        </View>


     
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
