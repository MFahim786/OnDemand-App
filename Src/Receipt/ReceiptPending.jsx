import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import RecptButton from '../../components/RecptButton';
import { bookingReciptDetails } from '../../services/bookingconfrm';
const RecptPending = () => {
  const [reciptBooking,setReciptBooking]=useState(null)
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    async function fetchData() {
        try {
            const data = await bookingReciptDetails('65c3b531bc603a62db454a69');
            console.log('Fetched data:', data);
            setReciptBooking(data);
            console.log(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }
    
    fetchData();
}, []);
  const renderServiceItem = (title, price) => (
    <View style={{ backgroundColor: colors.ServiceProvider_buttonBackground, height: Rh(5), width: Rh(38),marginTop:Rh(0.1)}}>
      <Text style={{ fontSize: fo(2), marginTop: Rw(2.5), color: colors.background, marginLeft: Rw(6) }}>{title}</Text>
      <View><Text style={{ fontSize: fo(2), marginTop: Rw(-5.5), color: colors.background, marginLeft: Rw(60) }}>Pkr {price}</Text></View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View>
        <Text style={{ fontFamily: colors.fontfaimly_heding, textAlign: 'center', fontSize: fo(3), fontWeight: 'bold', color: colors.heading, marginTop: Rh(4) }}>Receipt</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {[{ image: require('../../assets/popularServiceProvider/Bacground.png')},
          { image: require('../../assets/Icons/Vector1.png') },
          { image: require('../../assets/popularServiceProvider/ayeshawomen.png') },
        ].map((item, index) => (
          <View key={index} style={{ marginTop: index === 0 ? Rh(4) : index === 1 ? Rh(5) : Rh(1), width: index === 1 ? 0 : Rw(7), marginLeft: item.marginLeft }}>
            <Image source={item.image} style={{ ...item.style }} />
          </View>
        ))}

        <View style={{ flexDirection: 'row', marginTop: Rh(4), borderStyle: 'dashed', borderColor: colors.font1, borderWidth: Rw(0.4), height: Rh(10), width: Rw(65), marginHorizontal: Rw(17), borderTopRightRadius: Rw(5), borderBottomRightRadius: Rw(5), overflow: 'hidden' }}>
          <View>
            <Text style={{ fontSize: fo(2), fontWeight: 'bold', marginTop: Rw(1), color: colors.font1, marginLeft: Rw(7) }}>Serenity Salon</Text>
            <Text style={{ fontSize: fo(2), fontWeight: 'bold', marginTop: Rw(0.1), color: colors.heading, marginLeft: Rw(8) }}>56478965</Text>
            <Image source={require('../../assets/Icons/star.png')} style={{ marginTop: Rw(0.2), marginLeft: Rw(4.3), width: Rw(4.5) }} />
            <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', marginTop: Rw(-3.7), color: colors.font1, marginLeft: Rw(9) }}>4.9</Text>
            <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', marginTop: Rw(-5), color: colors.heading, marginLeft: Rw(14.5) }}>(27)</Text>
            {/* <BookingButtons titlenext={'Book Now' } backgroundColor={colors.headerbackground}/> */}
          </View>
        </View>
      </View>

      {[{ title: 'Date: Fri, 13 May 2023' }, { title: 'Time: 11:00 AM' }].map((item, index) => (
        <View key={index} style={{ elevation: Platform.OS === 'android' ? 5 : undefined, marginLeft: Rw(11), backgroundColor: colors.ServiceProvider_buttonBackground, height: Rh(5), width: Rh(36), borderRadius: Rw(1), marginTop: index === 1 ? Rh(2) : Rh(0) }}>
          <Text style={{ borderColor: colors.background, borderWidth: Rw(0.5), fontSize: fo(2), marginTop: Rw(1.9), color: colors.font1, marginLeft: Rw(2), marginRight: Rw(2), textAlign: 'center' }}>{item.title}</Text>
        </View>
      ))}

      <View style={{ marginTop: Rh(2), marginLeft: Rw(7), width: Rw(85), height: Rh(37), borderWidth: Rw(2), borderColor: colors.background }}>
        <View style={{ backgroundColor: colors.headerbackground, height: Rh(5), width: Rh(38) }}>
          <Text style={{ fontSize: fo(2), marginTop: Rw(2.5), color: colors.background, marginLeft: Rw(6) }}>Pricing</Text>
        </View>

        {[
          { title: 'HRJFTDC', price: 70 },
          { title: 'INTSR', price: 30 },
          { title: 'ASKUD', price: 56 },
          { title: 'AUDIO', price: 60 },
          { title: 'SPEAKR', price: 890 },
          { title: 'FEELLI', price: 10 },
        ].map((item, index) => (
          <React.Fragment key={index}>
            {renderServiceItem(item.title, item.price)}
          </React.Fragment>
        ))}
      </View>

      <View style={{flexDirection:"row",marginTop:Rh(1.5)}}>
        <Text style={{marginLeft:Rw(9),fontFamily:colors.fontfaimly_heding, color:colors.heading}}>Total Time:</Text>
        <Text style={{marginLeft:Rw(50),fontWeight:'bold',fontFamily:colors.fontfaimly_text,color:colors.font1}}>20 Minutes</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:Rh(0.5)}}>
        <Text style={{marginLeft:Rw(9),fontFamily:colors.fontfaimly_heding, color:colors.heading}}>Subtotal:</Text>
        <Text style={{marginLeft:Rw(60),fontWeight:'bold',fontFamily:colors.fontfaimly_text,color:colors.font1}}>Pkr 85.00</Text>
      </View>
      <View style={{flexDirection:"row",marginTop:Rh(0.5)}}>
        <Text style={{marginLeft:Rw(9),fontFamily:colors.fontfaimly_heding, color:colors.heading}}>Coupon Discount:</Text>
        <Text style={{marginLeft:Rw(48),fontWeight:'bold',fontFamily:colors.fontfaimly_text,color:colors.font1}}>-Pkr 85.00</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: Rh(2), borderStyle: 'dashed', borderColor: colors.font1, borderWidth: Rw(0.1), width:Rw(85), marginLeft:Rw(8)}}>
      </View>
      <View style={{flexDirection:"row",marginTop:Rh(0.5)}}>
        <Text style={{marginLeft:Rw(9),fontWeight:'bold',fontFamily:colors.fontfaimly_text,color:colors.font1}}>Total:</Text>
        <Text style={{marginLeft:Rw(65),fontWeight:'bold',fontFamily:colors.fontfaimly_text,color:colors.font1}}>Pkr 85.00</Text>
      </View>
      <View style={{marginTop:Rh(2), fontFamily:colors.fontfaimly_heding}}>
          <RecptButton titlenext={'ReBook'} titleback={'ReView'}  backgroundColor1={colors.background} backgroundColor2={colors.ServiceProvider_buttonBackground} fontcolor={colors.ServiceProvider_buttonBackground} fontcolor1={colors.background}/>
          
        </View>
    </ScreenWrapper>
  );
};

export default RecptPending;