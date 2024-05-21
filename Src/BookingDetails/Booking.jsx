import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme';
import AllBooking from './AllBooking';
import Completed from './completed';
import Upcmming from './Upcomming';
import Inprogress from './Inprogress';
import BookingDetails from '../../components/bookingDetails';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
export default function Booking() {

  const [selectedTab, setSelectedTab] = useState('All');
  const handleTabPress = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };
//   useEffect(() => {
//     async function fetchData() {
//         try {
//             const data = await getAllBooking();
//             console.log('Fetched data:', data);
//             setBannerData(data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }
//     fetchData();
// }, []);
  return (
    <ScreenWrapper>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS=='android'? 0: Rh(1.3)}}>
      
        <Text style={styles.loginText}>Bookings</Text> 
        </View>
      <View style={styles.buttonContainer}>
        
        <BookingDetails
          backgroundColor={selectedTab === 'All' ? colors.bookingsbuttonBackground : 'white'}
          title={"All"}
          pressnext={() => handleTabPress('All')}
          shadowOpacity={0.5}
        />
        <BookingDetails
         backgroundColor={selectedTab === 'Upcomming' ? colors.bookingsbuttonBackground : 'white'}
         title={"Upcomming"}
         pressnext={() => handleTabPress('Upcomming')}
         
       />
       <BookingDetails
       backgroundColor={selectedTab === 'Completed' ? colors.bookingsbuttonBackground : 'white'}
         title={"Completed"}
         pressnext={() => handleTabPress('Completed')}
         
       />
        <BookingDetails
         backgroundColor={selectedTab === 'Pending' ? colors.bookingsbuttonBackground : 'white'}
         title={"Cancelled"}
         pressnext={() => handleTabPress('Inprogress')}
         
       />
      </View>
      {/* Render different components based on selected tab */}
      {selectedTab === 'All' && <AllBooking />}
      {selectedTab === 'Completed' && <Completed />}
      {selectedTab === 'Upcomming' && <Upcmming />}
      {selectedTab === 'Inprogress' && <Inprogress/>}
      {/* Render other components for different tabs */}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
   
  },
  loginText: {
    fontSize: fo(3),
    marginTop: Rw(5),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'white',
  },

  title: {
    fontSize: fo(2),
    fontWeight: 'bold',
    color: colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    marginTop: Rh(0),
    paddingHorizontal: 20,
    backgroundColor: colors.bookingsbuttonBackground,
    height: Rw(20),
    width: '100%',
    bottom:Rh(1)
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
    top: 10,
    left: 10,
    zIndex: 1,
    marginTop:Rh(1.3),
    marginRight:Rw(2)
  },
});
