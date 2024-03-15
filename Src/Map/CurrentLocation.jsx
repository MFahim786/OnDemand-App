import React, { useState, useEffect } from 'react';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw,responsiveFontSize as Rf } from 'react-native-responsive-dimensions';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme';
import BookingButtons from '../../components/bookingButton';
import { useNavigation } from '@react-navigation/native';
const CurrentLocation = () => {
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [region, setRegion] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [loading,setIsloading]= useState(false);
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setIsloading(true);
            Geolocation.getCurrentPosition(
              position => {
                const { latitude, longitude } = position.coords;
                setCurrentLatitude(latitude);
                setCurrentLongitude(longitude);
                console.log('Current location:', latitude, longitude);
                // Save to AsyncStorage
                reverseGeocode(latitude, longitude);
                saveLocationToStorage(latitude, longitude, formattedAddress);
                setIsloading(false); 
              },
              error => {
                console.error('Error getting location:', error);
                setLocationStatus('Error getting location');
                setIsloading(false); 
              },
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          } else {
            setLocationStatus('Permission Denied');
            setIsloading(false); 
          }
        } catch (err) {
          console.warn(err);
          setIsloading(false); 
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation?.clearWatch();
    };
  }, []);
  

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyClfzkwSl2ucy9GQ6XQcvRAbV4LFFqwloM`);
      const data = await response.json();
      if (data.status === 'OK') {
        const formattedAddress = data.results[0].formatted_address;
      const parts = formattedAddress.split(',');
      const englishAddress = parts.slice(1).join(',').trim();
      console.log('English address:', englishAddress);
      setFormattedAddress(englishAddress);
      await AsyncStorage.setItem('address', englishAddress.toString());
      } else {
        console.error('Reverse geocoding failed:', data.status);
        Alert.alert('Error Fetching Location Check your Network Connection');
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  };

  const saveLocationToStorage = async (latitude, longitude,formattedAddress) => {
    try {
      await AsyncStorage.setItem('latitude', latitude.toString());
      await AsyncStorage.setItem('longitude', longitude.toString());
      
      console.log('Updated location');
    } catch (error) {
      console.error('Error saving location to AsyncStorage:', error);
    }
  };
const handlenavigation=()=>{
  navigation.navigate('BottomNavigation');
}
  return (
    <ScreenWrapper>
      <View style={styles.container}>
    
        <MapView style={styles.map} showsUserLocation={true} />
        <View style={styles.absolutebox1}>
          <Text style={{textAlign:'center',color:colors.font1,fontSize:Rf(2),marginTop:Rh(1)}}>{formattedAddress}</Text>
          
        </View>
        <View style={styles.absolutebox}>
        {loading ? (
  <ActivityIndicator size="large" color={colors.headerbackground} />
) : (
  <BookingButtons 
    backgroundColor={colors.ServiceProvider_buttonBackground} 
    titlenext={'Confirm'} 
    pressnext={handlenavigation} 
  />
)}

          
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  absolutebox: {
    marginLeft: Rw(0),
    width: '100%',
    alignItems: 'center',
    marginTop: Rh(80),
  },
  absolutebox1: {
    marginLeft: Rw(0),
    width: '100%',
    alignItems: 'center',
    marginTop: Rh(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: Rh(6.4),
    width: Rw(70),
    borderRadius:5,
  },
});

export default CurrentLocation;
