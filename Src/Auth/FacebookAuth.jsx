import React, { useEffect } from 'react';
import { Button,View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { facebookLogin } from '../../services/apiauth';
import { useNavigation } from '@react-navigation/native';
export default function FacebookSignIn() {
  const navigation = useNavigation();
  useEffect(()=>{
    onFacebookButtonPress();
  },[])
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Once signed in, get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(facebookCredential);

      // Log user data after successful login
      if (userCredential && userCredential.user) {
        console.log('Signed in user:', userCredential.user);
        const response=await facebookLogin({userInfo: userCredential.user})
        console.log(response)
        if(response.success==true) {
          navigation.navigate('BottomNavigation');
          
        }
      }
    } catch (error) {
      console.error('Facebook sign-in error:', error.message);
    }
  }

  return (
    <View style={{flex:1,alignContent:"center",alignItems:'center',justifyContent:'center'}}>
    <Button
      title="Facebook Sign-In"
      onPress={() => onFacebookButtonPress()}
    />
    </View>
  );
}
