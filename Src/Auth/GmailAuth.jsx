import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { googleLogin } from '../../services/apiauth';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '670701529316-0fvs7sb0co21enspbkp4b7jhlfpvu4hm.apps.googleusercontent.com',
});

const GmailAccountList = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        setLoading(true);
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        console.log(idToken);
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        setUserInfo(userCredential.user);
        const response = await googleLogin({ userInfo: userCredential.user });
        if (response.success) {
          navigation.navigate('BottomNavigation');
        } else {
          Alert.alert('Login Error', 'Failed to login with Google.');
        }
      } catch (error) {
        console.error('Google sign-in error:', error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert('Login Cancelled', 'Google sign-in process was cancelled.');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          Alert.alert('Login In Progress', 'Another sign-in process is already in progress.');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Play Services Error', 'Google Play services are not available.');
        } else {
          Alert.alert('Error', 'An error occurred while signing in with Google.');
        }
      } finally {
        setLoading(false);
      }
    };
    handleSignIn();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : userInfo ? (
        <>
          <Text>Welcome, {userInfo.displayName}!</Text>
          <Button title="Sign Out" onPress={() => GoogleSignin.signOut()} />
        </>
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      )}
    </View>
  );
};

export default GmailAccountList;
