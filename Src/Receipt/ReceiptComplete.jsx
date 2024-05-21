import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, Image, Platform, ScrollView,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import RecptButton from '../../components/RecptButton';
import { bookingReciptDetails } from '../../services/bookingconfrm';
import moment from 'moment';
import BackButton from '../../components/backbutton';
import { useNavigation, useRoute } from '@react-navigation/native';
const RecptComplete = () => {
  const route=useRoute();
  const [reciptBooking,setReciptBooking]=useState(null)
  const navigation = useNavigation();
  const formattedTime = moment(reciptBooking?.booking?.BookingTime?.Time).format('hh:mm A');
  const formattedDate = moment(reciptBooking?.booking?.BookingTime?.Date).format('ddd, DD MMM YYYY');
  const [loading,setLoading]=useState(false)
  const id=route?.params?.id;
  const beauticianid=reciptBooking?.booking?.Beautician?._id
  console.log("id: " + reciptBooking?.booking?.Beautician?._id);
  useEffect(() => {
    async function fetchData() {
        try {
          setLoading(true);
            const data = await bookingReciptDetails(id);
           
            setReciptBooking(data);
        console.log(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }
    
    fetchData();
}, []);

  const renderServiceItem = (title, price) => (
    <View style={{flexDirection:'row', backgroundColor: 'white',  height: Rh(5), width:Platform.OS=='android'?Rw(81): Rw(37.8),borderRadius:Rw(10),borderBlockColor:colors.font1,borderWidth:1 }}>
      <Text style={{ fontSize: fo(2),marginTop: Rh(1), textAlign:'right', color: colors.font1, marginLeft: Rw(6) }}>{title}</Text>
      <Text style={{ fontSize: fo(2), marginTop: Rh(1),textAlign:'right', color: colors.font1, marginLeft: Rw(35) }}>Pkr {price}</Text>
    </View>
  );

  const handleReview = () => {
   navigation.navigate('AddReview',{id:beauticianid})
    // Add your style calculations here if needed
  }
  const handleReBook = () => {
    navigation.navigate('ServiceProvider',{beauticianId:beauticianid})
     // Add your style calculations here if needed
   }

  return (
    <ScreenWrapper>
     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS=='android'? 0: Rh(1.3)}}>
      <TouchableOpacity
          style={styles.backButton}
        >
          <BackButton onPress={()=> navigation.navigate('Booking')}/>
        </TouchableOpacity>
        <Text style={styles.loginText}>Receipt</Text> 
        </View>
      {/* ServiceProvider Section */}
      {loading?(<View style={styles.loadingContainer}> 
                <ActivityIndicator size="large" color={colors.headerbackground} />
            </View>):(
     <View>
      <View style={{ flexDirection: 'row',marginTop:Platform.OS=='ios'?Rh(0):0,marginLeft:Rw(5) }}>
        {[{ image: require('../../assets/popularServiceProvider/Bacground.png') },
    
       
        ].map((item, index) => (
          <View key={index} style={{ marginTop:Rh(2) }}>
            <Image source={item.image} style={{ height:Rh(10),width:Rw(30) }} />
          </View>
        ))}

<View style={{ flexDirection: 'row', marginTop: Rh(2), borderStyle: 'dashed', borderColor: colors.font1, borderWidth: Rw(0.4), height: Rh(9), width: Rw(60), marginLeft: Rw(0), borderRadius: Rw(5), alignItems: 'center' }}>
  <View style={{ marginLeft: Rw(7) }}>
    <Text style={{ fontSize: fo(2), fontWeight: 'bold', marginTop: Rh(0), color: colors.font1 }}>{reciptBooking?.booking?.Beautician?.Username}</Text>
    <Text style={{ fontSize: fo(2), fontWeight: 'bold', marginTop: Rh(0.1), color: colors.heading }}>{reciptBooking?.booking?.Beautician?.PhoneNo}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Rh(0.2) }}>
      <Image source={require('../../assets/Icons/star.png')} style={{ marginRight: Rw(1), width: Rw(4), height: Rh(1.8) }} />
      <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: colors.font1 }}>4.9</Text>
      <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: colors.heading, marginLeft: Rw(0) }}>(27)</Text>
    </View>
  </View>
</View>

      </View>
      {/* Date and Time Section */}
      {[{ title: `Date: ${formattedDate}` }, { title: `Time: ${formattedTime}` }].map((item, index) => (
        <View key={index} style={{ elevation: Platform.OS === 'android' ? 5 : undefined, marginLeft: Rw(11), backgroundColor: colors.ServiceProvider_buttonBackground, height: Rh(5), width: Rh(36), borderRadius: Rw(1), marginTop: index === 1 ? Rh(2) : Rh(0) }}>
          <Text style={{ borderColor: colors.background, borderWidth: Rw(0.5), fontSize: fo(2), marginTop: Rw(1.9), color: colors.font1, marginLeft: Rw(2), marginRight: Rw(2), textAlign: 'center' }}>{item.title}</Text>
        </View>
      ))}

      {/* Pricing Section */}
      <View style={{ marginTop: Rh(1), marginLeft: Rw(7), width: Rw(86), height: Rh(37), borderWidth: Rw(2), borderColor: 'white' }}>
      <View style={{ backgroundColor: colors.topbackground, height: Rh(5), width:Platform.OS=='android'?Rw(82): Rw(37.8),flexDirection:'row',marginBottom:Rh(0.5) }}>
        <Text style={{ fontSize: fo(2.3), marginTop: Rh(1), color: colors.font1, marginLeft: Rw(6) }}>Name</Text>
          <Text style={{ fontSize: fo(2.3), marginTop: Rh(1), color: colors.font1, marginLeft: Rw(43) }}>Pricing</Text>
        </View>
        <ScrollView scrollIndicatorInsets={true}>
        <Text>
  {reciptBooking?.Services.map((service, index) => (
  <React.Fragment key={service._id}>
    {service?.ServiceTypes?.map((item, index) => (
      <React.Fragment key={item._id}>
        {renderServiceItem(item.Name, item.Price)}
      </React.Fragment>
    ))}
  </React.Fragment>
))}
        </Text>
        </ScrollView>
</View>



      {/* Total Time, Subtotal, Coupon Discount, and Total Section */}
      <View style={{ flexDirection: "row", marginTop: Rh(1.5) }}>
        <Text style={{ marginLeft: Rw(9), fontFamily: colors.fontfaimly_heding, color: colors.heading }}>Total Time:</Text>
        <Text style={{ marginLeft: Rw(50), fontWeight: 'bold', fontFamily: colors.fontfaimly_text, color: colors.font1 }}>20 Minutes</Text>
      </View>
      {/* Add other rows here for Subtotal, Coupon Discount, and Total */}

      {/* Rebook and Review Buttons */}
      <View style={{ marginTop: Rh(5) }}>
        <RecptButton titlenext={'Rebook'} 
        titleback={'Review'}
        backgroundColor1={colors.background} 
        backgroundColor2={colors.ServiceProvider_buttonBackground} 
        fontcolor={colors.ServiceProvider_buttonBackground} 
        fontcolor1={colors.background} 
        pressback={handleReview}
        pressnext={handleReBook}/>
      </View>
      </View>)}
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({

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
});
export default RecptComplete;
