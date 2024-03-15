import { View, Text, StyleSheet, Image, PermissionsAndroid,TouchableOpacity, Platform } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/backbutton';
import { colors } from '../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import Buttons from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
export default function Location() {
  const navigation = useNavigation();
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <ScreenWrapper >
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS==='ios'? Rh(1.3): Rh(0)}}>
     
        <Text style={styles.loginText}>Locationes</Text> 
        </View>
      <View style={{ marginLeft: Rw(12), marginTop:Platform.OS='android'?Rh(3) :Rh(10) }}>
        <Image style={{ height: Rh(40), width: Rw(70) }} source={require('../assets/Location/location.png')} />
      </View>
      <View style={styles.textEnablelocation}>
        <Text style={{ color: colors.font1, textAlign: 'center', fontSize: fo(2.3) }}>Enable Location Services</Text>
        <Text style={{ color: colors.fontSubheadin, textAlign: 'center', fontSize: fo(1.7) }}>Turn on location services so we can show {'\n'} you what’s nearby</Text>
      </View>
      <View style={{ marginTop: Rh(10), flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <Buttons titlenext={"Allow Location Access"} backgroundColor1={colors.headerbackground} fontcolor={colors.font1} pressnext={() => navigation.navigate('CurrentLocation')} />
        {/* <View style={{ marginTop: 10 }}>
          <Buttons titlenext={"Allow Location Access"} backgroundColor1={"#E0E0E0"} />
        </View> */}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    marginRight: 150,
  },
  text: {
    textAlign: 'center',
    fontSize: fo(2.3),
    color: colors.fontSubheadin
  },
  textEnablelocation: {
    textAlign: 'center',
    fontSize: fo(2.3),
    marginTop: Rh(3),
    color: colors.font1
  },
  loginText: {
    fontSize: fo(3),
    marginTop: Rw(1),
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
