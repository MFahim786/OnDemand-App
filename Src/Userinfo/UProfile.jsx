import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert,TextInput } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import Icones from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import Input from '../../components/Input';
import BackButton from '../../components/backbutton';
import updateUser from '../../services/getuserdetails';
import { useRoute } from '@react-navigation/native';
export default function UProfile() {
  const route = useRoute();
  const { userData } = route.params;
  console.log(userData);
  const navigation = useNavigation(); 
  const [userImage, setUserImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const handleUpdates = async () => {
    try {
      setIsLoading(true); // Show activity indicator
      
      const response = await updateUser({firstName,lastName, email, phoneNumber,userImage });;
      if (!response.success) {
        throw new Error('Failed to update user details');
      }
      Alert.alert('User Profile Updated Successfully');
      setIsLoading(false); 
    } catch (error) {
      console.error('Error handling updatesxxxx:', error);
      setIsLoading(false); 
    }
  };
  const handleUserImageSelection = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setUserImage(response.uri || (response.assets && response.assets[0].uri));
      }
    });
  }; 
  return (
    <ScreenWrapper>
      <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:colors.topbackground, height:Rh(8), width:'100%', marginTop:Platform.OS=='android'? 0: Rh(1.3) }}>
        <TouchableOpacity
          style={styles.backButton}
        >
          <BackButton onPress={()=> navigation.navigate('BottomNavigation')}/>
        </TouchableOpacity>
        <Text style={styles.loginText}>Update Profile</Text> 
      </View>

      <View style={[{ marginTop: Rh(0), paddingVertical: Rh(2), backgroundColor: colors.headerbackground, justifyContent: 'center', alignItems: 'center' }]}>
      {userImage ? (
        <Image style={{ width: Rw(30), height: Rw(30),borderRadius:100 }} source={{ uri: userImage }} />
      ) : (
        <Image style={{ width: Rw(30), height: Rw(30),borderRadius:100 }} source={require('../../assets/profile.png')} />
      )}
        <TouchableOpacity
        onPress={handleUserImageSelection}
        >
        <View style={styles.iconContainer}>
  <Icones name={'pluscircleo'} size={30} color={'black'} />
</View>
</TouchableOpacity>
<Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: 'white', marginLeft: Rw(1), marginTop: Rh(0) }}>{userData?.FirstName}ch</Text>
        <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: 'white', marginLeft: Rw(3) }}> {userData?.Email}ch </Text>
      </View>
     
      <Text style={[styles.EmailText,{ fontSize: fo(1.9), fontWeight: 'bold', color:colors.font1, paddingHorizontal: Rw(10), marginTop: Rh(6) }]}>First Name</Text>
      <Input placeholder={'Enter First Name'} value={firstName} onChangeText={setFirstName} />
      <Text style={[styles.EmailText,{ fontSize: fo(1.9), fontWeight: 'bold', color:colors.font1, paddingHorizontal: Rw(10), marginTop: Rh(2) }]}>Last Name</Text>
      <Input placeholder={'Enter Last Name'} value={lastName} onChangeText={setLastName} />
      <Text style={[styles.EmailText,{ fontSize: fo(1.9), fontWeight: 'bold', color:colors.font1, paddingHorizontal: Rw(10), marginTop: Rh(2) }]}>Email</Text>
      <Input placeholder={'Enter Email'} value={email} onChangeText={setEmail} />
      <Text style={[styles.EmailText,{ fontSize: fo(1.9), fontWeight: 'bold', color:colors.font1, paddingHorizontal: Rw(10), marginTop: Rh(2) }]}>Phone Number</Text>
      <Input placeholder={'Enter Phone Number'} value={phoneNumber} onChangeText={setPhoneNumber} />
      
      <TouchableOpacity onPress={handleUpdates} style={{ width: Rh(30),marginLeft:Rw(20), backgroundColor: colors.headerbackground, padding: Rw(4), borderRadius: Rw(4), alignItems: 'center', marginTop: Rh(4) }}>
        {/* Conditionally render activity indicator based on isLoading state */}
        {isLoading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={{ fontSize:fo(2),color: colors.background, fontWeight: 'bold' }}>Update</Text>
        )}
      </TouchableOpacity>    
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: fo(3),
    marginTop: Rw(0),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'white',
  },
  EmailText: {
    fontSize: fo(1.3),
    color: colors.font1,
    fontWeight: 'bold',
    marginLeft: Rw(1),
    marginBottom:Rh(1)
  },
  backButton: {
    position: 'absolute',
    top: Rh(0.5),
    left: Rw(0.2),
    zIndex: 1,
    marginTop:Rh(2),
    marginLeft:Rw(4)
  },
  iconContainer: {
    marginTop:Rh(-4),
    marginBottom:Rh(2),
    backgroundColor: 'white',
    borderRadius: 35, 
    width: Rh(4),
    height: Rh(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
