import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet, Platform } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import Icones from '../components/icones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../services/getuserdetails';
import { baseUrl } from '../services/supabase';
import { CommonActions } from '@react-navigation/native';
const iconSize = Math.min(Rw(60), 60);

export default function Profile() {
  const [userData, setUserData] = useState("");
  console.log("+++++++++",userData);
  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const user = await getUser();
        setUserData(user?.userData);
        const userDataString = await AsyncStorage.setItem('userData', JSON.stringify(user?.userData));
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data. Please try again.');
      }
    };

  
      fetchUserdata();
    
  }, []);

  const navigation = useNavigation(); 
  const updatePass = () => {
    navigation.navigate('Changepass',{userData:userData});
  };
  const updateProfile = () => {
    navigation.navigate('UProfile',{userData:userData});
  };
  const handlelogout = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Replace 'Login' with the name of your login screen
      })
    );
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      // Navigate to the 'Login' screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle AsyncStorage clear error
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  const aboutus = () => {
    navigation.navigate('AboutUs');
  };
  const favSaloon = () => {
    navigation.navigate('FavSaloons');
  };
  const renderListItem = (item, index) => (
    <TouchableOpacity key={index} style={{ flexDirection: 'row', paddingVertical: Rh(1.8), paddingHorizontal: Rw(3.5), marginTop: Rh(1.2) }} onPress={item.onPress}>
      <View style={{ borderRadius: 30, backgroundColor: colors.headerbackground, width: iconSize * 0.6, height: iconSize * 0.6, justifyContent: 'center', alignItems: 'center' }}>
        {item.icon}
      </View>
      <Text style={{ marginLeft: Rw(7), fontSize: fo(2), color: 'black', marginTop:Platform.OS=='android'?Rh(0): Rh(1),textAlign:'center' }}>{item.text}</Text>
      {['My Profile', 'Favorite Beautician', 'Payment Method', 'Change Password','Privacy policy','About us','Logout'].includes(item.text) && (
        <View style={{   justifyContent: 'Center', alignItems: 'Center' }}>
         {item.icone2}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={{backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS==='ios'? Rh(1.3): Rh(0)}}>
        <Text style={styles.loginText}>Profile</Text> 
        </View>

      <View style={{ marginTop: Rh(0), paddingVertical: Rh(2), backgroundColor: colors.headerbackground, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Image style={{ width: Rw(30), height: Rw(30) }} source={require('../assets/profile.png')} /> */}
        {userData.ProfiePhoto ? (
         <Image style={{ width: Rw(30), height: Rw(30),borderRadius:Rh(100) }} source={{ uri: `${baseUrl}/${userData?.ProfiePhoto}` }} />
      ) : (
        <Image style={{ width: Rw(30), height: Rw(30) }} source={require('../assets/profile.png')} />
      )}
        <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: 'white', marginLeft: Rw(1), marginTop: Rh(1) }}>{userData?.FirstName}ch</Text>
        <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: 'white', marginLeft: Rw(3) }}> {userData?.Email}</Text>
      </View>
      <View style={{marginTop:Rh(0)}}>
      {[
        { icon: <Ionicons name="person-outline" size={iconSize * 0.4} color={colors.background} />, text: 'My Profile', icone2:<Icones icon_margine={Platform.OS=='android'?Rw(12.2):Rw(12)} icon_top={1}/>, onPress: updateProfile },
        { icon: <Image source={require('../assets/Icons/vector.png')} style={{ width: iconSize * 0.4, height: iconSize * 0.4 }} />, text: 'Favorite Beautician',icone2:<Icones icon_margine={Platform.OS=='android'?Rw(9 ): Rw(8.3)} icon_top={1}/>,onPress:favSaloon },
        { icon: <Image source={require('../assets/Icons/Paymentmethod.png')} style={{ width: iconSize, height: iconSize }} />, text: 'Payment Method',icone2:<Icones icon_margine={Platform.OS=='android'?Rw(10):Rw(9)} icon_top={1}/> },
        { icon: <Image source={require('../assets/Icons/changepassword.png')} style={{ width: iconSize, height: iconSize }} />, text: 'Change Password',icone2:<Icones icon_margine={Platform.OS=='android'?Rw(9.6):Rw(8.7)} icon_top={1}/> , onPress: updatePass},
        { icon: <Image source={require('../assets/Icons/privacypolicy.png')} style={{ width: iconSize, height: iconSize }} />, text: 'Privacy policy',icone2:<Icones icon_margine={Platform.OS=='android'?Rw(10.8):Rw(10.3)} icon_top={1}/> },
        { icon: <Image source={require('../assets/Icons/aboutus.png')} style={{ width: iconSize, height: iconSize }} />, text: 'About us',icone2:<Icones icon_margine={Platform.OS=='android'?Rw(12.3):Rw(12.4)} icon_top={1}/>,onPress: aboutus },
        { icon: <Image source={require('../assets/Icons/logout.png')} style={{ width: iconSize, height: iconSize }} />, text: 'Logout',icone2:<Icones icon_margine={Platform.OS=='android'?Rw(12.8):Rw(13.1)} icon_top={1}/> ,onPress: handlelogout },
      ].map((item, index) => (
        <View key={index} style={{ marginTop: index > 0 ? Rh(-1) : 0 }}>
          {renderListItem(item, index)}
          
        </View>
      ))}
      </View>
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({

  loginText: {
    fontSize: fo(3),
    marginTop: Rw(5),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    marginTop:Rh(2),
    marginRight:Rw(2)
  },
 
});
