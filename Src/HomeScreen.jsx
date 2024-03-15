import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import SearchBar from './searchBar';
import OfferBanner from './bannerCarsol/offerbanner';
import Catgorey from './Catgories/Catgorey';
import NearbySaloons from './NearbySallons/NearbySaloons';
import UserInfo from './Userinfo/UserInfo';
import PopularServiceProvider from './popularServiceProvider/popularServiceProvider';
import { getUser } from '../services/getuserdetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
export default function HomeScreen() {
  const [userData, setUserData] = useState("");
  const name = userData?.userData?.FirstName ;
  const  lastName= userData?.userData?.LastName
 console.log('----',name)
  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const user = await getUser();
        setUserData(user);
        console.log("User +++++++", user);
        const userData = await AsyncStorage.setItem('userData', JSON.stringify(user?.userData));
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data. Please try again.');
      }
    };

  
      fetchUserdata();
    
  }, [1]);

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} userdata={userData}>
        <UserInfo style={styles.userInfo} name={name} lastName={lastName}/>
        <View>
          <SearchBar />
        </View>
        <View>
          <OfferBanner />
        </View>
        <View>
          <Catgorey />
        </View>
        <View>
          <NearbySaloons />
        </View>
        <View>
          <PopularServiceProvider />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop:Platform.OS=='android'?  Rh(0): Rh(1.2)
  },
  userInfo: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: colors.background,
  },
});
